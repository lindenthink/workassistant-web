import axios from 'axios'
import store from '../store'

import ObjectUtil from 'util/ObjectUtil.js'
import ShortcutMgr from 'mgr/ShortcutMgr'

import EnvUtil from 'util/EnvUtil.js'
import Vue from 'vue'

const qs = require('qs')
axios.defaults.paramsSerializer = (params) => {
    return qs.stringify(params, { arrayFormat: 'repeat' })
}
axios.defaults.timeout = 60000

export default class ApiClient {
    public static file(baseUrl: string) {
        return axios.create({
            baseURL: baseUrl,
        })
    }

    public static server() {
        // 可以在这里拦截
        const baseUrl = EnvUtil.getServiceUrl()
        return ApiClient.create(baseUrl)
    }

    public static create(baseUrl: string) {
        const instance = axios.create({
            baseURL: baseUrl,
            withCredentials: true,
        })

        instance.interceptors.request.use(function(config) {
            let traceId
            if (store.state.user) {
                traceId = store.state.user.id + '_' + new Date().getTime()
            } else {
                traceId = ObjectUtil.uuid()
            }
            config.headers.trace_id = traceId
            return config
        }, function(error) {
            return Promise.reject(error)
        })

        instance.interceptors.response.use(function(response) {
            if (response.data instanceof ArrayBuffer) {
                return response
            }
            if (response.data.success) {
                return response
            } else {
                const error = new Error()
                if (response.data.message) {
                    error.message = response.data.message
                } else {
                    error.message = response.status + '未知异常'
                }
                new Vue().$message({
                    type: 'error',
                    message: error.message,
                    duration: 3000
                })
                return Promise.reject(error)
            }
        }, function(error) {
            if (!error.response) {
                new Vue().$message({
                    type: 'error',
                    message: `请求时发生异常：${error}`,
                    duration: 3000
                })
                return Promise.reject(error)
            }
            switch (error.response.status) {
                case 101:
                    break
                case 401:
                    error.message = '登录已过期,请重新登录!'
                    ShortcutMgr.logout()
                    break
                case 403:
                    error.message = '禁止访问!'
                    break
                case 503:
                    error.message = '服务器升级中!'
                    break
                case 500:
                    error.message = '服务内部异常!'
                    break
                default:
                    error.message = '未知错误'
            }
            new Vue().$message({
                type: 'error',
                message: error.message,
                duration: 3000
            })
            return Promise.reject(error)
        })
        return instance
    }
}
