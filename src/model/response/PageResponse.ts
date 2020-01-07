import BaseResponse from 'model/response/BaseResponse'

export default class PageResponse<T> extends BaseResponse {
    page: Nullable<number>
    pageSize: Nullable<number>
    totalPages: Nullable<number>
    totalRecords: Nullable<number>
    data: Nullable<T>
}
