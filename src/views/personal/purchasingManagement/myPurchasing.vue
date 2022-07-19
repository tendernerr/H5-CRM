<template>
  <div id="app">
    <Head bgColor='#fff' >我的采购</Head>
	 <div class="search">
		 <div class="search-input">
			 <input v-model="fullname"/>
		 </div>
		 <div class="search-text">
			 <div :class="[type==1?'type':'']" @click="change(1)">进行中</div>
			 <div :class="[type==2?'type':'']" @click="change(2)">已截止</div>
			 <div :class="[type==3?'type':'']" @click="change(3)">已完成</div>
		 </div>
	 </div>
	 <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了~"  @load="onLoad">
		 <div class="list" v-for="(item,index) in list" :key="index" @click="$router.push('/personal/purchasingManagement/purchaseDetails?id='+item.id)">
			 <div class="list-box1">
				 <div class="head-img"><img v-if="item && item.photo_img_src" :src="item.photo_img_src"/></div>
				 <div class="head-text">
					 <div class="head-name">
						{{item.fullname}}
					 </div>
					 <div class="head-time">
						 {{item.birthday}}截止<span style="margin-left: 10px;">{{item.education_text}}</span>
					 </div>
				 </div>
				 <div class="budget">
					 <div class="budget-number">采购预算：{{item.minwage}}</div>
					 <div class="budget-state">
						<span v-if="item.state == '已发布'" style="color: #55ff7f;">{{item.state}}</span>
						<span v-if="item.state == '审核中'" style="color: #ffaa00;">{{item.state}}</span>
						<span v-if="item.state == '未通过'" style="color: #ff0000;">{{item.state}}</span>
					 </div>
				 </div>
			 </div>
			 <div class="list-box2">
				 <div class="list-box2-bottom1">
					 <div class="label">
						 <div class="label-box" v-if="item.householdaddress_name">
							 {{item.householdaddress_name}}
						 </div>
						</div>
					 <div class="renew-time">{{item.updatetime}} 更新   项目在：{{item.address}}</div>
				 </div>
				 <div class="list-box2-bottom2">
					 已参与{{item.involved_count}}/{{item.involved}}
				 </div>
			 </div>
		 </div>
	 </van-list>
  </div>
</template>

<script>
import {handlerHttpError} from '@/utils/error'
import http from '@/utils/http'
import api from '@/api'
import Vue from 'vue'
import { ImagePreview } from 'vant'
Vue.use(ImagePreview)
export default {
  name: 'EditResume',
  data () {
    return {
		 loading:true,					// 为true是因为加载的时候他会触发一次底部
		 finished:false,				//加载的状态，如果是false只在转圈 finished在全部加载钱都为false
		 list:[],
		 fullname:'',
		 type:1,
		 page:1,
		 pageSize:10
    }
  },
  computed: { 
	  
  },
  watch:{
	  fullname:{
		  handler(newValue,oldValue){
			  console.log(newValue,oldValue,this.fullname,"监听")
			  this.page = 1
			  this.pageSize = 10
			  this.myPurchase()
		  }
	  },
	  type:{
		  handler(ne,ol){
			  console.log(ne,ol,this.type,"监听")
			  this.page = 1
			  this.pageSize = 10
			  this.myPurchase()
		  }
	  }
  },
  created () {
    this.myPurchase()
  },
  methods: {
	  // 获取数据列表
    myPurchase () {
		 http.get(api.myPurchase,{
			 fullname:this.fullname,		//搜索字段
			 type:this.type, 					//类型  1进行中   2 已截止
			 page:this.page,					//当前页
			 pageSize:this.pageSize  		//总的页数
		 }).then(res=>{
			 let list = res.data.data
			 this.list = this.page == 1 ? list : [...this.list,...list];
			 this.loading = false
			 this.finished = false			//会通过监听等其他方法触发函数，重新启用触底
			 if(list.length < this.pageSize ){
				 this.loading = true
				 this.finished = true
			 }
		 })
	 },
	 onLoad(){
		 this.page++
		 this.myPurchase()
	 },
	 change(nab){
		 this.type = nab
	 }
  }
}
</script>

<style lang="scss" scoped>
	#app{
		background-color: #efefef; width: 100%; min-height: 100vh;
		.search-input{background-color: #fff; display: flex; justify-content: center; align-items: center; height: 50px;
			input{border: 0;text-align: center; border-radius: 40px; background: url('https://www.hangyedaniu.com/upload/resource/search.png') no-repeat 10% center / 35px 35px #efefef;width: 325px;}
		}
		.search-text{display: flex; align-items: center;background-color: #fff;font-size: 15px;
			div{margin-left: 22px; background-color: #fff; border-bottom: #fff 3px solid; width: 56px; height: 27px; line-height: 27px;text-align: center; }
			.type{background-color: #E6F7FF; border-bottom: #1684FC 3px solid; width: 56px; color: #3696FC;}
		}
		.list{display: flex; flex-direction: column; justify-content: space-between; height: 180px; padding: 5px; margin-top: 12px; background-color: #fff;
			.list-box1{display: flex; align-items: center;
				.head-img{width: 50px; height: 50px; border-radius: 50%; overflow: hidden; margin-right: 8px; flex: none; background: url('https://www.hangyedaniu.com/upload/resource/user.png') no-repeat center center /100% 100%;
					img{width: 100%; height: 100%;}
				}
				.head-text{display: flex; height: 50px; justify-content: space-around; flex-direction: column; min-width: 150px; flex: 1;
					.head-name{font-size: 18px;font-weight: 700; width: 100%; text-overflow: ellipsis; overflow: hidden;white-space: nowrap;}
					.head-time{font-size: 12px; width: 100%; text-overflow: ellipsis; overflow: hidden;white-space: nowrap;color: #FF6600 ;
						span{color: #2295FF ;}
					}
				}
				.budget{font-size: 14px; height: 50px; display: flex; flex-direction: column; justify-content: space-around; 
					.budget-number{width: 100%; text-overflow: ellipsis; overflow: hidden;white-space: nowrap;}
					.budget-state{width: 100%;text-align: center;}
				}
			}
			.list-box2{display: flex; padding: 0 8px 0; align-items: center; justify-content: space-between;
				.list-box2-bottom1{display: flex; flex-direction: column;
					.label{margin-bottom:10px; display: flex;
						.label-box{ border: #FD7900 1px solid;height: 30px;line-height: 30px;text-align: center;font-size: 14px; border-radius: 5px; padding: 0 8px;}
					}
					.renew-time{color: #999999 ;font-size: 14px;}
				}
				.list-box2-bottom2{font-size: 14px;border-radius: 4px;background-color: rgba(164, 173, 179, 100);color: #fff;width: 80px;height: 30px; line-height: 30px; text-align: center;}
			}
		}
	}
</style>
