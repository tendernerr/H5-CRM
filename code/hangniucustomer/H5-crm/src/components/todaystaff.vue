<template>
    <div>
        <van-nav-bar title="今日待办" left-arrow @click-left="onClickLeft" />
        <div style="background-color: #fff;margin-top: 10px;" v-for="item in today">
            <van-checkbox-group v-model="result" ref="checkboxGroup">
                <div class="Initial_op">
                    <div class="Initial">
                        <img src="../assets/u20.svg" />
                        <div class="corporateName">{{ item.company_name }}</div>
                    </div>
                </div>
                <div class="group">
                    <div class="information">
                        <div style="display: flex;">
                            <div>客户标签</div>
                            <div style="padding-left: 70px;">{{ item.level }}</div>
                        </div>
                        <div style="display: flex;">
                            <div>联系人</div>
                            <div style="padding-left: 80px;">{{ item.contact_name }}</div>
                        </div>
                        <div style="display: flex;">
                            <div>客户来源</div>
                            <div style="padding-left: 68px;">{{ item.customer_source }}</div>
                        </div>
                        <div style="display: flex;">
                            <div>上次跟进时间</div>
                            <div style="padding-left: 45px;">{{ item.lasttime }}</div>
                        </div>
                        <div style="display: flex;padding: 0px 0px 20px 0px;">
                            <div>最近跟进内容</div>
                            <div style="padding-left: 45px;">{{ item.content }}</div>
                        </div>
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
export default {
    props: {
        gettoday: {
            type: Array,
            default: () => {
                data_statistics: { }
            }
        }
    },
    data() {
        return {
            value: '',
            result: [],
            today: [],
        };
    },
    created() {
    },
    watch: {
        gettoday(newValue, oldValue) {
            this.today = this.gettoday;  //赋值
        }
    },
    methods: {
        onSearch(val) {
            Toast(val);
        },
        onCancel() {
            Toast('搜索');
        },
        onClickLeft() {
            this.$router.go(-1)
        },
    }
};
</script>

<style lang="scss" scoped>
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
    padding: 10px 10px 10px 10px;
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
    padding: 10px 0px 0px 12px;
}

.Initial_op {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .img_op {
        padding-right: 20px;
        width: 16px;
        height: 16px;
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
    font-size: 15px;
    letter-spacing: 1px;
    padding-left: 12px;
}

.information {
    font-size: 12px;
    letter-spacing: 1px;
    color: #8A8A8A;
    line-height: 25px;
    padding-left: 5px;
}

::v-deep .van-nav-bar__arrow {
    font-size: 20px;
    font-weight: bold;
    color: black;
}
</style>