import Response from 'model/response/Response'
import ApiClient from 'http/ApiClient'
import AuthInfo from 'model/auth/AuthInfo'

export default class LoginApi {
    static login(body: AuthInfo): Promise<Response<AuthInfo>> {
        return ApiClient.server().post('/app/login', body).then((res) => {
            return res.data
        })
    }

    static logout(): Promise<Response<void>> {
        return ApiClient.server().get('/app/logout').then((res) => {
            return res.data
        })
    }
}
