<template>
    <el-container class="main">
        <div class="nav-wrapper" v-show="!isCollapse">
            <div class="nav-title">员工管理系统</div>
            <el-menu :uniqueOpened="true" :default-active="$route.path" class="menu-width" router text-color="#ffffff" active-text-color="#ffffff">
                <el-menu-item index="/home">
                    <i class="el-icon-s-home"></i><span slot="title">首页</span>
                </el-menu-item>
                <el-submenu>
                    <template slot="title"><i class="el-icon-s-finance"></i>收支</template>
                    <el-menu-item-group class="nav-li-group">
                        <el-menu-item index="/account" key="2-1"><i class="el-icon-date"></i>账务</el-menu-item>
                        <el-menu-item index="/deduction" key="2-2"><i class="el-icon-s-order"></i>条目</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-menu-item index="/employee">
                    <i class="el-icon-s-custom"></i><span slot="title">员工</span>
                </el-menu-item>
                <el-menu-item index="/settings" disabled>
                    <i class="el-icon-s-tools"></i><span slot="title">配置</span>
                </el-menu-item>
            </el-menu>
        </div>
        <el-container>
            <el-header class="navbar">
                <i class="collapse-btn iconfont" :class="{'icon-ic_menufold':isCollapse,'icon-ic_menuunfold':!isCollapse}" @click="onCollapse"/>
                <el-dropdown class="menu" trigger="click" @command="onMenuClick">
                    <div class="user-name">{{user.username}}</div>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>登出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-header>
            <el-main class="replace-view">
                <keep-alive>
                    <router-view v-if="$route.meta.keepAlive"/>
                </keep-alive>
                <router-view v-if="!$route.meta.keepAlive"/>
            </el-main>
        </el-container>
    </el-container>
</template>
<script lang="ts" src="./Main.ts"></script>

<style lang="scss">
    .main {
        height: 100%;
        .nav-wrapper{
            width: 200px;
            background-color: #1E2337;
            overflow: auto
        }
        /*侧边栏*/
        .el-submenu .el-menu-item{
            color: white;
        }
        .el-menu-item:hover, .el-menu-item:focus{
            background-color: #354052;
        }
        .el-submenu__title:hover{
            background-color: #354052;
        }
        .el-submenu__title{
            color: white;
        }
        .el-menu {
            border: none;
            background-color: inherit;
            color: white;
            .nav-li-name{
                color: white;
            }
            .nav-li-group{
                background-color: rgb(30, 35, 55);
                color: white
            }
        }
        .nav-title{
            height: 56px;
            text-align: center;
            line-height: 56px;
            color: white;
            background-color: #20A0FF;
        }
        /* 头部导航*/
        .navbar {
            background-color: #FFF;
            border-bottom: 1px solid rgba(232, 232, 232, 1);
            line-height: 60px;
            height: 60px;
            display: flex;
            overflow: hidden;
            justify-content: space-between;
            align-items: center;
            .collapse-btn {
                cursor: pointer;
            }
            .user-name {
                width: 100px;
                background: url(~assets/image/auth/ic_user_female.svg) #fff center left no-repeat;
                background-size: 32px;
                padding-left: 47px;
                cursor: pointer;
            }
        }
        .replace-view{
            padding: 0;
            display: flex;
        }
    }
</style>
