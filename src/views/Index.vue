<template>
  <div id="app">
    <Meta pagealias="resumelist" :query_data="$route.query" />

    <Head>项目列表</Head>
    <van-search v-model="params.keyword" show-action placeholder="请输入搜索关键词" @search="onSearch" >
      <template #action>
        <div @click="onSearch">搜索</div>
      </template>
    </van-search>

    <!-- <div class="inpuTex" @click="addsubscribe = true">
        <van-icon name="search" class="inpuTexi" />
        <span class="inpuTex-key">{{showSearch?showSearch:'请输入关键字'}}</span>
      </div> -->
    <van-popup v-model="show" position="top" :overlay="true" :style="{ height: '90%', width: '100%' }">
      <TopSearch type="resume" @hideSearch="toggleSearch" @doSearch="doSearchByKeyword"></TopSearch>
    </van-popup>
    <!-- 搜索按钮 -->
    <div class="searchDivMin" :style="[top]" @touchstart.stop="down" @touchmove.stop="move" @touchend.stop="end">
      <!-- <div @click.stop="search = !search" class="searchDiv">
        <van-icon v-if="!search" name="search" />
        <van-icon v-else name="cross" />
      </div> -->
      <div class="searchDiv2" v-if="search">
        <input class="searchInput" style="width: 100%;height: 100%;padding: 0 5px;border-radius: 5px;font-size:16px;"
          :placeholder="`搜索${active?'前期':'委托'}项目（按钮可拖动）`" v-model="params.keyword" />
      </div>
    </div>
    <van-tabs v-model="active" style="border-top: 1px solid #e6e6e6; z-index: 3;" sticky>
      <van-tab title="前期项目" v-if="true" style="font-size:16px;">
        <div class="box_2" style="display: flex;flex-direction: column;font-size:12px;width: 100%;">
          <div
            style="padding: 8px 0 0 0;display: flex;justify-content:space-around;font-size:12px;width: 100%;background: #fff;"
            v-if="menber.is_setmeal">
            <div @click="params.hasPhone=0" :class="{'box_2Div':params.hasPhone === 0}"
              style="width: 30%;text-align: center;background: #c1c1c1;color: #fff;border-radius: 5px;line-height: 22px;height: 22px;">
              全部</div>
            <div @click="params.hasPhone=1" :class="{'box_2Div':params.hasPhone === 1}"
              style="width: 30%;text-align: center;background: #c1c1c1;color: #fff;border-radius: 5px;line-height: 22px;height: 22px;">
              有号码</div>
            <div @click="params.hasPhone=2" :class="{'box_2Div':params.hasPhone === 2}"
              style="width: 30%;text-align: center;background: #c1c1c1;color: #fff;border-radius: 5px;line-height: 22px;height: 22px;">
              无号码</div>
          </div>
          <div>
            <div style="display:flex;align-items: center;background: #FFF;">
              <div style="width:67%">
                <van-dropdown-menu class="filter_menu">
                  <!-- <div class="filter_drop">
                    <van-dropdown-item :options="householdaddress" :title="title2" @change='changeItem' >
                      <button type="info" class="determine"  @click='changeItemClick'>确定</button>
                    </van-dropdown-item>
                  </div>  -->
                  <div class="filter_drop">
                    <van-dropdown-item :title="title2" @change='changeItem'  ref="changess">
                      <div v-for="(item,index) in householdaddress" :key="index" @click=" clickLabel(item,index)">
                        <div v-if="item.typeCode==0" class='houseList'>
                          {{item.text}}
                        </div>
                        <div v-else class="classTwo">
                          {{item.text}}
                        </div>
                      </div>
                      <div style="display: flex;margin-left: 12px;position: relative; ">
                        <button type="info" class="determine" @click='changeItemClick'>确定</button>
                      </div>
                    </van-dropdown-item>
                  </div>
                  <van-dropdown-item :title="title1" ref="item">
                    <van-area :columns-placeholder="['不限']" :area-list="citycategorys" @confirm='confirm'
                      :columns-num="2" @cancel='$refs.item.toggle();' />
                  </van-dropdown-item>
                  <!-- <van-dropdown-item :options="education" :title="title3" @change="changeItems" /> -->
                </van-dropdown-menu>
              </div>
              <div class="subscribeIMg" @click="subscribeClick">
                <div class="imgSubscribe"><img src="../assets/images/u25.svg" /></div>
                <div class="subscribe">商机订阅</div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="(item,index) in carousel" :key="index">
              <div class="my-swipe-item" :style="`background-image: url(${item.img_src})`"> </div>
            </van-swipe-item>
          </van-swipe>
        </div>
        <div class="form_split_10"></div>
        <van-empty image="search" description="没有找到对应的数据" style="background-color: #fff" v-if="empty1" />
        <van-empty image="search" description="正在加载中~" style="background-color: #fff" v-if="dataset < 1 && !empty1" />
        <van-list v-if="dataset.length > 0" v-model:loading="loading" :finished="finished" finished-text="没有更多了"
          @load="onLoad" :immediate-check="true">
          <div class="listTab2" v-for="(item,index) in dataset" :key="index" @click="goDetails(item.id)">
            <div class="listTab2Head">
              <!-- <div class="listTab2HeadImg"><img v-if="item.pimg" :src="item.pimg" /></div> -->
              <div class="listTab2HeadName">
                <div class="listTab2HeadName1">
                  <!-- <div class="listTab2HeadName1Text1">{{item.title}}</div> -->
                  <div class="listTab2HeadName1Text1" v-html="brightenKeyword(item.title, params.keyword)"></div>
                  <span style="color: red;" v-if="params.keyword"> 
                         {{item.title.indexOf(params.keyword) >-1 ?`${params.keyword}在文中`:''}}
                  </span>
                </div>
                <div class="listTab2HeadName2">{{item.end_time}} <span
                    class="listTab2HeadName2Span2">{{item.education_text}}</span></div>
              </div>
            </div>
            <div class="listTab2Label">
              <div class="listTab2LabelList" v-for="(ite,inde) in item.category" :key="inde" v-if="inde<10">
                {{ite}}
              </div>
            </div>
            <div class="updateTime">
              <span>{{item.refreshtime}}更新<span class="updateTimeSpan"> 项目在：{{item.address}}</span></span>
              <!-- <div class="listTab2HeadName1Text2">总投资: {{item.project_investment}}</div> -->
            </div>
          </div>
        </van-list>
      </van-tab>
      <van-tab title="委托项目" :title-class='labelRed' style="font-size:16px;">
        <div class="box_2">
          <div style="display:flex;align-items: center;">
            <div style="width:67%">
              <van-dropdown-menu class="filter_menu">
                <div class="filter_drop">
                    <van-dropdown-item :title="title2" @change='changeItem'  ref="changess">
                      <div v-for="(item,index) in householdaddress" :key="index" @click=" clickLabel(item,index)">
                        <div v-if="item.typeCode==0" class='houseList'>
                          {{item.text}}
                        </div>
                        <div v-else class="classTwo">
                          {{item.text}}
                        </div>
                      </div>
                      <div style="display: flex;margin-left: 12px;position: relative;">
                        <button type="info" class="determine" @click='changeItemClick'>确定</button>
                      </div>
                    </van-dropdown-item>
                  </div>
                <!-- <van-dropdown-item :options="householdaddress" :title="title2" @change='changeItem' /> -->
                <van-dropdown-item :title="title1" ref="items">
                  <van-area :columns-placeholder="['不限']" :area-list="citycategorys" @confirm='confirm' :columns-num="2"
                    @cancel='$refs.items.toggle();' />
                </van-dropdown-item>
                <!-- <van-dropdown-item :options="education" :title="title3" @change="changeItems" /> -->
              </van-dropdown-menu>
            </div>
            
            <div class="subscribeIMg" @click="subscribeClick">
              <div class="imgSubscribe"><img src="../assets/images/u25.svg" /></div>
              <div class="subscribe">商机订阅</div>
            </div>
          </div>
        </div>
        <div>
          <van-swipe :autoplay="3000" class="my-swipe" indicator-color="white">
            <van-swipe-item v-for="(item,index) in carousel" :key="index">
              <div class="my-swipe-item" :style="`background-image:url(${item.img_src})`"></div>
            </van-swipe-item>
          </van-swipe>
        </div>
        <div class="form_split_10"></div>
        <van-empty image="search" description="没有找到对应的数据" style="background-color: #fff" v-if="empty1" />
        <van-empty image="search" description="正在加载中~" style="background-color: #fff" v-if="dataset < 1 && !empty1" />
        <van-list v-if="dataset.length > 0" v-model:loading="loading" :finished="finished" finished-text="没有更多了"
          @load="onLoad" :immediate-check="true">
          <div class="box_3">
            <div v-for="(item,index) in dataset" :key="index" @click="toDetail(item.id)">
              <div class="list">
                <div class="top" v-if="item.stick == 1">置顶</div>
                <div class="up">
                  <div class="avatar_box">
                    <img :src="item.photo_img_src" :alt="item.fullname" />
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
                    <div class="time">{{ item.refreshtime }}更新</div>
                    <div class="time" style="margin-left: 20px">
                      项目在：{{ item.address[0] }}
                    </div>
                  </div>
                  <div
                    style="wdith: 60px;height: 30px;background-color: #1787fb;border-radius: 5px;align-items: center;color: #e5f1ff;display: flex;padding: 10px;">
                    已参与{{ item.involved_count }}/{{ item.involved }}
                  </div>
                </div>
                <div class="tag" v-if="item.service_tag != ''">
                  {{ item.service_tag }}
                </div>
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
    <BottomNav linkName='index'></BottomNav>
  </div>
</template>

<script>
import wxshare from "@/assets/js/share.js";
import { obj2Param } from "@/utils/index";
import http from "@/utils/http";
import api from "@/api";
import DistrictFilter from "@/components/DistrictFilter";
import companyTag from "@/components/CompanyTag"
import { mapState } from "vuex"
export default {
  name: "ResumeList",
  components: {
    DistrictFilter,
    companyTag,
  },
  data() {
    return {
      labelRed: 'labelRed',
      menber: {},
      top: { right: '5px', top: '334px' },
      x: '',       //当前没处理的位置
      y: '',
      newx: 5,     //储存积累的位置
      newy: 334,     //储存积累的位置
      search: false,
      dataset: [],
      box_2Div: 0,
      loading: false,
      finished: false,
      show_empty: false,
      params: {
        date: '',
        hasPhone: 0,
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
      para: {

      },
      empty1: false,
      page: 1,
      pagesize: 10,
      show: false,
      districtTitle: "地区",
      experienceTitle: "涉及工艺",
      // educationTitle: "项目类型",
      otherTitle: "其他",
      optionWage: [
        { text: "全部", id: 0, min: "", max: "", select: true },
        { text: "1千以下", id: 1, min: 0, max: 1000, select: false },
        { text: "1千-2千", id: 2, min: 1000, max: 2000, select: false },
        { text: "2千-3千", id: 3, min: 2000, max: 3000, select: false },
        { text: "3千-5千", id: 4, min: 3000, max: 5000, select: false },
        { text: "5千-8千", id: 5, min: 5000, max: 8000, select: false },
        { text: "8千-1万2", id: 6, min: 8000, max: 12000, select: false },
        { text: "1万2-1万5", id: 7, min: 12000, max: 15000, select: false },
        { text: "1万5以上", id: 8, min: 15000, max: "", select: false },
      ],
      optionAge: [
        { text: "全部", id: 0, min: "", max: "", select: true },
        { text: "16-20岁", id: 1, min: 16, max: 20, select: false },
        { text: "20-30岁", id: 2, min: 20, max: 30, select: false },
        { text: "30-40岁", id: 3, min: 30, max: 40, select: false },
        { text: "40-50岁", id: 4, min: 40, max: 50, select: false },
        { text: "50岁以上", id: 5, min: 50, max: "", select: false },
      ],
      optionGender: [
        { text: "男", id: 1 },
        { text: "女", id: 2 },
      ],
      optionSettr: [
        { text: "3天内", id: 3 },
        { text: "7天内", id: 7 },
        { text: "15天内", id: 15 },
        { text: "30天内", id: 30 },
      ],
      optionEducation: [],
      optionExperience: [],
      optionResumeTag: [],
      selectResumeTag: [],
      // 未登录引导
      showLayer: false,
      active: 0,			//切换
      title1: '地区',
      title2: '涉及工艺',
      // title3:'项目类型',
      citycategorys: {},		//地区
      householdaddress: [],		//项目类型
      education: [],				//涉及工艺
      workmanship: false,
      carousel: [],
      idList: [],
    };
  },
  watch: {
    'x': {
      handler(n, o) {
        // 原始位置+1 或者原始位置-1
        if (o === '') {
          //第一次位置
          this.newx = 5
        } else {
          // 第二次
          if (o > n) {
            //当往右拖的时候---> 旧值大于新值 
            // 新位置要成负数 = old - new
            this.newx = this.newx + (o - n)
          } else {//当往右拖的时候---> 旧值小于于新值
            this.newx = this.newx - (n - o)
          }
        }
        this.top.right = this.newx - -5 + 'px'
      }
    },
    "y": {
      handler(n, o) {
        // 原始位置+1 或者原始位置-1
        if (o === '') {
          //第一次位置
          this.newy = 334
        } else {
          // 第二次
          if (o > n) {
            //当往上拖的时候---> 旧值大于新值 
            // 新位置要成负数 = old - new
            this.newy = this.newy - (o - n)
          } else {//当往下拖的时候---> 旧值小于于新值
            this.newy = this.newy + (n - o)
          }
        }
        this.top.top = this.newy + 'px'
      }
    },
    "params.keyword": {
      handler(e) {
        this.loading = false;
        this.finished = false;
        this.dataset = []
        this.page = 1
        this.fetchData()
      }
    },
    'params.hasPhone': {
      handler(e) {
        this.loading = false;
        this.finished = false;
        this.dataset = []
        this.page = 1
        this.fetchData()
      }
    },
    //   $route(to, from) {
    //  console.log(to, from,"监听路由")
    //     // 对路由变化作出响应...
    //     if (from.name !== "resumeShow" && to.name === "resumeList") {
    //       // 将地址栏中的url参数初始化到参数对象中
    //       this.initQuery(to.query);
    //       this.fetchData(true);
    //       this.restoreFilter();
    //     }
    // if(from.name !== "backupsProject" && to.name === "resumeList"){
    // 	// 将地址栏中的url参数初始化到参数对象中
    // 	this.initQuery(to.query);
    // 	this.fetchData(true);
    // 	this.restoreFilter();
    // }
    //   },
    active: {
      immediate: true,
      handler(ne, ol) {
        this.labelRed = ''
        this.loading = false;
        this.finished = false;
        this.dataset = []
        this.page = 1
        this.fetchData()
      }
    }
  },
  computed: {
    ...mapState(['userInfo', 'LoginOrNot'])
  },
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
    this.getBaBanner();
    // active 0 为备案项目 1为直采项目
    // 如果为直采项目 我应该做的操作
    // if (ne == 1) {
    // console.log("我是制裁项目", this.$route.query.key);
    // 如果key值不为空的话
    if (this.$route.query.key !== null && this.$route.query.key != undefined) {
      // 就赋值
      // console.log(879,this.$route.query.key);
      this.params.keyword = this.$route.query.key
    }
    if (this.$route.query.type !== null && this.$route.query.type != undefined) {
      this.active = this.$route.query.type
    }
    if (this.$route.query.active || this.$route.query.active === '0') {
      this.active = this.$route.query.active
    }
    if (this.$route.query.times) {
      this.params.date = this.$route.query.times
    }
    this.getMenber()
    // 请求列表数据
    // this.initQuery(this.$route.query);
    this.fetchData(true);		//获取列表信息
    this.classify()				//获取下啦数据
    wxshare({}, "resumelist", location.href);
    return
    this.$store.dispatch("getClassify", "citycategory");
    this.$store.dispatch("getClassify", "experience").then(() => {
      // 涉及工艺
      let storeExperience = this.$store.state.classifyExperience;
      storeExperience.unshift({ id: "", text: "不限" });
      this.optionExperience = storeExperience.map(function (item) {
        return { text: item.text, value: item.id };
      });
      // 得到缓存分类之后，再次尝试恢复选中项
      this.restoreFilter();
      //  storeExperience=[];
    });
    this.$store.dispatch("getClassify", "education").then(() => {
      // 项目类型parse
      let storeEducation = this.$store.state.classifyEdu;
      storeEducation.unshift({ id: "", text: "不限" });
      this.optionEducation = storeEducation.map(function (item) {
        return { text: item.text, value: item.id };
      });
      this.restoreFilter();
    });
    this.$store.dispatch("getClassify", "resumeTag").then(() => {
      // 重构项目标签
      let storeResumeTag = JSON.parse(
        JSON.stringify(this.$store.state.classifyJobTag)
      );
      storeResumeTag = storeResumeTag.map(function (item) {
        return { id: item.id, text: item.text, select: false };
      });
      storeResumeTag.unshift({ id: "", text: "全部", select: true });
      this.optionResumeTag = storeResumeTag;
      this.restoreFilter();
    });
  },
  mounted() {
    // 重构筛选项数据格式
    // 性别
    this.optionGender = this.restructureData(this.optionGender, "", "gender");
    // 更新时间
    this.optionSettr = this.restructureData(this.optionSettr, "", "settr");
    this.restoreFilter();
  },
  methods: {
       // 搜索关键字高亮
       brightenKeyword(title, keyword) {
      const Reg = new RegExp(keyword, "i");
      if (title) {
        const res = title.replace(
          Reg,
          `<span style="color: red;">${keyword}</span>`
        );
        return res;
      }
    },
    getBaBanner() {
      http.get(api.getBaBanner, {}).then(res => {
        console.log(res, "lunbo")
        this.carousel = res.data
      })
    },
    onSearch() {
      this.fetchData();
    },
    subscribeClick() {
      // 如果说已经登录的场景  用这个属性判断是否登录 LoginOrNot 如果说是true就说已经登录  false就说未登录 
      if (this.LoginOrNot == true) {
        this.$router.push('/addSubscribe')
      } else {
        this.$router.push('/member/login')
      }
    },
    getMenber() {
      http.get(api.getMenber, {}).then(res => {
        console.log(res, "1111111")
        this.menber = res.data
      })
    },
    down(e) {
      console.log(e, "222")
    },
    move(e) {
      // console.log(e.touches[0],"111")
      document.body.style.overflow = 'hidden'
      this.y = e.touches[0].clientY
      this.x = e.touches[0].clientX
    },
    end(e) {
      document.body.style.overflow = 'auto'
      // console.log(e,"333")
    },
    // 获取选项信息
    classify() {
      http.get(api.classify, { type: 'citycategorys,householdaddress,education' }).then(res => {
        console.log(res, "sssss")
        let householdaddress = []
        let education = []
        householdaddress.unshift({
          text: '全部', value: 0
        })
        education.unshift({
          text: '不限', value: 0
        })
        for (let i = 0; i < res.data.householdaddress.length; i++) {
          householdaddress.push({ text: res.data.householdaddress[i].name, value: res.data.householdaddress[i].id })
        }
        for (let i = 0; i < res.data.education.length; i++) {
          education.push({ text: res.data.education[i].name, value: res.data.education[i].id })
        }
        this.citycategorys = res.data.citycategorys
        this.householdaddress = householdaddress.map(val => {
          return {
            ...val,
            typeCode: 0
          }
        })
        this.education = education
      })
    },
    // 地区选择器的确认按钮
    confirm(e) {
      // console.log(e, "eeeee")
      this.loading = false;
      this.finished = false;
      this.dataset = []
      this.page = 1
      if (e[0].code == '') {
        this.params.district1 = ''
        this.params.district2 = ''
        this.params.district3 = ''
        this.title1 = '地区'
        this.fetchData()
        if (this.active == 0) { this.$refs.item.toggle(); }
        if (this.active == 1) { this.$refs.items.toggle(); }
        return
      }
      this.title1 = e[0].name
      this.params.district1 = e[0].code
      this.params.district2 = e[1].code
      this.fetchData()
      if (this.active == 0) { this.$refs.item.toggle(); }
      if (this.active == 1) { this.$refs.items.toggle(); }
    },
    clickLabel(e, index) {
      console.log(e, "e的数据");
      // this.params.experience= this.params.experience.concat(e.value)
      this.params.experience = this.params.experience + e.value + ','
      console.log(this.params.experience, "数据");


      if (this.householdaddress[index] && this.householdaddress[index].typeCode == 1) {
        this.householdaddress[index].typeCode = 0
      } else {
        this.householdaddress[index].typeCode = 1
      }

      // if(e.text){
      //    let idIndex = this.idList.indexOf(e.value)
      //    console.log(this.idList ,"啥");
      //    this.idList.splice(idIndex,1)
      //    console.log(this.idList ,"");
      // }
      //       if(e.isSelect){
      //           // 高亮的情况下 需 取消
      //           let idIndex = this.idList.indexOf(e.id)
      //           console.log(this.idIndex,"111,111111");
      //           this.idList.splice(idIndex,1)
      //       } else{
      //           this.idList.push(e.id)
      //       }
      //       this.list[i].isSelect = !this.list[i].isSelect
    },
    changeItemClick() {
      this.fetchData();
      this.$refs.changess.toggle();
    },
    changeItem(e) {
      // this.params.experience =e
      if (e !== 0) {
        this.params.experience = this.params.experience + e
        console.log(this.params.experience, "数据数据111");
      }
      console.log(this.params.experience, "pin逛街1111")
      this.dataset = []
      this.loading = false;
      this.finished = false;
      this.page = 1

      // if (e == 0) {
      //   this.params.experience = this.params.experience + e
      //   this.title2 = '涉及工艺'
      //   this.fetchData()
      //   return
      // }
      // console.log( this.householdaddress.length,"1111")
      // for (var i = 0; i < this.householdaddress.length; i++) {
      //   if (this.householdaddress[i].value == e) {
      //     this.title2 = this.householdaddress[i].text
      //     this.fetchData()
      //     break;
      //   }
      // }
    },
    changeItems(e) {
      console.log(e)
      this.params.education = e
      this.dataset = []
      this.loading = false;
      this.finished = false;
      this.page = 1
      if (e == 0) {
        this.title3 = '项目类型'
        this.fetchData()
        return
      }
      for (var i = 0; i < this.education.length; i++) {
        if (this.education[i].value == e) {
          this.title3 = this.education[i].text
          this.fetchData()
          break;
        }
      }
    },
    // 清空
    handleClearMore() {
      this.params.sex = "";
      this.params.minage = "";
      this.params.maxage = "";
      this.params.minwage = "";
      this.params.maxwage = "";
      this.params.tag = "";
      this.params.settr = "";
      this.handleSelectMore();
      this.optionGender = this.restructureData(this.optionGender, "", "gender");
      this.optionSettr = this.restructureData(this.optionSettr, "", "settr");
      this.optionAge = this.optionAge.map(function (item, index) {
        return {
          text: item.text,
          id: item.id,
          min: item.min,
          max: item.max,
          select: index === 0,
        };
      });
      this.optionWage = this.optionWage.map(function (item, index) {
        return {
          text: item.text,
          id: item.id,
          min: item.min,
          max: item.max,
          select: index === 0,
        };
      });
      this.optionResumeTag = this.optionResumeTag.map(function (item, index) {
        return { id: item.id, text: item.text, select: index === 0 };
      });
    },
    // 恢复福利待遇
    restoreResumeTag() {
      let queryData = this.$route.query;
      if (queryData["tag"] && this.optionResumeTag) {
        this.selectResumeTag = queryData["tag"].split(",");
        this.selectResumeTag = this.selectResumeTag.map(function (item) {
          return parseInt(item);
        });
        let _this = this;
        this.optionResumeTag = this.optionResumeTag.map(function (item) {
          return {
            id: item.id,
            text: item.text,
            select: _this.selectResumeTag.includes(item.id),
          };
        });
      } else {
        this.optionResumeTag = this.optionResumeTag.map(function (item, index) {
          return { id: item.id, text: item.text, select: index === 0 };
        });
      }
    },
    // 项目标签多选
    handleCheckResumeTag(item) {
      if (item.id) {
        if (this.selectResumeTag.includes(item.id)) {
          this.selectResumeTag.splice(
            this.selectResumeTag.findIndex(
              (v) => parseInt(v.id) === parseInt(item.id)
            ),
            1
          );
        } else {
          if (this.selectResumeTag.length >= 5) {
            this.$toast("项目标签最多可选5个");
          } else {
            this.selectResumeTag.push(item.id);
          }
        }
        let _this = this;
        this.optionResumeTag = this.optionResumeTag.map(function (item) {
          return {
            id: item.id,
            text: item.text,
            select: _this.selectResumeTag.includes(item.id),
          };
        });
      } else {
        // 全部
        this.selectResumeTag = [];
        this.optionResumeTag = this.optionResumeTag.map(function (item, index) {
          return { id: item.id, text: item.text, select: index === 0 };
        });
      }
      this.params.tag = this.selectResumeTag.join(",");
    },
    initQuery(query) {
      for (const key in this.params) {
        if (query.hasOwnProperty(key)) {
          this.params[key] = query[key];
        } else {
          this.params[key] = "";
        }
      }
    },
    openedEducation() {
      this.params.education = parseInt(this.params.education);
    },
    openedExperience() {
      this.params.experience = parseInt(this.params.experience);
    },
    // 筛选年龄
    handleAge(option) {
      this.params.minage = option.min;
      this.params.maxage = option.max;
      this.optionAge = this.optionAge.map(function (item) {
        return {
          text: item.text,
          id: item.id,
          min: item.min,
          max: item.max,
          select: parseInt(item.id) === parseInt(option.id),
        };
      });
    },
    // 筛选企业性质
    handleWage(option) {
      this.params.minwage = option.min;
      this.params.maxwage = option.max;
      this.optionWage = this.optionWage.map(function (item) {
        return {
          text: item.text,
          id: item.id,
          min: item.min,
          max: item.max,
          select: parseInt(item.id) === parseInt(option.id),
        };
      });
    },
    goDetails(id) {
      if (!this.LoginOrNot) {
        // this.$dialog({
        //   message: '注册登录行业大牛用户账号，免费查看项目信息！！\n\n已超过<span style="color:red">10000</span>家设备同行通过行业大牛<span style="color:red">获取商机</span>！',
        //   closeOnClickOverlay: true,
        //   confirmButtonText: '去登录',
        //   messageAlign: "left",
        // }).then(_ => {
        this.$router.push('/member/login?redirect=' + window.location.pathname)
        // })
        return
      }
      this.$router.push('/backupsProject/backupsProject?id=' + id)
    },
    // 筛选项目类型
    // handleEducation(value) {
    //   if (value) {
    //     let thisEducation = this.optionEducation.filter(
    //       (item) => parseInt(item.value) === value
    //     );
    //     this.educationTitle = thisEducation[0].text;
    //     this.params.education = value;
    //   } else {
    //     this.educationTitle = "项目类型";
    //     this.params.education = "";
    //   }
    //   this.doSearch({ education: value });
    // },
    // 筛选涉及工艺
    handleExperience(value) {
      if (value) {
        let thisExperience = this.optionExperience.filter(
          (item) => parseInt(item.value) === parseInt(value)
        );
        this.experienceTitle = thisExperience[0].text;
        this.params.experience = value;
      } else {
        this.experienceTitle = "涉及工艺";
        this.params.experience = "";
      }

      this.doSearch({ experience: value });
    },
    // 地区筛选打开之后给筛选组件赋值
    openedDistrict() {
      this.$refs.dropDistrict.$children[0].$children[0].initData();
      setTimeout(() => {
        this.setComponentAttribute(this.$refs.dropDistrict);
      }, 300);
    },
    closedDistrict() {
      this.$refs.dropDistrict.$children[0].$children[0].handleCityOverlay();
    },
    // 设置地区筛选组件高度
    setComponentAttribute(component) {
      if (component.$children[0]) {
        let thisHeight = component.$children[0].$el.clientHeight;
        component.$children[0].$children[0].layHeight = thisHeight;
        let offTop = component.$el.offsetTop;
        component.$children[0].$children[0].offTop = parseInt(
          parseInt(offTop) + parseInt(thisHeight) / 2
        );
      }
    },
    // 恢复选中项
    restoreFilter() {
      let queryData = this.$route.query;
      let list = this.$store.state.classifyCityOriginal;
      // 恢复地区
      if (queryData["district1"]) {
        this.params.district1 = queryData["district1"];
        this.params.district2 = queryData["district2"];
        this.params.district3 = queryData["district3"];
        let storeCity = this.$store.state.classifyCityOriginal;
        let selectText = [];
        let topItem = storeCity.filter(
          (item) => parseInt(item.value) === parseInt(this.params.district1)
        )[0];
        selectText.push(topItem.label);
        if (topItem.children.length) {
          if (parseInt(this.params.district2)) {
            let secondItem = topItem.children.filter(
              (item) => parseInt(item.value) === parseInt(this.params.district2)
            )[0];
            selectText.push(secondItem.label);
            if (secondItem.children.length) {
              if (parseInt(this.params.district3)) {
                let lowestItem = secondItem.children.filter(
                  item =>
                    parseInt(item.value) === parseInt(this.params.district3)
                )[0];
                selectText.push(lowestItem.label);
              } else {
                selectText.push(`全${selectText[selectText.length - 1]}`);
              }
            }
          } else {
            selectText.push(`全${selectText[selectText.length - 1]}`);
          }
        }
        this.districtTitle = selectText[selectText.length - 1];
      } else {
        this.params.district1 = "";
        this.params.district2 = "";
        this.params.district3 = "";
        this.districtTitle = "地区";
      }
      // 恢复涉及工艺
      if (queryData["experience"] && this.optionExperience) {
        let thisExperience = this.optionExperience.filter(
          (item) => parseInt(item.value) === parseInt(queryData["experience"])
        );
        this.experienceTitle = thisExperience[0].text;
        this.params.experience = parseInt(thisExperience[0].value);
      } else {
        this.experienceTitle = "涉及工艺";
        this.params.experience = "";
      }
      if (queryData["minage"]) {
        this.params.minage = queryData["minage"];
        this.params.maxage = queryData["maxage"];
        this.optionAge = this.optionAge.map(function (item) {
          return {
            text: item.text,
            id: item.id,
            min: item.min,
            max: item.max,
            select: parseInt(item.min) === parseInt(queryData["minage"]),
          };
        });
      } else {
        this.params.minage = "";
        this.params.maxage = "";
        this.optionAge = this.optionAge.map(function (item, index) {
          return {
            text: item.text,
            id: item.id,
            min: item.min,
            max: item.max,
            select: index === 0,
          };
        });
      }
      // 恢复企业性质
      if (queryData["minwage"]) {
        this.params.minwage = queryData["minwage"];
        this.params.maxwage = queryData["maxwage"];
        this.optionWage = this.optionWage.map(function (item) {
          return {
            text: item.text,
            id: item.id,
            min: item.min,
            max: item.max,
            select: parseInt(item.min) === parseInt(queryData["minwage"]),
          };
        });
      } else {
        this.params.minwage = "";
        this.params.maxwage = "";
        this.optionWage = this.optionWage.map(function (item, index) {
          return {
            text: item.text,
            id: item.id,
            min: item.min,
            max: item.max,
            select: index === 0,
          };
        });
      }
      // 恢复项目标签
      this.restoreResumeTag();
      // 恢复更新时间
      let resetSettr = "";
      if (queryData["settr"]) {
        resetSettr = queryData["settr"];
      }
      this.optionSettr = this.restructureData(
        this.optionSettr,
        resetSettr,
        "settr"
      );
    },
    // 地区筛选
    doSearchByDistrict(data) {
      this.doSearch({
        district1: data.district1,
        district2: data.district2,
        district3: data.district3,
      });
      this.districtTitle = data.districtName;
      this.$refs.dropDistrict.toggle();
    },
    /**
     * 重构数据
     * @param data 需要重构的数据
     * @param id 标记是否选中
     * @param type 筛选条件
     * @returns {*}
     */
    restructureData(data, id, type) {
      let restoreArray = data;
      let existSub = restoreArray.findIndex((item) => {
        return item.id === "";
      });
      if (existSub === -1) {
        // 防止重复添加
        restoreArray.unshift({ id: "", text: "全部" });
      }
      if (type === "gender") {
        // 性别
        this.params.sex = id;
      } else if (type === "settr") {
        // 更新时间
        this.params.settr = id;
      }
      restoreArray = restoreArray.map(function (item, index) {
        let iSelect = false;
        if (id) {
          // 标记选中项
          iSelect = parseInt(item.id) === parseInt(id);
        } else {
          // 无选中项，选中全部
          iSelect = index === 0;
        }
        return { id: item.id, text: item.text, select: iSelect };
      });
      return restoreArray;
    },
    // 更多选择确定
    handleSelectMore() {
      this.doSearch({
        sex: this.params.sex,
        minage: this.params.minage,
        maxage: this.params.maxage,
        minwage: this.params.minwage,
        maxwage: this.params.maxwage,
        tag: this.params.tag,
        settr: this.params.settr,
      });
      this.$refs.dropMore.toggle();
    },
    // 请求列表数据，init为true时直接更改dataset值，false时代表上拉加载回的数据追加进dataset
    fetchData(init) {
      let params = { ...this.params }
      params.page = this.page
      params.pagesize = this.pagesize
      let url = this.active != 0 ? api.resumelist : api.homeResume_keepIndex;
      http.get(url, { ...params }).then((res) => {
        if (res.code === 200) {
          // 下拉加载
          let list = res.data.items
          console.log(list, "11111")
          this.loading = false;
          this.empty1 = list.length === 0 ? true : false;
          if (list.length < this.pagesize) {
            this.loading = true;
            this.finished = true;
          }
          this.dataset = this.page == 1 ? list : [...this.dataset, ...list];
        }
      }).catch(() => { });

      this.params.experience = "";
	    this.householdaddress.forEach(item => {
		     item.typeCode = 0;
	  })
    },
    onLoad() {
      this.page++
      this.fetchData()
    },
    toDetail(id) {
      this.$router.push("/resume/" + id);
    },
    // 搜索通用函数
    doSearch(data) {
      for (const key in data) {
        if (this.params.hasOwnProperty(key)) {
          this.params[key] = data[key];
        }
      }
      this.page = 1;
      this.$router.push("/resumelist" + obj2Param(this.params, "?"));
    },
    // 关键词搜索函数，重置所有参数，并且把当前页设置为第一页
    doSearchByKeyword(data) {
      for (const key in this.params) {
        this.params[key] = "";
      }
      this.params.keyword = data.keyword;
      this.page = 1;
      this.$router.push("/resumelist" + obj2Param(this.params, "?"));
    },
    toggleSearch() {
      this.show = !this.show;
    },
  },
};
</script>
<style lang="scss">
.filter_drop {
  .van-popup {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }

  .van-cell {
    width: 95px;
    padding: 2px 2px 2px 2px;
    margin-top: 20px;
    margin-left: 20px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .van-cell__title,
  .van-cell__value {
    line-height: inherit;
    background: #F8F8F8;
    width: 60px;
    display: flex;
    font-size: 13px;
    align-items: center;
    justify-content: center;
  }
}
</style>
<style lang="scss" scoped>
>>>.van-ellipsis {
  font-size: 12px;

}

.houseList {
  height: 30px;
  line-height: 30px;
  font-size: 12px;
  margin-top: 20px;
  margin-left: 30px;
  background-color: rgba(243, 243, 243, 1);
  padding: 2px;
  width: 85px;
  color: #333333;
  display: flex;
  justify-content: center;
  align-items: center;
}

.classTwo {
  height: 30px;
  line-height: 30px;
  margin-top: 20px;
  margin-left: 30px;
  background-color:  #409eff;
  padding: 2px;
  width: 85px;
  color: #333333;
  display: flex;
  justify-content: center;
  align-items: center;
}

.determine {
  width: 97px;
  height: 30px;
  line-height: 30px;
  margin-left: 20px;
  color: #fff;
  background-color: #1989fa;
  border: 0.026667rem solid #1989fa;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
  border-radius: 2px;
}

.searchDivMin {
  display: flex;
  align-items: center;
  position: fixed;
  flex-direction: row-reverse;
  z-index: 9999;
}

// .my-swipe .van-swipe-item {
//   color: #fff;
//   font-size: 20px;
//   line-height: 50px;
//   text-align: center;
//   background-color: #39a9ed;
// }

.searchDiv {
  font-size: 34px;
  background: #797979;
  line-height: 1.36rem;
  width: 1.333333rem;
  height: 1.333333rem;
  border-radius: 50%;
  text-align: center;
  color: #fff;
  margin: 0 5px;
}

.subscribeIMg {
  width: 43%;
  display: flex;
  border-left: 1px solid #686868;
  padding: 0px 0px 0px 20px;

}

.subscribeIMgs {
  display: flex;
  border-left: 1px solid #686868;
  padding: 0px 0px 0px 20px;

}

.imgSubscribe {
  display: flex;
  align-items: center;
  padding: 0px 10px 0px 0px;
}

.subscribe {
  color: #409EFF;
  font-size: 14px;
}

.searchDiv2 {
  width: 13.6em;
  height: 2.2em;
  font-size: 16px;
}

.searchInput {
  border: 1px #e2ebf8 solid;
}

.searchInput:focus {
  outline: none;
  border: 1px #cfe1fb solid;
}

>>>.van-tabs__line {
  background-color: #00aaff !important;
}

>>>.van-tab--active {
  .van-tab__text {
    color: #00aaff !important
  }
}

.popbox {
  font-size: 12px;

  .headbox {
    display: flex;
    justify-content: center;
    align-items: center;

    .text {
      width: 100%;
      line-height: 50px;
      text-align: center;
      position: relative;
      font-size: 14px;
      height: 50px;

      span {
        color: #666666;
        position: absolute;
        left: 10px;
        font-size: 23px;
      }
    }
  }

  .headText {
    color: #c9c9c9;
    padding: 12px 15px;
  }

  .experience {
    display: flex;
    flex-wrap: wrap;
    padding: 10px 12px;

    div {
      padding: 5px 12px;
      background-color: #f3f3f3;
      color: #999;
      border-radius: 20px;
      margin: 0 10px 10px 0;
    }

    .div-coGack {
      color: #1787fb;
      background-color: #f4f9ff;
    }
  }

  .bottom-ba {
    background-color: #1989fa;
    color: #fff;
    border-radius: 25px;
    width: 340px;
    height: 45px;
    line-height: 45px;
    text-align: center;
    color: #fff;
    font-size: 15px;
    margin: auto;
  }
}

>>>.van-tab {
  color: #000;
}

>>>.labelRed {
  .van-tab__text {
    position: relative;
    display: inline-flex;

    &::after {
      content: "";
      background: #e61919;
      height: 5px;
      width: 5px;
      position: absolute;
      border-radius: 50%;
      right: 0;
    }
  }
}

.inpuTex {
  display: flex;
  align-items: center;
  width: 87%;
  background: #fff;
  border-radius: 20px;
  text-align: center;
  color: #cecece;
  text-indent: 9px;
  margin: 0px auto 0;
  font-size: 23px;
  height: 38px;
  overflow: hidden;

  &i {
    font-weight: 900;
  }

  &-key {
    font-size: 15px;
  }

  &-search {
    margin: 0 0 0 auto;
    width: 82px;
    background: #e0effe;
    color: #409eff;
    font-size: 15px;
    height: 100%;
    line-height: 38px;
  }
}

.my-swipe-item {
  height: 80px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.listTab2 {
  display: flex;
  flex-direction: column;
  border-bottom: 6px solid #eeeeee;

  .listTab2Head {
    background-color: #fff;
    font-size: 15px;
    display: flex;
    padding: 5px;

    .listTab2HeadImg {
      width: 60px;
      height: 60px;
      flex: none;
      overflow: hidden;
      border-radius: 50%;
      background: url("https://www.hangyedaniu.com/upload/resource/user.png") no-repeat center center/ 100% 100%;
      object-fit: cover;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .listTab2HeadName {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      padding: 0 5px;
      flex: 1;

      .listTab2HeadName1 {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .listTab2HeadName1Text1 {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          word-break: break-all;
          font-size: 12px;
          font-weight: 700;
        }

        .listTab2HeadName1Text2 {
          font-size: 13px;
          flex: none;
        }
      }

      .listTab2HeadName2 {
        font-size: 13px;
        margin-top: 10px;

        .listTab2HeadName2Span2 {
          margin-left: 10px;
        }
      }
    }
  }

  .listTab2Label {
    display: flex;
    flex-wrap: wrap;
    font-size: 12px;
    color: #1787fb;
    padding: 5px 10px;

    .listTab2LabelList {
      // background-color: #a8bdd6;
      background: #f4f9ff;
      padding: 3px 8px;
      margin-right: 8px;
      border-radius: 5px;
      margin-bottom: 5px;
    }
  }

  .updateTime {
    padding: 10px 10px 10px 10px;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .updateTimeSpan {
      margin-left: 10px;
    }
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
      background: #ffa57d url("../assets/images/fab_ico.svg") 5px center no-repeat;
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
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          word-break: break-all;
          font-size: 18px;
          font-weight: bold;
          color: #333333;
        }

        .level_ico {
          float: left;
          margin-left: 10px;
          width: 36px;
          height: 25px;
          background: url("../assets/images/resume_list_level_ico.png") 0 center no-repeat;
          background-size: 36px 15px;
        }
      }

      .avatar_box {
        .gender {
          &.female {
            background: #ff8d65 url("../assets/images/female_ico.svg") center no-repeat;
            background-size: 9px;
          }

          &.male {
            background: #4fa5fa url("../assets/images/male_ico.svg") center no-repeat;
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

.box_2 {
  position: sticky;
  top: 44px;
  z-index: 100;

  .van-hairline--top-bottom {
    &::after {
      border: 0;
    }
  }

  .box_2Div {
    background: #4ea8e8 !important;
  }
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
