<template>
    <div>
        <van-nav-bar title="工作台" />
        <div style="background-color: #fff">
            <div class="uickfunctions">快捷功能</div>
            <div style="display: flex;flex-wrap: wrap;padding: 0px 11px 10px 15px;">
                <div class="uicks" @click="allocatedClick">
                    <div style="font-weight: bold;">{{ todayCustomer.nodistributeCustomer }}</div>
                    <div style="font-size: 14px;">待分配客户</div>
                </div>
                <div class="uicks" @click="followupClick">
                    <div style="font-weight: bold;">{{ todayCustomer.followCustomer }}</div>
                    <div style="font-size: 14px;">正在跟进</div>
                </div>
                <div class="uicks" @click="dealClick">
                    <div style="font-weight: bold;">{{ todayCustomer.dealCustomer }}</div>
                    <div style="font-size: 14px;">成交客户</div>
                </div>
                <div class="uicks" @click="allschedulesClick">
                    <div style="font-weight: bold;">{{ todayCustomer.allSchedule }}</div>
                    <div style="font-size: 14px;">全部日程</div>
                </div>
                <div class="uicks" @click="purchaseClick">
                    <div style="font-weight: bold;">{{ todayCustomer.purchaseOpportunities }}</div>
                    <div style="font-size: 14px;">采购商机</div>
                </div>
                <div class="uicks" @click="resourcesClick">
                    <div style="font-weight: bold;">{{ todayCustomer.customerSource }}</div>
                    <div style="font-size: 14px;">客户资源</div>
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
                <div class="uicks" @click="addCustomerClick">
                    <div style="font-weight: bold;">{{ dataStatistics.insertCustomer }}</div>
                    <div style="font-size: 14px;">新增客户</div>
                </div>
                <div class="uicks" @click="salestrendsClick">
                    <div style="font-weight: bold;">{{ dataStatistics.salesTrend }}</div>
                    <div style="font-size: 14px;">销售动态</div>
                </div>
            </div>
        </div>
        <div style="background-color: #fff;margin-top: 8px;">
            <div class="uickfunctions">售后跟进</div>
            <div style="display: flex;flex-wrap: wrap;padding: 0px 11px 10px 15px;">
                <div class="uicks">
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
import { memberIndex } from '@/api/user'
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
            list: {},
            quickfunction: [],
            dataStatistics: [],
            aftefollow: [],
            todayCustomer: []
        }
    },
    created() {
        this.memberIndexList();
    },
    methods: {
        memberIndexList() {
            memberIndex({}).then(res => {
                this.todayCustomer = res.data.data.quick_functions
                this.dataStatistics = res.data.data.data_statistics
                this.aftefollow = res.data.data.sales_follow
            })
        },
        // 待分配客户
        allocatedClick() {
            this.$router.push('../workbench/Tobeallocated')
        },
        // 正在跟进
        followupClick(data) {
            this.$router.push({ path: "/workbench/followup", query: { id: data.id } })
        },
        // 成交客户
        dealClick() {
            this.$router.push('../workbench/deal')
        },
        // 全部日程
        allschedulesClick() {
            this.$router.push('../workbench/allschedules')
        },
        // 采购商机
        purchaseClick() {

        },
        //导入客户
        ImportClick() {

        },
        // 客户资源
        resourcesClick() {
            this.$router.push('../workbench/customerSource')
        },
        // 今日跟进
        todayFollowupClick() {
            this.$router.push('../workbench/todayFollowup')
        },
        // 本月成交
        thismonthClick() {
            this.$router.push('../workbench/thismonth')
        },
        // 新增客户
        addCustomerClick() {
            this.$router.push('../workbench/addCustomer')
        },
        // 销售动态
        salestrendsClick() {
            this.$router.push('../workbench/salestrends')
        },

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