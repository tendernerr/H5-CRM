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
            <div style="background-color: #fff;margin-top: 5px;" v-for="item in followupstaff">
                <van-checkbox-group v-model="result" ref="checkboxGroup">
                    <div class="Initial">
                        <div class="corporateName">{{ item.company_name }}</div>
                        <van-cell><van-icon name="arrow" /></van-cell>
                    </div>
                    <div class="group" @click="groupClick(item)">
                        <div class="information">
                            <div class="followups">
                                <div>客户标签</div>
                                <div>{{ item.level }}</div>
                            </div>
                            <div class="followupw">
                                <div>负责人</div>
                                <div>{{ item.contact_name }}</div>
                            </div>
                            <div class="followupDiv">
                                <div>客户计划时间</div>
                                <div>{{ item.customer_purchase_time }}</div>
                            </div>
                            <div class="followupDiv">
                                <div>下次跟进时间</div>
                                <div>{{ item.lasttime }}</div>
                            </div>
                            <div class="followupDiv">
                                <div>最近跟进内容</div>
                                <div>{{ item.content }}</div>
                            </div>
                        </div>
                    </div>
                </van-checkbox-group>
            </div>
        </van-list>
    </div>
</template>
<style>
body {
    height: 100%;
    background-color: #EFEFF4;
}
</style>
<script>
import { saleFollowCustomer } from '@/api/user'
export default {
    data() {
        return {
            value: '',
            result: [],
            followupstaff: [],
            loading: false,
            finished: false,
            count: 0,
            page: 0,
            pagesize: 10,
        };
    },
    created() {
        this.saleFollowList();
    },
    methods: {
        onLoad() {
            this.page += 1
            this.saleFollowList();
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
        saleFollowList() {
            saleFollowCustomer({}).then(res => {
                this.followupstaff = this.followupstaff.concat(res.data.data.list)
                this.count = res.data.data.count
            })
            if (this.pagesize > this.count) {
                this.finished = true
            }
            this.loading=false
        },
        groupClick(data) {
            this.$router.push({ path: "/workbench/customers", query: { id: data.id } })
        }
    }

};
</script>

<style lang="scss" scoped>
.followupDiv {
    display: flex;

    div:nth-child(2) {
        padding-left: 35px;
    }
}

.followups {
    display: flex;

    div:nth-child(2) {
        padding-left: 60px;
    }
}

.followupw {
    display: flex;

    div:nth-child(2) {
        padding-left: 73px;
    }
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
    padding: 10px 10px 0px 10px;
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
    justify-content: space-between;

    ::v-deep .van-cell {
        width: 12%;
    }
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