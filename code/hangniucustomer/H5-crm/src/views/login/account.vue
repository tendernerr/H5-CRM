<template>
    <div>
        <!-- 验证码 -->
        <div v-if="switchs">
            <van-nav-bar title="验证码登录"  left-arrow @click-left="onClickLeft"/>
            <van-cell-group>
                <van-field v-model="phone" placeholder="请输入手机号码" />
                <van-field v-model="code" center clearable placeholder="验证码">
                    <template #button>
                        <van-button size="small" type="primary" @click="verificationCode">{{ confirmContent }}
                        </van-button>
                    </template>
                </van-field>
            </van-cell-group>
            <div class="switchPo">
                <div class="switch" @click="passwordClick">密码登录</div>
                <div class="noaccount" @click="registerClicK">没有账号？<span style="color: #409EFF;">去注册</span></div>
            </div>
            <div class="signinDiv">
                <div class="signin" @click="signinClick()">登录</div>
            </div>
        </div>
        <!-- 密码 -->
        <div v-if="!switchs">
            <van-nav-bar title="密码登录" left-arrow @click-left="onClickLeft" />
            <van-cell-group>
                <van-field v-model="phone" placeholder="请输入手机号码" />
                <van-field v-model="password" type= center clearable placeholder="请输入密码" />
            </van-cell-group>
            <div class="switchPo">
                <div class="switch" @click="codeClick">验证码登录</div>
                <div class="noaccount" @click="registerClicK">没有账号？<span style="color: #409EFF;">去注册</span></div>
            </div>
            <div class="signinDiv">
                <div class="signin" @click="signinClicks()">登录</div>
            </div>
        </div>

    </div>
</template>

<script>
import { sendAuthSms, login,passwordLogin } from '@/api/user';
import { mapMutations } from 'vuex';
import { Notify } from 'vant';
export default {
    data() {
        return {
            confirmContent: "获取验证码", //倒计时之后按钮提示文字
            totalTime: 60, //倒计时30s
            phone: "",
            code: "", // 验证码
            password: '',
            switchs: false
        };
    },
    created() {
    },
    methods: {
        onClickLeft(){
            // this.$router.go(-1)
        },
        codeClick() {
            this.switchs = true
        },
        passwordClick() {
            this.switchs = false
        },
        registerClicK() {
            this.$router.push('/login/register')
        },
        ...mapMutations(['SET_USERINFO']),
        //获取验证码
        verificationCode() {
            if (this.phone != "") {
                sendAuthSms({
                    phone: this.phone
                }).then(res => {
                    if (res.data.code == 200) {
                        // 发送成功进入倒计时 
                        Notify({ type: 'success', message: `验证码发送成功，请到手机上确认` })
                        this.confirmContent = this.totalTime + "s";
                        let clock = window.setInterval(() => {
                            this.totalTime--;
                            this.confirmContent = this.totalTime + "s";
                            if (this.totalTime <= 0) {
                                this.confirmContent = "重新发送验证码";
                                this.totalTime = 60;
                                clearInterval(clock);
                            }
                        }, 1000);
                    } else {
                        Notify({ type: 'danger', message: `验证码发送失败,联系管理员` })
                    }
                })

            } else {
                Notify({ type: 'danger', message: `请先输入手机号` })
            }
        },
        //验证码登录
        signinClick() {
            if (this.phone == "") {
                Notify({ type: 'danger', message: `手机号不能为空！` })
            } else if (this.code == "") {
                Notify({ type: 'danger', message: `验证码不能为空！` })
            } else {
                login({
                    phone: this.phone,
                    code: this.code
                }).then(res => {
                    if (res.data.code == 200) {
                        this.SET_USERINFO(res.data.data)
                        localStorage.setItem("userInfo", JSON.stringify(res.data.data))
                        localStorage.setItem("token", res.data.data.token)
                        if (!res.data.data.isComplete) {
                            this.$router.push('/login/perfect')
                        } else {
                            this.$router.push('/workbench/quick')
                        }
                        let token = res.data.token;
                    }
                })
            }

        },
        //密码登录
        signinClicks() {
            if (this.phone == "") {
                Notify({ type: 'danger', message: `手机号码不能为空！` })
            } else if (this.password == "") {
                Notify({ type: 'danger', message: `密码不能为空！` })
            } else {
                passwordLogin({
                    phone: this.phone,
                    password: this.password
                }).then(res => {
                    if (res.data.code == 200) {
                        this.SET_USERINFO(res.data.data)
                        localStorage.setItem("userInfo", JSON.stringify(res.data.data))
                        localStorage.setItem("token", res.data.data.token)
                        this.$router.push('/workbench/quick')
                        let token = res.data.token;
                    }
                    if(res.data.code == 500){
                        Notify({ type: 'danger', message: `账号或密码错误,请重新输入` })
                    }
                })
            }

        }
    }
};
</script>

<style lang="scss" scoped>
::v-deep .van-icon {
    font-size: 20px;
    font-weight: bold;
    color: black;
}
.switchPo {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.noaccount {
    color: #333333;
    font-size: 14px;
    padding-right: 15px;
    letter-spacing: 2px;
    padding-top: 10px;
}

.switch {
    letter-spacing: 2px;
    color: #409EFF;
    font-size: 14px;
    padding: 15px 0px 0px 15px;
}

::v-deep .van-button--small {
    height: 32px;
    padding: 0 8px;
    font-size: 12px;
    letter-spacing: 2px;
    color: #409EFF;
    font-size: 12px;
    border: 1px solid #FFF;
    background: #FFF;
}

.get-mobile {
    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 0, 0, .6);
    display: flex;
    justify-content: center;
    align-items: center;

    .main {
        width: 280px;
        height: 178px;
        background: #FFFFFF;
        border-radius: 5px;

        .input {
            border: 1px solid #EBEBEF;
            border-radius: 5px;
            height: 40px;
            padding-left: 10px;
        }

        .el-button {
            margin-left: 10px;
            border-radius: 5px;
            background: #5F93FD;
            color: #fff;
            width: 140px;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .btn {
            height: 45px;
            color: #5F93FD;
            display: flex;
            justify-content: center;
            align-items: center;
            border-top: 1px solid #EBEBEF;
        }
    }
}



.verificationCode {
    display: flex;
    align-items: center;
    justify-content: space-between;

    span {
        font-size: 12px;
        letter-spacing: 2px;
        color: #409EFF;
        width: 30%;
    }
}

.signinDiv {
    display: flex;
    justify-content: center;
    margin-top: 35px;
}

.signin {
    border: none;
    color: rgb(255, 255, 255);
    width: 323px;
    background-image: inherit;
    background-position: inherit;
    background-size: inherit;
    background-repeat: inherit;
    background-attachment: inherit;
    background-origin: inherit;
    background-clip: inherit;
    background-color: rgb(71, 183, 98);
    border-radius: 3px;
    box-shadow: none;
    font-size: 16px;
    letter-spacing: 3px;
    text-align: center;
    line-height: 38px;
}
</style>