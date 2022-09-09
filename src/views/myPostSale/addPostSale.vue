<template>
  <div class="main">
     <Head>我的售后</Head>
     <div class="inputTop">
        <!-- <textarea placeholder="粘贴信息，快速填写，仅针对公司名称和联系电话有效" class="textarea" /> -->
        <div class="inputArr">
            <div class="inputDiv">公司名称:</div>
            <input class="input" placeholder="请输入公司名称" v-model="param.comapany_name" type="text">
        </div>
        <div class="inputArr">
            <div class="inputDiv">公司地区:</div>
            <div @click="show = true" class="input" :class="{'ccc':!param.address}">{{param.address?param.address:'请输入公司地区'}}</div>
        </div>
        <div class="inputArr red">
            <div class="inputDiv">联系人:</div>
            <input class="input" placeholder="请输入联系人" v-model="param.contact_name" type="text">
        </div>
        <div class="inputArr red">
            <div class="inputDiv">联系电话:</div>
            <input class="input" placeholder="请输入联系电话" v-model="param.contact_phone" type="text">
        </div>
        <div class="inputArr">
            <div class="inputDiv">岗位:</div>
            <div @click="openMonthPop('resumeTag')" class="input" :class="{'ccc':!param.contact_post}">{{param.contact_post?param.contact_post:'请选择岗位'}}</div>
        </div>
        <div class="inputArr">
            <div class="inputDiv">设备名称:</div>
            <input class="input" placeholder="请输入设备名称" v-model="param.device_name" type="text">
        </div>
        <div class="inputArr">
            <div class="inputDiv">成交金额:</div>
            <input class="input" placeholder="请输入成交金额" v-model="param.amount" type="text">
        </div>
     </div>
     <div class="service">
        <p class="p1">我的售后服务：</p>
        <p class="p2">提醒客户及时给设备保养，可大大减少质保期内设备故障出现概率</p>
        <div class="inputArr red">
            <div class="inputDiv">交付日期:</div>
            <div @click="timePop = true" class="input" :class="{'ccc':!param.delivertime}">
                <van-icon name="clock-o" /> 
                {{param.delivertime?param.delivertime:'选择日期'}}
            </div>
        </div>
        <div class="selectArr">
            <div class="selectText red">
                <div class="text1">保养日期:</div>
                <div class="text2">提醒客户检测,减少质保期内设备出故障概率</div>
            </div>
            <div class="selectInput" v-for="(item,index) in param.maintaininfo" :key="index">
                <div class="selectBor" @click="openMonthPop('month','maintaininfo',index)"> {{item.time}} <span style="transform: rotate(90deg);display: inline-block;"> > </span></div>
                <input placeholder="无内容将不会收到对应提醒" class="input" v-model="param.maintaininfo[index].text" type="text">
            </div>
        </div>
        <div class="selectArr">
            <div class="selectText">
                <div class="text1 red">质保期:</div>
                <div class="text2">质保期结束后，可以建议客户更换零配件啦</div>
            </div>
            <div class="selectInput" v-for="(item,index) in param.warrantytime" :key="index">
                <div class="selectBor" @click="openMonthPop('month','warrantytime',index)"> {{item.time}} <span style="transform: rotate(90deg);display: inline-block;"> > </span></div>
                <input placeholder="无内容将不会收到对应提醒" class="input" v-model="param.warrantytime[index].text" type="text">
            </div>
        </div>
        <div class="selectArr">
            <div class="selectText">
                <div class="text1">尾款日期:</div>
                <div class="text2">尾款日期到了后，系统会自动提醒您！</div>
            </div>
            <div class="selectInput" v-for="(item,index) in param.endmoney" :key="index">
                <div class="selectBor" @click="openMonthPop('month','endmoney',index)"> {{item.time}} <span style="transform: rotate(90deg);display: inline-block;"> > </span></div>
                <input placeholder="请输入尾款金额" class="input" v-model="param.endmoney[index].text" type="text">
            </div>
        </div>
        <div class="selectArr">
            <div class="selectText">
                <div class="text1">易碎/耗材:</div>
                <div class="text2">借鉴汽车保养模式，让您的收入模式更丰富，建议您开启循环模式 </div>
            </div>
            <div class="selectInput" v-for="(item,index) in param.consumables" :key="index">
                <div class="selectBor" @click="openMonthPop('month','consumables',index)"> {{item.time}} <span style="transform: rotate(90deg);display: inline-block;"> > </span></div>
                <input placeholder="无内容将不会收到对应提醒" class="input" v-model="param.consumables[index].text" type="text">
            </div>
        </div>
        <div class="selectArr">
            <div class="selectText">
                <div class="text1" style="width: 7em;">设备更换周期:</div>
                <div class="text2">到更换周期时，系统会自动提醒您联系客户</div>
            </div>
            <div class="selectInput" v-for="(item,index) in param.changetime" :key="index">
                <div class="selectBor" @click="openMonthPop('year','changetime',index)"> {{item.time}} <span style="transform: rotate(90deg);display: inline-block;"> > </span></div>
            </div>
        </div>
        <div class="selectArr">
            <div class="selectText">
                <div class="text1" style="width: 8em;">其他自定义提醒:</div>
                <div class="text3" @click="addOthertip">添加+</div>
            </div>
            <div class="selectInput" v-for="(item,index) in param.othertip" :key="item.id">
                <div class="selectBor" @click="openMonthPop('month','othertip',index)"> {{item.time}} <span style="transform: rotate(90deg);display: inline-block;"> > </span></div>
                <input placeholder="无内容将不会收到对应提醒" class="input" v-model="param.othertip[index].text" type="text">
            </div>
        </div>

        <div class="add" @click="submit">
            新增售后
        </div>
        <p class="p3">
            为了打造品牌口碑，提高贵公司信誉度，您在填写完客户信息后系统将会在公众号“<span class="fd">售后侠</span>”为您的客户自动创建一个新账号，便于您后期的售后处理    <span class="fe">我有疑问>></span>
        </p>
     </div>
    
     <!-- 地区选择器 -->
     <van-popup v-model="show" round position="bottom">
        <van-cascader :field-names="fieldNames" v-model="param.address" title="请选择所在地区" :options="columns.citytwocategory" @close="show = false" @finish="onFinish"/>
    </van-popup>
     <!-- 时间选择器 -->
     <van-popup v-model="timePop" round position="bottom">
        <van-datetime-picker v-model="datetime"  @cancel="timePop = false" @confirm='onConfirmTime' :formatter="formatter" type="datetime" title="请选择日期" :columns-order="['year','month','day','hour','minute']"/>
    </van-popup>

    <van-popup v-model="monthPop" round position="bottom">
        <van-picker value-key='name' title="请选择" show-toolbar :columns="columns[type]" @confirm="onConfirmMonth" @cancel="monthPop = false"/>
    </van-popup>
  </div>
</template>

<script>
    import http from "@/utils/http";
    import api from "@/api";  
export default {
    data(){
        return{
            param:{
                comapany_name:'',
                address:'',
                contact_name:'',
                contact_phone:'',
                contact_post:'',
                device_name:'',
                device_model:'',
                amount:'',
                imgs:[],
                delivertime:'',
                maintaininfo:[{time:'请选择日期',text:''},{time:'请选择日期',text:''}],
                warrantytime:[{time:'请选择日期',text:''}],
                endmoney:[{time:'请选择日期',text:''}],
                consumables:[{time:'请选择日期',text:''},{time:'请选择日期',text:''},{time:'请选择日期',text:''}],
                changetime:[{time:'请选择日期',text:''}],
                othertip:[{time:'请选择日期',text:'',id:0,}],
            },
            fieldNames: {
                text: 'label',
                value: 'label',
                children: 'children',
            },
            columns:{
                year:['2年后','3年后','5年后'],
                month:['1个月后','2个月后','3个月后','4个月后','5个月后','6个月后','7个月后','8个月后','9个月后','10个月后','11个月后','12个月后',],
                citytwocategory:[],
                resumeTag:[],
            },
            monthPop:false,
            type:'month',
            timePop:false,
            show:false,
            datetime: new Date(),
            minDate: new Date(),
            maxDate: new Date(2030, 10, 1),
            seleType:'',
            seleInde:0,
        }
    },
    computed:{
        verification(){
            let param = JSON.parse(JSON.stringify(this.param))
            let isMaintaininfo = false
            for (let i = 0; i < param.maintaininfo.length; i++) {
                if(param.maintaininfo[i].text && param.maintaininfo[i].time !== '请选择日期'){
                    isMaintaininfo = true
                }
            }
            let isWarrantytime = false
            for (let g = 0; g < param.warrantytime.length; g++) {
                if(param.warrantytime[g].text && param.warrantytime[g].time !== '请选择日期'){
                    isWarrantytime = true
                }
            }
            return this.param.contact_name&&this.param.contact_phone&&this.param.delivertime
                    &&isMaintaininfo&&isWarrantytime
        }
      },
    created(){
        this.classify()
    },
    methods:{
        classify(){
            http.get(api.classify,{type:'citytwocategory,resumeTag'}).then(res=>{
                console.log(res)
                this.columns.citytwocategory = res.data.citytwocategory
                this.columns.resumeTag = res.data.resumeTag
            })
        },
        formatter(type, val){
            if (type === 'year') {
                return val + '年';
            }
            if (type === 'month') {
                return val + '月';
            }
            if (type === 'day') {
                return val + '日';
            }
            if (type === 'hour') {
                return val + '时';
            }
            if (type === 'minute') {
                return val + '分';
            }
            return val;
        },
        confirmTime(date){
            console.log(date,"111")
            let sign2 = ":";
            let year = date.getFullYear() // 年
            let month = date.getMonth() + 1; // 月
            let day = date.getDate(); // 日
            let hour = date.getHours(); // 时
            let minutes = date.getMinutes(); // 分
            let seconds = date.getSeconds() //秒
            let weekArr = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'];
            let week = weekArr[date.getDay()];  //计算出星期几
            // 给一位数的数据前面加 “0”
            if (month >= 1 && month <= 9) {month = "0" + month;}
            if (day >= 0 && day <= 9) {day = "0" + day;}
            if (hour >= 0 && hour <= 9) {hour = "0" + hour;}
            if (minutes >= 0 && minutes <= 9) {minutes = "0" + minutes;}
            if (seconds >= 0 && seconds <= 9) {seconds = "0" + seconds;}
            return year + "-" + month + "-" + day + "//" + hour + sign2 + minutes
        },
        openMonthPop(e,y,i){
            this.monthPop = true
            this.type = e
            if(y){
                this.seleType = y
                this.seleInde = i
            }
        },
        addOthertip(){
            let id = new Date().getTime()
            this.param.othertip.push({
                time:'1个月后',
                text:'',
                id
            })
        },
        onFinish({ selectedOptions }){
            this.param.address = selectedOptions.map((option) => option.label).join('/');
            this.show = false
        },
        onConfirmTime(e){
            this.param.delivertime = this.confirmTime(e)
            this.timePop = false
        },
        onConfirmMonth(e){
            console.log(e,"1111")
            if(e.name){
                this.param.contact_post = e.name
                this.monthPop = false
                return
            }
            this.param[this.seleType][this.seleInde].time = e
            this.monthPop = false
        },
        submit(){
            let param = JSON.parse(JSON.stringify(this.param))
            if(!this.verification){
                this.$notify({message: `请确保必填项"*"内容完整`,type: 'warning'});
                return
            }
            for (let i = 0; i < param.othertip.length; i++) {
                if(!param.othertip[i].text && param.othertip[i].time == '请选择日期'){
                    param.othertip.splice(i,1)
                    i--
                }
            }
            for (let i = 0; i < param.consumables.length; i++) {
                if(!param.consumables[i].text && param.consumables[i].time == '请选择日期'){
                    param.consumables.splice(i,1)
                    i--
                }
            }
            for (let i = 0; i < param.endmoney.length; i++) {
                if(!param.endmoney[i].text && param.endmoney[i].time == '请选择日期'){
                    param.endmoney.splice(i,1)
                    i--
                }
            }
            for (let i = 0; i < param.warrantytime.length; i++) {
                if(!param.warrantytime[i].text &&  param.warrantytime[i].time == '请选择日期'){
                    param.warrantytime.splice(i,1)
                    i--
                }
            }
            for (let i = 0; i < param.maintaininfo.length; i++) {
                if(!param.maintaininfo[i].text &&  param.maintaininfo[i].time == '请选择日期'){
                    param.maintaininfo.splice(i,1)
                    i--
                }
            }
            param.address = param.address.split('/')
            param.changetime = param.changetime[0].time
            http.post(api.insertAfterSale,param).then(res=>{
                this.$notify({message: res.message,type: 'success' });
                let timer = setTimeout(() => { 
                    this.$router.replace('/myPostSale')
                 }, 400)
            })
        },
    }
}
</script>

<style lang="scss" scoped>
    .main{font-size: 16px; color: #000;
        .fd{color: #FD7900;}
        .ccc{color: #ccc;}
        .fe{color: #4199FE;}
        .p1{color: #FD7900;font-size: 16px;padding: 5px 0;}
        .p2{color: #4199FE;font-size: 12px;padding: 5px 0;}
        .p3{color: #A7A6A6;font-size: 12px;padding: 5px 0;line-height: 22px;}
        .add{width: 7em;text-align: center;margin: 25px auto;background: #009BFF;color: #fff;height: 32px;border-radius: 7px; line-height: 30px;}
        .red{position: relative; 
            &::before{position: absolute; content: '*'; left: -8px; color: red;}
        }
        .inputArr{ display: flex; align-items: center;padding: 20px 0 0 0;font-size: 14px;color: #7b7b7b;
                .inputDiv{width: 5.2em; text-align-last: justify; padding: 0 5px 0 0 ;}
                .input{flex: 1; border: 1px solid #9b9b9b; border-radius: 5px; padding: 2px 5px; height: 28px;}
            }
        .selectArr{ display: flex; padding: 20px 0 0 0;font-size: 14px;color: #7b7b7b; flex-direction: column;
            .selectText{display: flex;align-items: center;
                .text1{width: 5.2em; text-align-last: justify; padding: 0 5px 0 0 ; color: #000;}
                .text2{flex: 1; font-size: 12px; }
                .text3{ color: #07afff; }
            }  
            .selectInput{ display: flex; padding: 10px 0 0 0;
                .selectBor{border: 1px solid #ccc;height: 27px;line-height: 27px;border-radius: 4px;margin: 0 10px 0 0; padding: 0 10px;}
                .input{ border-bottom: 1px solid ; border-radius: 0; border-color: transparent transparent #ccc transparent; flex: 1; padding: 2px 5px; }
            }
        }
        .inputTop{padding: 10px 20px; border-bottom: 10px solid #f1f2f8;}
        .input{
                &::-webkit-input-placeholder{
                        color:#ccc;
                    }
                &:-moz-placeholder{
                         color:#ccc;
                }
                &::-moz-placeholder{
                        color:#ccc;
                }
                &:-ms-input-placeholder{
                        color:#ccc;
                }
            }
        .service{padding: 10px 20px;
            .time{}
        }
    }
</style>
