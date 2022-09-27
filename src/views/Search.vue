<template>
  <div id="app">
    <Meta pagealias="index" />
    <indexHeader v-if="moduleRule.header.is_display == 1" :plan_id="moduleRule.header.plan_id"></indexHeader>
    <indexMenu v-if="moduleRule.menu.is_display == 1" :plan_id="moduleRule.menu.plan_id" :dataset="menu_list"></indexMenu>
    <indexLinkBlock v-if="moduleRule.section.is_display == 1" :plan_id="moduleRule.section.plan_id"></indexLinkBlock>
    <indexNotice v-if="moduleRule.notice.is_display == 1" :plan_id="moduleRule.notice.plan_id" :dataset="notice_list"></indexNotice>
    <indexFamous v-if="moduleRule.famous.is_display == 1" :plan_id="moduleRule.famous.plan_id" :dataset="famous_list"></indexFamous>
    <indexHotword v-if="moduleRule.hotword.is_display == 1" :plan_id="moduleRule.hotword.plan_id" :dataset="hotword_list"></indexHotword>
    <Ad v-if="ad_dataset_banner_a.items.length > 0" :dataset="ad_dataset_banner_a"></Ad>
  <!-- <van-list
      v-if="joblist.length > 0"
      v-model="loading"
      :finished="finished"
      :finished-text="finished_text"
      @load="onLoad"
      :immediate-check="true"
    > -->
      <div class="box_3">
        <div v-for="(item,index) in joblist" :key="index" @click="go(item.id)">
          <div class="list" style="display: flex;align-items: center;">
           <div style=" margin-right:10px;">
              <img :src="item.company_logo"  style="  width: 100px;height: 100px;"/>
           </div>
            <div style="flex: 1;">
              <div class="tx1">
                <div class="top" v-if="item.stick == 1">置顶</div>
                <div class="name" style="padding-bottom: 8px;display: flex;align-items: center;width: 100%;" >
                 <div style="overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1;word-break: break-all;font-weight: 500;">{{item.jobname}}</div>
                  <div style="flex: 1;"></div>
                  <div style="max-width: 4.5em;word-break: break-all;color: #F0754A;font-size: 15px;font-weight: 500;padding-right: 1px;">{{item.wage_text}}<span style="color: #A8A8A8;font-size: 12px;" v-if="item.wage_text != '电议'">元</span></div>
                </div>
                <div class="worry_ico" v-if="item.emergency == 1">急</div>
                <div class="clear"></div>
              </div>
              <div class="tag_wrapper clearfix" v-if="item.tag.length>0">
                <div class="tag_cell" v-for="(t, key) in item.tag" :key="key">{{ t }}</div>
              </div>
              <div class="" style="font-size: 13px;padding-bottom: 8px;color: #828282;">
                设备交期：{{ item.delivery_date }}
              </div>
              <div class="company" style="padding-top: 0;border: 0;padding-bottom: 8px;">
                <div class="name">{{ item.companyname }}</div>
                <div class="auth_ico" v-if="item.company_audit == 1"></div>
                <div class="crw_ico" v-if="item.setmeal_icon != ''">
                  <img :src="item.setmeal_icon" />
                </div>
                <div class="clear"></div>
              </div>
              <div class="" style="font-size: 13px;padding-bottom: 12px;color: #828282;text-align: right;padding-right: 8px;">
                {{ item.district_text }}
              </div>
            </div>
          </div>
          <div class="form_split_10"></div>
        </div>
      </div>
    <!-- </van-list> -->
	<!-- <div class="centen" >
		<div class="boxList" v-for="(item,index) in joblist" :key="index" @click="go(item.id)">
			<div class="img">
				<img v-if="item.logo" :src="item.logo" width="100%" height="100%"/>
			</div>
			<div class="box">
				<div class="text1">
					<div class="tx">{{item.jobname}}</div>
					<div class="worry_ico" v-if="item.emergency == 1">现货</div>
				</div>
				<div class="text2">
					<div class="tx2">案例客户地点: {{item.district_text}}</div>
					<div>{{item.refreshtime}}</div>
				</div>
				<div class="text3" v-if="item.tag.length>0">
					<div class="boxs" v-for="(ite,inde) in item.tag" :key="inde">{{ite}}</div>
				</div>
				<div class="text4">
					<div>{{item.companyname}}</div>
					<img v-if="item.company_audit" class="img1" src="@/assets/images/jobs_list_auth_ico.png" />
					<img v-if="item.setmeal_icon" class="img2" :src="item.setmeal_icon" />
				</div>
			</div>
		</div>
		<div class="centen-bottom" @click="botGo">
			查看更多
		</div>
	</div> -->
    <Ad v-if="ad_dataset_banner_b.items.length > 0" :dataset="ad_dataset_banner_b"></Ad>
    <indexArticle v-if="moduleRule.article.is_display == 1" :plan_id="moduleRule.article.plan_id" :dataset="article_list"></indexArticle>
    <BottomNav linkName='search'></BottomNav>
    <!-- 弹窗 -->
    <IndexPopup v-if="showPopup" :list="ad_dataset_popup"></IndexPopup>
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
import IndexPopup from '@/components/index/IndexPopup'
export default {
  name: 'Index',
  data () {
    return {
		joblist: [],
      moduleRule: {
        header: {
          alias: '',
          is_display: 0,
          plan_id: 0
        },
        article: {
          alias: '',
          is_display: 0,
          plan_id: 0
        },
        famous: {
          alias: '',
          is_display: 0,
          plan_id: 0
        },
        hotword: {
          alias: '',
          is_display: 0,
          plan_id: 0
        },
        menu: {
          alias: '',
          is_display: 0,
          plan_id: 0
        },
        notice: {
          alias: '',
          is_display: 0,
          plan_id: 0
        },
        section: {
          alias: '',
          is_display: 0,
          plan_id: 0
        }
      },
      menu_list: [],
      notice_list: [],
      famous_list: [],
      hotword_list: [],
      article_list: [],
      swiperOption: {
        autoplay: true,
        freeMode: true,
        speed: 600
      },
      ad_dataset_top: { alias: 'QS_top_slide', items: [] },
      ad_dataset_banner_a: { alias: 'QS_index_banner_a', items: [] },
      ad_dataset_banner_b: { alias: 'QS_index_banner_b', items: [] },
      ad_dataset_popup: { alias: 'QS_index_popup', items: [] },
      showPopup: false
    }
  },
  components: {indexHeader,indexMenu,indexLinkBlock,indexNotice,indexFamous,indexHotword,indexArticle,IndexPopup,Ad},
  created () {
    this.initModule()
    this.fetchAd()
    wxshare({}, 'index', location.href.split('#')[0])
    this.cronRun()
    this.joblistf()
  },
  methods: {
	  go(id){
			this.$router.push("/job/" + id);
	  },
	  botGo(){
		location.href = 'https://www.hangyedaniu.com/m/#/joblist'
	  },
    initModule () {
      http.get(api.index_common, {}).then(res => {
          const { module_rule, data } = res.data
          this.moduleRule = { ...module_rule }
          const {menu_list,article_list,famous_list,hotword_list,notice_list} = data
          this.menu_list = menu_list
          this.notice_list = notice_list
          this.famous_list = famous_list
          this.hotword_list = hotword_list
          this.article_list = article_list
        })
        .catch(() => {})
    },
	// 请求案例的接口
	joblistf(){
	  http.get(api.joblist,{search_type:'list',pagesize:5,page:1}).then(res=>{
			this.joblist = res.data.items
	  })
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

.box_3 {width: 100%;
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
}
</style>
