import ApiClient from 'http/ApiClient'
import AuthInfo from 'model/auth/AuthInfo'
import DataResponse from 'model/response/DataResponse'
import BaseResponse from 'model/response/BaseResponse'

export default class LoginApi {
    static login(body: AuthInfo): Promise<DataResponse<AuthInfo>> {
        return ApiClient.server().post('/app/login', body).then((res) => {
            return res.data
        })
    }

    static logout(): Promise<BaseResponse> {
        return ApiClient.server().get('/app/logout').then((res) => {
            return res.data
        })
    }
}
