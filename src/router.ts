import Vue from 'vue'
import Router from 'vue-router'
import Login from 'pages/auth/Login.vue'
import Main from 'pages/main/Main.vue'
import Home from 'pages/home/Home'
import EmployeeList from 'pages/employee/EmployeeList'
import AccountList from 'pages/account/AccountList'
import DeductionList from 'pages/deduction/DeductionList'

Vue.use(Router)

export default new Router({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/main',
            name: 'main',
            component: Main,
            children: [
                {
                    path: '/home',
                    name: 'home',
                    component: Home,
                    meta: {
                        keepAlive: true
                    }
                },
                {
                    path: '/account',
                    name: 'account',
                    component: AccountList
                },
                {
                    path: '/employee',
                    name: 'employee',
                    component: EmployeeList
                },
                {
                    path: '/deduction',
                    name: 'deduction',
                    component: DeductionList
                }
            ]
        }
    ]
})
