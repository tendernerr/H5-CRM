<template>
    <div>
        <van-nav-bar title="客户详情" left-arrow @click-left="onClickLeft" />
        <div style="background-color:#FFF;">
            <div class="grade_name">{{ basic.company_name }}</div>
            <div style="padding-top: 10px;">
                <div class="grades">
                    <div class="customer_grade">客户等级</div>
                    <div style="padding-left: 70px;">{{ basic.level }}</div>
                </div>
                <div class="grades">
                    <div class="customer_grade">客户来源</div>
                    <div style="padding-left: 70px;">{{ basic.customer_source }}</div>
                </div>
                <div class="grades">
                    <div class="customer_grade">客户计划时间</div>
                    <div style="padding-left: 45px;">{{ basic.customer_purchase_time }}</div>
                </div>
                <div class="grades">
                    <div class="customer_grade">最近跟进时间</div>
                    <div style="padding-left: 45px;">{{ basic.gjTime }}</div>
                </div>
                <div class="grades" style="padding: 0px 0px 5px 15px;">
                    <div class="customer_grade">客户需求描述</div>
                    <div style="padding-left: 45px;">{{ basic.customer_note }}</div>
                </div>
            </div>
        </div>
        <div class="followups">
            <div class="followup" @click="followupClick(staffInformation)">
                <img src="../../assets/u37.svg" />
                <div class="followup_name">{{ staffInformation.saleName }}</div>
                <van-icon name="arrow" />
            </div>
            <div class="followup_div" v-if="staffInformation.status === 0">
                <div class="followup_divss"></div>
                <div class="followup_names">未处理</div>
            </div>
            <div class="followup_div" v-if="staffInformation.status === 1">
                <div class="followup_divsss"></div>
                <div class="followup_names">跟进中</div>
            </div>
            <div class="followup_div" v-if="staffInformation.status === 2">
                <div class="followup_divssss"></div>
                <div class="followup_names">已成交</div>
            </div>
        </div>
        <div style="margin-top: 5px;">
            <van-tabs v-model="active">
                <van-tab title="基本信息" class="tab_basic">
                    <div>
                        <div class="basic">
                            <div class="basic_name">公司名称</div>
                            <div class="basic_content">{{ basicInformation.company_name }}</div>
                        </div>
                        <div class="basic">
                            <div class="basic_name">公司地址</div>
                            <div class="basic_content">{{ basicInformation.company_address }}</div>
                        </div>
                        <div class="basic">
                            <div class="basic_name">详细地址</div>
                            <div class="basic_content">{{ basicInformation.address }}</div>
                        </div>
                        <div class="basic">
                            <div class="basic_name">产品名称</div>
                            <div class="basic_content">{{ basicInformation.product }}</div>
                        </div>
                        <div class="basic">
                            <div class="basic_name">联系人</div>
                            <div class="basic_contents">{{ basicInformation.contact_name }}</div>
                        </div>
                        <div class="basic">
                            <div class="basic_name">岗位</div>
                            <div class="basic_business">{{ basicInformation.post }}</div>
                        </div>
                        <div class="basicPhone">
                            <div class="basic_name">联系电话</div>
                            <div class="basic_phone">{{ basicInformation.contact_phone }}</div>
                            <img src="../../assets/u17.svg" class="basic_img" />
                        </div>
                    </div>
                </van-tab>
                <van-tab title="跟进记录" class="tab_record">
                    <div class="tab_basics">
                        <div class="record">
                            <div @click="writeheelClick">+写跟进记录</div>
                        </div>
                    </div>
                    <div class="record_div" v-for="item in followup">
                        <div class="record_name">
                            <div class="record_time">{{ item.addtime }}</div>
                            <div class="record_names">{{ item.name }}</div>
                        </div>
                        <div class="communicate">{{ item.content }}</div>
                        <div class="record_nes">
                            <div>下次联系时间：</div>
                            <div>{{ item.lasttime }}</div>
                        </div>
                    </div>
                </van-tab>
                <van-tab></van-tab>
                <van-tab></van-tab>
            </van-tabs>
        </div>
        <van-overlay :show="showDropdown" @click="showDropdown = false">
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
        <van-popup v-model="shows" position="bottom" :style="{ height: 'height: 60%' }">
            <div class="checkbox">
                <van-checkbox v-model="status">已成交</van-checkbox>
                <!--   <van-checkbox-group value="">
                      <van-checkbox name="1">复选框 a</van-checkbox>
                </van-checkbox-group> -->
            </div>
            <div>
                <van-cell-group>
                    <div class="informations">
                        <span style="color:red;margin-top: 12px;padding-left: 12px;">*</span>
                        <div class="name">客户等级</div>
                    </div>
                    <van-field v-model="this.basic.level" is-link readonly label="请选择" placeholder="请选择"
                        @click="showgrade = true" />
                    <van-popup v-model="showgrade" round position="bottom">
                        <van-cascader title="请选择" :options="gradeOptions" @close="showgrade = false"
                            @change="onChangegrade" @finish="onFinishgrade"
                            :field-names="{ text: 'name', value: 'name' }" />
                    </van-popup>
                </van-cell-group>
            </div>
            <div class="informa">
                <van-cell-group>
                    <div class="informationss">
                        <span style="color:red;margin-top: 12px;padding-left: 12px;">*</span>
                        <div class="name">沟通记录</div>
                    </div>
                    <van-field v-model="message" type="textarea" maxlength="20" placeholder="及时填写沟通记录，有利于客户的转化" />
                </van-cell-group>
            </div>
            <div>
                <van-cell-group>
                    <div class="informations">
                        <span style="color:red;margin-top: 12px;padding-left: 12px;">*</span>
                        <div class="name">下次联系时间</div>
                    </div>
                    <van-field v-model="purchasetime" is-link readonly label="请选择" placeholder="请选择"
                        @click="timeClick" />
                    <van-popup v-model="showtime" round position="bottom">
                        <van-datetime-picker v-model="currentDate" @cancel="cancel()" @confirm="confirmFn()" type="date"
                            title="选择年月日" :min-date="minDate" :max-date="maxDate" />
                    </van-popup>

                </van-cell-group>
            </div>
            <div class="addDiv">
                <div class="add" @click="addClick">提交</div>
            </div>
        </van-popup>
    </div>
</template>
<style>
body {
    height: 100%;
    background-color: #EFEFF4;
}
</style>
<script >
import { addClassifyindex, distributionCustomer, getAllSale, customerShow, addCrmRecord } from '@/api/user'
import { Notify } from 'vant';

export default {
    data() {
        return {
            grade: '',//客户等级
            showgrade: false,
            gradeOptions: [],
            purchasetime: '',
            showtime: false,
            isShowBirth: false, // 显示时间选择器
            minDate: new Date(1900, 0, 1), // 最小的可选的日期
            maxDate: new Date(2040, 0, 1), // 最大的可选日期
            currentDate: new Date(),  //当前时间
            basic: [],
            shows: false,
            active: 0,
            basicInformation: [],
            middleInfo: [],
            followup: [],
            showDropdown: false,
            selectItem: '',
            supplierList: [],
            message: '',
            status: false,
            staffInformation: [],
        }
    },
    created() {
        this.addClassifList();
        this.customerList();
    },
    methods: {
        //时间取消按钮
        cancel() {
            this.showtime = false
        },
        //时间确定按钮
        async confirmFn() {
            this.showtime = false
            this.purchasetime = new Date(this.currentDate).toJSON().split('T')[0] //转换日期格式
        },
        timeClick() {
            this.showtime = true
        },
        //公司地址
        onFinishgrade(selectedOptions) {
            this.showgrade = false;

            this.basic.level = selectedOptions.selectedOptions.map((gradeOptions) => gradeOptions.name).join('');
        },
        onChangegrade({ value, selectedOptions, tabIndex }) { },
        addClassifList() {
            addClassifyindex({ type: 'level' }).then(res => {
                this.gradeOptions = res.data.data
            })
        },
        onClickLeft() {
            this.$router.go(-1)
        },
        writeheelClick() {
            this.shows = true
        },
        followupClick(data) {
            this.showDropdown = true
            if (!this.staffInformation.saleName == '') {
                this.$router.push({ path: "/workbench/employeedetails", query: { id: data.saleId } })
            } else {
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
        customerList() {
            let params = {
                id: this.$route.query.id,
            }
            customerShow(params).then(res => {
                this.basic = res.data.data.headInfo
                this.basicInformation = res.data.data.bodyInfo
                this.staffInformation = res.data.data.middleInfo
                this.followup = res.data.data.recordInfo.map(item => {
                    return {
                        name: item.device_name,
                        ...item
                    }
                })
            })
        },
        cancelClick() {
            this.showDropdown = false
        },
        determineClick() {
            this.showDropdown = false
            let params = {
                sid: this.selectItem,
                cid: this.$route.query.id,
            }
            distributionCustomer(params).then(res => {
                this.customerList();
            })
            this.supplierList=[]
            this.$route.query.id=[]
        },
        //下拉确实按钮
        changeClick(item) { },
        addClick(data) {
            if (this.basic.level == "") {
                Notify({ type: 'danger', message: `请选择客户等级` });
            } else if (this.message == "") {
                Notify({ type: 'danger', message: `请输入沟通记录` });
            } else if (this.purchasetime == "") {
                Notify({ type: 'danger', message: `请选择客户计划采购时间` });
            } else {
                setTimeout(() => {
                    addCrmRecord({
                        status: this.status,
                        level: this.basic.level,
                        content: this.message,
                        lasttime: this.purchasetime,
                        cid: this.$route.query.id
                    }).then(res => {
                        this.customerList();
                        this.shows = false
                        this.grade = '',
                        this.message = '',
                        this.purchasetime = ''

                    })
                }, 1000);

            }

        }
    },

}
</script>

<style lang="scss" scoped>
.van-checkbox {
    ::v-deep .van-icon {
        color: #FFF;
        font-size: 16px;
    }
}

::v-deep .van-checkbox {
    padding: 10px 0px 10px 10px;
}

.informa {
    ::v-deep .van-field__control {
        border: 1px solid #A4A4A4;
        padding: 5px;
    }
}

.informationss {
    display: flex;
    align-items: center;
    padding-top: 5px;

    ::v-deep .van-field__body {
        border: 1px solid rgba(195, 195, 195, 1);
        height: 100px;
    }

}

.basic_content {
    margin-left: 35px;
    color: #717171;
    font-size: 14px;
    letter-spacing: 1px;
}

.basic_phone {
    margin-left: 30px;
    color: #47B762;
    font-size: 14px;
    letter-spacing: 1px;
}

.basicPhone {
    display: flex;
    align-items: center;
    padding: 0px 0px 50px 0px;
}

.basic_img {
    width: 16px;
    height: 16px;
    margin-left: 15px;
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

.tab_record {
    border-bottom: 1px solid #D4D4D4;
    background: #FFF;
}

.tab_basics {
    padding: 10px 20px 10px 0px;
    display: flex;
    justify-content: flex-end;
    border-bottom: 1px solid #D4D4D4;
}

.record {
    width: 106px;
    height: 30px;
    background: inherit;
    background-color: rgba(255, 255, 255, 1);
    box-sizing: border-box;
    border-width: 1px;
    border-style: solid;
    border-color: rgba(71, 183, 98, 1);
    border-radius: 5px;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
    box-shadow: none;
    font-size: 14px;
    letter-spacing: 1px;
    color: #47B762;
    line-height: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.record_div {
    padding: 30px 20px 18px 25px;
    border-bottom: 1px solid #D4D4D4;
    line-height: 30px;
    font-size: 15px;
}

.record_name {
    display: flex;
    align-items: center;
}

.record_time {
    color: #333333;
}

.record_names {
    letter-spacing: 1px;
    color: #000000;
    margin-left: 10px;
}

.communicate {
    letter-spacing: 1px;
    color: #606060;
}

.record_nes {
    display: flex;
    align-items: center;
    color: #333333;
}

.basic {
    display: flex;
    align-items: center;
}

.basic_business {
    margin-left: 65px;
    color: #717171;
    font-size: 14px;
    letter-spacing: 1px;
}

.basic_contents {
    margin-left: 50px;
    color: #717171;
    font-size: 14px;
    letter-spacing: 1px;
}

.basic_name {
    letter-spacing: 1px;
    color: #717171;
    font-size: 14px;
}

.tab_basic {
    padding: 20px 0px 0px 15px;
    line-height: 40px;
    background: #FFF;
}

.sale_input {
    display: flex;
    align-items: center;
    padding: 0px 0px 30px 12px;
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

.canceldet {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 50px;
    padding: 0px 20px 0px 0px;
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

.grade_name {
    padding-left: 15px;
    padding-top: 10px;
}

::v-deep .van-field__label {
    color: #A1A1A1;
}

.addDiv {
    display: flex;
    justify-content: center;
    margin-top: 12px;
    padding: 0px 0px 10px 0px;
}

.add {
    border: none;
    color: rgb(255, 255, 255);
    width: 60%;
    background-image: inherit;
    background-position: inherit;
    background-size: inherit;
    background-repeat: inherit;
    background-attachment: inherit;
    background-origin: inherit;
    background-clip: inherit;
    background-color: rgba(22, 155, 213, 1);
    border-radius: 3px;
    box-shadow: none;
    font-size: 16px;
    letter-spacing: 3px;
    text-align: center;
    line-height: 38px;
}

.names_field {
    ::v-deep .van-cell {
        line-height: 15px;
        letter-spacing: 2px;
        color: #A1A1A1;
        padding: 10px 10px 5px 25px;
    }

    ::v-deep .van-field__body {
        border: 1px solid rgba(195, 195, 195, 1);
        ;
    }
}

.names {
    font-size: 15px;
    letter-spacing: 1px;
    margin-left: 10px;
    padding-top: 10px;
}

.name {
    font-size: 15px;
    letter-spacing: 1px;
    margin-left: 10px;
    padding-top: 5px;
}

::v-deep .van-cell {
    line-height: 15px;
    letter-spacing: 2px;
    color: #A1A1A1;
    padding: 10px 10px 5px 25px;
}

.informations {
    display: flex;
    align-items: center;
    padding-top: 5px;
}


.basic {
    display: flex;
    align-items: center;
}

::v-deep .van-tabs__line {
    width: 60px;
    height: 2px;
    background-color: #47B762;
    margin-left: 1px;
}

.select_Industry {
    width: 130px;
    height: 24px;
    outline: none;
    border-width: 1px;
    border-style: solid;
    border-color: rgba(223, 223, 223, 1);
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

.followup_div {
    width: 45%;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.followup_divss {
    width: 12px;
    height: 12px;
    background-color: red;
    border-radius: 10px;
}

.followup_divsss {
    width: 12px;
    height: 12px;
    background-color: forestgreen;
    border-radius: 10px;
}

.followup_divssss {
    width: 12px;
    height: 12px;
    background-color: dodgerblue;
    border-radius: 10px;
}

.followup_names {
    font-size: 16px;
    letter-spacing: 2px;
    color: #47B762;
    line-height: 25px;
    margin-left: 10px;
}

.followup {
    ::v-deep .van-icon {
        font-size: 14px;
        color: #CECECE;
        margin-left: 85px;
    }
}

.followups {
    background: #FFF;
    border-top: 1px solid #D5D5D5;
    height: 50px;
    display: flex;
    align-items: center;
}

.followup_name {
    letter-spacing: 2px;
    color: #939393;
    font-size: 14px;
    padding-left: 10px;
}

.followup {
    display: flex;
    align-items: center;
    border-right: 1px solid #ACACAC;
    // width: 50%;
    height: 45px;

    img {
        padding-left: 18px;
    }
}

.grade_name {
    padding-left: 15px;
    padding-top: 10px;
}

.customer_grade {
    letter-spacing: 1px;
    color: #8A8A8A;
}

.grades {
    display: flex;
    align-items: center;
    font-size: 12px;
    padding-left: 15px;
    line-height: 35px;
}

::v-deep .van-icon {
    font-size: 20px;
    font-weight: bold;
    color: black;
}
</style>

