<template>
    <div>
        <van-nav-bar title="注册" left-arrow @click-left="onClickLeft" />
        <van-cell-group>
            <van-field v-model="phone" placeholder="请输入手机号码" />
            <van-field v-model="password" center clearable placeholder="请设置一个密码" />
            <van-field v-model="repassword" center clearable placeholder="请重复输入密码" />
        </van-cell-group>
        <div class="noaccount" @click="haveacCountClick">已有账号？<span style="color: #409EFF;">去登录</span></div>
        <div class="signinDiv">
            <div class="signin" @click="signinClick()">注册</div>
        </div>
    </div>
</template>

<script>
import { register } from '@/api/user';
import { mapMutations } from 'vuex';
import { Notify } from 'vant';
export default {
    data() {
        return {
            phone: '',
            password: '',
            repassword: '',
        };
    },
    created() {
    },
    methods: {
        ...mapMutations(['SET_USERINFO']),
        // 标题跳转
        onClickLeft() {
            this.$router.go(-1)
        },
        // 已有账号？去登录的跳转
        haveacCountClick() {
            this.$router.push('/login/account')
        },
        signinClick() {
            if (this.phone == "") {
                Notify({ type: 'danger', message: `请输入手机号码！` })
            } else if (this.password == "") {
                Notify({ type: 'danger', message: `请输入密码！` })
            } else if (this.repassword == "") {
                Notify({ type: 'danger', message: `请输入重复密码！` })
            } else {
                var phoneReg = /(^1\d{10}$)|(^[0-9]\d{7}$)/;
                if (!phoneReg.test(this.phone)) {
                    Notify({ type: 'danger', message: `请输入正确的手机号` });
                } else {
                    register({
                        phone: this.phone,
                        password: this.password,
                        repassword: this.repassword
                    }).then(res => {

                        if (this.password != this.repassword) {
                            Notify({ type: 'danger', message: `两次输入的密码不同,请输入重复密码` });
                        } else if (res.data.code == 200) {
                            this.$router.push('/login/perfect')
                            this.SET_USERINFO(res.data.data)
                            localStorage.setItem("userInfo", JSON.stringify(res.data.data))
                            localStorage.setItem("token", res.data.data.token)
                        }
                        if (res.data.code == 500) {
                            Notify({ type: 'danger', message: `该用户已注册,请输入新用户或用密码和验证码直接登录` });
                        }
                    })
                }
            }

        }
    }
};
</script>

<style lang="scss" scoped>
.noaccount {
    float: right;
    color: #333333;
    font-size: 14px;
    padding-right: 15px;
    letter-spacing: 2px;
    padding-top: 10px;
}

.signinDiv {
    display: flex;
    justify-content: center;
    margin-top: 45px;
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

::v-deep .van-icon {
    font-size: 20px;
    font-weight: bold;
    color: black;
}
</style>