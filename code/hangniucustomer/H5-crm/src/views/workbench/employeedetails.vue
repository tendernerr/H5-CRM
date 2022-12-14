<template>
    <div>
        <van-nav-bar left-arrow @click-left="onClickLeft">
            <template #right>
                <van-icon name="ellipsis" />
            </template>
        </van-nav-bar>
        <div style="background: #FFF;" v-if="!edits">
            <div class="Imgnames_do">
                <div class="Imgnames">
                    <img src="../../assets/u7.svg" />
                    <div class="names">{{ tialInformation.name }}</div>
                </div>
                <div style="padding-right: 15px;" @click="editClick"><img src="../../assets/u24.svg" /></div>
            </div>
            <div class="particulars">
                <div class="details">
                    <div>工号：</div>
                    <div>{{ tialInformation.number }}</div>
                </div>
                <div class="details">
                    <div>岗位：</div>
                    <div>{{ tialInformation.post }}</div>
                </div>
                <div class="detailss">
                    <div>手机号：</div>
                    <div>{{ tialInformation.phone }}</div>
                </div>
            </div>
        </div>
        <div style="background: #FFF;" v-if="edits">
            <div class="Imgnames_do">
                <div class="Imgnames">
                    <img src="../../assets/u7.svg" />
                    <!-- <div class="names">{{ tialInformation.name }}</div> -->
                    <van-cell-group>
                        <van-field v-model="tialInformation.name" />
                    </van-cell-group>
                </div>
               <div style="padding-right: 15px;" @click="successClick"><div class="success">完成</div></div>
            </div>
            <div class="particulars">
                <div class="details">
                    <div>工号：</div>
                    <van-cell-group>
                        <van-field v-model="tialInformation.number" />
                    </van-cell-group>
                </div>
                <div class="infor">
                    <van-cell-group>
                        <div class="informations">
                            <div class="name">岗位</div>
                        </div>
                        <van-field v-model="tialInformation.post" is-link readonly placeholder="请选择岗位"
                            @click="showpost = true" />
                        <van-popup v-model="showpost" round position="bottom">
                            <van-cascader title="请选择" :options="suppliertag" @close="showpost = false"
                                @change="onChangepost" @finish="onFinishpost"
                                :field-names="{ text: 'name', value: 'name' }" />
                        </van-popup>
                    </van-cell-group>
                </div>
                <div class="detailss">
                    <div>手机号：</div>
                    <van-cell-group>
                        <van-field v-model="tialInformation.phone" />
                    </van-cell-group>
                </div>
            </div>
        </div>
        <div style="background-color: #fff;margin-top: 5px;">
            <div style="display: flex;flex-wrap: wrap;padding: 0px 15px 10px 15px;">
                <div class="uicks" @click="customersClick(tialInformation.id)">
                    <div style="font-weight: bold;">{{ employeeDetails.allCustomer }}</div>
                    <div style="font-size: 14px;">所属客户</div>
                </div>
                <div class="uicks" @click="followupClick(tialInformation.id)">
                    <div style="font-weight: bold;">{{ employeeDetails.followCustomer }}</div>
                    <div style="font-size: 14px;">正在跟进</div>
                </div>
                <div class="uicks" @click="dealClick(tialInformation.id)">
                    <div style="font-weight: bold;">{{ employeeDetails.dealCustomer }}</div>
                    <div style="font-size: 14px;">成交客户</div>
                </div>
                <div class="uicks" @click="allschedulesClick(tialInformation.id)">
                    <div style="font-weight: bold;">{{ employeeDetails.allSchedule }}</div>
                    <div style="font-size: 14px;">全部日程</div>
                </div>
                <div class="uicks" @click="todoTodayClick(tialInformation.id)">
                    <div style="font-weight: bold;">{{ employeeDetails.noDoCustomer }}</div>
                    <div style="font-size: 14px;">今日待办</div>
                </div>
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
<script >
import { staffShow, classifyIndex ,editstaff} from '@/api/user'
import { Notify } from 'vant';
export default {
    data() {
        return {
            suppliertag: [],
            showpost: false,
            post: '', //岗位
            tialInformation: [],
            employeeDetails: [],
            edits: false,
        }
    },
    created() {
        this.staffList();
        this.classifyList();
    },
    methods: {
        classifyList() {
            classifyIndex({ type: 'supplierTag,companyScale' }).then(res => {
                this.suppliertag = res.data.data.supplierTag
            })
        },
        onFinishpost(selectedOptions) {
            //岗位
            this.showpost = false;
            this.tialInformation.post = selectedOptions.selectedOptions.map((suppliertag) => suppliertag.name).join('')
        },
        onChangepost({ value, selectedOptions, tabIndex }) { },
        onClickLeft() {
            this.$router.go(-1)
        },
        followupClick(data) {
            this.$router.push({ path: "/workbench/followup", query: { id: data } })
        },
        dealClick(data) {
            this.$router.push({ path: "/workbench/deal", query: { id: data } })
        },
        allschedulesClick(data) {
            this.$router.push({ path: "/workbench/allschedules", query: { id: data } })
        },
        todoTodayClick(data) {
            this.$router.push({ path: "/workbench/todoToday", query: { id: data } })
        },
        customersClick(data) {
            this.$router.push({ path: "/workbench/belongingCustomer", query: { id: data } })
            // this.$router.go(-1)
        },
        staffList() {
            staffShow({ id: this.$route.query.id }).then(res => {
                this.tialInformation = res.data.data.headInfo
                this.employeeDetails = res.data.data.bodyInfo
            })
        },
        editClick() {
            this.edits = true
        },
        successClick(){
            
            editstaff({
                id: this.$route.query.id,
                name: this.tialInformation.name,
                post: this.tialInformation.post,
                phone: this.tialInformation.phone,
                number: this.tialInformation.number,
            }).then(res => {
                var phoneReg = /(^1\d{10}$)|(^[0-9]\d{7}$)/;

                if (!phoneReg.test(this.tialInformation.phone)) {
                    Notify({ type: 'danger', message: `请输入正确的手机号` });
                } else {
                    if (res.data.code == 200) {
                        this.edits = false
                    }
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.success{
    width: 65px;
    height: 24px;
    background: inherit;
    background-color: rgba(22, 155, 213, 1);
    border: none;
    border-radius: 5px;
    letter-spacing: 2px;
    display: flex;
    color: #FFF;
    justify-content: center;
}
.infor {
    ::v-deep .van-cell-group {
        display: flex;
        align-items: center;
    }
}

.uicks {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    margin-top: 10px;
}

.detailss {
    display: flex;
    align-items: center;
    padding-bottom: 15px;
}

.details {
    display: flex;
    align-items: center;
}

.particulars {
    font-size: 12px;
    letter-spacing: 1px;
    color: #333333;
    padding: 25px 0px 0px 20px;
    line-height: 25px;
}

.Imgnames {
    display: flex;
    align-items: center;
    padding: 12px 0px 0px 15px;

    .names {
        font-size: 16px;
        letter-spacing: 2px;
        padding-left: 15px;
    }
}

.Imgnames_do {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

::v-deep .van-nav-bar .van-icon {
    color: black;
    font-size: 25px;
}

::v-deep .van-nav-bar__arrow {
    font-size: 20px;
    font-weight: bold;
    color: black;
}

.name {
    font-size: 15px;
    letter-spacing: 1px;
    width: 40px;
}

::v-deep .van-cell {
    line-height: 15px;
    letter-spacing: 2px;
    color: #A1A1A1;
    // padding: 10px 10px 5px 25px;
}

.informations {
    display: flex;
    align-items: center;
}
</style>