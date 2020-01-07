import ApiClient from 'http/ApiClient'
import Deduction from 'model/deducation/Deduction'
import DataResponse from 'model/response/DataResponse'
import BaseResponse from 'model/response/BaseResponse'

export default class DeductionApi {
    static query(captionLike?: string): Promise<DataResponse<Deduction[]>> {
        let url: string = `/deduction/query?captionLike=${captionLike ? captionLike : '' }`
        return ApiClient.server().get(url).then((res) => {
            return res.data
        })
    }

    static save(body: Deduction, operator: string): Promise<BaseResponse> {
        return ApiClient.server().post(`/deduction/save?operator=${operator}`, body).then((res) => {
            return res.data
        })
    }

    static delete(uuid: string): Promise<BaseResponse> {
        return ApiClient.server().get(`/deduction/delete/${uuid}`).then((res) => {
            return res.data
        })
    }

}
