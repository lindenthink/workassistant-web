import Entity from 'model/entity/Entity'

export default class Account extends Entity {
    employeeId: Nullable<string>
    deductionItemId: Nullable<string>
    amount: Nullable<number>
    remarks: Nullable<string>
    accountDate: Nullable<Date> = new Date()
    deductionItemCaption: Nullable<string>
    employeeName: Nullable<string>
}
