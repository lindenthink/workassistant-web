import PageResponse from 'model/response/PageResponse'
import ApiClient from 'http/ApiClient'
import DataResponse from 'model/response/DataResponse'
import BaseResponse from 'model/response/BaseResponse'
import AccountFilter from 'model/account/AccountFilter'
import Account from 'model/account/Account'

export default class AccountApi {
    static query(filter: AccountFilter): Promise<PageResponse<Account[]>> {
        let url: string = '/account/query'
        return ApiClient.server().post(url, filter).then((res) => {
            return res.data
        })
    }

    static export(filter: AccountFilter): Promise<DataResponse<string>> {
        let url: string = '/account/export'
        return ApiClient.server().post(url, filter).then((res) => {
            return res.data
        })
    }

    static save(body: Account, operator: string): Promise<BaseResponse> {
        return ApiClient.server().post(`/account/save?operator=${operator}`, body).then((res) => {
            return res.data
        })
    }

    static delete(uuid: string): Promise<BaseResponse> {
        return ApiClient.server().get(`/account/delete/${uuid}`).then((res) => {
            return res.data
        })
    }
}
