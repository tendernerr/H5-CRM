<template>
    <div>
        <van-nav-bar title="工作台" />
        <div style="background-color: #fff">
            <div class="uickfunctions">快捷功能</div>
            <div style="display: flex;flex-wrap: wrap;padding: 0px 11px 10px 15px;">
                <div class="uicks" @click="allocatedClick">
                    <div style="font-weight: bold;">{{ quickfunction.allCustomer }}</div>
                    <div style="font-size: 14px;">所属客户</div>
                </div>
                <div class="uicks" @click="followupClick">
                    <div style="font-weight: bold;">{{ quickfunction.followCustomer }}</div>
                    <div style="font-size: 14px;">正在跟进</div>
                </div>
                <div class="uicks" @click="dealClick">
                    <div style="font-weight: bold;">{{ quickfunction.dealCustomer }}</div>
                    <div style="font-size: 14px;">成交客户</div>
                </div>
                <div class="uicks" @click="allschedulesClick">
                    <div style="font-weight: bold;">{{ quickfunction.allSchedule }}</div>
                    <div style="font-size: 14px;">全部日程</div>
                </div>
                <div class="uicks" @click="staydoClick">
                    <div style="font-weight: bold;">{{ quickfunction.todayNoFollow }}</div>
                    <div style="font-size: 14px;">今日待办</div>
                </div>
                <div class="uicks">
                    <div style="font-weight: bold;">{{ quickfunction.purchaseOpportunities }}</div>
                    <div style="font-size: 14px;">采购商机</div>
                </div>
            </div>
        </div>
        <div style="background-color: #fff;margin-top: 8px;">
            <div class="uickfunctions">数据统计</div>
            <div style="display: flex;flex-wrap: wrap;padding: 0px 11px 10px 15px;">
                <div class="uicks" @click="todayFollowupClick">
                    <div style="font-weight: bold;">{{ dataStatistics.todayCustomer }}</div>
                    <div style="font-size: 14px;">今日跟进</div>
                </div>
                <div class="uicks" @click="thismonthClick">
                    <div style="font-weight: bold;">{{ dataStatistics.monthDealCustomer }}</div>
                    <div style="font-size: 14px;">本月成交</div>
                </div>
            </div>
        </div>
        <div style="background-color: #fff;margin-top: 8px;">
            <div class="uickfunctions">售后跟进</div>
            <div style="display: flex;flex-wrap: wrap;padding: 0px 11px 10px 15px;">
                <div class="uicks" @click="aftersalesClick">
                    <div style="font-weight: bold;">{{ aftefollow.mySafeAfter }}</div>
                    <div style="font-size: 14px;">我的售后</div>
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
<script>
export default {
    props: {
        getData: {
            type: Object,
            default: () => {
                data_statistics: { }
            }
        }
    },
    data() {
        return {
            list:{},
            quickfunction: [],
            dataStatistics: [],
            aftefollow: [],
        }
    },
    created() {
        this.list = this.getData;  //赋值
    },
    watch: {
        getData(newValue, oldValue) {
            this.quickfunction = this.getData.quick_functions
            this.dataStatistics=this.getData.data_statistics
            this.aftefollow=this.getData.sales_follow
        }
    },
    methods: {
        // 所属客户
        allocatedClick() {
            this.$router.push('../staff/placecustomer')
        },
        // 正在跟进
        followupClick(data) {
            this.$router.push({ path: "/staff/followupstaff", query: { id: data.id } })
        },
        // 成交客户
        dealClick() {
            this.$router.push('../staff/dealstaff')
        },
        // 全部日程
        allschedulesClick() {
            this.$router.push('../workbench/allschedules')
        },
        // 今日待办
        staydoClick(){
            this.$router.push('/workbench/todoToday')
        },
        // 今日跟进
        todayFollowupClick() {
            this.$router.push('../workbench/todayFollowup')
        },
        // 本月成交
        thismonthClick() {
            this.$router.push('../workbench/thismonth')
        },
        //我的售后
        aftersalesClick(){
            
        }
    }
}
</script>

<style lang="scss" scoped>
.uicks {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
    padding: 12px;
    margin-top: 10px;
}

.uickfunctions {
    font-family: 'Arial Negreta', 'Arial Normal', 'Arial', sans-serif;
    font-weight: 700;
    font-style: normal;
    font-size: 14px;
    letter-spacing: 2px;
    padding: 10px;
    color: #333333;
}
</style>