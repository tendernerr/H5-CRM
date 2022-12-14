<template>
    <div>
        <van-nav-bar title="完善公司信息"  left-arrow @click-left="onClickLeft"/>
        <van-cell-group class="crmGroup">
            <span style="color:red;margin-top: 12px;padding-left: 20px;">*</span>
            <van-field v-model="name" placeholder="请输入您的姓名"></van-field>
        </van-cell-group>
        <van-cell-group class="crmGroup">
            <span style="color:red;margin-top: 12px;padding-left: 20px;">*</span>
            <van-field v-model="corporateName" placeholder="请填写你的公司名称 "></van-field>
        </van-cell-group>
        <div class="perfect">
            <div>
                <!-- label="item.attr_name" v-for="item in onlyTabData" :key="item.attr_id" -->
                <van-field readonly="" is-link @click="show = true" v-model="activeActions" label="企业规模" />
                <van-action-sheet  v-model="show" :actions="actions" @select="onSelect" />

            </div>
            <div class="perfect_ast">
                <span class="perfect_asterisk">*</span>
                <van-field readonly="" is-link @click="shows = true" v-model="activeActionsw" label="您的身份" />
                <van-action-sheet v-model="shows" :actions="actionsw" @select="onIdentity" />
            </div>
        </div>
        <div class="crmDiv">
            <div class="crm" @click="crmClick">进入CRM</div>
        </div>
    </div>
</template>

<script>
import { Notify } from 'vant';
import { classifyIndex, staffEdit } from '@/api/user';
export default {
    data() {
        return {
            name:'',
            corporateName: '', //公司名称
            activeActions: '', //企业规模
            activeActionsw: '', //您的身份
            show: false,
            shows: false,
            actions: [],
            actionsw: [],
        };
    },
    created() {
        this.classifyList();
    },
    methods: {
        onClickLeft(){
            this.$router.go(-1)
        },
        //下拉框请求接口数据
        classifyList() {
            classifyIndex({ type: 'supplierTag,companyScale' }).then(res => {
                this.actions = res.data.data.companyScale.map(item => {
                    return {
                        name: item.id,
                        ...item
                    }
                });
                this.actionsw = res.data.data.supplierTag.map(item => {
                    return {
                        name: item.id,
                        ...item
                    }
                })
            })
        },
        //按钮
        crmClick() {
            if (this.name == "") {
                Notify({ type: 'danger', message: `您的姓名不能为空！` })
            }else
            if (this.corporateName == "") {
                Notify({ type: 'danger', message: `公司名称不能为空！` })
            } else if (this.activeActionsw == "") {
                Notify({ type: 'danger', message: `您的身份不能为空！` })
            } else {
                staffEdit({
                    name:this.name,
                    companyname: this.corporateName,
                    post: this.activeActions,
                    scale: this.activeActionsw,
                }).then(res => {
                    if (res.data.code == 200) {
                        this.$router.push('../workbench/quick')
                    }
                })
            }
        },
        //企业规模
        onSelect(item) {
            // 默认情况下点击选项时不会自动收起
            // 可以通过 close-on-click-action 属性开启自动收起
            this.show = false;
            this.activeActions = item.name;
        },
        //您的身份
        onIdentity(item) {
            this.shows = false;
            this.activeActionsw = item.name;
        }
    }
};
</script>

<style lang="scss" scoped>
::v-deep .van-icon {
    font-size: 20px;
    font-weight: bold;
    color: black;
}
>>> .van-field__label {
    color: #959595;
    width: 4.2em!important;
}

.perfect_ast {
    display: flex;
    align-items: center;
    background-color: #FFF;
}

.perfect {
    display: flex;
    align-items: center;
    
}

.perfect_asterisk {
    color: red;
    margin-top: 12px;
    padding-left: 20px;
}

.sescale {
    display: flex;
}

.enterprisescale {
    display: flex;
    justify-content: center;
    align-items: center;
}

.crmGroup {
    display: flex;
    justify-content: center;
    align-items: center;
}

.crmDiv {
    display: flex;
    justify-content: center;
    margin-top: 50px;
}

.crm {
    border: none;
    color: rgb(255, 255, 255);
    width: 323px;
    background-image: inherit;
    background-position: inherit;
    background-size: inherit;
    background-repeat: inherit;
    background-attachment: inherit;
    background-origin: inherit;
    background-clip: inherit;
    background-color: rgb(71, 183, 98);
    border-radius: 3px;
    box-shadow: none;
    font-size: 16px;
    letter-spacing: 3px;
    text-align: center;
    line-height: 38px;
}
</style>