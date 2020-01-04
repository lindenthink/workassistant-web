import { Vue, Component } from 'vue-property-decorator'
import EnvUtil from 'util/EnvUtil'
import { Action } from 'vuex-class'
import LoginApi from 'http/auth/LoginApi'
import User from 'model/auth/User'
import AuthInfo from 'model/auth/AuthInfo'

@Component({
    components: {}
})

export default class Login extends Vue {
    @Action('user') actionUser: (user: User) => {}
    name: string = ''
    password: string = ''
    captcha: string = ''
    captchaSrc: string = `${EnvUtil.getServiceUrl()}/app/captcha`
    ruleForm: AuthInfo = {
        userid: '',
        username: '',
        password: '',
        captcha: ''
    }
    rules = {
        userid: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入登录密码', trigger: 'blur' }],
        captcha: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
    }

    created() {
        // 每次进入页面刷新验证码
        this.refreshCaptcha()
    }

    onLogin() {
        LoginApi.login(this.ruleForm).then((resp) => {
            let user: User = new User(this.ruleForm.userid, resp.data.username)
            this.actionUser(user)
            this.$router.push('home')
        }).catch((err: Error) => {
            this.$message.error(`登陆失败：${err.message}`)
        })
    }

    refreshCaptcha() {
        this.captchaSrc = `${EnvUtil.getServiceUrl()}/app/captcha?timestamp=${new Date().getTime()}`
    }

    /**
     * 回车事件
     */
    onConfirm(event: any, type: string) {
        let refs: any = this.$refs as any
        if (event.which === 13) {
            switch (type) {
                case 'userid':
                    refs.password.focus()
                    break
                case 'password':
                    refs.captcha.focus()
                    break
                case 'captcha':
                    !refs.login.disabled && refs.login.$el.click()
                    break
            }
        }
    }
}
