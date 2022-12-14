<template>
    <div>
        <van-nav-bar title="我的" />
        <div v-if="whether === 'login'">
            <div class="my_imgs">
                <div class="my_names">
                    <img src="../../assets/u18.svg" />
                    <div class="my_company">{{ getuserpo.companyname }}</div>
                </div>
                <div @click="imgClick"><img src="../../assets/u24.svg" /></div>
            </div>
            <div style="margin-top: 5px;">
                <div class="my_choices" @click="allemploClick(getuserpo)">
                    <div class="my_choice">
                        <img src="../../assets/u25.svg" />
                        <div style="padding-left: 12px;">全部员工</div>
                    </div>
                    <div>
                        <van-icon name="arrow" />
                    </div>
                </div>
                <div class="phone">
                    <div class="my_phone">
                        <img src="../../assets/u27.svg" />
                        <div class="telephone">{{ getuserpo.complaintPhone }}</div>
                    </div>
                    <div @click="telephoneClick(getuserpo.complaintPhone)">
                        <img src="../../assets/u17.svg" />
                    </div>
                </div>
                <div class="signout" @click="signoutClick">
                    <img src="../../assets/u31.svg" />
                    <div>退出账号</div>
                </div>
            </div>
        </div>
        <div v-if="whether === 'nologin'">
            <div class="systemList">
                <div><img src="../../assets/u24.png" width="50px" /></div>
                <div class="system" @click="systemList">登录使用该系统，<span style="color:#409EFF;">去登录></span></div>
            </div>
            <div class="whole" @click="wholeClick">
                <img src="../../assets/u99(1).svg" />
                <div>全部员工</div>
            </div>
            <div class="telephone">
                <div class="telephones">
                    <img src="../../assets/u98.svg" />
                    <div>客服电话：176-7579-7686</div>
                </div>
                <img src="../../assets/u17.svg" width="20px" @click="phoneClick" />
            </div>

        </div>
        <van-overlay :show="showSign" @click="showSignClick" class="showOver">
            <div class="Signin">
                <div class="SigninTiltle">提示</div>
                <div class="Signins" @click="SigninsClick">
                    <img src="../../assets/u35.png" width="35px" height="35px" />
                </div>
                <div class="noSignin">您尚未登录，登录后可使用完整功能</div>
                <div class="button">
                    <div class="buttonCancel" @click="cancelsClick">取消</div>
                    <div class="buttonSignin" @click="SigninClick">去登录</div>
                </div>
            </div>

        </van-overlay>
    </div>
</template>
<style>
body {
    height: 100%;
    background-color: #EFEFF4;
}
</style>
<script>
import { getUser } from '@/api/user'
export default {
    data() {
        return {
            getuserpo: [],
            whether: '',
            showSign: false,  //是否登录
        }
    },
    created() {
        this.getUserList();
    },
    methods: {
        getUserList() {
            getUser({}).then(res => {
                this.getuserpo = res.data.data
                if (res.data.data.isLogin) {
                    this.whether = 'login'
                } else {
                    this.whether = 'nologin'
                }
            })
        },
        telephoneClick(phone) {
            window.location.href = `tel:${phone}`;
        },
        imgClick(data) {
            this.$router.push({ path: "/workbench/basicinformation", query: { id: data.id } })
        },
        allemploClick(data) {
            this.$router.push({ path: "/workbench/allemplo", query: { id: data.id } })
        },
        signoutClick() {
            this.whether = 'nologin'
            localStorage.removeItem("token")
        },
        phoneClick() {
            window.location.href = `tel:${176 - 7579 - 7686}`;
        },
        showSignClick() {
            this.showSign = false
        },
        // 关闭按钮
        SigninsClick() {
            this.showSign = false
        },
        cancelsClick() {
            this.showSign = false
        },
        // 去登录按钮
        SigninClick() {
            this.$router.push('/login/account')
        },
        wholeClick() {
            this.showSign = true
        },
        systemList() {
            this.$router.push('/login/account')
        }
    },
}
</script>

<style lang="scss" scoped>
.button {
    display: flex;
    align-items: center;
    margin-top: 20px;

    .buttonCancel {
        width: 50%;
        display: flex;
        justify-content: center;
        font-size: 14px;
        letter-spacing: 2px;
        line-height: 35px;
        background: #F0F0F0;
        color: #FFF;
    }

    .buttonSignin {
        width: 50%;
        display: flex;
        justify-content: center;
        font-size: 14px;
        letter-spacing: 2px;
        line-height: 35px;
        background: #409EFF;
        color: #FFF;
    }
}

.noSignin {
    font-size: 14px;
    letter-spacing: 2px;
    line-height: 50px;
    display: flex;
    justify-content: center;
    width: 100%;
}

.SigninTiltle {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
}

.Signins {
    float: right;
    margin-top: -30px;
}

.Signin {
    background: #FFF;
    width: 275px;
}

.showOver {
    display: flex;
    justify-content: center;
    align-items: center;
}

.signout {
    display: flex;
    align-items: center;
    padding: 10px 10px 10px 10px;
    background-color: #FFF;
    margin-top: 2px;

    div:nth-child(2) {
        padding-left: 10px;
    }
}

.telephone {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 10px 10px 10px;
    background-color: #FFF;
    margin-top: 2px;

    .telephones {
        display: flex;

        div:nth-child(2) {
            padding-left: 10px;
        }
    }
}

.whole {
    display: flex;
    align-items: center;
    padding: 10px 10px 10px 10px;
    background-color: #FFF;
    margin-top: 4px;

    div:nth-child(2) {
        padding-left: 10px;
    }
}

.system {
    font-family: 'Arial Normal', 'Arial', sans-serif;
    font-size: 14px;
    letter-spacing: 2px;
    color: #333333;
    padding-left: 10px;
}

.systemList {
    display: flex;
    align-items: center;
    padding: 10px 15px 15px 20px;
    background: #FFF;
    margin-top: 4px;
}

.phone {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 15px 10px 15px;
    background: #FFF;

    .my_phone {
        display: flex;
        align-items: center;
    }

    .telephone {
        padding-left: 12px;
        letter-spacing: 1px;
    }
}

.my_choices {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 15px 10px 15px;
    background: #FFF;
    border-bottom: 1px solid rgba(195, 195, 195, 1);

    .my_choice {
        display: flex;
        align-items: center;
    }

    ::v-deep .van-icon {
        font-size: 20px;
        font-weight: 700;
        color: #A1A1A1;
    }
}

.my_names {
    display: flex;
    align-items: center;

    .my_company {
        padding-left: 12px;
        font-size: 16px;
    }
}

.my_imgs {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 10px 20px 15px;
    background-color: #FFF;
}
</style>