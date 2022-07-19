<template>
	<div class="main">
		<Head>发布采购</Head>
		<img class="img" src="http://www.hangyedaniu.com/upload/resource/logOnMain.png" alt="">
		<div class="demandText">采购要求：</div>
		<!-- 采购要求 -->
		<div class="demandBox">
			<div class="demandBox1">
				<div class="demandBox1Key">
					<div class="key">*</div>
					<div class="text">设备名称 ：</div>
				</div>
				<div class="inputDiv"><input class="input" v-model="formData.fullname"/></div>
			</div>
			<div class="demandBox1">
				<div class="demandBox1Key">
					<div class="key"></div>
					<div class="text">采购预算 ：</div>
				</div>
				<div class="inputDiv">
					<input class="inputBudget" :disabled="inutradio"  :placeholder="inutradio?'电议':''" v-model="formData.minwage"/>
					<span class="inputBudgetText">万元</span>
					<div class="spanBudget" @click="inutradio = !inutradio">
						<input class="radioBudget" :checked='inutradio' type="radio"/>
						电议
					</div>
				</div>
			</div>
			<div class="demandBox1">
				<div class="demandBox1Key">
					<div class="key"></div>
					<div class="text">要求地区 ：</div>
				</div>
				<div class="selectDiv">
					<select class="select" v-model="formData.classifiy_id"><option :value="item.id" :label="item.name" v-for="(item,index) in itemclassifiy" :key="index">{{item.name}}</option></select>
					<span :class="['selectSpan',spanTrans?'spanTrans':'']"></span>
				</div>
			</div>
			<div class="demandBox1">
				<div class="demandBox1Key">
					<div class="key"></div>
					<div class="text">截止日期 ：</div>
				</div>
				<div class="inputDiv"><input @click="show = true" class="input" v-model="formData.birthday" placeholder="请输入截止日期"/></div>
			</div>
			<div class="demandBox1">
				<div class="demandBox1Key">
					<div class="key"></div>
					<div class="text">产品名称 ：</div>
				</div>
				<div class="inputDiv"><input class="input" v-model="formData.productName" placeholder="请输入产品名称"/></div>
			</div>
			<div class="demandBox1">
				<div class="demandBox1Key">
					<div class="key"></div>
					<div class="text">所属行业 ：</div>
				</div>
				<div class="selectDiv">
					<select class="select" v-model="formData.major"><option :value="item.id" :label="item.name" v-for="(item,index) in trade" :key="index">{{item.name}}</option></select>
					<span :class="['selectSpan',spanTrans?'spanTrans':'']"></span>
				</div>
			</div>
		</div>
		<div class="describeText bor">需求描述：</div>
		<div class="textarea">
			<textarea cols="35" rows="5" v-model="formData.specialty" placeholder="请描述您的具体需求，便于设备厂家准确报价。"></textarea>
		</div>
		
		
		
		<!-- 参考资料 -->
		<div class="describeImgVideo bor">参考资料：</div>
		<div class="file" v-if="img.length < 6 || video.url == ''">
			{{img.length < 6 && video.url == ''? '请上传图片或视频+': video.url != '' ? '请上传图片+' :  '请上传视频+'  }}
			<input :value="imgVideoValue" width="100%" height="100%" style="opacity: 0;" type="file" :accept="img.length < 6 && video.url == ''? 'image/*, video/*': video.url != '' ? 'image/*' : 'video/*' " multiple @change="upFile"/>
		</div>
		
		
		
		<!-- 视频图片 -->
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
				<span class="img-box" v-for="(item,index) in img" :key="item" @click="imgEnlarge(index)">
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
		
		
		<!-- 联系信息 -->
		<div class="demandText bor" @click="getUser">联系信息：
			<span class="information">和预留信息一致
				<span class="inutCheckbox">
					<input class="checkboxInput" :checked='inutCheckbox' type="checkbox"/>
				</span>
			</span>
		</div>
		
		<div class="demandBox ">
			<div class="demandBox1">
				<div class="demandBox1Key">
					<div class="key">*</div>
					<div class="text" style="letter-spacing: 5px; text-align: center;">公司 ：</div>
				</div>
				<div class="inputDiv"><input class="input" placeholder="输入公司名称" v-model="formData.height"/></div>
			</div>
			<div class="demandBox1">
				<div class="demandBox1Key">
					<div class="key">*</div>
					<div class="text" style="letter-spacing: 3px; text-align: center;">联系人 ：</div>
				</div>
				<div class="inputDiv"><input class="input" v-model="formData.marriage" placeholder="请输联系人名称"/></div>
			</div>
			<div class="demandBox1">
				<div class="demandBox1Key">
					<div class="key">*</div>
					<div class="text" style="letter-spacing: 0px; text-align: center;">联系电话 ：</div>
				</div>
				<div class="inputDiv"><input class="input" v-model="formData.mobile" placeholder="请输入联系电话"/></div>
			</div>
			<div class="demandBox1" @click="showArea = true">
				<div class="demandBox1Key">
					<div class="key"></div>
					<div class="text">所在地区 ：</div>
				</div>
				<div class="inputDiv"><input class="input" v-model="formData.ContactCall" placeholder="点击选择省市区"/></div>
			</div>
			<van-popup v-model:show="showArea" position="bottom">
			  <van-area :area-list="areaList" @confirm="onConfirm" @cancel="showArea = false"/>
			</van-popup>
		</div>
		<div class="button" @click="button">发布采购</div>
		<van-popup v-model:show="show" position="bottom">
			<van-datetime-picker type="date" title="选择年月日" :min-date="minDate" :max-date="maxDate" @confirm='timeSelect' @cancel='show = false'/>
		</van-popup>
	</div>
</template>

<script>
	import {ImagePreview} from 'vant'
	import http from '@/utils/http'
	import api from '@/api'
	export default {
		data(){
			return{
				formData:{
					fullname:'',		//姓名
					minwage:'',		//采购预算
					classifiy_id:'',		//地区要求
					birthday:'',		//截止时间
					idcard:'',		//产品名称
					major:'',		//所属行业
					specialty:'',		//需求描述
					height:'',		//公司名称
					marriage:'',		//联系人
					mobile:'',		//联系电话
					ContactCall:'',		//所在地区
					imgVideo:[],	//图片视频的集合
				},
				img:[],				//图片数组
				video:{id:'',url:''}				,//视频路径
				itemclassifiy:[],
				trade:[],
				areaList:{
					// province_list:{
					//    110000: '北京市',
					//    120000: '天津市',
					//   },
				 //   city_list:{
					// 	110100: '北京市',
					// 	120100: '天津市',
					//  },
					// county_list:{
					// 	110101: '东城区',
					// 	110102: '西城区',
					//  }
					},
				imgVideoValue:'',					//绑定
				show:false,
				minDate:new Date(),
				maxDate:new Date(2030, 0, 1),
				// currentDate:new Date(),			//今天
				showArea:false,
				videoLoading:false,				//视频加载状态
				imgLoading:[],
				userInfo:{},
				spanTrans:false,					//旋转盒子 
				inutCheckbox:false,				//复选框
				inutradio:false,					//单选按钮
			}
		},
		created (){
			this.getSelectData()
		},
		methods:{
			// 提交
			button(){
				let formData = JSON.parse(JSON.stringify(this.formData))
				let testing = /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/
				console.log(formData,"1212")
				console.log(testing.test(formData.mobile),"1212")
				if(formData.fullname == ''){
					this.$notify({ type: 'warning', message: "请输入采购设备名称" })
					return
				}
				if(formData.height == ''){
					this.$notify({ type: 'warning', message: "请输入公司名称" })
					return
				}
				if(formData.marriage == ''){
					this.$notify({ type: 'warning', message: "请输入联系人名称" })
					return
				}
				if(formData.mobile == ''){
					this.$notify({ type: 'warning', message: "请输入联系电话" })
					return
				}
				if(!testing.test(formData.mobile)){
					this.$notify({ type: 'warning', message: "请输入正确的联系电话" })
					return
				}
				if(this.video.id != ""){ formData.imgVideo.push(this.video.id) }
				if(this.inutradio){ this.formData.minwage = 0 }
				http.get(api.publishPurchase,formData).then(res=>{
					console.log(res,"121212121221212")
					this.$notify({type:'success',message:'发布成功'})
					setTimeout(()=> {
						this.$router.replace('/member/personal/index')
					}, 800);
					
				})
			},
			// 获取select下拉的列表
			getSelectData(){
				http.get(api.classify,{
					type:'citycategorys,trade,itemclassifiy'
				}).then(res=>{
					this.itemclassifiy = res.data.itemclassifiy
					this.trade = res.data.trade
					this.areaList = res.data.citycategorys
					this.formData.classifiy_id = 356
					// console.log(res,"121212")
				})
				http.get(api.getMember,{}).then(res=>{
					console.log(res,"湿哒哒是大叔大叔大叔啊")
					this.userInfo = res.data[0]
				})
			},
			// 图片放大
			imgEnlarge(i){
					ImagePreview({
					    images: this.img,
					    startPosition: i,
					  });
			},
			// 地区选择器
			onConfirm(areaValues){
					this.showArea = false;
					this.formData.ContactCall = areaValues.filter((item) => !!item).map((item) => item.name).join('/');
			},
			deletevideo(){
				this.video.url = ""
				this.video.id = ''
			},
			deleteImg(e,i){
				this.img.splice(i,1)
				this.formData.imgVideo.splice(i,1)
			},
			// 时间
			timeSelect(e){
						let d = new Date(e);
					   let y = d.getFullYear();
					   let m = d.getMonth() + 1;
					   let r = d.getDate();
					   m = m < 9 ? "0" + m : m;
					   r = r < 9 ? "0" + r : r;
						this.formData.birthday = y + "-" + m + "-" + r;
						this.show = false
			},
			// 获取用户电话号码
			getUser(){
				this.inutCheckbox = !this.inutCheckbox
				if(this.inutCheckbox){
					if(this.userInfo.company_name){this.formData.height = this.userInfo.company_name}
					if(this.userInfo.username){this.formData.marriage = this.userInfo.username}
					if(this.userInfo.mobile){this.formData.mobile = this.userInfo.mobile}
					if(this.userInfo.address){this.formData.ContactCall = this.userInfo.address}
				}
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
						http.postFormData(api.shortvideo_video,{file:e.target.files[0]}).then(res=>{
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
								http.postFormData(api.uploadFile,{file:e.target.files[i]}).then(res=>{
									// console.log(res)
									// console.log(res.data.file_url,"12121")
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
		}
	}
</script>

<style  lang="scss" scoped>
	.main{font-size: 14px; color: #000;
		.img{width: 100%; height: 160px; }
		// 公共样式
		.bor{border-top: 8px solid #f1f1f1;}
		// 采购需求
		.demandText{padding: 20px 10px;}
		.demandBox{ padding-left: 25px; width: 100%;
			.demandBox1{display: flex; padding-right: 25px;margin-bottom: 20px;
				.demandBox1Key{display: flex;
					.key{color: red; width: 10px;}
					.text{width: 80px;}
				}
				.inputDiv{border-bottom: 1px #efefef solid; margin-left: 5px; margin-bottom: 3px; flex: 1; padding-bottom: 5px;
					.input{border: 0; width: 100%;text-indent: 5px; color: #707070;}
					.input::-webkit-input-placeholder { color: #d9d9d9; font-size:12px; }
					.inputBudget{width: 50px; border-radius: 5PX; border: 1px solid #dfdfdf; padding: 1px 5px;margin: 0 10px 0 5px; text-align: center; color: #707070;}
					.spanBudget{ display: inline-block; padding-left: 20px;
						.radioBudget{position: relative; top: 1px;}
					}
					.inputBudgetText{}
				}
				.selectDiv{border-bottom: 1px #efefef solid; margin-left: 5px; margin-bottom: 3px; flex: 1; position: relative;padding-bottom: 5px;
					.select::-ms-expand { display: none; }  
					.select{border: 0; width: 100%; color: #707070; background-color: #fff;
									outline: none;
					            /*将默认的select选择框样式清除*/
					            appearance:none;
					            -moz-appearance:none;
					            -webkit-appearance:none;
					            -ms-appearance:none;
									text-indent: 5px;
								}
					.selectSpan{position: absolute; right: 8px; display: inline-block; width: 10px; height: 10px; border-bottom: 1px #ccc solid; border-left: 1px #ccc solid; transform: rotate(-45deg); top: 5px; transition: all 1.5s;}
							.spanTrans{transform: rotate(136deg); top: 8px;}
							}
			}
		}
		// 需求描述
		.describeText{ padding: 10px;}
		.textarea{text-align: center; margin: 10px 0;
			textarea{border: #ccc 1px solid; color: #707070; width: 80%;}
			textarea::-webkit-input-placeholder { color: #d9d9d9; font-size:13px; text-indent: 1em; }
		}
		// 上传视频图片
		.describeImgVideo{padding: 10px;}
		.file{color: #00aaff; width: 208px ; height: 22px; margin: 0px 20px;
			input{position: absolute; left: 0;}
		}
		.video-img{text-align: center; margin-top: 10px;
			.video-box{position: relative; 
				video{width: 256px; height: 205px; padding-bottom: 10px;}
				.icon{position: absolute; right: 1px; width: 20px; height: 20px; color: #ff0000;}
			}
			img{width: 256px; height: 205px;}
			.img-list{display: flex; flex-wrap: wrap; padding-bottom: 10px;
				.img-box{position: relative;
					img{margin: 10px 0px 0px 18px; width: 100px; height: 100px; object-fit: cover;}
					.icon{position: absolute; right: 1px; top: 10px; width: 20px; height: 20px; color: #ff0000;}
				}
			}
		}
		// 联系信息
		.information{float: right;  color: #009BFF; display: flex; align-items: center;
			.inutCheckbox{padding: 0px 10px;
				.checkboxInput{position: relative; top: 2px;}
			}
		}
		
		// 发布采购
		.button{background-color: #009BFF ; width: 332px;height: 40px; line-height: 40px; color: #fff; text-align: center; border-radius: 5px; margin: 20px auto;}
	}
</style>