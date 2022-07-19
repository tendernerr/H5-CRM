<template>
	<div id="main">
		<Head bgColor="#fff" :subscribeProject='true'>商家订阅</Head>
		<div class="centen">
			<div class="text">
				请选择您擅长或您感兴趣的工艺类别，系统会自动将最新的采购商机第一时间通知到您！
			</div>
			<div class="box">
				<div :class="['box-bold',item.isSelect?'box-bold-co':'']" v-for="(item,index) in list" :key="item.id" @click="change(item)">
					{{item.name}}
				</div>
			</div>
			<div class="complete" @click="complete()">
				<div>完成订阅</div>
			</div>
		</div>
		<div class="popu" v-if="popu">
			<div class="text1">提示</div>
			<div class="text2">{{tips}}</div>
		</div>
		<!-- 订阅弹框 -->
		<div class="subscribe_pu" v-if="subscribe_pu">
			<div :class="['text1',!isSubscribe?'text':'']">
				您已成功订阅类似项目，有新项目时会第一时间通知到您微信<br/>
				<span class="span1">微信绑定：您尚未绑定微信<span class="span2" @click="go('/member/company/account')">去绑定>></span></span>
			</div>
			<div class="text2" @click="closeOpen()">
				<div>完成</div>
			</div>
		</div>
	</div>
</template>

<script>
	import api from '@/api'
	import http from '@/utils/http'
	import {mapState} from 'vuex'
	export default{
		data(){
			return{
				list:[],
				listBold:[],
				tips:'',
				popu:false,
				time:'',
				subscribe_pu:false,	//弹框
				isSubscribe:false,  //是否订阅
				isWeixin:false , 		//是否微信绑定
				times:null,			//定时器
			}
		},
		computed:{
			...mapState(['userInfo'])
		},
		created() {
			this.getCategoryList()
		},
		methods:{
			getCategoryList(){
				console.log(1213)
				http.get(api.getCategoryList,{uid:this.userInfo.uid}).then(res=>{
					console.log(res.data.list,'121212312345664867')
					this.list = res.data.list
					this.isWeixin = res.data.isWeixin
					for (let i = 0; i < this.list.length; i++) {
						if(this.list[i].isSelect){
							this.listBold.push(this.list[i].id)
						}
					}
				})
			},
			change(item){
				console.log(this.time)
				if(this.time){
					clearTimeout(this.time)
				}
				if(item.isSelect){
					let i = this.listBold.indexOf(item.id)
					this.listBold.splice(i,1)
				} else{
					if( this.listBold.length >= 3 ){
						this.popu = true
						this.tips = '最多可选中最多可选中最多可选中最多可选中3个标签'
						this.time = setTimeout(()=>{
							this.popu = false
						},800)
						return
					} else{
						this.listBold.push(item.id)
					}
				}
				item.isSelect = !item.isSelect
			},
			go(url){
				this.$router.push(url)
			},
			closeOpen(){
				this.subscribe_pu = false
				window.history.go(-1);
			},
			complete(go){
				http.post(api.saveUserResume,{householdaddress:this.listBold,uid:this.userInfo.uid}).then(res=>{
					this.tips = '订阅成功'
					if(this.isWeixin){
						this.popu = true
						this.time = setTimeout(()=>{
							this.popu = false
							window.history.go(-1);
						},800)
					} else{
						this.subscribe_pu = true
					}
				})
					
			}
		}
	}
</script>

<style lang="scss" scoped>
	#main{min-height: 100vh;width:100%; background-color: #F1F2F8;;padding-bottom: 150px;
		.centen{background-color: #FFFFFF; border-top: #F1F1F1 solid 1px;
			.text{padding: 15px 18px 25px 18px;color: rgba(253, 121, 0, 100);font-size: 14px;text-align: left;}
			.box{display: flex; padding: 0px 18px;flex-wrap:wrap;  
				.box-bold{width: 69px;min-height: 30px;border-radius: 4px;color: rgba(16, 16, 16, 100);font-size: 14px;border: 1px solid #BBBBBB;margin: 0 20px 20px 0; display: flex; align-items:center; justify-content: center;word-break: break-all;
					&:nth-child(4n){margin-right: 0;}
					&-co{color: #FFFFFF ;background-color: #FD7900;}
				}
			}
			.complete{width: 100%;border-top: 1px solid rgba(187, 187, 187, 100); height: 68px; display: flex; align-items: center; justify-content: center;
				div{width: 158px;height: 30px;background-color: #009BFF ; font-size: 14px;border-radius: 4px;text-align: center; line-height: 30px; color: #FFFFFF;}
			}
		}
		.popu{position: fixed;top: 50%; right: 50%;background-color: rgba(0, 0, 0, .8);width: 175px;transform: translate(50%,-50%); border-radius:10px ; padding-bottom: 5px;
			.text1{color: #FFFFFF;font-size: 18px;text-align: center; padding-top: 5px;}
			.text2{color: #FFFFFF;font-size: 12px;text-align: center; padding: 6px 5px 2px;}
		}
		.subscribe_pu{position: fixed; top: 50%;left: 50%;transform: translate(-50%,-50%);z-index: 555;background-color: #ffffff;padding: 18px 13px 0;width: 295px;box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.4);border-radius: 10px;border: 1px solid rgba(187, 187, 187, 100);font-size: 15px;color: #000;
			.text1{padding-bottom: 6px;
				.span1{padding-top: 5px;display: block;}
				.span2{color: #009bff;}
			}
			.text{text-align: center;padding-bottom: 12px;}
			.text2{color: #7B7575;height: 15px;width: 50px; display: flex; justify-content: center; align-items: center;width: 100%; padding: 15px 15px 20px;
				div{width: 75px;height: 25px;text-align: center; line-height: 25px;border: #ccc solid 1px; border-radius: 5px;}
			}
		}
	}
</style>