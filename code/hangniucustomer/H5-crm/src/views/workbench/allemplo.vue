<template>
    <div>
        <van-nav-bar title="全部员工" class="left-arrowa" left-arrow @click-left="onClickLeft" />
        <div class="stay_contentName" v-for="(item, index) in staffpo" :key="index">
            <div class="create_employee">
                <van-checkbox v-model="item.is_check" @change="checkClick($event, item)" :value="item.id">
                    <div>{{ item.name }}</div>
                </van-checkbox>
                <div @click="upimgClick(item)"><img src="../../assets/u24.svg" /></div>
            </div>
            <div class="stay">
                <div class="stay_contentpo">
                    <div style="display: flex;">
                        <div>手机号码</div>
                        <div style="padding-left: 65px;">{{ item.phone }}</div>
                    </div>
                    <div style="display: flex;">
                        <div>岗位</div>
                        <div style="padding-left: 95px;">{{ item.post }}</div>
                    </div>
                    <div style="display: flex;">
                        <div>入职时间</div>
                        <div style="padding-left: 70px;">{{ item.entry_time }}</div>
                    </div>
                </div>

            </div>
        </div>
        <div style="width: 100%; height: 45px;"></div>
        <div style="display:flex; position: fixed; bottom: 0px;  width: 100%;">
            <div class="introduce_loves"><img src="../../assets/u23.svg" />
                <div style="padding-left: 5px;" @click="allocateSalesClick">删除</div>
            </div>
            <div class="introduce_love"><img src="../../assets/u22.svg" />
                <div style="padding-left: 5px;" @click="addClick">添加员工</div>
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

import { staffList, deletestaff } from '@/api/user'
import { Notify } from 'vant';
import { Dialog } from 'vant';
export default {
    data() {
        return {
            values: '',
            result: [],
            staffpo: [],
            is_check: true,
            resultpo: [],
            check_ids: [],
        }
    },
    created() {
        this.staffListss();
    },
    methods: {
        onClickLeft() {
            this.$router.push('/workbench/mydata')
        },
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
        //新增客户
        addClick() {
            this.$router.push('/workbench/addUser')
        },
        upimgClick(data) {
            this.$router.push({ path: "/workbench/editstaff", query: { id: data.id } })
        },
        staffListss() {
            staffList({}).then(res => {
                this.staffpo = res.data.data.list
            })
        },
        //删除按钮
        allocateSalesClick() {
            if (this.check_ids == '') {
                Notify({ type: 'success', message: '请选择要删除的员工' });
            }
            else {
                Dialog.confirm({
                    message: '确定要删除所选中的员工吗？',
                })
                    .then(() => {
                        this.delectClick();
                        Notify({ type: 'success', message: '删除成功' });
                        this.staffListss();
                    })
                    .catch(() => {
                        // on cancel
                    });
            }
        },
        // 删除方法
        delectClick() {
            deletestaff({
                id: this.check_ids,
            }).then(res => {
                this.staffListss();
            })
        },
        //新增客户
        addClick() {
            this.$router.push('/workbench/createEmployee')
        },
    }
}
</script>

<style lang="scss" scoped>
.introduce_loves {
    color: #FFF;
    display: flex;
    width: 50%;
    background-color: rgba(255, 64, 0, 1);
    height: 45px;
    box-shadow: none;
    line-height: 45px;
    text-align: center;
    align-items: center;
    justify-content: center;
}

.create_employee {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
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
    font-size: 12px;
    letter-spacing: 1px;
    color: #8A8A8A;
    line-height: 30px;
    padding: 5px 0px 0px 40px;
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
    padding: 10px 10px 10px 10px;
}
</style>