import { Component, Vue } from 'vue-property-decorator'
import PageWrapper from 'cmp/page/PageWrapper.vue'
import ListWrapper from 'cmp/list/ListWrapper.vue'
import { State } from 'vuex-class'
import User from 'model/auth/User'
import Employee from 'model/employee/Employee'

@Component({
    name: 'EmployeeList',
    components: {
        PageWrapper,
        ListWrapper,
    }
})
export default class EmployeeList extends Vue {
    // 面包屑
    panelArray = [
        {
            name: '员工资料',
            url: ''
        }
    ]
    @State('user') user: User
    tableData: Employee[] = []
}
