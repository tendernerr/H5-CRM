<template>
  <div class="main">
     <Head>我的日程</Head>
     <div class="time">
        <span>{{time}}</span>
    </div>
    <div class="block">
        <span class="title">昨日商机</span>: 更新<span @click="goList('/resumelist',minDate.sum.active)" class="span">{{minDate.sum.sum}}条</span>新商机，其中<span @click="goList('/recommend',minDate.memberSum.active)" class="span">{{minDate.memberSum.memberSum}}条</span>与你业务相关
    </div>
    <div class="block block2">
        <span><span class="title">案例统计</span>: 您发布了<span @click="goList('/company/'+minDate.id+'?job=job','job')" class="span">{{minDate.caseCount}}条</span>案例</span>
        <span class="span" @click="goList('/shortvideo/release')">发布更多>>></span>
    </div>
    <div class="block block2">
        <span><span class="title">今日跟进</span>: 您有<span @click="goList('/member/company/interview')" class="span">{{minDate.returnVisit}}个</span>项目需要回访</span>
        <span class="span" @click="goList('/member/company/interview')">去回访>>></span>
    </div>
    <div class="block">
        <span class="title">今日回款</span>: {{minDate.is_setmeal?text:text2}}
    </div>
    <div class="block">
        <span class="title">售后回访</span>: {{minDate.is_setmeal?text:text2}}
    </div>
    <div class="block">
        <span class="title">配件更换</span>: {{minDate.is_setmeal?text:text2}}
    </div>

    <div class="bottom">
        <div class="time">
            <span class="timeSpan">后七天日程，共计7件代办事情</span>
        </div>
        <div class="block block3">
           <span class="title">配件更换</span>: {{minDate.is_setmeal?text:text2}}
        </div>
        <div class="block block3">
           <span class="title">配件更换</span>: {{minDate.is_setmeal?text:text2}}
        </div>
        <div class="block block3">
           <span class="title">配件更换</span>: {{minDate.is_setmeal?text:text2}}
        </div>
    </div>
  </div>
</template>

<script>
    import http from "@/utils/http";
    import api from "@/api";  
export default {
    data(){
        return{
            text:'功能开发中，暂不可用',
            text2:'抱歉，该功能仅对会员用户开放',
            times:'',
            minDate:{
                sum:"",              //   新商机
                memberSum:"",       //业务相关
                caseCount:"",       //案例统计
                returnVisit:"",     // 今日跟进
            }
        }
    },
    computed:{
        time(){
            let time = new Date()
            let interview_date = ''
            let month = time.getMonth() +1
            let fullYear = time.getFullYear()
            month = month<10?'0'+month:month;
            let date = time.getDate()
            date = date<10?'0'+date:date;
            let day = time.getDay()
            let arr = ['星期天','星期一','星期二','星期三','星期四','星期五','星期六']
            interview_date = fullYear +'-' + month +'-' + date + arr[day];
            let timess = date-1
            timess = timess<10?'0'+timess:timess;
            this.times = fullYear +'-' + month +'-' + timess
            return interview_date
        }
    },
    created(){
        this.getMySchedule()
    },
    methods:{
        goList(u,active){
            console.log(u,active==true,"11111")
            let times = this.times
            let url;
            if(active || active===0){
                url = `${u}?times=${times}&active=${active}`
            } else{
                url = `${u}?times=${times}`
            }
            if(active === 'job'){
                url = `${u}`
            }
            console.log(url,13212123)
            this.$router.push(url)
        },
        getMySchedule(){
            http.get(api.getMySchedule,{}).then(res=>{
                console.log(res,"111111")
                this.minDate = res.data
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .main{font-size: 16px;
        .time{padding: 10px 10px;font-size: 16px;
            span{padding: 5px 10px;background: #ffb204;border-radius: 8px;color: #fff;}
            .timeSpan{background: #00adff;}
        }
        .block{padding: 12px 16px;font-size: 14px; border-bottom: 1px solid #ccc;}
        .block:last-child{border:0}
        .block2{display: flex; justify-content: space-between;}
        .span{color: #679dff;}
        .block3{border: 0;}
        .title{color: #000;}
    }
</style>
