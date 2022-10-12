<template>
  <div id="app">
    <!-- <indexHeader v-if="moduleRule.header.is_display == 1" :plan_id="moduleRule.header.plan_id"></indexHeader> -->
    <Head>行业大牛</Head>
    <!-- 蓝色背景 -->
    <div class="topBab">
      <h4 class="topBabH4">机械自动化采购服务平台</h4>
      <!-- 搜索按钮 -->
      <div class="inpuTex" @click="addsubscribe = true">
        <van-icon name="search" class="inpuTexi" />
        <span class="inpuTex-key">{{showSearch?showSearch:'请输入关键字'}}</span>
        <div class="inpuTex-search">搜索</div>
      </div>
      <div class="topBab-fast">
        <div class="topBab-fast-t">快速搜索</div>
        <div class="goSubscribe">
          <span class="goSubscribe-span" v-for="(item,index) in idList" :key="index" @click="goFast(item)">{{item.name}}</span>
        </div>
      </div>
    </div>
    <!-- 导航体 -->
    <indexMenu v-if="moduleRule.menu.is_display == 1" :plan_id="moduleRule.menu.plan_id" :dataset="menu_list"></indexMenu>
    <!-- <indexLinkBlock v-if="moduleRule.section.is_display == 1" :plan_id="moduleRule.section.plan_id"></indexLinkBlock> -->
    <!-- <indexNotice v-if="moduleRule.notice.is_display == 1" :plan_id="moduleRule.notice.plan_id" :dataset="notice_list"></indexNotice> -->
    <!-- <indexFamous v-if="moduleRule.famous.is_display == 1" :plan_id="moduleRule.famous.plan_id" :dataset="famous_list"></indexFamous> -->
    <!-- 通告 -->
    <div class="topNotice">
      <div class="topNotice-t">
        最 新<br/>公 告
      </div>
      <div class="van-notice-bar">
        <van-notice-bar color="#409eff" background="#fff">
          <van-swipe vertical class="notice-swipe" :autoplay="2000" :show-indicators="false">
            <van-swipe-item v-for="(item,index) in notice_list" @click="goLogin('/notice/'+item.id)" :key="index">{{item.title}}</van-swipe-item>
          </van-swipe>
        </van-notice-bar>
      </div>
    </div>
    <!-- 没登录 -->
    <div class="box-noLogon" v-if="!LoginOrNot">
      <p class="box-noLogon-p">根据您的订阅为您找到一批商机：</p>
      <div class="box-noLogon-text">
        登录订阅商机后<br/>系统将为您推送您感兴趣的商机
      </div>
      <div class="box-noLogon-goLogon" @click="goLogin('/member/login')">去登录</div>
    </div>
    <!-- 登录并且没有订阅 -->
    <div class="box-noLogon" v-if="LoginOrNot && idList.length <= 0">
      <p class="box-noLogon-p">根据您的订阅为您找到一批商机：</p>
      <div class="box-noLogon-text">
        您还没有订阅任何商机<br/>订阅后系统将为您推荐您感兴趣的商机
      </div>
      <div class="box-noLogon-goLogon box-noLogon-goLogon-add" @click="goLogin('/addSubscribe')">+立即订阅商机</div>
    </div>
    <!-- 列表信息 -->
    <div class="box_3" v-if="dataset.length > 0">
      <div class="listTab2" v-for="(item,index) in dataset" :key="index" @click="$router.push('/backupsProject/backupsProject?id='+item.id)">
        <div class="listTab2Head">
          <!-- <div class="listTab2HeadImg"><img v-if="item.pimg" :src="item.pimg" /></div> -->
          <div class="listTab2HeadName">
            <div class="listTab2HeadName1">
              <div class="listTab2HeadName1Text1">{{item.title}}</div>
              
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
            <div class="listTab2HeadName1Text2">总投资: {{item.project_investment}}</div>
        </div>
      </div>
      <div class="more" @click="goLogin('/recommend')"> 查看更多>> </div>
    </div>
    <Ad v-if="ad_dataset_banner_b.items.length > 0" :dataset="ad_dataset_banner_b"></Ad>
    <indexArticle v-if="moduleRule.article.is_display == 1" :plan_id="moduleRule.article.plan_id" :dataset="article_list"></indexArticle>
    <BottomNav linkName='search'></BottomNav>
    <!-- 弹窗 -->
    <IndexPopup v-if="showPopup" :list="ad_dataset_popup"></IndexPopup>
    <van-popup v-model="addsubscribe"  position="top" :style="{'height':80+'vh'}"> 
        <ShowSearch :close='close' :changeInput='changeInput' url='/resumelist' />
    </van-popup>
  </div>
</template>

<script>
import wxshare from '@/assets/js/share.js'
import http from '@/utils/http'
import api from '@/api'
import indexHeader from '@/components/index/Header'
import indexMenu from '@/components/index/Menu'
import indexLinkBlock from '@/components/index/components/LinkBlock'
import indexNotice from '@/components/index/Notice'
import indexFamous from '@/components/index/Famous'
import indexHotword from '@/components/index/Hotword'
import indexArticle from '@/components/index/Article'
import Ad from '@/components/Ad'
import ShowSearch from '@/components/showSearch/showSearch'
import IndexPopup from '@/components/index/IndexPopup'
import {mapState} from 'vuex'
export default {
  name: 'Index',
  data () {
    return {
      showSearch:'',
      idList:[],
		  dataset: [],
      moduleRule: {
        header: {alias: '',is_display: 0,plan_id: 0},
        article: { alias: '', is_display: 0, plan_id: 0},
        famous: { alias: '', is_display: 0, plan_id: 0},
        hotword: { alias: '', is_display: 0, plan_id: 0},
        menu: { alias: '', is_display: 0, plan_id: 0},
        notice: { alias: '', is_display: 0, plan_id: 0},
        section: { alias: '', is_display: 0, plan_id: 0}
      },
      addsubscribe:false,
      menu_list: [],
      notice_list: [],
      famous_list: [],
      hotword_list: [],
      article_list: [],
      swiperOption: { autoplay: true, freeMode: true, speed: 600},
      ad_dataset_top: { alias: 'QS_top_slide', items: [] },
      ad_dataset_banner_a: { alias: 'QS_index_banner_a', items: [] },
      ad_dataset_banner_b: { alias: 'QS_index_banner_b', items: [] },
      ad_dataset_popup: { alias: 'QS_index_popup', items: [] },
      showPopup: false,
      params: {
        page:1,
        pagesize:10,
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
    }
  },
  components: {indexHeader,indexMenu,indexLinkBlock,indexNotice,indexFamous,indexHotword,indexArticle,IndexPopup,Ad,ShowSearch},
  created () {
    this.getCategoryList()  //判断是否有订阅
    this.initModule()  // 获取通告等
    // this.fetchAd()  // 获取广告
    wxshare({}, 'index', location.href.split('#')[0])  //不清楚
    this.cronRun()
    this.fetchData()      //获取数据
  },
  computed:{
    ...mapState(['LoginOrNot'])
   },
  methods: {
    changeInput(e){
      this.showSearch = e
    },
    close(){
        this.addsubscribe = false
    },
    // 获取订阅信息
    getCategoryList(){
        http.get(api.getCategoryList,{}).then(res=>{
            for (const key in res.data.list) {
                if (res.data.list[key].isSelect) {
                    this.idList.push(res.data.list[key])
                }
            }
        })
    },
    fetchData() {
		// let url = this.active == 1 ? api.getZProjectRecommend : api.getBProjectRecommend;
      http.get(api.getBProjectRecommend, this.params).then((res) => {
        this.dataset = res.data.data
      }).catch(() => {});
    },
	  goJob(id){
			this.$router.push("/job/" + id);
	  },
    goLogin(url){
      this.$router.push(url+'?redirect=/search')
    },
    goFast(e){
      this.$router.push('/resumelist?experience='+e.id+'&type=0')
    },
    initModule () {
      http.get(api.index_common, {}).then(res => {
          console.log(res,"111")
          const { module_rule, data } = res.data
          this.moduleRule = { ...module_rule }
          const {menu_list,article_list,famous_list,hotword_list,notice_list} = data
          this.menu_list = menu_list
          this.notice_list = notice_list
          this.famous_list = famous_list
          this.hotword_list = hotword_list
          this.article_list = article_list
        }).catch(() => {})
    },
    fetchAd () {
      http.post(api.ad_list, {
          alias: ['QS_top_slide@mobile','QS_index_banner_a@mobile','QS_index_banner_b@mobile','QS_index_popup@mobile']
        }).then(res => {
          this.ad_dataset_top.items = res.data.items['QS_top_slide@mobile']
          this.ad_dataset_banner_a.items =
          res.data.items['QS_index_banner_a@mobile']
          this.ad_dataset_banner_b.items =
          res.data.items['QS_index_banner_b@mobile']
          this.ad_dataset_popup.items =
          res.data.items['QS_index_popup@mobile']
          this.showPopupAdOrNot()
        }).catch(() => {})
    },
    showPopupAdOrNot () {
      let that = this
      let current = new Date()
      let expire_time = localStorage.getItem('index_popup_expire_time_mobile')
      if ((expire_time === undefined || !expire_time || current.getTime() > new Date(expire_time)) && this.ad_dataset_popup.items.length > 0) {
        setTimeout(() => {
          that.showPopup = true
          expire_time = new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1)
          localStorage.setItem('index_popup_expire_time_mobile', expire_time)
        }, 500)
      }
    },
    cronRun () {
      http.get(api.cron_run).then(() => {}).catch(() => {})
    }
  }
}
</script>

<style lang="scss" scoped>
.ba {width: 100%;height: 63px;margin-bottom: 9px;
  img { width: 100%; height: 63px;}
}
.topBab{background: url(https://qiniucdn.hangyedaniu.com/img/background.png);height: 173px;display: flex;flex-direction: column;justify-content: space-evenly;
  .topBabH4{color: #fff;text-align: center;font-style: italic;}
  &-fast{display: flex;color: #fff;height: 30px;
    &-t{padding: 0 0 0 25px;font-size: 16px;font-weight: 600;font-style: italic;line-height: 30px;}
  }
  .goSubscribe{    padding: 0 0 0 20px;font-size: 15px;line-height: 30px; flex: 1;
    &-span{padding: 0 8px 0 0;}
  }
}
.topNotice{display: flex;border-top: 5px solid #f3f3f3;color: #409eff;
    &-t{width: 75px; text-align: center; padding: 8px 0; font-size: 15px; position: relative;
      &::after {position: absolute; content: "|"; right: 0px; color: #000; top: 50%; transform: translate(0%,-50%);}}
    .van-notice-bar{ color: #cacaca;background: rgb(255, 255, 255);flex: 1;align-self: center;}
}
.inpuTex{    display: flex;align-items: center;width: 87%;background: #fff;border-radius: 20px;text-align: center;color: #cecece;text-indent: 9px;margin: 0px auto 0;font-size: 23px;height: 38px;overflow: hidden;
    &i{font-weight: 900;}
    &-key{font-size: 15px;}
    &-search{margin: 0 0 0 auto;width: 82px;background: #e0effe;color: #409eff;font-size: 15px;height: 100%;line-height: 38px;}
}
.notice-swipe{height: 40px;line-height: 40px;}
.centen{background-color: #f3f3f3;padding-top: 5px;
	.boxList{margin-bottom: 5px;padding: 0px 17px;background-color: #fff; display: flex;align-items:center;
		.img{width: 100px;height: 100px;margin-right: 10px;flex: none;}
		.box{display: flex;flex-direction: column;
			.text1{display: flex;align-items:center;color: #333;font-size: 14px;padding-top: 17px;flex-wrap:wrap;max-width: 240px;
				.tx{font-weight: bold;padding-right: 6px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
				.worry_ico {font-size: 10px;color: #ffffff;padding: 3px;border-radius: 3px;background-color: #ff8b82;flex: none;}
			}
			.text2{font-size: 14px;color: #666666;padding: 11.5px 0px 8.5px;display: flex;
				.tx2{margin-right: 16px;}
			}
			.text3{display: flex;
				.boxs{padding: 2px 5px;margin: 0 5px 5px 0;font-size: 10px;color: #8096a3;background-color: #e9f8ff;}
			}
			.text4{display: flex;color: #999999;font-size: 13px;align-items:center;padding:13px 0px;
				div{flex: none;}
				img{flex: none;}
				.img1{width: 15px;height: 13px;margin-left: 6px;}
				.img2{width: 14px;height: 13px;margin-left: 6px;}
			}
		}
	}
	.centen-bottom{width: 100%;height: 50px;line-height: 50px;color: #969799;text-align: center;background-color: #fff;font-size: 14px;}
}
.box-noLogon{border-top: 5px solid #f3f3f3; 
  &-p{color: red;font-size: 14px;padding: 8px 0 0px 19px;}
  &-text{color: #409eff;text-align: center;font-size: 15px;padding: 19px 0 0;}
  &-goLogon{margin: 26px auto 0;color: #fff;background: #25afff;font-size: 15px;height: 35px;width: 5em;border-radius: 8px;line-height: 35px;text-align: center;
    &-add{width: 8em;}
  }
}
.box_3 {width: 100%; border-top: 5px solid #f3f3f3;
  .list {position: relative;width: 100%;background-color: #ffffff;padding: 0 0 0 17px;overflow: hidden;
    .top {position: absolute;right: -25px;top: -25px;width: 50px;height: 50px;background-color: #feae41;color: #ffffff;font-size: 10px;font-weight: bold;text-align: center;transform: rotateZ(45deg);padding-top: 36px;}
    .tx1 {
      img {width: 20px;height: 20px;position: absolute;top: 70%;left: 0;border: 0;transform: translate(0, -50%);}
    }
    .company {width: 100%;border-top: 1px solid #f3f3f3;padding: 12.5px 0;
      .crw_ico {float: left;margin-left: 6px;width: 14px;height: 18px;position: relative;
        img {width: 100%;height: 13px;position: absolute;top: 50%;left: 0;border: 0;transform: translate(0, -50%);}
      }
      .auth_ico {float: left;margin-left: 6px;width: 15px;height: 18px;background: url("../assets/images/jobs_list_auth_ico.png") 0 center  no-repeat;background-size: 15px 11px;}
      .name { float: left; max-width: 300px; font-size: 13px; color: #999999; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;}
    }
    .tag_wrapper { width: 100%;padding-bottom: 8px;
      .van-tag {margin-right: 5px;border-radius: 3px;}
      .tag_cell { float: left; padding: 2px 5px; margin: 0 5px 0px 0; font-size: 10px; background-color: rgb(228,240,255,1); color: rgb(111,183,255,1);}
    }
    .tx2 {font-size: 14px;color: #666666;padding: 11.5px 60px 8.5px 0;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; position: relative;
      .time {position: absolute;right: 0;top: 12.5px;font-size: 13px;color: #999999;}}
    .tx1 {position: relative;padding-top: 17.5px;
      .wage { position: absolute; right: 0; top: 19.5px; font-size: 14px; color: #ff5d24; font-weight: bold;}
      .worry_ico { font-size: 10px; color: #ffffff; padding: 3px; border-radius: 3px; background-color: #ff8b82; float: left;}
      .name { font-size: 16px; color: #333333; font-weight: bold; max-width: 240px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; float: left; margin-right: 6px;}
    }
  }
  .listTab2{display: flex; flex-direction: column; border-bottom:6px solid #eeeeee;
		.listTab2Head{background-color: #fff; font-size: 15px; display: flex; padding: 5px;
			.listTab2HeadImg{width: 60px; height: 60px; flex: none; overflow: hidden; border-radius: 50%; background: url("https://www.hangyedaniu.com/upload/resource/user.png") no-repeat center center/ 100% 100%; object-fit: cover;
				img{width: 100%;height: 100%;}
			}
			.listTab2HeadName{display: flex; flex-direction: column; justify-content: space-around; padding:0 5px; flex: 1;
				.listTab2HeadName1{display: flex; justify-content: space-between; align-items: center;
					.listTab2HeadName1Text1{overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-box-orient: vertical;word-break: break-all;padding-top: 10px; font-size: 12px; margin-right: 15px; font-weight: 700;}
					.listTab2HeadName1Text2{ font-size: 13px; flex: none;}
				}
				.listTab2HeadName2{font-size: 13px;margin-top: 10px;
					.listTab2HeadName2Span2{margin-left: 10px;}
				}
			}
		}
		.listTab2Label{display: flex; flex-wrap: wrap; font-size: 12px; color: #1787fb; padding: 5px 10px;
			.listTab2LabelList{background-color: #f4f9ff; padding: 3px 8px; margin-right: 8px; border-radius: 5px; margin-bottom: 5px;}
		}
		.updateTime{padding: 10px 10px 10px 0px; font-size: 12px;    display: flex;
    justify-content: space-around;
			.updateTimeSpan{margin-left: 10px;}
		}
	}
  .more{color: #37abfd; font-size: 15px; text-align: center; padding: 20px 0;}
}

</style>
