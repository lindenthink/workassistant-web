import { Component, Vue } from 'vue-property-decorator'
import PageWrapper from 'cmp/page/PageWrapper.vue'
import DtlWrapper from 'cmp/dtl/DtlWrapper.vue'

@Component({
    name: 'Home',
    components: {
        PageWrapper,
        DtlWrapper,
    }
})
export default class Home extends Vue {
    // 面包屑
    panelArray = [
        {
            name: '首页',
            url: ''
        }
    ]
    notes: string[] = [
        '在进行账务管理前，需要先配置好员工资料和收支条目。',
        '后续使用过程中如非必须，尽量不要删除已记账的员工。',
        '表格记录均按照最后更新时间从大到小排序。'
    ]
}
