import { Component, Vue } from 'vue-property-decorator'
import PageWrapper from 'cmp/page/PageWrapper.vue'
import QueryCondition from 'cmp/querycondition/QueryCondition.vue'
import ListWrapper from 'cmp/list/ListWrapper.vue'
import FormItem from 'cmp/formitem/FormItem.vue'
import { State } from 'vuex-class'
import User from 'model/auth/User'
import Employee from 'model/employee/Employee'
import EmployeeApi from 'http/employee/EmployeeApi'
import EmployeeFilter from 'model/employee/EmployeeFilter'
import ConstantMgr from 'mgr/ConstantMgr'

@Component({
    name: 'EmployeeList',
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
    },
})
export default class EmployeeList extends Vue {
    // 面包屑
    panelArray = [
        {
            name: '员工资料',
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
    tableData: Employee[] = []
    dialogTitle: string
    curEmployee: Employee = new Employee()
    dialogVisible: boolean = false
    filter: EmployeeFilter = new EmployeeFilter()

    get rules() {
        return {
            name: [{ required: true, message: '员工姓名不能为空' }],
        }
    }

    mounted() {
        this.onSearch(1)
    }

    onSearch(page?: number) {
        const loading = this.$loading(ConstantMgr.loadingOption)
        this.filter.page = !page ? this.page.currentPage - 1 : page - 1 // Page对象下标从0开始
        this.filter.pageSize = this.page.size
        EmployeeApi.query(this.filter).then((resp) => {
            if (resp.data) {
                this.tableData = resp.data
                this.page.total = resp.totalRecords!
            }
        }).finally(() => {
            loading.close()
        })
    }

    showAddDialog() {
        this.dialogTitle = '新增员工'
        this.curEmployee = new Employee()
        this.dialogVisible = true
    }

    showModifyDialog(employee: Employee) {
        this.dialogTitle = '编辑员工'
        this.curEmployee = employee
        this.dialogVisible = true
    }

    doSave() {
        (this.$refs['form'] as any).validate((valid: boolean) => {
            if (valid) {
                EmployeeApi.save(this.curEmployee, this.user.userid!).then((res) => {
                    this.$message.success('保存成功')
                    this.dialogVisible = false
                    this.onSearch(1)
                })
            } else {
                return false
            }
        })
    }

    doDelete(employee: Employee) {
        this.$confirm('删除后将无法恢复，确认删除?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            EmployeeApi.delete(employee.uuid!).then(() => {
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
