<template>
    <div>
        <van-nav-bar title="全部员工" left-arrow class="left-arrow" @click-left="onClickLeft" />
        <div style="background-color: #fff;margin-top: 5px;" v-for="item in staffpo">
            <van-checkbox-group v-model="result" ref="checkboxGroup" class="group">
                <div class="create_employee">
                    <van-checkbox v-model="item.is_check" @change="checkClick($event, item)" :value="item.id">
                        <div>{{item.name}}</div>
                    </van-checkbox>
                    <div class="followup_img" @click="upimgClick(item)">
                        <img src="../../assets/u24.svg" />
                    </div>
                </div>
            </van-checkbox-group>
            <div class="information">
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
                    <div style="padding-left: 70px;">{{ item.addtime }}</div>
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

export default {
    data() {
        return {
            value: '',
            result: [],
            show: false,
            staffpo: [],
            is_check: true,
        }
    },
    created() {
        this.staffListss();
    },
    methods: {
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
        onClickLeft() {
            this.$router.go(-1)
        },
        onSearch(val) {
            Toast(val);
        },
        onCancel() {
            Toast('搜索');
        },
        //分配销售
        allocateSalesClick() {
            // this.show = true
            deletestaff({

            }).then(res => {

            })
        },
        //新增客户
        addClick() {
            this.$router.push('/workbench/createEmployee')
        },
        staffListss() {
            staffList({}).then(res => {
                this.staffpo = res.data.data.list
            })
        },
        upimgClick(data) {
            this.$router.push({ path: "/workbench/editstaff", query: { id: data.id } })
        }
    }
}
</script>

<style lang="scss" scoped>
.left-arrow {
    ::v-deep .van-icon {
        font-size: 20px;
        font-weight: bold;
        color: black;
    }
}

.create_employee {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 15px 10px 15px;
}

.select_Industry {
    width: 130px;
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
    line-height: 30px;
    padding: 5px 0px 0px 40px;
}

.van-search__content {
    background-color: #fff;
}

.van-search {
    background-color: #EFEFF4;
    padding: 10px 10px 10px 10px;
}
</style>