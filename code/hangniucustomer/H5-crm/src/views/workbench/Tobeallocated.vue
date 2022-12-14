<template>
    <div>
        <van-nav-bar title="待分配客户" class="left-arrowa" left-arrow @click-left="onClickLeft" />
        <!-- 搜索框 -->
        <!-- <div>
            <form action="/">
                <van-search v-model="values" show-action @search="onSearch" @cancel="onCancel">
                    <template #action>
                        <div @click="onClickButton">搜索</div>
                    </template>
                </van-search>
            </form>
        </div> -->
        <!-- 列表数据 -->
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <div>
                <van-swipe-cell v-for="(item, index) in list" :key="index">
                    <div class="stay_contentName">
                        <van-checkbox v-model="item.is_check" @change="checkClick($event, item)" :value="item.id">
                            <div>{{ item.company_name }}</div>
                        </van-checkbox>
                        <div class="stay" @click="listClick(item)">
                            <div class="stay_contentpo">
                                <div class="flexs">
                                    <div>联系人:</div>
                                    <div>{{ item.contact_name }}/{{ item.post }}</div>
                                </div>
                                <div class="flex">
                                    <div>客户产品:</div>
                                    <div>{{ item.product }}</div>
                                </div>
                                <div class="flex">
                                    <div>需求描述:</div>
                                    <div>{{ item.customer_note }}</div>
                                </div>
                            </div>
                            <div class="stay_img" @click="dial(item.contact_phone)"><img src="@/assets/u17.svg" /></div>
                        </div>
                    </div>
                    <template #right>
                        <van-button square text="删除" type="danger" class="delete-button" @click="deleteList(item)" />
                    </template>
                </van-swipe-cell>
            </div>
        </van-list>
        <div style="width: 100%; height: 45px;"></div>
        <!-- 暂无数据 -->
        <div v-if="this.count == 0">
            <div class="nodata">暂无数据</div>
        </div>
        <!-- 底部按钮 -->
        <div style="display:flex; position: fixed; bottom: 0px;  width: 100%;">
            <div class="introduce_loves"><img src="../../assets/u22.svg" />
                <div style="padding-left: 5px;" @click="allocateSalesClick">分配销售</div>
            </div>
            <div class="introduce_love"><img src="../../assets/u22.svg" />
                <div style="padding-left: 5px;" @click="addClick">新增客户</div>
            </div>
        </div>
        <!-- 分配销售弹窗 -->
        <van-overlay :show="show" @click="showClick">
            <div class="wrapper" @click.stop>
                <div class="block">
                    <div class="aboutUs">请选择分配的销售人员</div>
                    <div class="sale_input">
                        <div>选择销售：</div>
                        <template>
                            <select v-model="selectItem"  @change="changeClick($event)" style="width: 65%;">
                                <option v-for="item in supplierList"  :value="item.id">{{ item.name }}</option>
                            </select>
                        </template>
                    </div>
                    <div class="canceldet">
                        <div class="cancel" @click="cancelClick">
                            <div>取消</div>
                        </div>
                        <div class="determine" @click="determineClick">
                            <div>确定</div>
                        </div>
                    </div>
                </div>
            </div>
        </van-overlay>
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

import { noDistributionCustomer, getAllSale, distributionCustomer, deleteCustomer } from '@/api/user'
import { Notify } from 'vant';
import { Dialog } from 'vant';
export default {
    data() {
        return {
            values: '',
            result: [],
            show: false,
            checked: true,
            list: [],
            supplierList: [],
            selectItem: '',
            options: '',
            resultss: false,
            is_check: true,//是否选中
            resultpo: [],
            check_ids: [],
            showSign: false,  //是否登录
            count: 0,
            isLogin: false,
            loading: false,
            finished: false,
            page: 0,
            pagesize: 10,
        }
    },
    created() {
        if (this.$route.query.type == 'add') {
            this.check_ids = [this.$route.query.id]
            this.show = true
            getAllSale({}).then(res => {
                this.supplierList = res.data.data.map(item => {
                    return {
                        name: item.device_name,
                        ...item
                    }
                })
            })
        }
    },
    methods: {
        onLoad() {
            console.log(223123123)
            this.page += 1
            this.noDistribution();
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
        // 下拉开关按钮
        showClick() {
            this.show = false
        },
        //删除
        deleteList(data) {
            deleteCustomer({ id: data.id }).then(res => {
                this.noDistribution();
            })
        },
        // 导航栏按钮
        onClickLeft() {
            this.$router.push('/workbench/quick')
        },
        //下拉确实按钮
        changeClick(item) { },
        //多选按钮
        checkClick(cheack, item) {
            //选中
            if (cheack) {
                this.check_ids.push(item.id)
            } else {
                this.check_ids.forEach((id, index) => {
                    if (id = item.id) {
                        this.check_ids.splice(index)
                    }
                })
            }
        },
        // 下拉框确定按钮
        determineClick() {
            this.show = false
            let params = {
                sid: this.selectItem,
                cid: this.check_ids,
            }
            distributionCustomer(params).then(res => {
                this.list=[]
                this.noDistribution();
            })
            this.selectItem = ''
        },
        // 取消按钮（待分配下拉）
        cancelClick() {
            this.show = false
        },
        onSearch(val) {
            Toast(val);
        },
        onCancel() {
            Toast('搜索');
        },
        //分配销售按钮
        allocateSalesClick(cheack) {
            // 判断是否登录 有没有token
            if (!this.isLogin) {
                this.showSign = true
            } else {
                if (this.check_ids == '') {
                    Notify({ type: 'success', message: '请选择要分配的客户' });
                } else {
                    this.show = true
                    getAllSale({}).then(res => {
                        this.supplierList = res.data.data.map(item => {
                            return {
                                name: item.device_name,
                                ...item
                            }
                        })
                    })
                }
            }


        },
        //新增客户
        addClick() {
            // 判断是否登录 有没有token
            if (!this.isLogin) {
                this.showSign = true
            } else {
                this.$router.push('/workbench/addUser')
            }

        },
        //列表数
        noDistribution() {
            noDistributionCustomer({
                page: this.page,
                pagesize: this.pagesize,
                keyword: this.value
            }).then(res => {
                console.log(res);
                this.count = res.data.data.count
                this.isLogin = res.data.data.isLogin
                this.list = this.list.concat(res.data.data.list)
                console.log(this.list,11);
                if (res.data.data.isLogin) {
                    // this.list = this.list.concat(res.data.data.list)
                    this.result = []
                    this.list.forEach(el => {
                        this.result.push(el.id)
                    })
                }
                // } else {
                //     this.list = this.list.concat(res.data.data.list)
                // }
                if (this.pagesize > res.data.data.list.length) {
                    this.finished = true;
                }
                this.loading = false // 加载状态结束
            }).catch(err => {
                console.log(err)
                // console.log(res);

            })
        },
        //号码按钮
        dial(phone) {
            // 判断是否登录
            if (!this.isLogin) {
                this.showSign = true
            } else {
                window.location.href = `tel:${phone}`;
            }
        },
        // 列表跳转
        listClick(data) {
            // 判断是否登录
            if (!this.isLogin) {
                this.showSign = true
            } else {
                this.$router.push({ path: "/workbench/customers", query: { id: data.id } })
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

.delete-button {
    height: 100%;
}

.left-arrowa {
    ::v-deep .van-icon {
        font-size: 20px;
        font-weight: bold;
        color: black;
    }
}

.canceldet {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 50px;
    padding: 0px 20px 0px 0px;
}

.determine {
    display: flex;
    width: 80px;
    height: 30px;
    background: inherit;
    color: #FFF;
    background-color: rgba(22, 155, 213, 1);
    border: none;
    border-radius: 5px;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
    box-shadow: none;
    font-size: 14px;
    letter-spacing: 2px;
    line-height: 15px;
    align-items: center;
    justify-content: center;
}

.cancel {
    margin: 0px 15px 0px 0px;
    display: flex;
    width: 80px;
    height: 30px;
    background: inherit;
    background-color: rgba(22, 155, 213, 0);
    box-sizing: border-box;
    border-width: 1px;
    border-style: solid;
    border-color: rgba(208, 208, 208, 1);
    border-radius: 5px;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
    box-shadow: none;
    font-size: 14px;
    letter-spacing: 2px;
    color: #5B5B5B;
    line-height: 15px;
    align-items: center;
    justify-content: center;
}

.options {
    border-bottom: 0px;
    margin-top: 5px
}

.sale_input {
    display: flex;
    align-items: center;
    padding: 0px 0px 30px 12px;
}

.stay_contentpo {
    padding: 15px;
}

.flexs {
    display: flex;
    align-items: center;
    line-height: 25px;

    div:nth-child(1) {
        font-size: 12px;
        letter-spacing: 1px;
        color: #8A8A8A;
    }

    div:nth-child(2) {
        font-size: 12px;
        letter-spacing: 1px;
        color: #535353;
        padding-left: 65px;
    }
}

.flex {
    display: flex;
    align-items: center;
    line-height: 25px;

    div:nth-child(1) {
        font-size: 12px;
        letter-spacing: 1px;
        color: #8A8A8A;
    }

    div:nth-child(2) {
        font-size: 12px;
        letter-spacing: 1px;
        color: #535353;
        padding-left: 10px;
    }
}

.stay_img {
    margin-top: -30px;
    margin-left: 50px;
}

.stay {
    display: flex;
    align-items: center;
    justify-content: space-between;
}


.stay_contentName {
    background: #FFF;
    padding: 15px;
    font-size: 16px;
    letter-spacing: 1px;
    margin-top: 5px;
}

.select_Industry {
    width: 190px;
    height: 24px;
    outline: none;
    border-width: 1px;
    border-style: solid;
    border-color: rgba(223, 223, 223, 1);
}

.van-dialog {
    border-radius: 0px
}

.aboutUs {
    font-family: 'Arial Negreta', 'Arial Normal', 'Arial', sans-serif;
    font-weight: 700;
    font-style: normal;
    font-size: 13px;
    letter-spacing: 1px;
    color: #333333;
    margin: 12px;
}

.wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}

.block {
    width: 300px;
    height: 200px;
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

.introduce_loves {
    color: #FFF;
    display: flex;
    width: 50%;
    background-color: rgb(255, 142, 80);
    height: 45px;
    box-shadow: none;
    line-height: 45px;
    text-align: center;
    align-items: center;
    justify-content: center;
}

.introduce_love {
    color: #FFF;
    display: flex;
    width: 50%;
    background-color: rgba(64, 158, 255, 1);
    height: 45px;
    box-shadow: none;
    line-height: 45px;
    text-align: center;
    align-items: center;
    justify-content: center;
}



.van-search__content {
    background-color: #fff;
}

.van-search {
    background-color: #EFEFF4;
    padding: 10px 10px 5px 10px;
}
</style>