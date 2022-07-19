<template>
  <div id="app">
    <Head>快速注册</Head>
		<img class="img" src="http://www.hangyedaniu.com/upload/resource/logOnMain.png" alt="">
		<div class="sto">基本信息：</div>
		<div class="sto"><span class="span">*</span> 采购设备名称 ： <input class="input" v-model="formData.name" placeholder="请输入您的采购设备名称"/></div>
		<div class="sto companyName">公司名称 ：<input class="input" v-model="formData.companyName" placeholder="请输入您的公司名称"/></div>
		<van-field v-model="formData.result" is-link readonly name="area" label="所在地区 :" placeholder="点击选择省市区" @click="showArea = true" style="padding-left: 22px;" />
		<van-popup v-model:show="showArea" position="bottom">
		  <van-area :area-list="areaList" @confirm="onConfirm" @cancel="showArea = false"/>
		</van-popup>
		<div class="sto "><span class="span">*</span> 联系人 ： <input class="input margin41" v-model="formData.contactsName" placeholder="请输入联系人的名称"/></div>
		<div class="sto contactsCall"><span class="span">*</span> 联系电话 ： <input class="input margin27" v-model="formData.contactsCall" placeholder="请输入联系电话"/></div>
		<div class="sto contactsCall"><span class="span">*</span> 验证码 ： <input class="input margin40" v-model="formData.code" placeholder="请输入验证码"/><span @click="sendSms" class="span1">获取验证码</span></div>
		<div class="sto "><span class="span">*</span> 密码 ： <input class="input margin55" v-model="formData.paw" placeholder="请输您的密码"/></div>
		
		<div class="sto demand">采购要求 ：</div>
		
		<div class="sto demand1">截止时间 ： <input class="input" @click="show = true" v-model="formData.currentDate" placeholder="选择截止时间"/></div>
		
		<van-popup v-model:show="show" position="bottom">
			<van-datetime-picker type="date" title="选择年月日" :min-date="minDate" :max-date="maxDate" @confirm='timeSelect' @cancel='show = false'/>
		</van-popup>
			
		<div class="sto demand2">项目预算 ： <input class="input" v-model="formData.price" placeholder="预算价格"/> 万元 <span @click="formData.price = '电议/面议'">电议/面议</span></div>
		
		<div class="sto demand1">地区要求 ： <select v-model="formData.region"><option :value="item.id" v-for="(item,index) in itemclassifiy" :key="index">{{item.name}}</option></select></div>
		
		<div class="sto demand">需求描述 ：</div>
		<div class="sto textarea"><textarea cols="35" rows="5" v-model="formData.text" placeholder="请描述您的具体需求，便于设备厂家准确报价。"></textarea></div>
		
		
		
		
		<div class="sto demand">参考资料：</div>
		<div class="file" v-if="img.length < 6 || video.url == ''">
			{{img.length < 6 && video.url == ''? '请上传图片或视频+': video.url != '' ? '请上传图片+' :  '请上传视频+'  }}
			<input :value="imgVideoValue" width="100%" height="100%" style="opacity: 0;" type="file" :accept="img.length < 6 && video.url == ''? 'image/*, video/*': video.url != '' ? 'image/*' : 'video/*' " multiple @change="upFile"/>
		</div>
		
		
		
		
		<div class="video-img">
			<span class="video-box" v-if="video.url || videoLoading">
				<video v-if="!videoLoading" :src="video.url" controls></video>
				<span class="icon" @click.stop="deletevideo" v-if="!videoLoading">
					<van-icon name="cross" />
				</span>
				<van-loading v-if="videoLoading" size="24px">正在加载视频...</van-loading>
			</span>
			
			<!-- <video src="http://qiniucdn.hangyedaniu.com/181f511fb20c3688c8395f493edcbe2e.mp4" controls></video> -->
			<div class="img-list">
				<span class="img-box" v-for="(item,index) in img" :key="item"  @click="imgEnlarge(index)">
					<img :src="item" />
					<span class="icon" @click.stop="deleteImg(item,index)">
						<van-icon name="cross" />
					</span>
				</span>
				<span style="" v-for="(item,index) in imgLoading" :key="index">
					<van-loading size="24px">加载图片...</van-loading>
				</span>
			</div>
		</div>
		
		
		<div class="button" @click="regPurchasInformation">立即投递</div>
		
		<Captcha ref="captcha" />
	</div>
</template>

<script>
import http from '@/utils/http'
import api from '@/api'
import {ImagePreview} from 'vant'
import Captcha from '@/components/captcha/index'
export default {
  name: 'RegQuick',
  components:{
	  Captcha
  },
  data () {
    return {
		formData:{
			name:'',					//采购设备名称
			companyName:'',		//公司名称
			result:'',				//所在地区
			contactsName:'',		//联系人的名称
			contactsCall:'',		//联系电话
			paw:'',					//密码
			currentDate:'',		//截止时间
			price:'',				//项目预算
			region:'',				//地区要求
			text:'',					//需求描述
			imgVideo:[],			//视频图片的集合
			jobid:'',				//案例id
			code:''					//验证码
		},
		itemclassifiy:[],				//地区要求
		imgVideoValue:'',			//绑定值
		img:[],						//图片数组
		video:{id:'',url:''},	//视频路径
		imgLoading:[],				//图片加载前视图
		videoLoading:false,		//视频加载状态
		show:false,
		areaList:{},
		trade:[],
		itemclassifiy:[],
		showArea:false,
      minDate:new Date(2020, 0, 1),
		maxDate:new Date(2030, 0, 1),
		regularMobile: /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/,
    }
  },
  watch:{
	  imgVideoValue:{
		  handler(n,o){
			  console.log(n,o,"jti")
		  }
	  }
  },
  created () {
	  console.log(this.$route.query,"121200")
	  this.formData.jobid = this.$route.query.id
	  this.getSelectData()
  },
  methods: {
	  // 获取select下拉的列表
	  getSelectData(){
	  	http.get(api.classify,{
	  		type:'citycategory,itemclassifiys'
	  	}).then(res=>{
	  		this.areaList = res.data.citycategory
			this.itemclassifiy = res.data.itemclassifiys			//地区要求
	  	})
	  },
	  // 提交
	  regPurchasInformation(){
		  console.log(this.$router,"112121")
		  let formData = JSON.parse(JSON.stringify(this.formData))
		  if(formData.name == ""){
			  this.$notify({ type: 'warning', message: '请输入您的采购设备名称' })
			  return
		  }
		  if(formData.contactsName == ""){
		  			  this.$notify({ type: 'warning', message: '请输入联系人的名称' })
		  			  return
		  }
		  if(formData.contactsCall == ""){
		  			  this.$notify({ type: 'warning', message: '请输入联系人电话' })
		  			  return
		  }
		  if(formData.code == ""){
		  			  this.$notify({ type: 'warning', message: '请输验证码' })
		  			  return
		  }
		  if(formData.paw == ""){
		  			  this.$notify({ type: 'warning', message: '请输入密码' })
		  			  return
		  }
		  if(!this.regularMobile.test(formData.contactsCall)){
		  	this.$notify({ type: 'warning', message: "请输入正确的联系电话" })
		  	return
		  }
		  
		  if(this.video.id != ""){
			  formData.imgVideo.push(this.video.id)
		  }
		  http.post(api.reg_resume_quick,formData).then(res=>{
			  console.log(res,"111111")
			  this.$notify({ type: 'success', message: res.message })
			  this.$router.replace("/member/login?register='register'")
		  })
	  },
	  // 图片放大
	  imgEnlarge(i){
	  		ImagePreview({
	  		    images: this.img,
	  		    startPosition: i,
	  		  });
	  },
	  // 上传文件
	  upFile(e){
				try{
					let type = e.target.files[0].type
					// console.log(e.target.files,"245asd45sae")
					// console.log(e.target.files[0].type == 'video/mp4',"245asd45sae")
					
					if(type.indexOf('video') != -1){
						// console.log("视频")
						this.videoLoading = true
						http.postFormData(api.memberRegIndex,{file:e.target.files[0]}).then(res=>{
							// console.log(res,"1asd1asdas")
							// console.log(res.data.file_url,"12121")
							this.videoLoading = false
							this.video.id = res.data.file_id
							this.video.url = res.data.file_url
						})
					}
					if(type.indexOf('image') != -1){
						// console.log("图片")
						for (let i = 0; i < e.target.files.length; i++) {
							if(this.img.length <= 6){
								this.imgLoading.push(1)
								http.postFormData(api.memberRegIndex,{file:e.target.files[i]}).then(res=>{
									this.imgLoading.splice(0,1)
									this.formData.imgVideo.push(res.data.file_id)
									this.img.push(res.data.file_url)
								}).catch(err=>{
									console.log(err,"12454545")
									this.imgLoading.splice(0,1)
									this.$notify({ type: 'warning', message: "发现未知图片" })
								})
							} else{
								return
							}
						}
					}
				}catch(e){
				  console.log(e,'取消')
				  this.$notify({ type: 'warning', message: '上传视频或图片中断' })
				}
			},
	  // 时间
	  timeSelect(e){
			let d = new Date(e);
		   let y = d.getFullYear();
		   let m = d.getMonth() + 1;
		   let r = d.getDate();
		   m = m < 9 ? "0" + m : m;
		   r = r < 9 ? "0" + r : r;
			this.formData.currentDate = y + "-" + m + "-" + r;
			this.show = false
	  },
	  // 地区选择器
    onConfirm(areaValues){
		this.showArea = false;
		this.formData.result = areaValues.filter((item) => !!item).map((item) => item.name).join('/');
	 },
		// 删除视频
		deleteImg(e,i){
			this.img.splice(i,1)
			this.formData.imgVideo.splice(i,1)
		},
		// 删除视频
		deletevideo(){
			this.video.url = ""
			this.video.id = ''
		},
    // 发送验证码
    sendSms () {
      let _this = this
      if (this.$store.state.sendSmsBtnDisabled) {
        return false
      }
      if (!this.formData.contactsCall) {
        this.$notify('请输入手机号')
        return false
      }
      if (!this.regularMobile.test(this.formData.contactsCall)) {
        this.$notify('手机号格式不正确')
        return false
      }
      this.$refs.captcha.show(res => {
        this.$store.dispatch('sendSmsFun', {
            url: api.get_reg_resume_quick_code,
            mobile: this.formData.contactsCall,
            type: 2,
            captcha: res
          }).then(response => {
				 console.log(response,"111111111111")
            if (response.code === 200) {
              if (parseInt(response.data.notice) === 1) {
                _this.$store.commit('clearCountDownFun')
                // 手机号已注册
                _this.$dialog.confirm({
                    title: '提示',
                    message: response.message,
                    confirmButtonText: '是',
                    cancelButtonText: '否'
                  }).then(() => {
                    // 登录
                    _this.showLogin = true
                  })
                  .catch(() => {})
              } else {
                _this.$notify({type: 'success', message: _this.$store.state.sendSmsMessage})
              }
            } else {
					console.log(response,"12121212")
              _this.$notify(_this.$store.state.sendSmsMessage)
            }
          })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
	#app{font-size: 14px; color: #000;
		.img{width: 100%; height: 160px; }
		.sto{margin-top: 20px;padding: 0px 10px;}
		.span{color: #ff0000;}
		.input{border: 0; border-bottom: 1px #000 solid; width: 165px;}
		.companyName{padding-left: 21px;
			.input{margin-left: 32px;}
		}
		.margin41{margin-left: 41px;}
		.margin27{margin-left: 27px;}
		.margin55{margin-left: 54px;}
		.margin40{margin-left: 40px;}
		.contactsCall{
			.input{width: 140px; margin-right: 10px;}
			.span1{color: #0000ff;}
		}
		.demand{border-top: 1px #ccc solid; padding-top: 8px;}
		.demand1{padding-left: 25px; margin-top: 15px;
			input{margin-left: 20px; text-align: center; border: 1px solid #ccc ; border-radius: 4px; height: 26px;}
			select{margin-left: 20px; text-align: center; border: 1px solid #ccc ; border-radius: 4px; height: 26px; width: 165px;}
		}
		.demand2{padding-left: 25px; margin-top: 15px;
			input{margin-left: 20px; text-align: center; border: #ccc 1px solid; width: 80px; height: 27px; border-radius: 2px; }
			span{padding: 5px 10px; background-color: #aaffff; border: #55aaff solid 1px; border-radius: 2px; color: #55aaff; margin-left: 10px;}
		}
		.textarea{margin-left: 63px; margin-top: 7px;}
		.file{color: #00aaff; width: 208px ; height: 22px; margin: 10px 20px;
			input{position: absolute; left: 0;}
		}
		.video-img{text-align: center; margin-top: 10px;
			.video-box{position: relative;
				video{width: 256px; height: 205px;}
				.icon{position: absolute; right: 1px; width: 20px; height: 20px; color: #ff0000;}
			}
			img{width: 256px; height: 205px;}
			.img-list{display: flex; flex-wrap: wrap; 
				.img-box{position: relative;
					img{margin: 10px 0px 0px 18px; width: 100px; height: 100px; object-fit: cover;}
					.icon{position: absolute; right: 1px; top: 10px; width: 20px; height: 20px; color: #ff0000;}
				}
			}
		}
		.button{background-color: #009BFF ; width: 332px;height: 40px; line-height: 40px; color: #fff; text-align: center; border-radius: 5px; margin: 20px auto;}
	}
</style>
