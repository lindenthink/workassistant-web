import ApiClient from 'http/ApiClient'
import Employee from 'model/employee/Employee'
import PageResponse from 'model/response/PageResponse'
import BaseResponse from 'model/response/BaseResponse'
import EmployeeFilter from 'model/employee/EmployeeFilter'
import DataResponse from 'model/response/DataResponse'

export default class EmployeeApi {
    static query(filter: EmployeeFilter): Promise<PageResponse<Employee[]>> {
        let url: string = '/employee/queryByPage'
        return ApiClient.server().post(url, filter).then((res) => {
            return res.data
        })
    }

    static queryAll(): Promise<DataResponse<Employee[]>> {
        let url: string = `/employee/queryAll`
        return ApiClient.server().get(url).then((res) => {
            return res.data
        })
    }

    static save(body: Employee, operator: string): Promise<BaseResponse> {
        return ApiClient.server().post(`/employee/save?operator=${operator}`, body).then((res) => {
            return res.data
        })
    }

    static delete(uuid: string): Promise<BaseResponse> {
        return ApiClient.server().get(`/employee/delete/${uuid}`).then((res) => {
            return res.data
        })
    }
}
