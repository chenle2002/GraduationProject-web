<template>
    <div class="login-vue" :style="bg">
        <div class="container">
            <p class="title">请修改信息</p>
            <div class="input-c">
                <Input prefix="ios-contact" v-model="user_name" placeholder="用户名" clearable @on-blur="verifyAccount"/>
                <p class="error">{{ accountError }}</p>
            </div>
            <div class="input-c">
                <Input type="password" v-model="password" prefix="md-lock" placeholder="密码" clearable @on-blur="verifyPwd"/>
                <p class="error">{{ pwdError }}</p>
            </div>
            <div class="input-c">
                <Input type="tel" v-model="phone" prefix="el-icon-phone" placeholder="手机号" clearable @on-blur="verifyPh"/>
                <p class="error">{{ phError }}</p>
            </div>
            <Button  class="submit" type="primary" @click="update">修改信息</Button>
        </div>
    </div>

</template>

<script>
import axios from 'axios'

export default {
    name: 'password',
    created() {
        this.bg.backgroundImage = 'url(' + require('../assets/imgs/bg0' + new Date().getDay() + '.jpg') + ')'
    },
    data() {
        return {
            user_name: localStorage.getItem('userName'),
            password: '',
            phone: '',
            bg: {},
            accountError: '',
            pwdError: '',
            phError: '',
        }
    },
    methods: {
        verifyAccount() {
            if (this.user_name === localStorage.getItem('userName')) {
                this.accountError = ''
            } else {
                this.accountError = '请勿修改用户名'
            }
        },
        verifyPwd() {
            if (this.password === '') {
                this.pwdError = '请输入新密码'
            } else {
                this.pwdError = ''
            }
        },
        verifyPh() {
            if (this.password === '') {
                this.pwdError = '请输入手机号码'
            } else {
                this.pwdError = ''
            }
        },
        update() {
            if (this.user_name === localStorage.getItem('userName')) {
                if (this.user_name === '' || this.password === '') {
                    this.$message.error('账号与密码均不能为空')
                } else {
                    axios({
                        method: 'GET',
                        url: 'http://106.54.17.29:8000/system/update/',
                        params: {
                            user_name: this.user_name,
                            password: this.password,
                            phone: this.phone,
                        },
                    }).then(res => {
                        if (res.data === '修改用户信息成功') {
                            this.$message.success(res.data)
                            this.$router.push({ path: this.redirect || '/' })
                        } else {
                            this.$message.error(res.data)
                        }
                    })
                }
            } else {
                this.$message.error('请勿修改用户名')
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
    margin-top: -10%;
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
