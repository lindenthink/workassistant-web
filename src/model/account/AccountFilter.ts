import PageFilter from 'model/request/PageFilter'

export default class AccountFilter extends PageFilter {
    employeeUuidEq: Nullable<string>
    accountDateStart: Nullable<Date>
    accountDateEnd: Nullable<Date>
}
