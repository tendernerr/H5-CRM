<template>
    <div id="app">
        <van-icon name="arrow-left" @click="iconClick"/>
        <div class="certifications">
            <div>为响应国家政策号召 保障您的账号安全</div>
        </div>
        <div class="certification">请您在此页面完成<span style="color: #FF4000;">实名认证</span></div>
        <div class="service">完善信息 即享完整服务</div>
        <div>
            <div class="Serinput"><input placeholder="请输入您的公司名称" v-model="companyname" class="inputSer" /></div>
            <div class="vocationName">
                <div class="Serslent"><input placeholder="请输入您的姓名" v-model="contact" id="inputName" /></div>
                <div>
                    <select name="art-cate" v-model="post" class="position" >
                        <option selected value="">请输入您的职位</option>
                        <option v-for="(item,index) in arr " :key="index" :value="item.id">{{item.name}}</option>
                    </select>
                </div>
            </div>
        </div>
        <!-- <div class="butVan">
            <button class="buttonVan" type="info" size="large" round @click="viewOpportunities">下一步，立即查看精准商机</button>
        </div> -->
        <div class="content">
            <div class="map_selelct input" style="display:flex;justify-content: center;margin-top: 15px;">
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
            arr: [],
            mobile: "",
            companyname: "",
            contact: "",
            post: "",
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
    created() {
        this.mobile = this.$route.query.phone;
        this.getposition();
        this.getCountry();
    },
    components: {
        inputSelect
    },
    methods: {
        iconClick(){
            this.$router.push('/member/login')
        },
        artChange(e){
            console.log(
                e
            );
        },
        // viewOpportunities() {
        //     http.post(api.registerNowtwo, {
        //         companyname: this.companyname,
        //         contact: this.contact,
        //         mobile: this.mobile,
        //         post: this.post
        //     }).then(res => {
        //         if(res.code==200){
        //             this.$router.push({path:"/member/addArticle",query:{
        //                 comid:res.data.comid
        //             }})
        //         }
        //     })
        // },
        getposition() {
            http.get(api.getposition, { type: "supplierTag" }).then(res => {
                this.arr = res.data
            })
        },
              // 提交
              save() {
                if (!this.companyname) {
					this.$notify('请输入公司名称')
					return false
				}
                if (!this.contact) {
					this.$notify('请输入姓名和选择您的职位')
					return false
				}
                if (!this.product>1) {
					this.$notify('请输入主营产品')
					return false
				}
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
  
<style lang="scss" scoped>
.b_select {
    .van-cell {
        padding: 8px 17px !important;
        //        padding: 7px 17px;
    }
}
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
    // height: 35px;
    background: inherit;
    background-color: rgba(255, 255, 255, 1);
    box-sizing: border-box;
    border-width: 1px;
    border-style: solid;
    border-color: rgba(187, 187, 187, 1);
    border-radius: 3px;
    display: flex;
    align-items: center;
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
.certifications {
    display: flex;
    justify-content: center;
    margin-top: 10px;
    font-size: 16px;
    letter-spacing: 2px;
    line-height: 30px;
}

.certification {
    display: flex;
    justify-content: center;
    font-size: 16px;
    letter-spacing: 2px;
    line-height: 30px;
}

.service {
    display: flex;
    justify-content: center;
    margin-top: 50px;
    font-size: 16px;
    letter-spacing: 2px;
    line-height: 5px;
}

.Serinput {
    margin-top: 20px;
    display: flex;
    justify-content: center;
}

.Serslent {
    margin-top: 15px;
    display: flex;
    justify-content: center;
}

.inputSer {
    width: 335px;
    height: 45px;
    font-size: 13px;
    border-radius: 2px;
    padding-left: 15px;
    border: 1px solid rgba(187, 187, 187, 1);
    letter-spacing: 1px;
    color: #A1A1A1;
}

#inputName {
    // width: 150px;
    // height: 30px;
    width: 176px;
    height: 42px;
    font-size: 13px;
    padding-left: 15px;
    border-radius: 2px;
    color: #A1A1A1;
    border: 1px solid rgba(187, 187, 187, 1);
}

.selectOpt {
    width: 140px;
    height: 30px;
    color: #A1A1A1;
    font-size: 13px;
    border: 1px solid rgba(187, 187, 187, 1);
}

.position {
    width: 133px;
    height: 42px;
    border-radius: 2px;
    letter-spacing: 1px;
    margin-top: 15px;
    margin-left: 8px;
    padding-left: 2px;
    color: #A1A1A1;
    border: 1px solid rgba(187, 187, 187, 1);
}

.vocationName {
    display: flex;
    justify-content: center;
    align-items: center;
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
</style>
  