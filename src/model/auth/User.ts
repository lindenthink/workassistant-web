export default class User {
    userid: Nullable<string>
    username: Nullable<string>

    constructor(userid: Nullable<string>, username: Nullable<string>) {
        this.userid = userid
        this.username = username
    }
}
