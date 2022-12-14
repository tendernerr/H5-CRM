<template>
    <div>
        <van-nav-bar title="本月成交" left-arrow @click-left="onClickLeft" />
        <!-- <div>
            <form action="/">
                <van-search v-model="value" show-action @search="onSearch" @cancel="onCancel">
                <template #action>
                        <div @click="onClickButton">搜索</div>
                    </template>
                </van-search>
            </form>
        </div> -->
        <!-- <div class="Initials">
            <div class="dropdownbox">
                <div style="font-size: 14px;">负责人</div>
                <template>
                    <select class="select_Industry">
                        <option style="border-bottom: 0px;margin-top: 5px">小刘</option>
                        <option style="border-bottom: 0px;margin-top: 5px">小何</option>
                    </select>
                </template>
            </div>
            <div class="dropdownboxs">
                <div style="font-size: 14px;">成交时间</div>
                <template>
                    <select class="select_Industry">
                        <option style="border-bottom: 0px;margin-top: 5px">A</option>
                        <option style="border-bottom: 0px;margin-top: 5px">B</option>
                        <option style="border-bottom: 0px;margin-top: 5px">C</option>
                    </select>
                </template>
            </div>
            <div class="dropdownbox_po">
                <div style="font-size: 14px;"></div>
                <template>
                    <div></div>
                    <select class="select_Industry">
                        <option style="border-bottom: 0px;margin-top: 5px"></option>
                        <option style="border-bottom: 0px;margin-top: 5px"></option>
                    </select>
                </template>
            </div>
        </div> -->
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <div style="background-color: #fff;margin-top: 10px;" v-for="item in list">
                <van-checkbox-group v-model="result" ref="checkboxGroup">
                    <div class="Initial">
                        <div class="corporateName">{{ item.company_name }}</div>
                        <div @click="phoneClick(item.contact_phone)">
                            <img src="../../assets/u17.svg" style="padding-right: 20px;" />
                        </div>
                    </div>
                    <div class="group" @click="groupClick(item)">
                        <div class="information">
                            <div style="display: flex;">
                                <div>负责人</div>
                                <div style="padding-left: 70px;">{{ item.name }}</div>
                            </div>
                            <div style="display: flex;">
                                <div>客户来源</div>
                                <div style="padding-left: 58px;">{{ item.customer_source }}</div>
                            </div>
                            <div style="display: flex;">
                                <div>成交时间</div>
                                <div style="padding-left: 60px;">{{ item.addtime }}</div>
                            </div>
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
import { monthDeal } from '@/api/user';
export default {
    data() {
        return {
            value: '',
            result: [],
            list: [],
            isLogin: false,
            showSign: false,
            finished: false,
            loading: false,
            count: 0,
            page: 0,
            pagesize: 10,
        };
    },
    created() {
    },
    methods: {
        onLoad() {
            this.page += 1
            this.monthList();
        },
        groupClick(data) {
            if (!this.isLogin) {
                this.showSign = true
            } else {
                this.$router.push({ path: "/workbench/customers", query: { id: data.id } })
            }
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
        onSearch(val) {
            Toast(val);
        },
        onCancel() {
            Toast('搜索');
        },
        onClickLeft() {
            this.$router.go(-1)
        },
        onClickButton() {

        },
        monthList() {
            monthDeal({
                page: 1,
                pagesize: 10
            }).then(res => {
                this.isLogin = res.data.data.isLogin
                this.list =this.list.concat(res.data.data.list)
                this.list = res.data.data.list.map(item => {
                    return {
                        name: item.device_name,
                        ...item
                    }
                });
                if (this.pagesize > res.data.data.count) {
                this.finished = true
            }
            this.loading = false // 加载状态结束
            })
        },
        phoneClick(phone) {
            if (!this.isLogin) {
                this.showSign = true
            } else {
                window.location.href = `tel:${phone}`;
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
    margin-top: 10px;
}

.van-search__content {
    background-color: #fff;
}

.van-search {
    background-color: #EFEFF4;
    padding: 10px 10px 10px 10px;
}

.dropdownbox_po {
    display: flex;
    align-items: center;
    background: #ffff;
    padding: 5px 0px 5px 10px;
    width: 40%;
    height: 20px;
    justify-content: space-around;
}

.dropdownboxs {
    display: flex;
    align-items: center;
    background: #ffff;
    padding: 5px 0px 5px 10px;
    width: 40%;
    justify-content: space-around;
    border-right: 1px solid #E3E3E3;
}

.dropdownbox {
    display: flex;
    align-items: center;
    background: #ffff;
    padding: 5px 0px 5px 10px;
    width: 40%;
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