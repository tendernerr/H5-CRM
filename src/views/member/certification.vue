<template>
    <div id="app">
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
        <div class="butVan">
            <button class="buttonVan" type="info" size="large" round @click="viewOpportunities">下一步，立即查看精准商机</button>
        </div>
    </div>
</template>
  
<script>
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
            post: ""
        }
    },
    created() {
        this.mobile = this.$route.query.phone;
        this.getposition();

    },
    methods: {
        artChange(e){
            console.log(
                e
            );
        },
        viewOpportunities() {
            http.post(api.registerNowtwo, {
                companyname: this.companyname,
                contact: this.contact,
                mobile: this.mobile,
                post: this.post
            }).then(res => {
                if(res.code==200){
                    this.$router.push({path:"/member/addArticle",query:{
                        comid:res.data.comid
                    }})
                }
            })
        },
        getposition() {
            http.get(api.getposition, { type: "supplierTag" }).then(res => {
                this.arr = res.data
            })
        },
    }
}
</script>
  
<style lang="scss" scoped>
.certifications {
    display: flex;
    justify-content: center;
    margin-top: 50px;
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
    margin-top: 20px;
    display: flex;
    justify-content: center;
}

.inputSer {
    width: 300px;
    height: 30px;
    font-size: 13px;
    border-radius: 2px;
    padding-left: 15px;
    border: 1px solid rgba(187, 187, 187, 1);
    letter-spacing: 1px;
    color: #A1A1A1;
}

#inputName {
    width: 150px;
    height: 30px;
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
    width: 140px;
    height: 30px;
    border-radius: 2px;
    letter-spacing: 1px;
    margin-top: 20px;
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
  