<template>
    <div>
        <van-nav-bar title="基本资料" left-arrow class="left-arrow" @click-left="onClickLeft"/>
        <div style="background-color: #EFEFF4;height:5px;"></div>
        <div>
            <div>
                <van-cell-group>
                    <div class="informations">
                        <span style="color:red;margin-top: 12px;padding-left: 12px;">*</span>
                        <div class="name">公司名称</div>
                    </div>
                    <van-field v-model="companyname" placeholder="请输入公司名称"></van-field>
                </van-cell-group>
            </div>
            <div style="background-color: #FFFF">
                <div class="informations">
                    <span style="color:red;margin-top: 12px;padding-left: 12px;"></span>
                    <div class="name">您的身份</div>
                </div>
                <van-field v-model="suppliertagValue" is-link readonly label="请选择" placeholder="请选择" @click="show = true" />
                <van-popup v-model="show" round position="bottom">
                    <van-cascader title="请选择" :options="companyscale" @close="show = false" @change="onChange"
                        @finish="onFinish" :field-names="{ text: 'name', value: 'name' }" />
                </van-popup>
            </div>
            <div style="background-color: #FFFF">
                <div class="informations">
                    <span style="color:red;margin-top: 12px;padding-left: 12px;"></span>
                    <div class="name">企业规模</div>
                </div>
                <van-field v-model="fieldValue" is-link readonly label="请选择" placeholder="请选择"
                    @click="showsuppliertag = true" />
                <van-popup v-model="showsuppliertag" round position="bottom">
                    <van-cascader title="请选择" :options="suppliertag" @close="showsuppliertag = false"
                        @change="suppliertagChange" @finish="suppliertagFinish"
                        :field-names="{ text: 'name', value: 'name' }" />
                </van-popup>
            </div>
            <div>
                <van-cell-group>
                    <div class="informations">
                        <span style="color:red;margin-top: 12px;padding-left: 12px;"></span>
                        <div class="name">姓名</div>
                    </div>
                    <van-field v-model="name" placeholder="请输入" />
                </van-cell-group>
            </div>
        </div>
        <div class="addDiv">
            <div class="add" @click="addClick">确定</div>
        </div>
    </div>
</template>
<style>
body {
    background-color: #FFF !important;
}
</style>
<script>
import { classifyIndex, staffUpdata, staffEdit} from '@/api/user'
export default {
    data() {
        return {
            name: '',
            actions: [],
            show: false,
            fieldValue: '', //地址
            options: [],
            companyscale: [],
            suppliertag: [],
            showsuppliertag: false,
            suppliertagValue: '',
            // basicinfor:[],
            companyname: '',
        }
    },
    created() {
        this.classifyList();
        this.staffUpdataList();
    },
    methods: {
        onClickLeft() {
            this.$router.go(-1)
        },
        onSelect() {

        },
        addClick() {
            staffEdit({
                companyname:this.companyname,
                post:this.fieldValue,
                scale:this.suppliertagValue,
                name:this.name
            }).then(res => {
                  this.$router.push('/workbench/mydata')
            })
        },
        //公司地址
        onFinish({ selectedOptions }) {
            this.show = false;
            this.fieldValue = selectedOptions.map((companyscale) => companyscale.name).join('/');
        },
        onChange({ value, selectedOptions, tabIndex }) { },
        //公司规模
        suppliertagFinish({ selectedOptions }) {
            this.showsuppliertag = false;
            this.suppliertagValue = selectedOptions.map((suppliertag) => suppliertag.name).join('/');
        },
        suppliertagChange({ value, selectedOptions, tabIndex }) { },
        classifyList() {
            classifyIndex({ type: 'supplierTag,companyScale' }).then(res => {
                this.companyscale = res.data.data.supplierTag
                this.suppliertag = res.data.data.companyScale
            })
        },
        staffUpdataList() {
            staffUpdata({}).then(res => {
                this.companyname = res.data.data.companyname
                this.fieldValue = res.data.data.post
                this.suppliertagValue = res.data.data.scale
                this.name = res.data.data.name
            })
        },
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

::v-deep .van-overlay {
    z-index: 1 !important;
}

.addDiv {
    display: flex;
    justify-content: center;
    margin-top: 70px;
}

.add {
    border: none;
    color: rgb(255, 255, 255);
    width: 50%;
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
    line-height: 40px;
}

.van-cell__right-icon {
    font-size: 20px;
}

.van-cell {
    border-bottom: 1px solid rgba(217, 217, 217, 1);
    letter-spacing: 2px;
    color: #A1A1A1;
    padding: 10px 16px 10px 25px;
}

.name {
    font-size: 15px;
    letter-spacing: 1px;
    margin-left: 10px;
    padding-top: 5px;
}

.informations {
    display: flex;
    align-items: center;
    padding-top: 5px;
}
</style>