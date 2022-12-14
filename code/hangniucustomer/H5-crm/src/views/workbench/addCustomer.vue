<template>
    <div>
        <van-nav-bar title="新增客户" left-arrow class="left-arrowa" @click-left="onClickLeft" />
        <!-- <div>
            <form action="/">
                <van-search v-model="value" show-action @search="onSearch" @cancel="onCancel">
                    <template #action>
                        <div @click="onClickButton">搜索</div>
                    </template>
                </van-search>
            </form>
        </div> -->
        <div style="background-color: #fff;margin-top: 10px;" v-for="item in addCustomer">
            <van-checkbox-group v-model="result" ref="checkboxGroup">
                <div class="followup_status">
                    <div>{{ item.company_name }}</div>
                </div>
                <div class="infos" @click="groupClick(item)">
                    <div class="information">
                        <div style="display: flex;">
                            <div>联系人</div>
                            <div style="padding-left: 55px;">{{ item.contact_name }}</div>
                        </div>
                        <div style="display: flex;">
                            <div>岗位</div>
                            <div style="padding-left: 70px;">{{ item.post }}</div>
                        </div>
                        <div style="display: flex;">
                            <div>客户来源</div>
                            <div style="padding-left: 45px;">{{ item.customer_source }}</div>
                        </div>
                    </div>
                    <div class="imgss" @click="phoneClick(item.contact_phone)">
                        <img src="../../assets/u17.svg" />
                    </div>
                </div>
            </van-checkbox-group>
        </div>
        <div style="width: 100%; height: 5px;"></div>
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
import { getAddCustomer } from '@/api/user'
export default {
    data() {
        return {
            value: '',
            result: [],
            show: false,
            addCustomer: [],
            isLogin: false,
            showSign: false
        }
    },
    created() {
        this.getAddCustomerList();
    },
    methods: {
        groupClick(data){
            if (!this.isLogin) {
                this.showSign = true
            }else{
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
        //分配销售
        allocateSalesClick() {
            this.show = true
        },
        //新增客户
        addClick() {

        },
        onClickButton() {

        },
        onClickLeft() {
            this.$router.go(-1)
        },
        getAddCustomerList() {
            getAddCustomer({}).then(res => {
                this.isLogin = res.data.data.isLogin
                this.addCustomer = res.data.data.list
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
.left-arrowa {
    ::v-deep .van-icon {
        font-size: 20px;
        font-weight: bold;
        color: black;
    }
}

.van-checkbox {
    padding: 10px 15px 0px 15px;
}

.imgss {
    padding-right: 20px;
    margin-top: 9px;
}

.infos {
    display: flex;
    justify-content: space-between;
    padding: 8px 0px 0px 30px;
}

.followup_status {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 10px 10px 30px;
}

.followup_img {
    display: flex;
    align-items: center;
    padding-left: 35px;

}

.Initials {
    display: flex;
    align-items: center;
    margin-top: 10px;
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

.wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}

.block {
    width: 120px;
    height: 120px;
    background-color: #fff;
}

.nodata {
    font-family: 'Arial Negreta', 'Arial Normal', 'Arial', sans-serif;
    font-weight: 700;
    font-style: normal;
    font-size: 28px;
    letter-spacing: 6px;
    color: #B0B0B0;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 200px;
}


.group {
    display: flex;
    align-items: center;
    padding-top: 10px;
}

.corporateName {
    font-family: 'Arial Normal', 'Arial', sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 16px;
    letter-spacing: 1px;
}

.information {
    font-size: 12px;
    letter-spacing: 1px;
    color: #8A8A8A;
    line-height: 28px;
    margin-left: 12px;
}

.van-search__content {
    background-color: #fff;
}

.van- {
    background-color: #EFEFF4;
    padding: 10px 10px 5px 10px;
}
</style>