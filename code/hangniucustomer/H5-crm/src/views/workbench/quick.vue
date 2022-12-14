<template>
    <div>
        <workbenchtube v-if="administration" :getData="formData"></workbenchtube>
        <workbenchstaff v-if="!administration" :getData="formData"></workbenchstaff>
    </div>
</template>    
<style>
body {
    height: 100%;
    background-color: #EFEFF4;
}
</style>
<script>
import workbenchtube from '@/components/workbenchtube.vue'
import workbenchstaff from '@/components/workbenchstaff.vue'
import { memberIndex } from '@/api/user'
export default {
    props: {
        clientId: {}
    },
    components: {
        workbenchtube,
        workbenchstaff
    },
    data() {
        return {
            administration: false, //是否管理员还是员工
            formData: {},
        }
    },
    created() {
        this.memberIndexList();
       
    },
    methods: {
        memberIndexList() {
            memberIndex({}).then(res => {
                this.formData = res.data.data
                this.administration = res.data.data.isLeader
            })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>