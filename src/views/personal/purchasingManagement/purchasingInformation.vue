<template>
	<div class="main">
		<Head style="margin: 0;">采购信息</Head>
		<img class="img" src="http://www.hangyedaniu.com/upload/resource/logOnMain.png" alt="">
		<div>采购联系人信息：</div>
		<div><span>*</span> 姓名 ： <input v-model="formData.username" placeholder="请输入您的姓名"/></div>
		<div class="phone"><span>*</span> 电话 ： <input v-model="formData.phone" placeholder="请输入您的手机号码"/> <span class="blue" @click="getPhone(1)">获取到您绑定的号码</span></div>
		<div class="select">在职岗位 ： <select v-model="formData.post"><option  :value="item.id" v-for="(item,index) in resumeTag" :key="index">{{item.name}}</option></select></div>
		<div class="phone"> 微信 ： <input v-model="formData.weixin" placeholder="请输入您的微信"/> <span class="blue" @click="getPhone(2)">绑定手机号作为微信号</span></div>
		<div> 邮箱 ： <input v-model="formData.email" placeholder="请输入您的邮箱"/> </div>
		<div> Q Q ： <input v-model="formData.qq" placeholder="请输入您的Q Q"/></div>
		<div class="border"><span>采购单位信息 :</span></div>
		<div><span>*</span> 公司名称 ： <input v-model="formData.company_name" placeholder="请输入您的公司名称"/></div>
		<van-field v-model="formData.address" is-link readonly name="area" label="所在地区 :" placeholder="点击选择省市区" @click="showArea = true" style="padding:0 0 10px 22px;" />
		<van-popup v-model:show="showArea" position="bottom">
		  <van-area :area-list="citycategory" @confirm="onConfirm" @cancel="showArea = false"/>
		</van-popup>
		<div class="select">公司规模 ： <select v-model="formData.scale"><option :value="item.id" v-for="(item,index) in companyScale" :key="index">{{item.name}}</option></select></div>
		<div class="select">所属行业 ： <select v-model="formData.industry"><option :value="item.id" v-for="(item,index) in trade" :key="index">{{item.name}}</option></select></div>
		<div class="product-list">
			<div class="product-list-text">主营产品 ： </div>
			<div>
				<span v-for="(item,index) in formData.productList" :key="item.id" >
					<input class="last-input" @blur="addProduct(item.val)" v-model="item.val" placeholder="请输入您发布的产品名称"/> <strong :class="['reduce',formData.productList.length < 3 ?'hide':'']" @click="reduce(item,index)">-</strong>
				</span>
			</div>
		</div>
		<p :class="['add',formData.productList.length>=6?'hide':'']" @click="add">添加产品名称 +</p>
		<p class="skip" @click="fix = true">直接跳过>></p>
		<div class="complete" @click="complete">完成</div>
		<div class="fix" v-if="fix">
			<div class="pop">
				<div>是否跳过您的采购信息</div>
				<div class="button">
					<div @click="$router.replace('/member/personal/index')">跳过</div>
					<div @click="fix = false">取消</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import http from '@/utils/http'
	import api from '@/api'
	export default{
		data (){
			return{
				formData:{
					username:'',		//用户名称
					phone:'',			//手机好
					post:'',				//在职岗位
					weixin:'',			//微信
					email:'',			//邮箱
					qq:'',				//qq
					company_name:'',	//公司名称
					address:'',			//所在地区
					scale:'',			//公司规模
					industry:'',		//所属行业
					productList:[{val:'',id:1},{val:'',id:2}], //主营产品
				},
				resumeTag:[],			//在职岗位
				itemclassifiy:[],		//所在地区
				trade:[],				//所属行业
				companyScale:[],		//规模
				citycategory:[],		//地区
				mobile:'',				//用户信息
				fix:false				,//弹框
				showArea:false			//地区
			}
		},
		created(){
			this.getUser()
			this.getSelectData()
			this.purchasInformation()
		},
		methods:{
			// 绑定采购信息
			purchasInformation(){
				http.get(api.purchasInformation,{}).then(res=>{
					this.formData = res.data.info
					console.log(res,"111")
				})
			},
			// 地区选择器
			onConfirm(areaValues){
					this.showArea = false;
					this.formData.address = areaValues.filter((item) => !!item).map((item) => item.name).join('/');
			},
			// 提交表单
			complete(){
				let formData = JSON.parse(JSON.stringify(this.formData))
				let productList = []
				for (let i = 0; i < formData.productList.length; i++) {
					console.log(formData.productList[i].val,2222)
					if(formData.productList[i].val != ""){
						console.log(formData.productList[i],12121)
						productList.push(formData.productList[i].val)
					}
				}
				formData.productList = productList
				console.log(formData,"12121")
				if(formData.username == ""){
					this.$notify({ type: 'warning', message: '请输入采购联系人姓名' })
					return
				}
				if(formData.phone == ""){
					this.$notify({ type: 'warning', message: '请输入采购联系人电话' })
					return
				}
				if(formData.company_name == ""){
					this.$notify({ type: 'warning', message: '请输入采购单位公司名称' })
					return
				}
				http.post(api.purchasInformation,formData).then(res=>{
					this.$notify({ type: 'success', message: '已完成' })
					setTimeout(()=>{
						this.$router.replace('/member/personal/index')
					},800)
				})
			},
			// 获取用户电话号码
			getUser(){
				http.get(api.getMember,{}).then(res=>{
					this.mobile = res.data[0].mobile
				})
			},
			// 获取手机号
			getPhone(type){
				if(type == 1){
					this.formData.phone = this.mobile
				} else{
					this.formData.weixin = this.mobile
				}
				
			},
			// 获取select下拉的列表
			getSelectData(){
				http.get(api.classify,{
					type:'resumeTag,trade,itemclassifiy,companyScale,citycategorys'
				}).then(res=>{
					this.itemclassifiy = res.data.itemclassifiy
					this.trade = res.data.trade
					this.resumeTag = res.data.resumeTag
					this.companyScale = res.data.companyScale
					this.citycategory = res.data.citycategorys
					console.log(res,"121212")
				})
			},
			addProduct(e){
				console.log(e,'111')
			},
			add(){
				let id = new Date().getTime()
				this.formData.productList.push({val:'',id:id})
			},
			reduce(e,i){
				this.formData.productList.splice(i,1)
			}
		}
	}
</script>

<style lang="scss" scoped>
	
	
	.main{font-size: 14px; color: #000;
		.fix{position: fixed; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(0, 0, 0, .4); display: flex; align-items: center; justify-content: center; 
			.pop{background-color: #fff; width: 282px; height: 150px; border-radius: 5px; text-align: center; display: flex; align-items: center; justify-content: space-around; flex-direction: column;
				.button{display: flex; justify-content: center;
					div{margin: 0 20px; border: 1px #262626 solid; border-radius: 5px; width: 60px; height: 30px; line-height: 30px;}
					div:nth-child(1){color: #ff0000;}
				}
			}
		}
	
	
		div{margin-top: 20px;padding: 0px 10px;}
		span{color: #ff0000;}
		input{border: 0; border-bottom: 1px #000 solid;}
		.blue{color: #55aaff;}
		.img{width: 100%; height: 160px; }
		.phone{overflow: hidden; text-overflow: ellipsis; white-space: nowrap;}
		.select{
			select{width: 150px; border-radius: 5px; background-color: #fff; height: 30px;}
		}
		.border{border-top: #ccc 2px solid; padding: 10px 0 0;
			span{margin-left: 10px; color: #000;}
		}
		.last-input{border: 1px solid #000; border-radius: 3px ; height: 30px; width: 200px;}
		.product-list{display: flex; 
			.product-list-text{width: 78px; flex: none;}
			div{margin: 0; padding: 0;}
			input{margin-bottom: 10px;}
		}
		.add{padding: 10px 87px 20px; color: #55aaff;}
		.hide{display: none;}
		.reduce{padding-left: 10px;}
		.skip{text-align: center; color: #00aaff;padding-bottom: 20px;}
		.complete{background-color: #009BFF ; width: 332px;height: 40px; line-height: 40px; margin: auto; margin-bottom: 20px; border-radius: 5px; text-align: center; color: #fff;}
	}
</style>