import User from 'model/auth/User'

export default class AuthInfo extends User {
    password: Nullable<string>
    captcha: Nullable<string>
}
