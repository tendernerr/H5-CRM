<template>
  <div class="bottom_group">
    <div class="bottom_bar_wrapper">
      <!-- <router-link class="bar_item home" :to="index" @click="change">首页</router-link>
      <router-link :class="'bar_item ' + secondClass" :to="secondTo">{{ secondText }}</router-link>
      <router-link :class="'bar_item ' + thirdClass" :to="thirdTo">{{ thirdText }}</router-link>
      <router-link class="bar_item user" :to="mineTo">我的</router-link>   resumelist--> 
      <div class="bar_item home" :class="{'router-link-active':linkName === 'index'}" @click="goLink('/index')">项目</div>
      <div class="bar_item resume" :class="{'router-link-active':linkName === 'search'}" @click="goLink('/search')">搜索</div>
      <div @click="show = true" class="bar_item release" :class="{'router-link-active':linkName === ''}">
        <img class="releaseImg" src="https://qiniucdn.hangyedaniu.com/img/add.png" alt="">
        发布
      </div>
      <div class="bar_item personal" :class="{'router-link-active':linkName === 'recommend'}" @click="goLink('/recommend')">商机订阅</div>
      <div class="bar_item user" :class="{'router-link-active':linkName === 'my'}" @click="goLink('/member/login')">我的</div>
    </div>
    <van-popup v-model="show" position="bottom" closeable :style="{ height: '60%' }">
      <div class="releasePopup">
        <div>
          <h4 class="releasePopup-h4">免费发布信息</h4>
          <div class="releasePopup-box" v-for="(item,index) in list">
            <p class="releasePopup-p">{{item.title}}</p>
            <div class="releasePopup-list" v-for="(ite,inde) in item.textImage"  @click="goUrl(ite)">
              <div class="releasePopup-img">
                <img width="100%" height="100%" :src="ite.img">
              </div>
              <div class="releasePopup-text">
                <p class="releasePopup-text-1">{{ite.text1}}</p>
                <p class="releasePopup-text-2">{{ite.text2}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
	import {mapState} from "vuex"
export default {
  props:['linkName'],
  name: 'BottomNav',
  data () {
    return {
      show:false,
		  index:'/index',
      secondClass: 'job',
      secondText: '案例',
      // secondTo: '/joblist',
		  secondTo: '/shortvideo/companylist',
      thirdClass: 'resume',
      thirdText: '项目',
      thirdTo: '/resumelist',
      mineTo: '/member/login',
      list:[{
              title:'我是采购方',
              textImage:[{img:'https://qiniucdn.hangyedaniu.com/img/shangji.png',text1:'发布采购',text2:'直接对接供应商',link:'',type:'1'}] 
            },
            {
              title:'我是供应方',
              textImage:[
                {img:'https://qiniucdn.hangyedaniu.com/img/radio.png',text1:'发布案例视频',text2:'获取更多的曝光机会',link:'/shortvideo/release',type:'2'},
                {img:'https://qiniucdn.hangyedaniu.com/img/shangji.png',text1:'完善企业资料',text2:'完善企业供应、服务信息',link:'/member/company/profile',type:'2'}
              ] 
            },
      ]
    }
  },
  computed:{
	  ...mapState(['LoginOrNot','LoginType'])
  },
  // watch:{
	//    firstName(newName, oldName) {
	//         this.fullName = newName + ' ' + this.lastName;
	//       },
	// 	'$store.state.LoginOrNot' : {
	// 		handler (ne,ol) {
	// 			if(!ne){
	// 				this.secondClass = 'job';
	// 				this.secondText = '案例';
	// 				// secondTo = '/joblist';
	// 				// this.secondTo2 = '/shortvideo/companylist';
	// 				this.thirdClass = 'resume';
	// 				this.thirdText = '项目';
	// 				this.thirdTo = '/resumelist';
	// 				this.mineTo = '/member/login';
	// 			}
	// 		}
	// 	},
	// 	'$route' : {
	// 		// 主要针对首页不更新
	// 		handler (ne,ol) {
	// 			this.change()
	// 		},
	// 		deep:true
	// 	}
  // },
  mounted () {
    return
    // 根据登录会员类型，处理导航显示
    if (this.LoginOrNot) {
      if (parseInt(this.LoginType) === 1) {
        // 企业
		  this.secondClass = 'resume'
		  this.secondText = '找项目'
      this.secondTo = '/resumelist'
      this.thirdClass = 'personal'
      // this.thirdText = '项目管理'
      // this.thirdTo = '/member/company/intelligenceInquiry'
      this.thirdText = '商机订阅'
      this.thirdTo = '/recommend'
      this.mineTo = '/member/company/index'
      } else {
        // 个人
        this.secondClass = 'job'
        this.secondText = '成功案例'
        // this.secondTo = '/joblist'
				this.secondTo = '/shortvideo/companylist'
        this.thirdClass = 'company'
        this.thirdText = '搜企业'
        this.thirdTo = '/companylist'
        this.mineTo = '/member/personal/index'
      }
    } else{
			  this.secondClass = 'job',
			  this.secondText = '案例',
			  // secondTo = '/joblist',
			  // this.secondTo2 = '/shortvideo/companylist',
			  this.thirdClass = 'resume',
			  this.thirdText = '项目',
			  this.thirdTo = '/resumelist',
			  this.mineTo = '/member/login'
		  }
  },
  methods:{
    goLink(url){
      this.$router.replace(url)
    },
    goUrl(e){
      console.log(e,'11')
      if(e.type === '1'){
        this.$router.push('/publishPurchase')
        return
      }
      if(e.type === '2' && !this.LoginOrNot){
        this.$dialog.confirm({title: '您还未登录',message: '注册登录行业大牛用户账号，免费查看项目信息！！<br/>已超过<span style="color:red">10000</span>家设备同行通过行业大牛<span style="color:red">获取商机！</span>',messageAlign:'left',}).then(() => {
          this.$router.push('/member/login?register=0')
        }).catch(() => {});
        return
      }
      this.$router.push(e.link+'?register=0')
    },
	  change(){
		  if (this.LoginOrNot) {
		    if (parseInt(this.LoginType) === 1) {
		      // 企业
		      this.secondClass = 'resume'
		      this.secondText = '找项目'
		      this.secondTo = '/resumelist'
		      this.thirdClass = 'personal'
		      // this.thirdText = '项目管理'
		      // this.thirdTo = '/member/company/intelligenceInquiry'
          this.thirdText = '商机订阅'
          this.thirdTo = '/recommend'
		      this.mineTo = '/member/company/index'
		    } else {
		      // 个人
		      this.secondClass = 'job'
		      this.secondText = '成功案例'
		      // this.secondTo = '/joblist'
				this.secondTo = '/shortvideo/companylist'
		      this.thirdClass = 'company'
		      this.thirdText = '搜企业'
		      this.thirdTo = '/companylist'
		      this.mineTo = '/member/personal/index'
		    }
		  } else{
			  this.secondClass = 'job';
			  this.secondText = '案例';
			  // secondTo = '/joblist';
			  // this.secondTo2 = '/shortvideo/companylist';
			  this.thirdClass = 'resume';
			  this.thirdText = '项目';
			  this.thirdTo = '/resumelist';
			  this.mineTo = '/member/login';
		  }
	  }
  }
}
</script>

<style lang="scss" scoped>
.releasePopup{
  &-h4{height: 50px;line-height: 50px;text-align: center;}
  &-box{padding: 20px 20px 0;}
  &-p{font-size: 15px;}
  &-list{display: flex;align-items: center;padding: 10px 0 0;}
  &-img{width: 50px;flex: none;height: 50px;margin: 0 11px 0 0;}
  &-text{color: #000;font-size: 14px;
    &-1{font-size: 19px;font-weight: 600; color: #585858;}
    &-2{font-weight: 500; color: #696969; font-size: 14px;}
  }
}
.bottom_group {position: relative;width: 100%;height: 55px;
  .bottom_bar_wrapper {position: fixed;left: 0;right: 0;bottom: 0;background-color: #ffffff;display: flex;z-index: 9;
    &::after {position: fixed; box-sizing: border-box; content: ' '; pointer-events: none; right: 0; bottom: 55px; left: 0;border-bottom: 1PX solid #e2e2e2; -webkit-transform: scaleY(.5); transform: scaleY(.5);}
    .bar_item {flex: 1;font-size: 10px;color: #999999;padding: 36.5px 0 6.5px;height: 55px;text-align: center;
      .release{position: relative;}
      .releaseImg{position: absolute;width: 37px;top: 0px;right: 50%;transform: translate(50%,0%);}
      &.personal {background: url("../assets/images/nav/personal.png") center 9px no-repeat;background-size: 29px 25px;}
      &.company {background: url("../assets/images/nav/company.png") center 9px no-repeat;background-size: 29px 25px;}
      &.resume {background: url("../assets/images/nav/resume.png") center 9px no-repeat;background-size: 29px 25px;}
      &.job {background: url("../assets/images/nav/job.png") center 8px no-repeat;background-size: 29px 25px;}
      &.user {background: url("../assets/images/nav/user.png") center 9px no-repeat;background-size: 29px 25px;}
      &.home {background: url("../assets/images/nav/home.png") center 9px no-repeat;background-size: 29px 25px;}
      &.router-link-active {color: #333333;
        &.personal {background: url("../assets/images/nav/personal_active.png") center 9px  no-repeat;background-size: 29px 25px;}
        &.company {background: url("../assets/images/nav/company_active.png") center 9px  no-repeat;background-size: 29px 25px;}
        &.resume {background: url("../assets/images/nav/resume_active.png") center 9px  no-repeat;background-size: 29px 25px;}
        &.job {background: url("../assets/images/nav/job_active.png") center 8px  no-repeat;background-size: 29px 25px;}
        &.user {background: url("../assets/images/nav/user_active.png") center 9px  no-repeat;background-size: 29px 25px;}
        &.home {background: url("../assets/images/nav/home_active.png") center 9px  no-repeat;background-size: 29px 25px;}
      }
    }
  }
}
</style>
