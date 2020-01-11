import { Component, Vue } from 'vue-property-decorator'
import PageWrapper from 'cmp/page/PageWrapper.vue'
import QueryCondition from 'cmp/querycondition/QueryCondition.vue'
import ListWrapper from 'cmp/list/ListWrapper.vue'
import FormItem from 'cmp/formitem/FormItem.vue'
import { State } from 'vuex-class'
import User from 'model/auth/User'
import ConstantMgr from 'mgr/ConstantMgr'
import AccountFilter from 'model/account/AccountFilter'
import Account from 'model/account/Account'
import AccountApi from 'http/account/AccountApi'
import Employee from 'model/employee/Employee'
import Deduction from 'model/deducation/Deduction'
import EmployeeApi from 'http/employee/EmployeeApi'
import DeductionApi from 'http/deducation/DeductionApi'
import DateUtil from 'util/DateUtil'

@Component({
    name: 'AccountList',
    components: {
        PageWrapper,
        QueryCondition,
        ListWrapper,
        FormItem,
    },
    filters: {
        $state: (value: number) => {
            if (value === 1) {
                return '在职'
            } else if (value === 0) {
                return '离职'
            }
            return value
        },
        $type: (value: number) => {
            if (value === -1) {
                return '支出'
            } else if (value === 1) {
                return '收入'
            }
            return value
        },
    },
})
export default class AccountList extends Vue {
    // 面包屑
    panelArray = [
        {
            name: '账务资料',
            url: ''
        }
    ]
    // 分页
    page = {
        currentPage: 1,
        total: 0,
        size: 10
    }
    @State('user') user: User
    tableData: Account[] = []
    dialogTitle: string
    curAccount: Account = new Account()
    dialogVisible: boolean = false
    filter: AccountFilter = new AccountFilter()
    employees: Employee[] = []
    deductions: Deduction[] = []
    accountDateRange: Date[] = []

    pickerOptions = {
        shortcuts: [{
            text: '最近一周',
            onClick(picker: any) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
                picker.$emit('pick', [start, end])
            }
        }, {
            text: '最近一个月',
            onClick(picker: any) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                picker.$emit('pick', [start, end])
            }
        }, {
            text: '最近三个月',
            onClick(picker: any) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
                picker.$emit('pick', [start, end])
            }
        }, {
            text: '最近半年',
            onClick(picker: any) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 180)
                picker.$emit('pick', [start, end])
            }
        }, {
            text: '去年',
            onClick(picker: any) {
                const now = new Date()
                const start = new Date(now.getFullYear() - 1, 0, 1)
                const end = new Date(now.getFullYear() - 1, 11, 31)
                picker.$emit('pick', [start, end])
            }
        }, {
            text: '当月',
            onClick(picker: any) {
                const end = new Date()
                const start = new Date(end.getFullYear(), end.getMonth(), 1)
                picker.$emit('pick', [start, end])
            }
        }, {
            text: '今年',
            onClick(picker: any) {
                const end = new Date()
                const start = new Date(end.getFullYear(), 0, 1)
                picker.$emit('pick', [start, end])
            }
        }
        ]
    }

    get rules() {
        return {
            employeeId: [{ required: true, message: '员工不能为空' }],
            deductionItemId: [{ required: true, message: '扣除条目不能为空' }],
            accountDate: [{ required: true, message: '账期不能为空' }],
            amount: [{
                required: true,
                trigger: 'change',
                validator: (rule: string, value: any, callback: (e?: any) => {}) => {
                    let numberReg = /^([1-9](\d){0,6}|0)(\.(\d){0,2})?$/
                    if (!value || (value && !numberReg.test(value))) {
                        return callback(new Error('请输入合法金额'))
                    }
                    callback()
                },
            }],
        }
    }

    beforeMount() {
        let end = new Date()
        let start = new Date(end.getFullYear(), end.getMonth(), 1)
        this.accountDateRange = [start, end]

        EmployeeApi.queryAll().then((res) => {
            this.employees = res.data!
        })
        DeductionApi.query().then((res) => {
            this.deductions = res.data!
        })
    }

    mounted() {
        this.onSearch()
    }

    onSearch(page?: number) {
        const loading = this.$loading(ConstantMgr.loadingOption)
        this.filter.page = !page ? this.page.currentPage - 1 : page - 1 // Page对象下标从0开始
        this.filter.pageSize = this.page.size
        if (this.accountDateRange.length === 2) {
            [this.filter.accountDateStart, this.filter.accountDateEnd] = [...this.accountDateRange]
        }
        AccountApi.query(this.filter).then((resp) => {
            if (resp.data) {
                this.tableData = resp.data
                this.page.total = resp.totalRecords!
            }
        }).finally(() => {
            loading.close()
        })
    }

    onExport() {
        console.log(this.filter)
        let filterEmpName = '全部员工'
        if (this.filter.employeeUuidEq) {
            this.employees.forEach((emp) => {
                if (emp.uuid === this.filter.employeeUuidEq) {
                    filterEmpName = emp.name!
                }
            })
        }
        let fmt = 'yyyy-MM-dd'
        let confirmMsg = `确认导出【${filterEmpName}】${DateUtil.format(this.filter.accountDateStart!, fmt)}到${DateUtil.format(this.filter.accountDateEnd!, fmt)}期间的所有支出记录?`
        this.$confirm(confirmMsg, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            const loading = this.$loading(ConstantMgr.loadingOption)
            AccountApi.export(this.filter).then((res) => {
                window.open(res.data!)
            }).finally(() => {
                loading.close()
            })
        }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消导出'
            })
        })
    }

    getSummaries(param: any) {
        const { columns, data } = param
        // @ts-ignore
        const sums = []
        sums[0] = '合计'
        sums[4] = 0
        this.tableData.map((account) => {
            // @ts-ignore
            sums[4] += account.amount
        })
        return sums
    }

    showAddDialog() {
        this.dialogTitle = '新增账务'
        this.curAccount = new Account()
        this.dialogVisible = true
    }

    showModifyDialog(account: Account) {
        this.dialogTitle = '编辑账务'
        this.curAccount = account
        this.dialogVisible = true
    }

    doSave() {
        (this.$refs['form'] as any).validate((valid: boolean) => {
            if (valid) {
                AccountApi.save(this.curAccount, this.user.userid!).then((res) => {
                    this.$message.success('保存成功')
                    this.dialogVisible = false
                    this.onSearch(1)
                })
            } else {
                return false
            }
        })
    }

    doDelete(account: Account) {
        this.$confirm('删除后将无法恢复，确认删除?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            AccountApi.delete(account.uuid!).then(() => {
                this.$message.success('删除成功')
                this.onSearch()
            })
        }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消删除'
            })
        })

    }

    onHandleSizeChange(val: number) {
        this.page.size = val
        this.onSearch()
    }

    onHandleCurrentChange(val: number) {
        this.page.currentPage = val
        this.onSearch()
    }
}
