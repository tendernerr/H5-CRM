<template>
    <div>
        <van-nav-bar title="今日跟进" left-arrow @click-left="onClickLeft" />
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <div style="background-color: #fff;margin-top: 5px;" v-for="item in lists" @click="listClick(item)">
                <van-checkbox-group v-model="result" ref="checkboxGroup">
                    <div class="Initial">
                        <div class="corporateName">{{ item.company_name }}</div>
                        <div @click="dial(item.contact_phone)">
                            <img src="../assets/u17.svg" style="padding-right: 15px;" />
                        </div>
                    </div>
                    <div class="group">
                        <div class="information">
                            <div style="display: flex;">
                                <div>客户标签</div>
                                <div style="padding-left: 70px;">{{ item.level }}</div>
                            </div>
                            <div style="display: flex;">
                                <div>联系人：</div>
                                <div style="padding-left: 70px;">{{ item.name }}</div>
                            </div>
                            <div style="display: flex;">
                                <div>计划采购时间</div>
                                <div style="padding-left: 45px;">{{ item.customer_purchase_time }}</div>
                            </div>
                            <div style="display: flex;">
                                <div>下次跟进时间</div>
                                <div style="padding-left: 45px;">{{ item.lasttime }}</div>
                            </div>
                            <div style="display: flex;">
                                <div>最近跟进内容</div>
                                <div style="padding-left: 45px;">{{ item.content }}</div>
                            </div>
                        </div>

                    </div>
                </van-checkbox-group>
            </div>
        </van-list>

        <div style="width: 100%; height: 2px;"></div>
        <van-overlay :show="showSign" @click="showSignClick" class="showOver">
            <div class="Signin">
                <div class="SigninTiltle">提示</div>
                <div class="Signins" @click="SigninsClick">
                    <img src="../assets/u35.png" width="35px" height="35px" />
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
export default {
    props: {
        gettodayFollowup: {
            type: Object,
            default: () => {
                data_statistics: { }
            }
        }
    },
    data() {
        return {
            result: [],
            lists: [],
            isLogin: false,
            showSign: false,
            loading:false,
            finished:false,
            count: 0,
            page: 0,
            pagesize: 10,
        };
    },
    created() {
    },
    watch: {
        gettodayFollowup(newValue, oldValue) {
            this.list = this.gettodayFollowup;  //赋值
            this.lists = this.list.list
            this.isLogin = this.list.isLogin
            if (this.pagesize > this.lists.length) {
                    this.finished = true;
                }
                this.loading = false // 加载状态结束
        }
    },
    methods: {
        onLoad(){
           this.page +=1
        },
        listClick(data) {
            if (!this.isLogin) {
                this.showSign = true
            } else {
                this.$router.push({ path: "/workbench/customers", query: { id: data.id } })
            }
        },
        // 未登录默认按钮
        showSignClick() {
            this.showSign = false
        },
        // 去登录按钮
        SigninClick() {
            this.$router.push('/login/account')
        },
        // 取消按钮
        cancelsClick() {
            this.showSign = false
        },
        // 关闭按钮
        SigninsClick() {
            this.showSign = false
        },
        dial(phone) {
            window.location.href = `tel:${phone}`;
        },
        onSearch(val) {
            Toast(val);
        },
        onCancel() {
            Toast('搜索');
        },
        onClickLeft() {
            this.$router.go(-1)
        },

    }
};
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
        /* background: #F0F0F0; */
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

.Initials {
    display: flex;
    align-items: center;
    margin-top: 10px;
}

.van-search__content {
    background-color: #fff;
}

.van-search {
    background-color: #EFEFF4;
    padding: 10px 10px 10px 10px;
}

.dropdownboxs {
    display: flex;
    align-items: center;
    background: #ffff;
    padding: 5px 0px 5px 0px;
    width: 50%;
    justify-content: space-around;
}

.dropdownbox {
    display: flex;
    align-items: center;
    background: #ffff;
    padding: 5px 0px 5px 0px;
    width: 50%;
    border-right: 1px solid #E3E3E3;
    justify-content: space-around;
}

.select_Industry {
    border: 1px solid #FFF;
    width: 50%;
}

.Initial {
    display: flex;
    align-items: center;
    padding-top: 10px;
    justify-content: space-between;
}

.group {
    display: flex;
    align-items: center;
    padding-top: 10px;
    padding-left: 10px;
}

.initialName {
    padding-left: 15px;
    font-size: 20px;
}

.corporateName {
    font-family: 'Arial Normal', 'Arial', sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 17px;
    letter-spacing: 1px;
    padding-left: 12px;
}

.information {
    font-size: 12px;
    letter-spacing: 1px;
    color: #8A8A8A;
    line-height: 25px;
}

::v-deep .van-nav-bar__arrow {
    font-size: 20px;
    font-weight: bold;
    color: black;
}
</style>