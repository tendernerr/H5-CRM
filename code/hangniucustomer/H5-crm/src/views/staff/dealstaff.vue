<template>
    <div>
        <van-nav-bar title="成交客户" left-arrow @click-left="onClickLeft"/>
        <!-- <div>
            <form action="/">
                <van-search v-model="value" show-action @search="onSearch" @cancel="onCancel">
                    <template #action>
                        <div @click="onClickButton">搜索</div>
                    </template>
                </van-search>
            </form>
        </div> -->
        <div style="background-color: #fff;margin-top: 10px;" v-for="item in dealstaff">
            <van-checkbox-group v-model="result" ref="checkboxGroup">
                <div class="Initial">
                    <div class="corporateName">{{item.company_name}}</div>
                    <div style="padding-right: 15px;">
                        <van-icon name="arrow" />
                    </div>
                </div>
                <div class="group">
                    <div class="information">
                        <div style="display: flex;">
                            <div>负责人</div>
                            <div style="padding-left: 70px;">{{item.contact_name}}</div>
                        </div>
                        <div style="display: flex;">
                            <div>客户来源</div>
                            <div style="padding-left: 58px;">{{item.customer_source}}</div>
                        </div>
                        <div style="display: flex;">
                            <div>成交时间</div>
                            <div style="padding-left: 60px;">{{item.addtime}}</div>
                        </div>
                    </div>
                </div>
            </van-checkbox-group>
            <div class="establishForm">
                <img src="../../assets/u22.svg"/>
                <div>创建售后表单</div>
            </div>
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
import { dealCustomer  } from '@/api/user'
export default {
    data() {
        return {
            value: '',
            result: [],
            dealstaff:[],
        };
    },
    created(){
       this.dealList();
    }, 
    methods: {
        onSearch(val) {
            Toast(val);
        },
        onCancel() {
            Toast('搜索');
        },
        onClickLeft(){
            this.$router.go(-1)
        },
        dealList(){
            dealCustomer({}).then(res=>{
                this.dealstaff=res.data.data.list
            })
        }
    }
};
</script>

<style lang="scss" scoped>
::v-deep .van-icon {
    font-size: 20px;
    font-weight: bold;
    color: black;
}
::v-deep .van-icon{
    color: #BDBDBD;
}
.establishForm{
    background-color: #409EFF;
    display: flex;
    line-height: 35px;
    align-items: center;
    justify-content: center;
    color: #FFF;
    div{
        padding-left: 10px;

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
.dropdownbox_po{
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
    padding-top: 15px;
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
    font-size:20px;
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
    line-height: 30px;
}
::v-deep .van-nav-bar__arrow {
    font-size: 20px;
    font-weight: bold;
    color: black;
}
</style>