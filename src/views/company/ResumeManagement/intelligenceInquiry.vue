<template>
  <div class="centent">
    <Head bgColor='#fff'>智能推荐</Head>
    <!-- <ScrollNav :list="navList" ></ScrollNav> -->
	 <van-list ></van-list>
    <div class="box">
		 <van-list @load="onLoad" :finished="finished" v-model="loading" finished-text="没有更多了~">
			 <div class="list" v-if="list.length > 0">
				 <div class="listBox" v-for="(item,index) in list" :key="index" @click="go(`/resume/${item.id}`)">
					 <div class="box1">
						 <div class="box1Img"><img :src="item.photo_img_src" /></div>
						 <div class="text">
							 <div class="text1">{{item.fullname}}</div>
							 <div class="text2">{{item.birthday}}截止 <span>{{item.education_text}}</span></div>
						 </div>
						 <div class="button">
							 <div class='text1'>预算:{{item.minwage}}</div>
							 <div :class="['text2',item.isView?'text2-1':'']">{{item.isView?'已查看':'未查看'}}</div>
						 </div>
					 </div>
					 <div class="box2">
						 <div class="text1">{{item.householdaddress_name}}</div>
						 <div class="text2">
							 <div class="timePlace">{{item.refreshtime}} 更新   项目在：{{item.address}}</div>
							 <div class="join">已参与{{item.involved_count}}/{{item.involved}}</div>
						 </div>
						 <div class="buttonText" v-if="false">
							 <div v-if="true" class="buttonText1">已成交</div>
							 <div v-if="true" class="buttonText1">填写沟通记录</div>
							 <div v-if="false" class="buttonText1">联系报价</div>
							 <div v-if="false" class="buttonText1">不合适</div>
						 </div>
					 </div>
				 </div>
			 </div>
			 <div class="empty" v-else>
				 <img src="../../../assets/images/im/empty.png" />
			 </div>
		 </van-list>
	 </div>
  </div>
</template>

<script>
import http from '@/utils/http'
import api from '@/api'
import ScrollNav from '@/components/ScrollNav'
export default {
  name: 'BrowsingRecords',
  components: {
    ScrollNav
  },
  data () {
    return {
      navList: [
		// { text: '智能推荐', href: '/member/company/intelligenceInquiry', active: true },
        // { text: '主动询价', href: '/member/company/jobapply', active: false },
        { text: '我的报价', href: '/member/company/download', active: false },
        { text: '我的回访', href: '/member/company/interview', active: false },
        // { text: '视频报价', href: '/member/company/interview_video', active: false },
        { text: '我的收藏', href: '/member/company/fav', active: false },
        { text: '浏览记录', href: '/member/company/view_resume', active: false }
      ],
		list:[],
		page:1,
		pagesize:10,
		id:'',		//请求
		loading:true,	//是否加载状态======第一次进来避免多次加载，选择true
		finished:false,	//是否全部加载完成
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
	  go(url){
		  this.$router.push(url)
	  },
	  fetchData(){
		  http.get(api.get_publish_jobs, {}).then(res => {
			  this.id = res.data.items[0].id
			  this.getResume()
		   })
		   .catch(() => {})
	  },
	  getResume(){
		  console.log(this.pagesize,"this.pagesize")
		  http.get(api.recommend_resumelist,{id:this.id,page:this.page,pagesize:this.pagesize}).then(res=>{
				let list = res.data.items
				this.list = this.page == 1 ? list : [...this.list,...list];
				if(list.length < this.pagesize){
					this.loading = true
					this.finished = true
				} else{
					this.loading = false
					this.finished = false
				}
		  })
	  },
	  onLoad(e){
		  this.page++
		  this.getResume()
		  console.log(e,"触地")
	  }
  }
}
</script>

<style lang="scss" scoped>
	.centent{min-height: 100vh;background-color: #fff;
		.box{
			.list{margin-top: 8px;
				.listBox{display: flex; flex-direction: column;border-top: #f3f3f3 6px solid;
					.box1{width: 100%; display: flex; align-items: center;
						.box1Img{width: 57px; height: 57px; display: flex; align-items: center;background: url('../../../assets/images/empty_photo.png') no-repeat center center / 100% 100%; border-radius: 50% ;flex: none; overflow: hidden; margin:6px;
							img{ object-fit: cover;width: 100%; height: 100%;}
						}
						.text{min-width: 200px; display: flex; flex-direction: column; justify-content: space-around;
							.text1{font-size: 18px;color: #000; overflow: hidden; text-overflow: ellipsis;white-space: nowrap;}
							.text2{color: #FF6600; font-size: 12px;
								span{color: #2295FF; margin-left: 5px;}
							}
						}
						.button{flex: 1; text-align: center;
							.text1{font-size: 14px;color: #000;}
							.text2{border-radius: 4px;color: rgba(255, 255, 255, 100);font-size: 12px;text-align: center; line-height: 22px;width: 60px;height: 22px; background-color: #FD7900; margin: 8px auto 0px;
								&-1{background-color: #aaaaa5;}
							}
						}
					}
					.box2{ margin-top: 25px; padding: 0px 14px;
						.text1{color: #7B7575 ; font-size: 16px;}
						.text2{ display: flex; justify-content: space-between; margin-top: 21px;  align-items: center; margin-bottom: 15px;
							.timePlace{font-size: 14px;color: rgba(153, 153, 153, 100); }
							.join{background-color: #2295FF; border-radius: 4px; font-size: 14px; text-align: center; line-height: 30px; height: 30px;color: #fff; padding: 0px 10px;}
						}
					}
					.buttonText{height: 55px; display: flex; border-top: rgba(187, 187, 187, 100) 1px solid; justify-content:flex-end; align-items: center;
						.buttonText1{height: 31px;line-height: 31px;border-radius: 5px;color: rgba(16, 16, 16, 100);font-size: 14px;text-align: center; padding: 0px 10px; border: 1px solid rgba(187, 187, 187, 100); margin-left: 17px;}
					}
				}
			}
			.load{ font-size: 13px; height: 30px; line-height: 30px; text-align: center;}
			.empty{display:flex; justify-content: center; align-items:center; flex-direction: column; background-color: #fff;border-top: #f3f3f3 6px solid; padding-top: 32px;
				img{width: 160px; height: 160px; }
				div{margin-top: 16px; color: #969799; font-size: 13px;}
			}
		}
	}
</style>
