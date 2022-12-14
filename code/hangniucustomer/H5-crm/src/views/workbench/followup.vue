<template>
    <div>
        <van-nav-bar title="正在跟进" left-arrow @click-left="onClickLeft" />
        <!-- <div>
            <form action="/">
                <van-search v-model="value" show-action @search="onSearch" @cancel="onCancel">
                    <template #action>
                        <div @click="onClickButton">搜索</div>
                    </template>
                </van-search>
            </form>
        </div>
        <div class="Initials">
            <div class="dropdownbox">
                <div style="font-size: 14px;">销售：</div>
                <template>
                    <select class="select_Industry">
                        <option style="border-bottom: 0px;margin-top: 5px">小刘</option>
                        <option style="border-bottom: 0px;margin-top: 5px">小何</option>
                    </select>
                </template>
            </div>
            <div class="dropdownboxs">
                <div style="font-size: 14px;">客户等级：</div>
                <template>
                    <select class="select_Industry">
                        <option style="border-bottom: 0px;margin-top: 5px">A</option>
                        <option style="border-bottom: 0px;margin-top: 5px">B</option>
                        <option style="border-bottom: 0px;margin-top: 5px">C</option>
                    </select>
                </template>
            </div>
        </div> -->
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <div style="background-color: #fff;margin-top: 10px;" v-for="item in list">
                <van-checkbox-group v-model="result" ref="checkboxGroup">
                    <div class="Initial">
                        <div class="initialName">{{ item.level }}</div>
                        <div class="corporateName">{{ item.company_name }}</div>
                    </div>
                    <div class="group">
                        <div class="information" @click="listClick(item)">
                            <div style="display: flex;">
                                <div>联系人：</div>
                                <div style="padding-left: 70px;">{{ item.user_name }}</div>
                            </div>
                            <div style="display: flex;">
                                <div>计划采购时间</div>
                                <div style="padding-left: 45px;">{{ item.customer_purchase_time }}</div>
                            </div>
                            <div style="display: flex;">
                                <div>跟进销售：</div>
                                <div style="padding-left: 60px;">{{ item.name }}</div>
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
                        <div style="margin-right: 50px;" @click="dial(item.contact_phone)">
                            <img src="../../assets/u17.svg" />
                        </div>
                    </div>
                </van-checkbox-group>
            </div>
        </van-list>
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
import { followCustomer } from '@/api/user'
export default {
    data() {
        return {
            value: '',
            result: [],
            list: [],
            isLogin: false,
            showSign: false,  //是否登录
            finished:false,
            loading:false,
        };
    },
    created() {
    },
    methods: {
        onLoad(){
         this.page+=1
         this.followList();
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
        // 未登录默认按钮
        showSignClick() {
            this.showSign = false
        },
        dial(phone) {
            if (!this.isLogin) {
                this.showSign = true
            } else {
                window.location.href = `tel:${phone}`;
            }
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
        onClickButton() { },
        followList() {
            followCustomer({
                page: 1,
                pagesize: 10,
                uid: this.$route.query.id
                // token:
            }).then(res => {
                this.isLogin = res.data.data.isLogin
                localStorage.getItem("token", res.data.data.token)
                this.list = this.list.concat(res.data.data.list)
                this.list = res.data.data.list.map(item => {
                    return {
                        name: item.device_name,
                        ...item
                    }
                });
                if(this.pagesize=res.data.data.count){
                      this.finished=true
                }
                this.loading=false
            })
        },
        listClick(data) {
            // 判断是否登录
            if (!this.isLogin) {
                this.showSign = true
            } else {
                this.$router.push({ path: "/workbench/customers", query: { id: data.id } })
            }
        }
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
}

.group {
    display: flex;
    align-items: center;
    padding-top: 10px;
    padding-left: 10px;
    justify-content: space-between;
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