<template>
  <div id="app">
    <Meta pagealias="resumelist" :query_data="$route.query" />
    <Head :zIndex="true">智能推荐</Head>
    <!-- 搜索按钮 -->
    <div @click.stop="search = !search" class="searchDiv" :style="[top]" @touchstart.stop="down" @touchmove.stop="move" @touchend.stop="end">
      <van-icon v-if="!search" name="search" />
      <van-icon v-else name="cross" />
    </div>
    <div @click.stop v-if="search" class="searchDiv2" :style="[top2]">
      <input class="searchInput" style="width: 100%;height: 100%;padding: 0 5px;border-radius: 5px;" :placeholder="`搜索${active?'备案':'直采'}项目`" v-model="params.keyword" />
    </div>
		<van-tabs v-model="active" style="border-top: 1px solid #e6e6e6; z-index: 3;" sticky offset-top="53">
		  <van-tab title="直采项目">
			  <div class="form_split_10"></div>
			  <van-empty image="search" description="没有找到对应的数据" style="background-color: #fff" v-if="dataset.length < 1" />
			  <van-list v-if="dataset.length > 0" v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :immediate-check="true">
			    <div class="box_3">
			      <div v-for="(item,index) in dataset" :key="index" @click="toDetail(item.id)">
			        <div class="list">
			          <div class="up">
			            <div class="avatar_box">
			              <img :src="item.pimg" />
			            </div>
			            <div class="tx1">
			              <div class="name">{{ item.fullname }}</div>
			              <div class="wagw">预算：{{ item.minwage }}</div>
			            </div>
			            <div class="tx2">
			              {{ item.birthday || "半年后" }}截止 ·
			              {{ item.education_text }}
			            </div>
			          </div>
			          <div class="tx3">
			            {{ item.householdaddress_name }}
			          </div>
			  
			          <div class="tx4" style="display: flex;justify-content: space-between;align-items: center;">
			            <div style="display: flex">
			              <div class="time">{{ item.refresh_time }}更新</div>
			              <div class="time" style="margin-left: 20px">
			                项目在：{{ item.address }}
			              </div>
			            </div>
			            <div style="wdith: 60px;height: 30px;background-color: #1787fb;border-radius: 5px;align-items: center;color: #e5f1ff;display: flex;padding: 10px;">
			              已参与{{ item.involved }}
			            </div>
			          </div>
			          <!-- <div class="tag" v-if="item.service_tag != ''">
			            {{ item.service_tag }}
			          </div> -->
			        </div>
			        <div class="form_split_10"></div>
			      </div>
			    </div>
			  </van-list>
			  <div class="login_layer" v-if="showLayer">
			    <div class="ll_tip">注册企业会员，海量项目任你选</div>
			    <div class="ll_tip_more">登录后可查看更多项目</div>
			    <div class="ll_qr_box">
			      <img :src="$store.state.config.wechat_qrcode" alt class="ll_qr" />
			    </div>
			    <div class="ll_tip_more">微信扫一扫，供应商更轻松</div>
			    <div class="ll_tip_bth">
			      <router-link to="/member/login" class="a_btn">登录</router-link>
			      <router-link to="/member/reg/company" class="a_btn blue">注册</router-link>
			    </div>
			    <div class="ll_tip_tel" v-if="$store.state.config.contact_tel">
			      联系客服：{{ $store.state.config.contact_tel }}
			    </div>
			  </div>
		  </van-tab>
		  <van-tab title="备案项目" v-if="true">
        <div v-if="menber.is_setmeal" class="box_2" style="display: flex;justify-content:space-around;padding: 4px 8px 8px;font-size:12px;background:#fff;">
          <div @click="params.hasPhone=0" :class="{'box_2Div':params.hasPhone === 0}" style="width: 30%;text-align: center;background: #c1c1c1;color: #fff;border-radius: 5px;line-height: 22px;height: 22px;">全部</div>
          <div @click="params.hasPhone=1" :class="{'box_2Div':params.hasPhone === 1}" style="width: 30%;text-align: center;background: #c1c1c1;color: #fff;border-radius: 5px;line-height: 22px;height: 22px;">有号码</div>
          <div @click="params.hasPhone=2" :class="{'box_2Div':params.hasPhone === 2}" style="width: 30%;text-align: center;background: #c1c1c1;color: #fff;border-radius: 5px;line-height: 22px;height: 22px;">无号码</div>
			  </div>
			  <div class="form_split_10"></div>
			  <van-empty image="search" description="没有找到对应的数据" style="background-color: #fff" v-if="dataset.length < 1" />
			  <van-list v-if="dataset.length > 0" v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :immediate-check="true">
			    <div class="listTab2" v-for="(item,index) in dataset" :key="index" @click="$router.push('/backupsProject/backupsProject?id='+item.id)">
					 <div class="listTab2Head">
						 <div class="listTab2HeadImg"><img v-if="item.pimg" :src="item.pimg" /></div>
						 <div class="listTab2HeadName">
							 <div class="listTab2HeadName1">
								 <div class="listTab2HeadName1Text1">{{item.title}}</div>
								 <div class="listTab2HeadName1Text2">总投资: {{item.project_investment}}</div>
							 </div>
							 <div class="listTab2HeadName2">{{item.start_end_time}}</div>
						 </div>
					 </div>
					 <div class="listTab2Label">
					 		<div class="listTab2LabelList" v-for="(ite,inde) in item.category" :key="inde">
								{{ite}}
							</div>
					 </div>
					 <div class="updateTime">
					 		{{item.refreshtime}}更新<span class="updateTimeSpan" > 项目在：{{item.address}}</span>
					 </div>
				 </div>
			  </van-list>
		  </van-tab>
		</van-tabs>
		<div class="login_layer" v-if="showLayer">
		  <div class="ll_tip">注册企业会员，海量项目任你选</div>
		  <div class="ll_tip_more">登录后可查看更多项目</div>
		  <div class="ll_qr_box">
		    <img :src="$store.state.config.wechat_qrcode" alt class="ll_qr" />
		  </div>
		  <div class="ll_tip_more">微信扫一扫，供应商更轻松</div>
		  <div class="ll_tip_bth">
		    <router-link to="/member/login" class="a_btn">登录</router-link>
		    <router-link to="/member/reg/company" class="a_btn blue">注册</router-link>
		  </div>
		  <div class="ll_tip_tel" v-if="$store.state.config.contact_tel">
		    联系客服：{{ $store.state.config.contact_tel }}
		  </div>
		</div>
    <BottomNav></BottomNav>
  </div>
</template>

<script>
import http from "@/utils/http";
import api from "@/api";
export default {
  components: { },
  data() {
    return {
      menber:{},
      search:false,
      top:{left: '8px',top:'140px'},
      top2:{left: '64px',top:'140px'},
      dataset: [],
      loading: false,
      finished: false,
      show_empty: false,
      params: {
        date:'',
        hasPhone:0,
        keyword: "",
        district1: 0,
        district2: 0,
        district3: 0,
        experience: "",
        education: "",
        sex: "",
        minage: "",
        maxage: "",
        major: "",
        minwage: "",
        maxwage: "",
        tag: "",
        settr: "",
      },
	  page: 1,
	  pagesize: 10,
      // 未登录引导
      showLayer: false,
      active:0,			//切换
      title1:'地区',
      title2:'涉及工艺',
      title3:'项目类型',
      citycategorys:{},		//地区
      householdaddress:[],		//项目类型
      education:[],				//涉及工艺
    };
  },
  watch: {
    'params.hasPhone':{
      handler(e){
        this.loading = false ;
        this.finished = false ; 
        this.dataset = []
        this.page = 1
        this.fetchData()
      }
    },
    'params.keyword':{
      handler(ne,ol){
			this.loading = false ;
			this.finished = false ; 
			this.dataset = []
			this.page = 1
			this.fetchData()
		 }
    },
	 active:{
		 handler(ne,ol){
			this.loading = false ;
			this.finished = false ; 
			this.dataset = []
			this.page = 1
			this.fetchData()
		 }
	 }
  },
  //缓存数据---进入详情后重来设置keepAlive==true
  beforeRouteLeave(to, from, next) {
    if (to.name === "resumeShow" || to.name === "backupsProject") {
      if (!from.meta.keepAlive) {
        from.meta.keepAlive = true;
      }
      next();
    } else {
      from.meta.keepAlive = false;
      next();
    }
  },
  created() {
    if(this.$route.query.active || this.$route.query.active==='0'){
      this.active = this.$route.query.active
    }
    if(this.$route.query.times){
      this.params.date = this.$route.query.times
    }
	 // 请求列表数据
   this.getMenber()       //判断备案项目号码显示
    this.fetchData(true);		//获取列表信息
	 this.classify()				//获取下啦数据
  },
  mounted() {

  },
  methods: {
    getMenber(){
      http.get(api.getMenber,{}).then(res=>{
        this.menber = res.data
      })
    },
    down(e){
      console.log(e,"222")
    },
    move(e){
      console.log(e,"111")
      document.body.style.overflow = 'hidden'
      this.top.top = e.touches[0].clientY-25+'px'
      this.top.left = e.touches[0].clientX-25+'px'
      this.top2.top = e.touches[0].clientY-25+'px'
      this.top2.left = e.touches[0].clientX+29+'px'
    },
    end(e){
      document.body.style.overflow = 'auto'
      console.log(e,"333")
    },
	  // 获取选项信息
	  classify(){
		  http.get(api.classify,{type:'citycategorys,householdaddress,education'}).then(res=>{
			  console.log(res,"sssss")
			  let householdaddress = []
			  let education = []
			  householdaddress.unshift({
				  text: '不限', value: 0
			  })
			  education.unshift({
				  text: '不限', value: 0
			  })
			  for (let i = 0; i < res.data.householdaddress.length; i++) {
					householdaddress.push({text: res.data.householdaddress[i].name, value: res.data.householdaddress[i].id})
			  }
			  for (let i = 0; i < res.data.education.length; i++) {
			  		education.push({text: res.data.education[i].name, value: res.data.education[i].id})
			  }
			  this.citycategorys = res.data.citycategorys
			  this.householdaddress = householdaddress
			  this.education = education
		  })
	  },
    // 请求列表数据，init为true时直接更改dataset值，false时代表上拉加载回的数据追加进dataset
    fetchData(init) {
      console.log(init)
		let params = {...this.params,}
		params.page = this.page
		params.pagesize = this.pagesize
		let url = this.active != 1 ? api.getZProjectRecommend : api.getBProjectRecommend;
      http.get(url, {...params}).then((res) => {
        console.log(res,"list数据")
		  if(res.code === 200){
		  	// 下拉加载
		  	let list = res.data.data
			this.loading = false ;
		  	if(list.length < this.pagesize){
						this.loading = true ;
						this.finished = true ; 
					}
		  	this.dataset = this.page == 1 ? list : [...this.dataset,...list];
		  }
        }).catch(() => {});
    },
    onLoad() {
		this.page++
		this.fetchData()
    },
    toDetail(id) {
      this.$router.push("/resume/" + id);
    },
  },
};
</script>

<style lang="scss" scoped>

  .searchDiv{
    background: #cfe1fb;position: fixed;line-height: 51px;width: 50px;height: 50px;z-index: 999;border-radius: 50%;text-align: center;color: #fff;left: 8px;
 }

.searchDiv2{
     position: fixed;z-index: 999;width: 50%;height: 46px;font-size: 16px;padding: 11px 0px 1px;left: 62px;
}
	
  .searchInput{
  border: 1px #e2ebf8 solid;
}
	.searchInput:focus{
              outline: none;
              border: 1px red solid;
  }

	>>> .van-tabs__line{background-color: #00aaff!important;}
	
	>>> .van-tab--active{
		.van-tab__text{color: #00aaff!important}
	}
	>>> .van-tab{color: #000;}
	.box_2 {position: sticky;top:97px; z-index: 100;
  .van-hairline--top-bottom {
    &::after {
      border: 0;
    }
  }
  .box_2Div{
    background: #4ea8e8 !important;
  }
}
	.listTab2{display: flex; flex-direction: column; border-bottom:6px solid #eeeeee;
		.listTab2Head{background-color: #fff; font-size: 15px; display: flex; padding: 5px;
			.listTab2HeadImg{width: 60px; height: 60px; flex: none; overflow: hidden; border-radius: 50%; background: url("https://www.hangyedaniu.com/upload/resource/user.png") no-repeat center center/ 100% 100%; object-fit: cover;
				img{width: 100%;height: 100%;}
			}
			.listTab2HeadName{display: flex; flex-direction: column; justify-content: space-around; padding:0 5px; flex: 1;
				.listTab2HeadName1{display: flex; justify-content: space-between; align-items: center;
					.listTab2HeadName1Text1{overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-box-orient: vertical;word-break: break-all; -webkit-line-clamp: 1; margin-right: 15px; font-weight: 700;}
					.listTab2HeadName1Text2{ font-size: 13px; flex: none;}
				}
				.listTab2HeadName2{font-size: 13px;
					.listTab2HeadName2Span2{margin-left: 10px;}
				}
			}
		}
		.listTab2Label{display: flex; flex-wrap: wrap; font-size: 12px; color: #1787fb; padding: 5px 20px;
			.listTab2LabelList{background-color: #f4f9ff; padding: 3px 8px; margin-right: 8px; border-radius: 5px; margin-bottom: 5px;}
		}
		.updateTime{padding: 0px 20px 15px; font-size: 12px;
			.updateTimeSpan{margin-left: 10px;}
		}
		
	}
	
	
.more_box {
  .item_wrapper {
    .item_group {
      .item {
        &.select {
          background-color: #e5f1ff;
          color: #5da9fc;
        }
        display: block;
        float: left;
        width: 81px;
        margin: 0 7px 10px 0;
        text-align: center;
        background-color: #f4f4f4;
        font-size: 13px;
        padding: 6.5px 0;
        &:nth-of-type(4n) {
          margin-right: 0;
        }
      }
    }
    .item_title {
      padding: 15px 0;
      font-size: 15px;
      color: #333333;
    }
    padding: 0 15px;
    position: relative;
    .wrapper_bottom {
      .btn_c {
        &.blue {
          background-color: #1787fb;
          color: #ffffff;
        }
        flex: 1;
        background-color: #f4f4f4;
        color: #333333;
        font-size: 15px;
        text-align: center;
        padding: 10.5px 0;
      }
      position: fixed;
      left: 0;
      top: 79%;
      display: flex;
      width: 100%;
      z-index: 3;
    }
  }
  position: relative;
  padding-bottom: 41px;
}
.login_layer {
  width: 100%;
  padding: 40px 0;
  text-align: center;
  background: url("../assets/images/login_layer_resume_bg.jpg") 0 no-repeat;
  background-size: 100%;
  .ll_tip_tel {
    font-size: 14px;
    color: #666;
    padding-top: 10px;
  }
  .ll_tip_bth {
    .a_btn {
      &.blue {
        background: #128bed;
      }
      display: inline-block;
      padding: 6px 25px;
      background: #e33244;
      color: #fff;
      border-radius: 3px;
      margin: 0 10px;
      font-size: 14px;
    }
  }
  .ll_qr_box {
    .ll_qr {
      width: 100px;
      height: 100px;
      border: 0;
    }
    width: 100px;
    height: 100px;
    margin: 10px auto 5px;
  }
  .ll_tip {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 5px;
    color: #333;
  }
  .ll_tip_more {
    font-size: 14px;
    color: #666;
    margin-bottom: 10px;
  }
}
.box_3 {
  .list {
    .tag {
      padding: 3px 5px 3px 17px;
      border-radius: 3px;
      color: #ffffff;
      font-size: 10px;
      position: absolute;
      right: 17px;
      bottom: 15px;
      background: #ffa57d url("../assets/images/fab_ico.svg") 5px center
        no-repeat;
      background-size: 10px;
    }
    .top {
      position: absolute;
      right: -25px;
      top: -25px;
      width: 50px;
      height: 50px;
      background-color: #feae41;
      color: #ffffff;
      font-weight: bold;
      text-align: center;
      transform: rotateZ(45deg);
      padding-top: 36px;
      font-size: 10px;
    }
    .tx4 {
      font-size: 13px;
      color: #999999;
      // padding-right: 90px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      padding-bottom: 17px;
    }
    .tx3 {
      span {
        color: #666666;
      }

      font-size: 13px;
      color: #999999;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      padding-bottom: 11.5px;
    }
    .up {
      .tx2 {
        .time {
          position: absolute;
          right: 0;
          top: 7px;
          font-size: 13px;
          color: #999999;
        }
        position: relative;
        font-size: 15px;
        color: #666666;
        padding: 5px 0 17.5px;
      }
      .tx1 {
        position: relative;
        padding-top: 22.5px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .wagw {
          flex: none;
          font-size: 14px;
          color: #101010;
        }
         .name {
          overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1;word-break: break-all;
          font-size: 18px;
          font-weight: bold;
          color: #333333;
        }
        .level_ico {
          float: left;
          margin-left: 10px;
          width: 36px;
          height: 25px;
          background: url("../assets/images/resume_list_level_ico.png") 0 center
            no-repeat;
          background-size: 36px 15px;
        }
      }
      .avatar_box {
        .gender {
          &.female {
            background: #ff8d65 url("../assets/images/female_ico.svg") center
              no-repeat;
            background-size: 9px;
          }
          &.male {
            background: #4fa5fa url("../assets/images/male_ico.svg") center
              no-repeat;
            background-size: 9px;
          }
          position: absolute;
          right: 0;
          bottom: 2px;
          width: 13px;
          height: 13px;
          border-radius: 100%;
        }
        img {
          width: 49px;
          height: 49px;
          border: 0;
          border-radius: 100%;
        }
        position: absolute;
        left: 0;
        top: 22px;
        width: 49px;
        height: 49px;
      }
      position: relative;
      padding-left: 61px;
    }
    position: relative;
    width: 100%;
    background-color: #ffffff;
    padding: 0 17px;
    overflow: hidden;
  }
  width: 100%;
}
.box_5 {
  width: 100%;
  border-bottom: 1px solid #f5f5f5;
  .box_content {
    padding-bottom: 15px;
    line-height: 1.8;
    font-size: 13px;
    color: #666666;
    word-break: break-all;
  }
}
.box_1 {
  .content {
    .search_ico {
      font-size: 12px;
      color: #c9c9c9;
      padding: 10px 0 10px 23px;
      background: url("../assets/images/search_ico_gray.svg") 0 center no-repeat;
      background-size: 15px;
      position: absolute;
      top: 0;
      left: 50%;
      transform: translate(-50%, 0);
      line-height: normal;
      &.has {
        color: #333;
      }
    }
    position: relative;
    width: 340px;
    height: 37px;
    margin: 0 auto;
    background-color: #f8f8f8;
    text-align: center;
    border-radius: 36px;
  }
  width: 100%;
  background-color: #ffffff;
  padding-top: 11px;
}
</style>
