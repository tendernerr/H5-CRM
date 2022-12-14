<template>
    <div>
        <wholescheduletube v-if="Memberornot" :getwholeschedule="wholeschedule"></wholescheduletube>
        <wholeschedulestaff v-if="!Memberornot" :getwholeschedule="wholeschedule"></wholeschedulestaff>
    </div>
</template>
<style>
body {
    height: 100%;
    background-color: #EFEFF4;
}
</style>
<script>
import { getAllSchedules } from '@/api/user'
import wholescheduletube from '@/components/wholescheduletube.vue'
import wholeschedulestaff from '@/components/wholeschedulestaff.vue'
export default {
    props: {

    },
    components: {
        wholescheduletube,
        wholeschedulestaff
    },
    data() {
        return {
            Memberornot:false,
            wholeschedule:{},
        };
    },
    created() {
        let userInfo = JSON.parse(localStorage.getItem('userInfo'))
        if (userInfo.isLeader) {
            this.Memberornot = true
        }
        this.getAllList();
    },
    methods: {
        phoneClick(phone) {
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
        getAllList() {
            getAllSchedules({
                page: 1,
                pagesize: 10,
                uid: this.$route.query.id
            }).then(res => {
                this.wholeschedule= res.data.data
                
            })
        },
        listClick(data) {
            this.$router.push({ path: "/workbench/customers", query: { id: data.id } })
        }
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