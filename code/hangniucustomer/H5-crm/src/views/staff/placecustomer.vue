<template>
    <div>
        <van-nav-bar title="所属客户" left-arrow @click-left="onClickLeft" />
        <!-- 列表数据 -->
        <van-swipe-cell v-for="(item, index) in placecustomer" :key="index">
            <div style="background-color: #fff;margin-top: 5px;" @click="placecustomerClick(item)">
                <van-checkbox-group v-model="result" ref="checkboxGroup">
                    <div class="create_employee">
                        <div>{{ item.company_name }}</div>
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
                        <div class="imgss" @click="phoneClick(item.contact_phone)">
                            <img src="../../assets/u17.svg" />
                        </div>
                    </div>
                </van-checkbox-group>
            </div>
            <template #right>
                <van-button square text="删除" type="danger" class="delete-button" @click="deleteList(item)" />
            </template>
        </van-swipe-cell>
        <div style="width: 100%; height: 30px;"></div>
        <!-- 底部按钮 -->
        <div style="display:flex; position: fixed; bottom: 0px;  width: 100%;">
            <div class="introduce_love"><img src="../../assets/u22.svg" width="20px" height="20px" />
                <div style="padding-left: 5px;" @click="addClick">新增客户</div>
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
import { getAllCustomer, deleteCustomer } from '@/api/user'
export default {
    data() {
        return {
            value: '',
            result: [],
            show: false,
            placecustomer: [],
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
        onClickButton() { },
        //分配销售
        allocateSalesClick() {
            this.show = true
        },
        //新增客户
        addClick() {
            this.$router.push('/workbench/addUser')
        },
        // 列表数据
        getAllList() {
            getAllCustomer({}).then(res => {
                this.placecustomer = res.data.data.list
                this.placecustomer.forEach(el => {
                    this.result.push(el.id)
                })
            })
        },
        // 电话按钮
        phoneClick(phone) {
            window.location.href = `tel:${phone}`;
        },
        // 导航栏按钮
        onClickLeft() {
            this.$router.push('/workbench/quick')
        },
        //删除
        deleteList(data) {
            deleteCustomer({ id: data.id }).then(res => {
                this.getAllList();
            })
        },
        // 列表跳转
        placecustomerClick(data) {
            this.$router.push({ path: "/workbench/customers", query: { id: data.id } })
        }
    }
}
</script>

<style lang="scss" scoped>
.delete-button {
    height: 100%;
}

::v-deep .van-icon {
    font-size: 20px;
    font-weight: bold;
    color: black;
}

.introduce_love {
    color: #FFF;
    display: flex;
    width: 100%;
    background-color: rgba(64, 158, 255, 1);
    height: 30px;
    box-shadow: none;
    line-height: 30px;
    text-align: center;
    align-items: center;
    justify-content: center;
}

.create_employee {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 10px 0px 40px;
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
    padding: 10px 10px 5px 10px;
}
</style>