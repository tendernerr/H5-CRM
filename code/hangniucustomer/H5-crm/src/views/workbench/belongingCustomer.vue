<template>
    <div>
        <van-nav-bar title="所属客户" left-arrow @click-left="onClickLeft"/>
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
                <div style="font-size: 14px;">跟进状态</div>
                <template>
                    <select class="select_Industry">
                        <option style="border-bottom: 0px;margin-top: 5px">小刘</option>
                        <option style="border-bottom: 0px;margin-top: 5px">小何</option>
                    </select>
                </template>
            </div>
        </div> -->
        <div style="background-color: #fff;margin-top: 10px;" v-for="item in getAll">
            <van-checkbox-group v-model="result" ref="checkboxGroup">
                <div class="create_employee">
                    <div style="padding: 15px 0px 0px 35px;">{{ item.company_name }}</div>
                    <div class="followup_img" v-if="item.status == 0">
                        <img src="../../assets/u47.svg" />
                        <div style="padding-left: 10px;font-size: 12px;">待处理</div>
                    </div>
                    <div class="followup_img" v-if="item.status == 1">
                        <img src="../../assets/u21.svg" />
                        <div style="padding-left: 10px;font-size: 12px;">跟进中</div>
                    </div>
                    <div class="followup_img" v-if="item.status == 2">
                        <img src="../../assets/u34.svg" />
                        <div style="padding-left: 10px;font-size: 12px;">已成交</div>
                    </div>

                </div>
                <div class="infos">
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
                    <div class="imgss">
                        <img src="../../assets/u17.svg" />
                    </div>
                </div>

            </van-checkbox-group>
        </div>
    </div>
</template>
<style>
body {
    height: 100%;
    background-color: #EFEFF4;
}
</style>
<script>
import { getAllCustomer } from '@/api/user'
export default {
    data() {
        return {
            value: '',
            result: [],
            show: false,
            getAll: [],
        }
    },
    created() {
        this.getAllList();
    },
    methods: {
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
        onClickButton() { },
        getAllList() {
            getAllCustomer({uid:this.$route.query.id}).then(res => {
                this.getAll = res.data.data.list
            })
        },
        onClickLeft(){
            this.$router.go(-1)
        }
    }
}
</script>

<style lang="scss" scoped>
::v-deep .van-icon {
    font-size: 20px;
    font-weight: bold;
    color: black;
}
.create_employee {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 10px 0px 0px;
}

.van-checkbox {
    padding: 10px 15px 0px 15px;
}

.imgss {
    padding-right: 30px;
    margin-top: 9px;
}

.infos {
    display: flex;
    justify-content: space-between;
    padding: 8px 0px 0px 30px;
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

.van-search {
    background-color: #EFEFF4;
    padding: 10px 10px 10px 10px;
}
</style>