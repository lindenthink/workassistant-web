import { Vue, Component } from 'vue-property-decorator'

@Component({
    components: {}
})

export default class Login extends Vue {
    name: string = ''
    password: string = ''
    captcha: string = ''
    $refs: any
    ruleForm = {
        name: '',
        password: '',
        captcha: ''
    }
    rules = {
        name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入登录密码', trigger: 'blur' }],
        captcha: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
    }

    onLogin() {
        this.$router.push('projectList')
    }

    refreshCaptcha() {
        console.log('刷新验证码')
    }

    /**
     * 回车事件
     * @param event
     * @param type
     */
    onConfirm(event: any, type: string) {
        if (event.which === 13) {
            switch (type) {
                case 'name':
                    this.$refs.password.focus()
                    break
                case 'password':
                    this.$refs.captcha.focus()
                    break
                case 'captcha':
                    !this.$refs.login.disabled && this.$refs.login.$el.click()
                    break
            }
        }
    }
}
