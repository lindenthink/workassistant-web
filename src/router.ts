import Vue from 'vue'
import Router from 'vue-router'
import Login from 'pages/auth/Login.vue'
import Main from 'pages/main/Main.vue'
import Home from 'pages/home/Home'
import Account from 'pages/account/Account'
import Employee from 'pages/employee/Employee'
import Deducation from 'pages/deducation/Deducation'

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
                    component: Account
                },
                {
                    path: '/employee',
                    name: 'employee',
                    component: Employee
                },
                {
                    path: '/deducation',
                    name: 'deducation',
                    component: Deducation
                }
            ]
        }
    ]
})
