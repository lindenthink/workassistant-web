<template>
    <div class="login-view">
        <div class="login-form">
            <div class="login-left">
                <img src="~assets/image/auth/ic_login.png" alt="效果图缺失">
            </div>
            <div class="login-right">
                <header>员工管理系统</header>
                <section>
                    <div class="wrap">
                        <el-form :rules="rules" ref="ruleForm" :model="ruleForm">
                            <el-form-item prop="userid">
                                <div style="position: relative">
                                    <el-input v-model="ruleForm.userid" placeholder="请输入用户名" ref="userid" @keydown.native="onConfirm($event,'userid')" style="margin-top: 71px;"></el-input>
                                    <img src="~assets/image/auth/ic_login_user_hl.svg" style="position: absolute;left: 108px;top:84px;width: 15px">
                                </div>
                            </el-form-item>
                            <el-form-item prop="password">
                                <div style="position: relative">
                                    <el-input v-model="ruleForm.password" placeholder="请输入登录密码" ref="password" type="password" @keydown.native="onConfirm($event,'password')" style="margin-top: 10px"></el-input>
                                    <img src="~assets/image/auth/ic_login_psw_hl.svg" style="position: absolute;left: 108px;top:22px;width: 15px">
                                </div>
                            </el-form-item>
                            <el-form-item prop="captcha">
                                <div style="position: relative">
                                    <el-input v-model="ruleForm.captcha" placeholder="请输入验证码" ref="captcha" type="captcha" @keydown.native="onConfirm($event,'captcha')" style="margin-top: 10px;margin-right: 10px;width: 150px"></el-input>
                                    <img src="~assets/image/auth/ic_captcha.svg" style="position: absolute;left: 108px;top:22px;width: 15px">
                                    <a @click="refreshCaptcha()" href="#"><img :src="captchaSrc" style="position: absolute;left: 260px;top:14px; height: 32px;width: 125px"></a>
                                </div>
                            </el-form-item>
                        </el-form>
                    </div>
                </section>
                <section>
                    <el-button class="btn-login" type="primary" :disabled="!ruleForm.userid || !ruleForm.password || !ruleForm.captcha" ref="login" @click="onLogin()">登录</el-button>
                </section>
            </div>
        </div>
        <footer class="page-footer">
            <p>Copyright @ 2019-{{ new Date().getFullYear() }} LindenThink（<a href="http://47.104.243.84/" target="_blank">菩提思</a>） All Rights Reserved.</p>
        </footer>
    </div>
</template>

<script lang="ts" src="./Login.ts"></script>

<style lang="scss">
    .login-view {
        background-color: #fafafa;
        display: flex;
        align-items: center;
        height:100%;
        width: 100%;
        justify-content: center;
        .el-form-item__error {
            margin-left: 105px;
        }
        .el-input {
            width: 284px;
            height: 43px;
            margin-left: 102px;
        }
        .el-input__inner {
            padding-left: 35px;
        }
        .login-form {
            display: flex;
            width: 1138px;
            height: 711px;
            .login-left {
                float: left;
                img {
                    height: 711px;
                    width: 649px;
                }
            }
            .login-right {
                float: left;
                width: 489px;
                height: 533px;
                background-color: white;
                position: relative;
                left: -80px;
                top: 53px;
                .btn-login {
                    width: 284px;
                    height: 43px;
                    margin-left: 102px;
                    margin-top: 10px;
                }
                header {
                    width: 178px;
                    height: 32px;
                    color: #455261;
                    font-size: 21px;
                    font-family: 微软雅黑;
                    margin-top: 71px;
                    margin-left: 156px;
                }
            }
        }
        .page-footer {
            position: absolute;
            bottom: 53px;
            left: 50%;
            margin-left: -270px;
            p {
                text-align: center;
                color: #CED0DA;
                height: 18px;
            }
        }
    }
</style>
