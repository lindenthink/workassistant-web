import { Component, Vue } from 'vue-property-decorator'
import User from 'model/auth/User'
import { State } from 'vuex-class'
import LoginApi from 'http/auth/LoginApi'

@Component({
    components: {}
})
export default class Main extends Vue {
    isCollapse: boolean = false
    @State('user')
    user: User

    onMenuClick() {
        this.$confirm('是否确认退出当前账户?', '退出登录', {
            confirmButtonText: '确定',
            cancelButtonText: '取消'
        }).then(() => {
            LoginApi.logout().then(() => {
                this.$router.push({ name: 'login' })
            }).catch((err: Error) => {
                this.$message.error(err.message)
            })
        })
    }

    /**
     * 侧边栏折叠
     */
    onCollapse() {
        this.isCollapse = !this.isCollapse
    }
}

