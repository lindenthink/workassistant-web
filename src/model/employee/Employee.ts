import Entity from 'model/entity/Entity'

export default class Employee extends Entity {
    state: Nullable<number> = 1
    name: Nullable<string>
    phone: Nullable<string>
    bankCardNo: Nullable<string>
}
