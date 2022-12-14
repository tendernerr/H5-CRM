<template>
    <div>
        <van-nav-bar title="新增客户" left-arrow @click-left="onClickLeft" />
        <div>
            <div class="user_information">客户基本信息</div>
            <div style="background-color:#FFF;margin-top: 10px;">
                <div>
                    <van-cell-group>
                        <div class="informations">
                            <span style="color:red;margin-top: 12px;padding-left: 12px;">*</span>
                            <div class="name">公司名称</div>
                        </div>
                        <van-field v-model="company_name" placeholder="请输入" />
                    </van-cell-group>
                </div>
                <div>
                    <div class="informations">
                        <span style="color:red;margin-top: 12px;padding-left: 12px;"></span>
                        <div class="name">公司地址</div>
                    </div>
                    <van-field v-model="fieldValue" is-link readonly label="请选择" placeholder="请选择"
                        @click="show = true" />
                    <van-popup v-model="show" round position="bottom">
                        <van-cascader title="请选择" :options="options" @close="show = false" @change="onChange"
                            @finish="onFinish" :field-names="{ text: 'label', value: 'value', children: 'children' }" />
                    </van-popup>
                </div>
                <div>
                    <van-cell-group>
                        <div class="informations">
                            <span style="color:red;margin-top: 12px;padding-left: 12px;"></span>
                            <div class="name">详情地址</div>
                        </div>
                        <van-field v-model="address" placeholder="请输入" />
                    </van-cell-group>
                </div>
                <div>
                    <van-cell-group>
                        <div class="informations">
                            <span style="color:red;margin-top: 12px;padding-left: 12px;"></span>
                            <div class="name">产品名称</div>
                        </div>
                        <van-field v-model="product" placeholder="请输入" />
                    </van-cell-group>
                </div>
                <div>
                    <van-cell-group>
                        <div class="informations">
                            <span style="color:red;margin-top: 12px;padding-left: 12px;">*</span>
                            <div class="name">联系人</div>
                        </div>
                        <van-field v-model="contact_name" placeholder="请输入" />
                    </van-cell-group>
                </div>
                <div>
                    <van-cell-group>
                        <div class="informations">
                            <span style="color:red;margin-top: 12px;padding-left: 12px;"></span>
                            <div class="name">岗位</div>
                        </div>
                        <van-field v-model="post" is-link readonly label="请选择" placeholder="请选择"
                            @click="showpost = true" />
                        <van-popup v-model="showpost" round position="bottom">
                            <van-cascader title="请选择" :options="postOptions" @close="showpost = false"
                                @change="onChangepost" @finish="onFinishpost"
                                :field-names="{ text: 'name', value: 'name' }" />
                        </van-popup>
                    </van-cell-group>
                </div>
                <div>
                    <van-cell-group>
                        <div class="informations">
                            <span style="color:red;margin-top: 12px;padding-left: 12px;">*</span>
                            <div class="name">联系电话</div>
                        </div>
                        <van-field v-model="contact_phone" placeholder="请输入" />
                    </van-cell-group>
                </div>
                <div>
                    <van-cell-group>
                        <div class="informations">
                            <span style="color:red;margin-top: 12px;padding-left: 12px;"></span>
                            <div class="name">客户来源</div>
                        </div>
                        <van-field v-model="source" is-link readonly label="请选择" placeholder="请选择"
                            @click="showsource = true" />
                        <van-popup v-model="showsource" round position="bottom">
                            <van-cascader title="请选择" :options="sourceOptions" @close="showsource = false"
                                @change="onChangesource" @finish="onFinishsource"
                                :field-names="{ text: 'name', value: 'name' }" />
                        </van-popup>
                    </van-cell-group>
                </div>
                <div>
                    <van-cell-group>
                        <div class="informations">
                            <span style="color:red;margin-top: 12px;padding-left: 12px;"></span>
                            <div class="name">客户等级</div>
                        </div>
                        <van-field v-model="grade" is-link readonly label="请选择" placeholder="请选择"
                            @click="showgrade = true" />
                        <van-popup v-model="showgrade" round position="bottom">
                            <van-cascader title="请选择" :options="gradeOptions" @close="showgrade = false"
                                @change="onChangegrade" @finish="onFinishgrade"
                                :field-names="{ text: 'name', value: 'name' }" />
                        </van-popup>
                    </van-cell-group>
                </div>
                <div>
                    <van-cell-group>
                        <div class="informations">
                            <span style="color:red;margin-top: 12px;padding-left: 12px;"></span>
                            <div class="name">客户计划采购时间</div>
                        </div>
                        <van-field v-model="purchasetime" is-link readonly label="请选择" placeholder="请选择"
                            @click="timeClick" />
                        <van-popup v-model="showtime" round position="bottom">
                            <van-datetime-picker v-model="currentDate" @cancel="cancel()" @confirm="confirmFn()"
                                type="date" title="选择年月日" :min-date="minDate" :max-date="maxDate" />
                        </van-popup>

                    </van-cell-group>
                </div>
            </div>
            <div style="background-color:#FFF;margin-top: 10px;height: 200px;">
                <div class="names_field">
                    <div class="names">客户需求描述（20字以内）</div>
                    <van-field v-model="message" type="textarea" maxlength="20" />
                </div>
                <div class="addDiv">
                    <div class="add" @click="addClick">提交</div>
                </div>
            </div>
            <!-- 分配销售弹窗 -->
            <van-overlay :show="showoverlay" @click="showoverlay = false">
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
import { customerAdd, classifyIndex,getAllSale,distributionCustomer } from '@/api/user'
import { Notify } from 'vant';

export default {
    props: {
        getcustomer: {
            type: Object,
            default: () => {
                data_statistics: { }
            }
        }
    },
    data() {
        return {
            company_name: '', //公司名称
            show: false,
            fieldValue: '', //地址
            options: [],
            address: '', //详情地址
            product: '',//产品名称
            contact_name: '', //联系人
            showpost: false,
            post: '', //岗位
            postOptions: [],
            showsource: false,
            sourceOptions: [],
            source: '',//客户来源
            grade: '',//客户等级
            showgrade: false,
            gradeOptions: [],
            contact_phone: '',
            message: '',
            purchasetime: '',
            showtime: false,
            isShowBirth: false, // 显示时间选择器
            minDate: new Date(1900, 0, 1), // 最小的可选的日期
            maxDate: new Date(2040, 0, 1), // 最大的可选日期
            currentDate: new Date(),  //当前时间
            showoverlay: false,
            selectItem: '',
            supplierList: [],
            check_ids: [],
            addId:'',
        }
    },
    created() {
        this.companyAddressList();
    },
    methods: {
      
        onClickLeft() {
            this.$router.go(-1)
        },
        timeClick() {
            this.showtime = true
        },
        //时间确定按钮
        async confirmFn() {
            this.showtime = false
            this.purchasetime = new Date(this.currentDate).toJSON().split('T')[0] //转换日期格式
        },

        //时间取消按钮
        cancel() {
            this.showtime = false
        },
        // 公司地址下拉数据
        companyAddressList() {
            classifyIndex({ type: 'citytwocategory,supplierTag,customerSource,level' }).then(res => {
                //公司地址
                this.options = res.data.data.citytwocategory
                //岗位
                this.postOptions = res.data.data.supplierTag
                //客户来源
                this.sourceOptions = res.data.data.customerSource
                //客户等级
                this.gradeOptions = res.data.data.level

            })
        },
        onChange({ value, selectedOptions, tabIndex }) { },
        onChangepost({ value, selectedOptions, tabIndex }) { },
        onChangesource({ value, selectedOptions, tabIndex }) { },
        onChangegrade({ value, selectedOptions, tabIndex }) { },
        onFinish({ selectedOptions }) {
            //公司地址
            this.show = false;
            this.fieldValue = selectedOptions.map((option) => option.label).join('/');
        },
        onFinishpost(selectedOptions) {
            //岗位
            this.showpost = false;
            this.post = selectedOptions.selectedOptions.map((postOptions) => postOptions.name).join('')
        },
        onFinishsource(selectedOptions) {
            //客户来源
            this.showsource = false;
            this.source = selectedOptions.selectedOptions.map((sourceOptions) => sourceOptions.name).join('');
        },
        onFinishgrade(selectedOptions) {
            //客户等级
            this.showgrade = false;
            this.grade = selectedOptions.selectedOptions.map((gradeOptions) => gradeOptions.name).join('');
        },
        addClick() {
            if (this.company_name == "") {
                Notify({ type: 'danger', message: `请输入公司名称` });
            } else if (this.contact_name == "") {
                Notify({ type: 'danger', message: `请输入联系人` });
            } else if (this.contact_phone == "") {
                Notify({ type: 'danger', message: `请输入联系电话` });
            } else {
                customerAdd({
                    company_name: this.company_name,
                    address: this.address,
                    district:this.fieldValue,
                    product: this.product,
                    contact_name: this.contact_name,
                    contact_phone: this.contact_phone,
                    customer_note: this.message,
                    customer_purchase_time: this.purchasetime,
                    level: this.grade,
                    customer_source: this.source,
                    post: this.post,
                }).then(res => {
                    var phoneReg = /(^1\d{10}$)|(^[0-9]\d{7}$)/;
                    if (!phoneReg.test(this.contact_phone)) {
                        Notify({ type: 'danger', message: `请输入正确的手机号` });
                    } else {
                        if (res.data.code == 200) {
                            this.addId=res.data.data
                            if(this.addId){
                                this.$router.push({ path: "/workbench/Tobeallocated", query: { id:this.addId,type:'add'}})
                                // this.$router.push({ path: "/workbench/Tobeallocated", query: { id:this.addId}})
                                this.showoverlay = true
                            }
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
                })
            }

        },
        onSelect() { },
         //下拉确实按钮
         changeClick(item) { },
        cancelClick() {
            this.showoverlay = false
        },
        determineClick() {
            this.showoverlay = false
            let params = {
                sid: this.selectItem,
                cid: this.addId,
            }
            distributionCustomer(params).then(res => {
                this.noDistribution();
            })
            this.selectItem = ''
            
        },
    },

}
</script>

<style lang="scss" scoped>

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
.canceldet {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 50px;
    padding: 0px 20px 0px 0px;
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
.block {
    width: 300px;
    height: 200px;
    background-color: #fff;
}

.wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}


::v-deep .van-field__label {
    color: #A1A1A1;
}

.addDiv {
    display: flex;
    justify-content: center;
    margin-top: 12px;
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

.user_information {
    padding: 8px 0px 0px 10px;
}

::v-deep .van-icon {
    font-size: 20px;
    font-weight: bold;
    color: black;
}
</style>

