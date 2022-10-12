<template>
    <div id="app">
        <div class="serviceLocation">
            <div style="font-size:20px;">业务定位<span style="color: #FF4000;">越清晰</span>，项目<span
                    style="color: #FF4000;">越精准</span>，成交<span style="color: #FF4000;">越轻松</span></div>
        </div>
        <div class="content">
            <div class="map_selelct input" style="display:flex;justify-content: center;margin-top: 40px;">
                <div class="b_select">
                    <van-field v-model="fieldValue" is-link readonly label="所在地区" placeholder="请选择所在地区"
                        @click="show = true" />
                    <van-popup v-model="show" round position="bottom">
                        <van-cascader v-model="cascaderValue" title="请选择所在地区" :options="options" @close="show = false"
                            @change="onChange" @finish="onFinish"
                            :field-names="{text: 'label', value: 'value', children: 'children'}" />
                    </van-popup>
                </div>
            </div>
            <div class="productItem" v-for="(product,index) in productList" :key="index">
                <input v-model="product.name" :placeholder="`主营产品${index+1}`" class="mainProducts" />
            </div>
            <div class="addProduct " @click="addProductem">
                <div class="product">+添加主营产品</div>
            </div>
        </div>
        <div class="butVan input">
            <button class="buttonVan" type="info" size="large" round @click="save">完成注册，进入商机页面</button>
        </div>
    </div>
</template>
  
<script>
import inputSelect from "@/components/inputCascader";
import http from '@/utils/http'
import api from '@/api'
export default {
    data() {
        return {
            select: "",
            show: false,
            fieldValue: '',
            fieldValueNb:'',
            cascaderValue: '',
            options: [],
            productList: [{
                name: ""
            }]
        }
    },
    components: {
        inputSelect
    },
    created() {
        this.getCountry();

    },
    methods: {
        // 提交
        save() {
            let params = {
                comid:this.$route.query.comid,
                main_product:this.productList.map(item=>{
                    return item.name
                }),
                district: this.fieldValueNb
            }
            http.post(api.registerNowthree,{
                ...params
            }).then(res => {
                if(res.code == 200){
                    // 成功的跳转和提示
                    this.$router.push('/recommend')
                }else{
                    // 错误的提示
                }
                // console.log(res);
            })
            
        },
        // 追加产品
        addProductem() {
            this.productList.push({ name: "" })
        },
        getCountry() {
            http.get(api.getCountry, { type: "citytwocategory" }).then(res => {
                this.options = res.data
                console.log(this.country);
            })
        },
        onChange({ value ,list}) {
            console.log(111, value);
            // if (value === this.options[0].value) {
            //     setTimeout(() => {
            //         this.options[0].children = [
            //             { text: '杭州市', value: '330100' },
            //             { text: '宁波市', value: '330200' },
            //         ];
            //     }, 500);
            // }
        },
        onFinish({ selectedOptions  }) {
            console.log(23123, this.cascaderValue);
            this.show = false;
            this.fieldValue = selectedOptions.map((option) => option.label).join('/');
            this.fieldValueNb = selectedOptions.map((option) => option.value)
            console.log(this.fieldValueNb);
        },
    }
}
</script>
<style lang="scss">
.b_select {
    .van-cell {
        padding: 8px 17px !important;
        //        padding: 7px 17px;
    }
}
</style> 
<style lang="scss" scoped>
::v-deep .van-cell--clickable {
    padding: 7px 17px;
}

#app {
    padding: 30px;
}

.content {

    // padding: 0 20px;
    .productItem {
        margin-bottom: 10px;
    }

    .input {
        margin-bottom: 10px;
    }
}

.b_select {
    width: 100%;
    height: 35px;
    background: inherit;
    background-color: rgba(255, 255, 255, 1);
    box-sizing: border-box;
    border-width: 1px;
    border-style: solid;
    border-color: rgba(187, 187, 187, 1);
    border-radius: 3px;
    display: flex;
}

.serviceLocation {
    font-size: 18px;
    margin-top: 20px;
    letter-spacing: 1px;
}

.butVan {
    display: flex;
    justify-content: center;
    margin-top: 45px;
}

.buttonVan {
    border-radius: none;
    background-color: rgba(64, 158, 255, 1);
    color: #FFF;
    border: none;
    width: 300px;
    border-radius: 3px;
    height: 40px;
    font-size: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.addProduct {
    display: flex;
    align-items: center;
    margin-top: 30px;
}

.product {
    color: #409EFF;
    width: 120px;
    height: 35px;
    border-radius: 2px;
    font-size: 14px;
    border: 1px solid #409EFF;
    display: flex;
    justify-content: center;
    align-items: center;
}

.optionss {
    color: #666666;
    border: 1Px solid rgba(187, 187, 187, 1);
    font-size: 14px;
    letter-spacing: 1px;
    color: #4C4C4C;
    width: 289px;
    height: 35px;
}

.mainProducts {
    height: 35px;
    background: inherit;
    font-size: 14px;
    color: #333333;
    background-color: rgba(255, 255, 255, 1);
    box-sizing: border-box;
    border-width: 1px;
    border-style: solid;
    border-color: rgba(187, 187, 187, 1);
    border-radius: 3px;
    width: 100%;
    text-indent: 1em;

}
</style>
  