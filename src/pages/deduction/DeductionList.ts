import { Component, Vue } from 'vue-property-decorator'
import PageWrapper from 'cmp/page/PageWrapper.vue'
import ListWrapper from 'cmp/list/ListWrapper.vue'
import { State } from 'vuex-class'
import User from 'model/auth/User'
import Deduction from 'model/deducation/Deduction'
import DeductionApi from 'http/deducation/DeductionApi'
import ConstantMgr from 'mgr/ConstantMgr'

@Component({
    name: 'DeductionList',
    components: {
        PageWrapper,
        ListWrapper,
    },
    filters: {
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
export default class DeductionList extends Vue {
    // 面包屑
    panelArray = [
        {
            name: '收支条目',
            url: ''
        }
    ]
    @State('user') user: User
    dialogTitle: string
    tableData: Deduction[] = []
    curDeduction: Deduction = new Deduction()
    dialogVisible: boolean = false

    get rules() {
        return {
            caption: [{ required: true, message: '条目名称不能为空' }],
        }
    }

    mounted() {
        this.query()
    }

    query() {
        const loading = this.$loading(ConstantMgr.loadingOption)
        DeductionApi.query().then((res) => {
            this.tableData = res.data!
        }).catch((err) => {
            this.$message.error(err.message)
        }).finally(() => {
            loading.close()
        })
    }

    showAddDialog() {
        this.dialogTitle = '新增条目'
        this.curDeduction = new Deduction()
        this.dialogVisible = true
    }

    showModifyDialog(deduction: Deduction) {
        this.dialogTitle = '编辑条目'
        this.curDeduction = deduction
        this.dialogVisible = true
    }

    doDelete(deduction: Deduction) {
        this.$confirm('删除后将无法恢复，确认删除?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            DeductionApi.delete(deduction.uuid!).then(() => {
                this.$message.success('删除成功')
                this.query()
            }).catch((err) => {
                this.$message.error(err.message)
            })
        }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消删除'
            })
        })

    }

    doSave() {
        (this.$refs['form'] as any).validate((valid: boolean) => {
            if (valid) {
                DeductionApi.save(this.curDeduction, this.user.userid!).then((res) => {
                    this.$message.success('保存成功')
                    this.dialogVisible = false
                    this.query()
                }).catch((err) => {
                    this.$message.error(err.message)
                })
            } else {
                return false
            }
        })
    }

}
