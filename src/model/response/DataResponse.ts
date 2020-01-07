import BaseResponse from 'model/response/BaseResponse'

export default class DataResponse<T> extends BaseResponse {
    data: Nullable<T>
}
