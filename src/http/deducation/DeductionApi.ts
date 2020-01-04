import Response from 'model/response/Response'
import ApiClient from 'http/ApiClient'
import Deduction from 'model/deducation/Deduction'

export default class DeductionApi {
    static query(captionLike?: string): Promise<Response<Deduction[]>> {
        let url: string = `/deduction/query?captionLike=${captionLike ? captionLike : '' }`
        return ApiClient.server().get(url).then((res) => {
            return res.data
        })
    }

    static save(body: Deduction, operator: string): Promise<Response<void>> {
        return ApiClient.server().post(`/deduction/save?operator=${operator}`, body).then((res) => {
            return res.data
        })
    }

    static delete(uuid: string): Promise<Response<void>> {
        return ApiClient.server().get(`/deduction/delete/${uuid}`).then((res) => {
            return res.data
        })
    }

}
