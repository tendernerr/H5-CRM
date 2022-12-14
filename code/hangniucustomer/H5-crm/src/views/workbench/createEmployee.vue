<template>
    <div>
        <van-nav-bar title="创建员工" left-arrow @click-left="onClickLeft" />
        <div>
            <div style="background-color:#FFF;line-height: 30px;">
                <div>
                    <van-cell-group>
                        <div class="informations">
                            <span style="color:red;margin-top: 12px;padding-left: 12px;">*</span>
                            <div class="name">姓名</div>
                        </div>
                        <van-field v-model="name" placeholder="填写员工名称" />
                    </van-cell-group>
                </div>
                <div>
                    <van-cell-group>
                        <div class="informations">
                            <span style="color:red;margin-top: 12px;padding-left: 12px;"></span>
                            <div class="name">岗位</div>
                        </div>
                        <van-field v-model="post" is-link readonly placeholder="填写员工岗位" @click="showpost = true" />
                        <van-popup v-model="showpost" round position="bottom">
                            <van-cascader title="请选择" :options="suppliertag" @close="showpost = false"
                                @change="onChangepost" @finish="onFinishpost"
                                :field-names="{ text: 'name', value: 'name' }" />
                        </van-popup>
                    </van-cell-group>
                </div>
                <div>
                    <van-cell-group>
                        <div class="informations">
                            <span style="color:red;margin-top: 12px;padding-left: 12px;"></span>
                            <div class="name">入职时间</div>
                        </div>
                        <van-field v-model="purchasetime" is-link readonly  placeholder="请选择员工入职的时间"
                            @click="timeClick" />
                        <van-popup v-model="showtime" round position="bottom">
                            <van-datetime-picker v-model="currentDate" @cancel="cancel()" @confirm="confirmFn()"
                                type="date" title="选择年月日" :min-date="minDate" :max-date="maxDate" />
                        </van-popup>
                    </van-cell-group>
                </div>
                <div>
                    <van-cell-group>
                        <div class="informations">
                            <span style="color:red;margin-top: 12px;padding-left: 12px;">*</span>
                            <div class="name">手机号</div>
                        </div>
                        <van-field v-model="phone" placeholder="填写员工手机号" />
                    </van-cell-group>
                </div>
                <div>
                    <van-cell-group>
                        <div class="informations">
                            <span style="color:red;margin-top: 12px;padding-left: 12px;"></span>
                            <div class="name">手机工号</div>
                        </div>
                        <van-field v-model="number" placeholder="请填写" />
                    </van-cell-group>
                </div>
                <div>
                    <van-cell-group>
                        <div class="informations">
                            <span style="color:red;margin-top: 12px;padding-left: 12px;"></span>
                            <div class="name">密码</div>
                        </div>
                        <van-field v-model="password" placeholder="请为员工设置一个密码" />
                    </van-cell-group>
                </div>
            </div>
            <div class="addDiv">
                <div class="add" @click="addClick">创建</div>
            </div>
        </div>
    </div>
</template>
<style>
body {
    background-color: #FFF;
}
</style>
<script >
import { addStaff, classifyIndex } from '@/api/user'
import { Notify } from 'vant';
export default {
    data() {
        return {
            name: '',
            actions: [],
            show: false,
            message: '',
            suppliertag: [],
            showpost: false,
            post: '', //岗位
            phone: '',//手机号
            number: '',//手机工号
            password: '',//密码
            purchasetime: '',
            showtime: false,
            isShowBirth: false, // 显示时间选择器
            minDate: new Date(1900, 0, 1), // 最小的可选的日期
            maxDate: new Date(2040, 0, 1), // 最大的可选日期
            currentDate: new Date(),  //当前时间
        }
    },
    created() {
        this.classifyList();
    },
    methods: {
        timeClick(){
            this.showtime = true
        },
        //时间取消按钮
        cancel() {
            this.showtime = false
        },
        //时间确定按钮
        async confirmFn() {
            this.showtime = false
            this.purchasetime = new Date(this.currentDate).toJSON().split('T')[0] //转换日期格式
        },
        addClick(data) {
            var phoneReg = /(^1\d{10}$)|(^[0-9]\d{7}$)/;
            if (!phoneReg.test(this.phone)) {
                Notify({ type: 'danger', message: `请输入正确的手机号` });
            } else if (this.name == "") {
                Notify({ type: 'danger', message: `请输入员工名称` });
            } else if (this.phone == "") {
                Notify({ type: 'danger', message: `请输入手机号` });
            } else {
                addStaff({
                    name: this.name,
                    post: this.post,
                    phone: this.phone,
                    number: this.number,
                    password: this.password,
                    entry_time:this.purchasetime
                }).then(res => {
                    if (res.data.code == 500) {
                        Notify({ type: 'danger', message: `该手机号已注册,请重新输入新手机号` });
                    }
                    else {
                            this.$router.push({ path: "/workbench/allemplo", query: { id: data.id } })
                    }
                })
            }
        },
        onSelect() {

        },
        onClickLeft() {
            this.$router.go(-1)
        },
        classifyList() {
            classifyIndex({ type: 'supplierTag,companyScale' }).then(res => {
                this.suppliertag = res.data.data.supplierTag
            })
        },
        onFinishpost(selectedOptions) {
            //岗位
            this.showpost = false;
            this.post = selectedOptions.selectedOptions.map((suppliertag) => suppliertag.name).join('')
        },
        onChangepost({ value, selectedOptions, tabIndex }) { },

    }
}
</script>

<style lang="scss" scoped>
.addDiv {
    display: flex;
    justify-content: center;
    margin-top: 50px;
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