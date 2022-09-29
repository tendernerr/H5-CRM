<template>
  <div class="content">
     <Head bgColor="#fff">行业大牛网</Head>
     <div class="box">
        <h5 class="box-h51">填写采购要求信息</h5>
        <h5 class="box-h52">百万优质供应商为您精准匹配推荐</h5>
        <div class="box-middle">
            <div class="middle-text red">采购产品</div>
            <div class="middle-input" :class="name">
                <input @change='inputChange("name")' class="input" v-model.trim="params.name" placeholder="请填写采购产品名称" type="text">
            </div>
            <div class="middle-text">采购需求</div>
            <div class="middle-input">
                <textarea class="textarea" v-model="params.remark" rows="5" placeholder="请简单描述您的需求" ></textarea>
            </div>
            <div class="middle-text red" @change='inputChange("phone")'>
                手机号码
            </div>
            <div class="middle-input" :class="phone">
                <input class="input input2" v-model.trim="params.phone" placeholder="请输入您的电话号码" type="text">
            </div>
        </div>
        <p class="box-p">零费用/高效率准对接/省时省心省力省钱</p>
        <div class="submit" @click="submit" >填写完成</div>
     </div>
  </div>
</template>
<script>
    import {mapState} from 'vuex'
    import http from '@/utils/http'
    import api from '@/api'
    export default {
    data () {
        return {
            testPhone: /0?(13|14|15|17|18|19)[0-9]{9}/,
            name:'',
            phone:'',
            params:{
                name:'',
                phone:'',
                remark:'',
            },
            timer:null,
        }
    },
    created () {},
    computed:{},
    watch: {},
    methods: {
        inputChange(e){
            this[e] = ''
            if(this.params[e] == '') this[e] = e;
        },
        submit(){
            [this.name,this.phone] = ['']
            if(this.params.name === '' || this.params.phone == ''){
                if(this.params.name == '') this.name = 'name';
                if(this.params.phone == '') return this.phone = 'phone';
                if(RegExp(this.params.phone).test(this.testPhone)) this.phone = 'testPhone';
                return
            }
            if(RegExp(this.params.phone).test(this.testPhone)) return this.phone = 'testPhone';
            clearTimeout(this.timer)
            http.post(api.addContact,this.params).then(res=>{
                [this.name,this.phone,this.params.name,this.params.phone,this.params.remark] = ['']
                this.$toast(res.message)
                this.timer = setTimeout(()=>{
                    this.$router.back()
                },800)
            })
        },
      }
    }
</script>

<style lang="scss" scoped>
    .content{background: linear-gradient( to bottom,#0077cb 0%, #0077cb 27%,#f3f3f3 27%,#f3f3f3 100% ); min-height: 100vh; padding: 0 0 20px;
        .box{display: flex; flex-direction: column;
            &-h51{text-align: center;padding: 17px 0 0 0;color: #ffffff;}
            &-h52{text-align: center;padding: 9px 0 0 0;color: #ffffff;}
            &-middle{background: #ffffff;border-radius: 5px;margin: 20px auto 0;width: 93%;padding: 0 20px 20px;font-size: 15px;}
            .middle-text{padding: 25px 0 0;color: #000;}
            .middle-input{padding: 8px 0 0;}
            .input{width: 100%;border: 0;border-bottom: 1px solid #ccc;padding: 3px 0px 5px 0px;}
            .textarea{width: 100%; border: 1px solid #ccc;padding: 8px;}
            .input2{border: 1px solid #ccc; padding: 3px 0px 5px 8px;}
            .red{ position: relative;
                &::before{content: '*'; position: absolute; color: red;left: -8px;}
            }
            &-p{font-size: 15px;text-align: center;padding: 25px 0 0;}
            .submit{font-size: 19px;width: 80%;text-align: center;margin: 25px auto 0;background: #2f9ae6;height: 2em;line-height: 2em;color: #fff;border-radius: 20px;}
           }
           div[class*=name]{
             &::after{content: '请输入产品名称'; position: relative; color: red;animation:rotate .5s linear 1;}
           }
           div[class*=phone]{
             &::after{content: '请输入手机号'; position: relative; color: red;animation:rotate .5s linear 1;}
           }
           div[class*=testPhone]{
             &::after{content: '请输入正确的手机号'; position: relative; color: red;animation:rotate .5s linear 1;}
           }
            @keyframes rotate{
                0%   {left: -10px;}
                25%  {left: 10px;}
                50%  {left: -8px;}
                75%  {left: 5px;}
                100% {left: 0px;}
            }
        }
</style>
