<template>
    <div class="inviteQuotation">
        <div class="title">
            <div class="img">
                <img width="100%" src="http://www.hangyedaniu.com/upload/resource/img-gongzhonghao/zixun.png" height="100%" />
            </div>
            <p>免费了解更多设备细节和企业成功案例</p>
        </div>
        <div class="input">
            <input placeholder="请输入您的姓名" v-model="formData.name" />
        </div>
        <div class="input">
            <input placeholder="请填写手机号码" v-model="formData.call" />
        </div>
        <div class="textarea">
            <textarea v-model="formData.content" placeholder="填写需求描述，供应商报价更快，更准确" name="" id="" cols="30" rows="10"></textarea>
        </div>
        <div class="text" @click="submit">邀请报价</div>
    </div>
</template>

<script>
import http from '@/utils/http'
import api from '@/api'
export default {
    props:{
        'jobId':{
            type:[Number,String],
            default:''   //默认参数
        }
    },
    data() {
        return{
            formData:{
                name:'',
                call:'',
                content:'',
            }
        }
    },
    methods:{
        submit(){
            if(!this.formData.name || !this.formData.call){
                this.$notify({ type: 'warning', message: '请输入联系方式' });
                return
            }
            let formData = this.formData
            formData.jid = this.jobId
        http.post(api.addContact,formData).then(res=>{
            this.$notify({ type: 'success', message: res.message });
            this.formData = {
                name:'',
                call:'',
                content:'',
            }
        this.$emit('submitChange', res)
        })
        }
    }
}
</script>
<style lang="scss" scoped>
    .inviteQuotation{ display: flex; justify-content: center;border-radius: 10px; background: #fff; flex-direction: column;
        .title{display: flex;align-items: center; font-size: 14px; color: #000;justify-content: center;
            .img{width: 50px; height: 50px;}
        }
        .input{text-align: center;padding: 0 0 10px; position: relative;
            input{border: #ccc 1px solid;padding: 5px;width: 89%;font-size: 12px;}
            &::before{
                left: 5px;
                position: absolute;
                padding: 0 2px 0 0;
                color: red;
                content: '*';
            }
        }
        .textarea{text-align: center; font-size: 14px;
            textarea{padding: 5px;width: 89%;border: #ccc 1px solid;height: 78px;}
        }   
        .text{font-size: 14px;width: 90px;background: #167dff;text-align: center;padding: 5px 10px;border-radius: 8px;margin: 10px auto;color: #fff;} 
    }
</style>
