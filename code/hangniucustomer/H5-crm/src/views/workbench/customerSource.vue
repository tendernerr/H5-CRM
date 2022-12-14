<template>
    <div>
        <van-nav-bar title="客户资源" left-text="返回" left-arrow @click-left="onClickLeft">
            <template #right>
                <van-icon name="ellipsis" />
            </template>
        </van-nav-bar>
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <div class="resourcesaffs">
                <div>
                    <div class="resourcesaff" v-for="item in getBlindseaout" @click="seaoutClick">
                        <div class="company">{{ item.company }}</div>
                        <div>
                            <div class="resourcess">
                                <div>联系人</div>
                                <div>{{ item.name }}</div>
                            </div>
                            <div class="resources">
                                <div>联系电话</div>
                                <div>{{ item.phone }}</div>
                            </div>
                            <div class="resources">
                                <div>主营产品</div>
                                <div>{{ item.level_label }}</div>
                            </div>
                            <div class="resources">
                                <div>客户来源</div>
                                <div>{{ item.source }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </van-list>
        <div style="width: 100%; height: 45px;"></div>
        <!-- 底部按钮 -->
        <div style="display:flex; position: fixed; bottom: 0px;  width: 100%;" @click="allocateSalesClick">
            <div class="introduce_loves">
                <div style="padding-left: 5px;">获取客户</div>
            </div>
        </div>
        <van-popup v-model="show" closeable position="bottom" :style="{ height: '25%' }">
            <div class="nothing">您暂无法获取</div>
            <div style="padding: 10px 10px 10px 15px;">100条优质客户资源任你挑</div>
            <div
                style="display:flex;border-top: 1px solid rgba(193, 193, 193, 1); position: fixed; bottom: 0px;  width: 100%;">
                <div class="Price">
                    <div class="Prices">￥<span>111</span></div>
                </div>
                <div class="obtain">
                    <div style="padding-left: 5px;" @click="addClick">立即获取</div>
                </div>
            </div>
        </van-popup>
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
        <!-- <van-overlay :show="showcontact" @click="showcontactClick" class="showOverss">
            <div>
                <div>请加客服微信，咨询最优惠价格</div>
                <div class="imgs">
                 <img src="../../assets/499.png" width="100px"/>
                </div>
            </div>
            <div class="button">
                    <div class="buttonCancel" @click="cancelsClick">取消</div>
                    <div class="buttonSignin" @click="SigninClick">去登录</div>
                </div>
        </van-overlay> -->
        <van-popup v-model="showcontact" closeable position="bottom" :style="{ height: '45%' }">
            <div class="nothing">加客服微信，咨询最优惠价格哟~</div>
            <div class="imgs">
                <img src="../../assets/499.png" width="200px" />
            </div>
        </van-popup>
    </div>
</template>
<style>
body {
    height: 100%;
    background-color: #EFEFF4;
}
</style>
<script>
import { getBlindseaoutCustomerList, payr } from '@/api/user'
export default {
    data() {
        return {
            show: false,
            getBlindseaout: [],
            showpayment: false,
            showSign: false,
            isLogin: false,
            showcontact: false,  //联系弹窗
            count: 0,
            page: 0,
            pagesize: 10,
            loading: false,
            finished: false,
        }
    },
    created() {
        // this.getBlindseaoutCustomer();
    },
    methods: {
        onLoad() {
            // console.log(66)
            // 异步更新数据
            // if(!this.isLoading){
            this.page += 1
            // }
            // console.log(this.page, "this.page")
            this.getBlindseaoutCustomer()
        },
        //联系弹窗
        showcontactClick() {
            this.showcontact = false
        },
        // 弹窗false
        showSignClick() {
            this.showSign = false
        },
        // 关闭按钮
        SigninsClick() {
            this.showSign = false
        },
        // 取消按钮
        cancelsClick() {
            this.showSign = false
        },
        // 去登录按钮
        SigninClick() {
            this.$router.push('/login/account')
        },
        seaoutClick() {
            // 判断是否登录
            if (!this.isLogin) {
                this.showSign = true
            } else {
            }
        },
        // 继续获取按钮
        cancelsClick() {

        },
        // 关闭弹窗
        paymentClick() {
            // this.showpayment=true
        },
        // 支付按钮
        addClick() {
            this.showcontact = true
            // wx.requestPayment({
            //     timeStamp: pay_conf.time,
            //     nonceStr: pay_conf.nonce_str,
            //     package: pay_conf.package,
            //     signType: pay_conf.sign_type,
            //     paySign: pay_conf.pay_sign,
            //     success(res) {

            //     },
            //     fail(res) { }
            // })

        },
        // 导航栏按钮
        onClickLeft() {
            this.$router.go(-1)
        },
        // 底部按钮
        allocateSalesClick() {
            if (!this.isLogin) {
                this.showSign = true
            } else {
                this.show = true
            }
        },
        // 列表数据方法
        getBlindseaoutCustomer() {
            getBlindseaoutCustomerList({
                page: this.page,
                pagesize: this.pagesize,
            }).then(res => {
                this.getBlindseaout=this.getBlindseaout.concat(res.data.data.list)
                this.isLogin = res.data.data.isLogin
                if (this.pagesize > res.data.data.count) {
                    this.finished = true;
                }
                this.loading = false // 加载状态结束
            }).catch(err => {
                console.log(err)
                // console.log(res);

            })

        }
    },
}
</script>

<style lang="scss" scoped>
.showOvers {
    display: flex;
    justify-content: center;
}

.Signinw {
    background: #FFF;
    width: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.imgs {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}

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



.Prices {
    color: #333333;
    font-family: 'Arial Negreta', 'Arial Normal', 'Arial', sans-serif;
    font-weight: 700;
    font-style: normal;
    letter-spacing: 2px;
}

.Price {
    color: #FFF;
    display: flex;
    width: 35%;
    height: 38px;
    box-shadow: none;
    line-height: 38px;
    text-align: center;
    align-items: center;
    justify-content: center;
}

.obtain {
    color: #FFF;
    display: flex;
    width: 65%;
    background-color: rgba(64, 158, 255, 1);
    height: 38px;
    box-shadow: none;
    line-height: 38px;
    text-align: center;
    align-items: center;
    justify-content: center;
}

.nothing {
    font-family: 'Arial Negreta', 'Arial Normal', 'Arial', sans-serif;
    font-weight: 700;
    font-style: normal;
    letter-spacing: 3px;
    color: #333333;
    padding: 40px 10px 10px 15px;
}

.resourcesaffs {
    overflow: hidden;

}

.resourcesaff {
    padding: 12px 10px 10px 15px;
    background: #FFF;
    margin-top: 4px;
}

.introduce_loves {
    color: #FFF;
    display: flex;
    width: 100%;
    background-color: rgba(22, 155, 213, 1);
    height: 40px;
    box-shadow: none;
    line-height: 40px;
    text-align: center;
    font-size: 16px;
    align-items: center;
    justify-content: center;
}

.resourcess {
    display: flex;
    align-items: center;
    font-size: 12px;
    letter-spacing: 1px;
    line-height: 20px;
    margin-top: 5px;

    div:nth-child(1) {
        font-size: 12px;
        letter-spacing: 1px;
        color: #8A8A8A;
    }

    div:nth-child(2) {
        font-size: 12px;
        letter-spacing: 1px;
        color: #535353;
        padding-left: 62px;
    }
}

.company {
    font-size: 12px;
    letter-spacing: 1px;
    color: #535353;
}

.resources {
    display: flex;
    align-items: center;
    font-size: 12px;
    letter-spacing: 1px;
    line-height: 20px;
    margin-top: 5px;

    div:nth-child(1) {
        font-size: 12px;
        letter-spacing: 1px;
        color: #8A8A8A;
    }

    div:nth-child(2) {
        font-size: 12px;
        letter-spacing: 1px;
        color: #535353;
        padding-left: 50px;
    }
}

::v-deep .van-nav-bar__text {
    font-size: 16px;
    color: #353535;
}

::v-deep .van-icon {
    font-size: 20px;
    font-weight: bold;
    color: black;
}
</style>