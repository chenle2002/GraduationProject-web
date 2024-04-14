<template>
    <div class="login-vue" :style="bg">
        <div class="container">
            <p class="title">WELCOME</p>
            <div class="input-c">
                <Input prefix="ios-contact" v-model="user_name" placeholder="用户名" clearable @on-blur="verifyAccount"/>
                <p class="error">{{ accountError }}</p>
            </div>
            <div class="input-c">
                <Input type="password" v-model="password" prefix="md-lock" placeholder="密码" clearable @on-blur="verifyPwd"
                       @keyup.enter.native="submit"/>
                <p class="error">{{ pwdError }}</p>
            </div>
            <Button :loading="isShowLoading" class="submit" type="primary" @click="submit">登陆</Button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'login',
    data() {
        return {
            user_name: 'chenle',
            password: '123456',
            accountError: '',
            pwdError: '',
            isShowLoading: false,
            bg: {},
        }
    },
    created() {
        this.bg.backgroundImage = 'url(' + require('../assets/imgs/bg0' + new Date().getDay() + '.jpg') + ')'
    },
    watch: {
        $route: {
            handler(route) {
                this.redirect = route.query && route.query.redirect
            },
            immediate: true,
        },
    },
    methods: {
        verifyAccount() {
            if (this.user_name === '') {
                this.accountError = '请输入账户名'
            } else {
                this.accountError = ''
            }
        },
        verifyPwd() {
            if (this.password === '') {
                this.pwdError = '请输入账户名'
            } else {
                this.pwdError = ''
            }
        },
        register() {

        },
        forgetPwd() {

        },
        submit() {
            if (this.user_name === '' || this.password === '') {
                this.$message.error('账号与密码均不能为空')
            } else {
                axios({
                    method: 'GET',
                    url: 'http://127.0.0.1:8000/system/login/',
                    params: {
                        user_name: this.user_name,
                        password: this.password,
                    },
                }).then(res => {
                    if (res.data === '登陆成功') {
                        localStorage.setItem('userImg', 'https://avatars3.githubusercontent.com/u/22117876?s=460&v=4')
                        localStorage.setItem('userName', this.user_name)
                        // 登陆成功 假设这里是后台返回的 token
                        localStorage.setItem('token', this.user_name)
                        this.$router.push({ path: this.redirect || '/' })
                    } else {
                        this.$message.error(res.data)
                    }
                })
            }
        },
    },
}
</script>

<style>
.login-vue {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
}

.login-vue .container {
    background: rgba(255, 255, 255, .5);
    width: 300px;
    text-align: center;
    border-radius: 10px;
    padding: 30px;
}

.login-vue .ivu-input {
    background-color: transparent;
    color: #fff;
    outline: #fff;
    border-color: #fff;
}

.login-vue ::-webkit-input-placeholder { /* WebKit, Blink, Edge */
    color: rgba(255, 255, 255, .8);
}

.login-vue :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: rgba(255, 255, 255, .8);
}

.login-vue ::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: rgba(255, 255, 255, .8);
}

.login-vue :-ms-input-placeholder { /* Internet Explorer 10-11 */
    color: rgba(255, 255, 255, .8);
}

.login-vue .title {
    font-size: 16px;
    margin-bottom: 20px;
}

.login-vue .input-c {
    margin: auto;
    width: 200px;
}

.login-vue .error {
    color: red;
    text-align: left;
    margin: 5px auto;
    font-size: 12px;
    padding-left: 30px;
    height: 20px;
}

.login-vue .submit {
    width: 200px;
}

.login-vue .account {
    margin-top: 30px;
}

.login-vue .account span {
    cursor: pointer;
}

.login-vue .ivu-icon {
    color: #eee;
}

.login-vue .ivu-icon-ios-close-circle {
    color: #777;
}
</style>
