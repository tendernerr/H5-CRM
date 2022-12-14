<template>
    <div>
        <!-- <div class="Initials">
            <div class="dropdownbox">
                <div style="font-size: 14px;">负责人</div>
                <template>
                    <select class="select_Industry">
                        <option style="border-bottom: 0px;margin-top: 5px">小刘</option>
                        <option style="border-bottom: 0px;margin-top: 5px">小何</option>
                    </select>
                </template>
            </div>
            <div class="dropdownboxs">
                <div style="font-size: 14px;">客户标签</div>
                <template>
                    <select class="select_Industry">
                        <option style="border-bottom: 0px;margin-top: 5px">A</option>
                        <option style="border-bottom: 0px;margin-top: 5px">B</option>
                        <option style="border-bottom: 0px;margin-top: 5px">C</option>
                    </select>
                </template>
            </div>
        </div> -->
        <todayFollowuptube  v-if="todayFollowup" :gettodayFollowup="todayFollowupList"></todayFollowuptube>
        <todayFollowupstaff  v-if="!todayFollowup" :gettodayFollowup="todayFollowupList"></todayFollowupstaff>
    </div>
</template>
<style>
body {
    height: 100%;
    background-color: #EFEFF4;
}
</style>
<script>
import { todayFollow } from '@/api/user';
import todayFollowuptube from '@/components/todayFollowuptube.vue'
import todayFollowupstaff from '@/components/todayFollowupstaff.vue'
export default {
    components: {
        todayFollowuptube,
        todayFollowupstaff
    },
    data() {
        return {
            todayFollowup:false,
            todayFollowupList:{},
        };
    },
    created() {
        let userInfo = JSON.parse(localStorage.getItem('userInfo'))
        if (userInfo.isLeader) {
            this.Memberornot = true
        }
        this.todayList();
    },
    mounted(){
       
    },
    methods: {
        dial(phone) {
            window.location.href = `tel:${phone}`;
        },
        onSearch(val) {
            Toast(val);
        },
        onCancel() {
            Toast('搜索');
        },
        onClickLeft() {
            this.$router.go(-1)
        },
        todayList() {
            todayFollow({
                page: 1,
                pagesize: 10
            }).then(res => {
                this.todayFollowupList=res.data.data
                // this.list = res.data.data.list.map(item => {
                //     return {
                //         name: item.device_name,
                //         ...item
                //     }
                // });
            })
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
    padding-top: 10px;
    justify-content: space-between;
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
    font-size: 17px;
    letter-spacing: 1px;
    padding-left: 12px;
}

.information {
    font-size: 12px;
    letter-spacing: 1px;
    color: #8A8A8A;
    line-height: 25px;
}

::v-deep .van-nav-bar__arrow {
    font-size: 20px;
    font-weight: bold;
    color: black;
}
</style>