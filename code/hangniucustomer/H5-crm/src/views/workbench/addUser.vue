<template>
    <div>
        <addcustomertube v-if="newlyadded" :getcustomer="addcustomer"></addcustomertube>
        <addcustomerstaff v-if="!newlyadded" :getcustomer="addcustomer"></addcustomerstaff>
    </div>
</template>
<style>
body {
    height: 100%;
    background-color: #EFEFF4;
}
</style>
<script >
import addcustomertube from '@/components/addcustomertube.vue'
import addcustomerstaff from '@/components/addcustomerstaff.vue'
import { customerAdd } from '@/api/user'
export default {
    props: {

    },
    components: {
        addcustomertube,
        addcustomerstaff
    },
    data() {
        return {
            newlyadded: false,   //flase员工 true管理
            addcustomer: {},
        }
    },
    created() {
        // 判断身份就显示不同的组件
        let userInfo = JSON.parse(localStorage.getItem('userInfo'))
        if (userInfo.isLeader) {
            this.newlyadded = true
        }
    },
    methods: {
        addClick() {
            customerAdd({
                company_name: this.company_name,
                address: this.address,
                product: this.product,
                contact_name: this.contact_name,
                contact_phone: this.contact_phone,
                customer_note: this.message,
                customer_purchase_time: this.purchasetime,
                level: this.grade,
                customer_source: this.source,
                post: this.post,
            }).then(res => {
                this.addcustomer = res.data
                // 这是新增页面的主页面
            })
        },
        onSelect() {

        }
    },

}
</script>

<style lang="scss" scoped>
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

