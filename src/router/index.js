import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index'
import Search from '../views/Search'
import JobList from '../views/JobList'
import JobListNearby from '../views/JobListNearby'
import JobShow from '../views/JobShow'
import ResumeList from '../views/ResumeList'
import ResumeShow from '../views/ResumeShow'
import CompanyList from '../views/CompanyList'
import CompanyShow from '../views/CompanyShow'
import RegFormStep1 from '../views/personal/AddResumeByForm/RegFormStep1'
import RegFormStep2 from '../views/personal/AddResumeByForm/RegFormStep2'
import RegIntStep1 from '../views/personal/AddResumeByInteractive/RegIntStep1'
import RegIntStep2 from '../views/personal/AddResumeByInteractive/RegIntStep2'
import RegIntStep3 from '../views/personal/AddResumeByInteractive/RegIntStep3'
import RegIntStep4 from '../views/personal/AddResumeByInteractive/RegIntStep4'
import RegIntStep4Nowork from '../views/personal/AddResumeByInteractive/RegIntStep4Nowork'
import ResumeFinish from '../views/personal/AddResumeFinish'
import PersonalAccount from '../views/personal/AccountManage/Account'
import PersonalJobApply from '../views/personal/JobManagement/JobApply'
import PersonalIndex from '../views/personal/PersonalIndex'
import EditResume from '../views/personal/EditResume'
import EditBasic from '../views/personal/EditBasic'
import EditIntention from '../views/personal/EditIntention'
import EditCertificate from '../views/personal/EditCertificate'
import EditEducation from '../views/personal/EditEducation'
import EditLanguage from '../views/personal/EditLanguage'
import EditProject from '../views/personal/EditProject'
import EditTags from '../views/personal/EditTags'
import EditTrain from '../views/personal/EditTrain'
import EditWorks from '../views/personal/EditWorks'
import EditSpecialty from '../views/personal/EditSpecialty'
import PrivacySetting from '../views/personal/PrivacySetting'
import PersonalServiceIndex from '../views/personal/Service/PersonalServiceIndex'
import CompanyIndex from '../views/company/CompanyIndex'
import subscribeProject from '../views/company/subscribe_project'
import PrivacyAddBlackList from '../views/personal/PrivacyAddBlackList'
import MemberOauthQq from '../views/member/Oauth/qq'
import MemberOauthWeixin from '../views/member/Oauth/weixin'
import Login from '../views/member/Login'
import Appeal from '../views/member/Appeal'
import AttentionMe from '../views/personal/JobManagement/AttentionMe'
import AttentionCompany from '../views/personal/JobManagement/AttentionCompany'
import ViewJob from '../views/personal/JobManagement/ViewJob'
import PersonalInterview from '../views/personal/JobManagement/PersonalInterview'
import JobFavorites from '../views/personal/JobManagement/JobFavorites'
import VideoInterview from '../views/personal/JobManagement/VideoInterview'
import Reg from '../views/member/Reg'
import JobMap from '../views/JobMap'
import ResumePreview from '../views/personal/ResumePreview'
import PersonalRecommend from '../views/personal/Recommend'
import PersonalRecommendAdd from '../views/personal/RecommendAdd'
import ImList from '../views/im/ImList'
import CompanyRecommend from '../views/company/Recommend'
import ImShow from '../views/im/ImShow'
import PersonalLoginLog from '../views/personal/AccountManage/LoginLog'
import CompanyLoginLog from '../views/company/AccountManage/LoginLog'
import Notice from '../views/Notice'
import NoticeShow from '../views/NoticeShow'
import News from '../views/News'
import NewShow from '../views/NewShow'
import CompanyManagement from '../views/company/CompanyManagement'
import CompanyProfile from '../views/company/BasicInfo'
import CompanyCustomerService from '../views/company/AccountManage/ExclusiveService'
import AfterSalesEvaluate from '../views/company/AccountManage/AfterSalesEvaluate'
import CompamyAccount from '../views/company/AccountManage/Account'
import CompamyJobapply from '../views/company/ResumeManagement/ReceivedResume'
import intelligenceInquiry from '../views/company/ResumeManagement/intelligenceInquiry'


import CompamyDownload from '../views/company/ResumeManagement/ResumeDownload'
import CompanyInterview from '../views/company/ResumeManagement/ResumeInterviewInvitation'
import CompanyInterviewVideo from '../views/company/ResumeManagement/ResumeVideoInvitation'
import CompanyFav from '../views/company/ResumeManagement/ResumeFavorites'
import CompanyViewResume from '../views/company/ResumeManagement/BrowsingRecords'
import CompanyAuthIndex from '../views/company/AccountManage/Auth'
import CompanyJobAdd from '../views/company/AddJob'
import CompanyJobEdit from '../views/company/EditJob'
import CompanyJobList from '../views/company/JobList'
import CompanyCoupon from '../views/company/Service/Coupon'
import CompanyPoints from '../views/company/Service/Points'
import CompanyPointsLog from '../views/company/Service/BudgetLog'
import PersonalPointsLog from '../views/personal/Service/BudgetLog'
import OrderList from '../views/service/OrderList'
import OrderDetail from '../views/service/OrderDetail'
import CompanyBuyPoints from '../views/company/Service/BuyPoints'
import CompanyBuyService from '../views/company/Service/BuyService'
import CompanyMySetmeal from '../views/company/Service/MySetmeal'
import CompanyMySetmealLog from '../views/company/Service/MySetmealLog'
import CompanyMsg from '../views/company/AccountManage/Msglist'
import PersonalMsg from '../views/personal/AccountManage/Msglist'
import FindPwd from '../views/member/FindPwd'
import AccountBinding from '../views/member/AccountBinding'
import PersonalOrderAdd from '../views/personal/Service/OrderPay'
import Video from '../views/Video'
import Microposte from '../views/company/Microposte'
import ScanMicroposte from '../views/ScanMicroposte'
import ScanUpload from '../views/ScanUpload'
import JobfairolIndex from '../views/jobfairol/Index'
import JobfairolShow from '../views/jobfairol/Show'
import JobfairolReserve from '../views/jobfairol/Seserve'
import JsapiPay from '../views/service/JsapiPay'
import RegQuick from '../views/member/RegQuick'
import videocompanylist from '../views/shortvideo/companyList'
import videopersonallist from '../views/shortvideo/personalList'
import videoManage from '../views/shortvideo/videoManage'
import videoRelease from '../views/shortvideo/releaseVideo'
import videoplay from '../views/shortvideo/VideoPlay'
import subsiteList from '../views/SubsiteList'
import myPurchasing from '../views/personal/purchasingManagement/myPurchasing'
import purchasingInformation from '../views/personal/purchasingManagement/purchasingInformation'
import releasePurchase from '../views/personal/purchasingManagement/releasePurchase'
import purchaseDetails from '../views/personal/purchasingManagement/purchaseDetails'
import backupsProject from '../views/backupsProject/backupsProject'
import buildByOneself from '../views/backupsProject/buildByOneself'
import recommend from '../views/recommend'
import mySchedule from '../views/mySchedule/index'
import myPostSale from '../views/myPostSale/index'
import addPostSale from '../views/myPostSale/addPostSale'
import postSaleDetails from '../views/myPostSale/details'
import AddSubscribe from '../views/addSubscribe'
import educationHuse from '../views/educationHuse'
import publishPurchase from '../views/company/publishPurchase'

Vue.use(VueRouter)

/**
 * ???????????????push??????
 */
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return routerPush.call(this, location).catch((error) => error)
}

const routes = [{
  path: '/',
  redirect: '/index',
  meta: {
    keepAlive: false,
    loginCheck: false
  }
},
{
  path: '/index',
  name: 'index',
  component: Index,
  meta: {
    title: '??????',
    keepAlive: true,
    loginCheck: false
  }
},
{
  path: '/search',
  name: 'search',
  component: Search,
  meta: {
    title: '??????',
    keepAlive: false,
    loginCheck: false
  }
},
{
  path: '/addSubscribe',
  name: 'addSubscribe',
  component: AddSubscribe,
  meta: {
    title: '??????',
    keepAlive: true,
    loginCheck: false
  }
},
// {
//   path: '/nextStep',
//   name: 'nextStep',
//   component: NextStep,
//   meta: {
//     title: '?????????',
//     keepAlive: true,
//     loginCheck: false
//   }
// },
{
  path: '/educationHuse',
  name: 'educationHuse',
  component: educationHuse,
  meta: {
    title: '????????????',
    keepAlive: true,
    loginCheck: false
  }
},
{
  path: '/joblist',
  name: 'jobList',
  component: JobList,
  meta: {
    title: '?????????',
    keepAlive: true,
    loginCheck: false
  }
},
{
  path: '/jobnearby',
  name: 'jobListNearby',
  component: JobListNearby,
  meta: {
    title: '????????????',
    keepAlive: true,
    loginCheck: false
  }
},
{
  path: '/job/:id(\\d+)',
  name: 'jobShow',
  component: JobShow,
  meta: {
    title: '????????????',
    keepAlive: false,
    loginCheck: false
  }
},
{
  path: '/resumelist',
  name: 'resumeList',
  component: ResumeList,
  meta: {
    title: '?????????',
    keepAlive: true,
    loginCheck: false
  }
},
{
  path: '/recommend',
  name: 'recommend',
  component: recommend,
  meta: {
    title: '????????????',
    keepAlive: true,
    loginCheck: false
  }
},
{
  path: '/resume/:id(\\d+)',
  name: 'resumeShow',
  component: ResumeShow,
  meta: {
    title: '????????????',
    keepAlive: false,
    loginCheck: false
  }
},
{
  path: '/companylist',
  name: 'companyList',
  component: CompanyList,
  meta: {
    title: '?????????',
    keepAlive: true,
    loginCheck: false
  }
},
{
  path: '/company/:id(\\d+)',
  name: 'companyShow',
  component: CompanyShow,
  meta: {
    title: '????????????',
    keepAlive: false,
    loginCheck: false
  }
},
{
  path: '/publishPurchase',
  name: 'publishPurchase',
  component: publishPurchase,
  meta: {
    title: '???????????????',
    keepAlive: false,
    loginCheck: false
  }
},
{
  path: '/member/forget/:utype',
  name: 'FindPwd',
  component: FindPwd,
  meta: {
    title: '????????????',
    keepAlive: false,
    loginCheck: false
  }
},
{
  path: '/member/personal/resume_add_form/step1',
  name: 'RegFormStep1',
  component: RegFormStep1,
  meta: {
    title: '????????????',
    keepAlive: false,
    loginCheck: true,
    utype: 2
  }
},
{
  path: '/member/personal/resume_add_form/step2',
  name: 'RegFormStep2',
  component: RegFormStep2,
  meta: {
    title: '????????????',
    keepAlive: false,
    loginCheck: true,
    utype: 2
  }
},
{
  path: '/member/personal/resume_add_int/step1',
  name: 'RegIntStep1',
  component: RegIntStep1,
  meta: {
    title: '????????????',
    keepAlive: false,
    loginCheck: true,
    utype: 2
  }
},
{
  path: '/member/personal/resume_add_int/step2',
  name: 'RegIntStep2',
  component: RegIntStep2,
  meta: {
    title: '????????????',
    keepAlive: false,
    loginCheck: true,
    utype: 2
  }
},
{
  path: '/member/personal/resume_add_int/step3',
  name: 'RegIntStep3',
  component: RegIntStep3,
  meta: {
    title: '????????????',
    keepAlive: false,
    loginCheck: true,
    utype: 2
  }
},
{
  path: '/member/personal/resume_add_int/step4',
  name: 'RegIntStep4',
  component: RegIntStep4,
  meta: {
    title: '????????????',
    keepAlive: false,
    loginCheck: true,
    utype: 2
  }
},
{
  path: '/member/personal/resume_add_int/step4_nowork',
  name: 'RegIntStep4Nowork',
  component: RegIntStep4Nowork,
  meta: {
    title: '????????????',
    keepAlive: false,
    loginCheck: true,
    utype: 2
  }
},
{
  path: '/member/personal/resume_finish',
  name: 'ResumeFinish',
  component: ResumeFinish,
  meta: {
    title: '??????????????????',
    keepAlive: false,
    loginCheck: true,
    utype: 2
  }
},
{
  path: '/member/personal/account',
  name: 'PersonalAccount',
  component: PersonalAccount,
  meta: {
    title: '????????????',
    keepAlive: false,
    loginCheck: true,
    utype: 2
  }
},
{
  path: '/member/personal/jobapply',
  name: 'PersonalJobApply',
  component: PersonalJobApply,
  meta: {
    title: '???????????????',
    keepAlive: false,
    loginCheck: true,
    utype: 2
  }
},
{
  path: '/member/personal/index',
  name: 'PersonalIndex',
  component: PersonalIndex,
  meta: {
    title: '????????????',
    keepAlive: false,
    loginCheck: true,
    utype: 2
  }
},
{
  path: '/member/personal/resume',
  name: 'EditResume',
  component: EditResume,
  meta: {
    title: '????????????',
    keepAlive: false,
    loginCheck: true,
    utype: 2
  }
},
{
  path: '/member/personal/resume/basic',
  name: 'EditBasic',
  component: EditBasic,
  meta: {
    title: '????????????',
    keepAlive: false,
    loginCheck: true,
    utype: 2
  }
},
{
  path: '/member/personal/resume/intention_edit/:id',
  name: 'EditIntention',
  component: EditIntention,
  meta: {
    title: '????????????',
    keepAlive: false,
    loginCheck: true,
    utype: 2
  }
},
{
  path: '/member/personal/resume/certificate_edit/:id',
  name: 'EditCertificate',
  component: EditCertificate,
  meta: {
    title: '????????????',
    keepAlive: false,
    loginCheck: true,
    utype: 2
  }
},
{
  path: '/member/personal/resume/education_edit/:id',
  name: 'EditEducation',
  component: EditEducation,
  meta: {
    title: '????????????',
    keepAlive: false,
    loginCheck: true,
    utype: 2
  }
},
{
  path: '/member/personal/resume/language_edit/:id',
  name: 'EditLanguage',
  component: EditLanguage,
  meta: {
    title: '????????????',
    keepAlive: false,
    loginCheck: true,
    utype: 2
  }
},
{
  path: '/member/personal/resume/project_edit/:id',
  name: 'EditProject',
  component: EditProject,
  meta: {
    title: '????????????',
    keepAlive: false,
    loginCheck: true,
    utype: 2
  }
},
{
  path: '/member/personal/resume/tag',
  name: 'EditTags',
  component: EditTags,
  meta: {
    title: '????????????',
    keepAlive: false,
    loginCheck: true,
    utype: 2
  }
},
{
  path: '/member/personal/resume/train_edit/:id',
  name: 'EditTrain',
  component: EditTrain,
  meta: {
    title: '????????????',
    keepAlive: false,
    loginCheck: true,
    utype: 2
  }
},
{
  path: '/member/personal/resume/work_edit/:id',
  name: 'EditWorks',
  component: EditWorks,
  meta: {
    title: '????????????',
    keepAlive: false,
    loginCheck: true,
    utype: 2
  }
},
{
  path: '/member/personal/resume/specialty',
  name: 'EditSpecialty',
  component: EditSpecialty,
  meta: {
    title: '????????????',
    keepAlive: false,
    loginCheck: true,
    utype: 2
  }
},
{
  path: '/member/personal/privacy',
  name: 'PrivacySetting',
  component: PrivacySetting,
  meta: {
    title: '????????????',
    keepAlive: false,
    loginCheck: true,
    utype: 2
  }
},
{
  path: '/member/personal/service',
  name: 'PersonalServiceIndex',
  component: PersonalServiceIndex,
  meta: {
    title: '????????????',
    keepAlive: false,
    loginCheck: true,
    utype: 2
  }
},
{
  path: '/member/personal/blacklist_add',
  name: 'PrivacyAddBlackList',
  component: PrivacyAddBlackList,
  meta: {
    title: '????????????',
    keepAlive: false,
    loginCheck: true,
    utype: 2
  }
},
{
  path: '/member/oauth/qq/:type?',
  name: 'MemberOauthQq',
  component: MemberOauthQq,
  meta: {
    title: 'QQ??????',
    keepAlive: false,
    loginCheck: false
  }
},
{
  path: '/member/oauth/weixin',
  name: 'MemberOauthWeixin',
  component: MemberOauthWeixin,
  meta: {
    title: '????????????',
    keepAlive: false,
    loginCheck: false
  }
},
{
  path: '/member/login/:utype_alias?',
  name: 'MemberLogin',
  component: Login,
  meta: {
    title: '??????',
    keepAlive: false,
    loginCheck: false
  }
},
{
  path: '/member/appeal',
  name: 'MemberAppeal',
  component: Appeal,
  meta: {
    title: '????????????',
    keepAlive: false,
    loginCheck: false
  }
},
{
  path: '/member/personal/attention_me',
  name: 'AttentionMe',
  component: AttentionMe,
  meta: {
    title: '?????????',
    keepAlive: false,
    loginCheck: true,
    utype: 2
  }
},
{
  path: '/member/personal/attention_company',
  name: 'AttentionCompany',
  component: AttentionCompany,
  meta: {
    title: '???????????????',
    keepAlive: false,
    loginCheck: true,
    utype: 2
  }
},
{
  path: '/member/personal/viewjob',
  name: 'ViewJob',
  component: ViewJob,
  meta: {
    title: '??????',
    keepAlive: false,
    loginCheck: true,
    utype: 2
  }
},
{
  path: '/member/personal/interview',
  name: 'PersonalInterview',
  component: PersonalInterview,
  meta: {
    title: '????????????',
    keepAlive: false,
    loginCheck: true,
    utype: 2
  }
},
{
  path: '/member/personal/favjob',
  name: 'JobFavorites',
  component: JobFavorites,
  meta: {
    title: '???????????????',
    keepAlive: false,
    loginCheck: true,
    utype: 2
  }
},
{
  path: '/member/personal/interview_video',
  name: 'VideoInterview',
  component: VideoInterview,
  meta: {
    title: '????????????',
    keepAlive: false,
    loginCheck: true,
    utype: 2
  }
},
{
  path: '/member/reg/:utype_alias?',
  name: 'MemberReg',
  component: Reg,
  meta: {
    title: '??????',
    keepAlive: false,
    loginCheck: false
  }
},
{
  path: '/jobmap',
  name: 'JobMap',
  component: JobMap,
  meta: {
    title: '???????????????',
    keepAlive: false,
    loginCheck: false
  }
},
{
  path: '/member/personal/preview',
  name: 'ResumePreview',
  component: ResumePreview,
  meta: {
    title: '????????????',
    keepAlive: false,
    loginCheck: true,
    utype: 2
  }
},
{
  path: '/member/personal/recommend',
  name: 'PersonalRecommend',
  component: PersonalRecommend,
  meta: {
    title: '????????????',
    keepAlive: true,
    loginCheck: true,
    utype: 2
  }
},
{
  path: '/member/personal/recommend_add',
  name: 'PersonalRecommendAdd',
  component: PersonalRecommendAdd,
  meta: {
    title: '????????????',
    keepAlive: false,
    loginCheck: true,
    utype: 2
  }
},
{
  path: '/member/company/recommend',
  name: 'CompanyRecommend',
  component: CompanyRecommend,
  meta: {
    title: '????????????',
    keepAlive: true,
    loginCheck: true,
    utype: 1
  }
},
{
  path: '/im/imlist',
  name: 'ImList',
  component: ImList,
  meta: {
    title: '??????',
    keepAlive: false,
    loginCheck: true,
    utype: 0
  }
},
{
  path: '/im/:userid',
  name: 'ImShow',
  component: ImShow,
  meta: {
    title: '??????',
    keepAlive: false,
    loginCheck: true,
    utype: 0
  }
},
{
  path: '/member/company/loginlog',
  name: 'CompanyLoginLog',
  component: CompanyLoginLog,
  meta: {
    title: '????????????',
    keepAlive: false,
    loginCheck: true,
    utype: 1
  }
},
{
  path: '/member/personal/loginlog',
  name: 'PersonalLoginLog',
  component: PersonalLoginLog,
  meta: {
    title: '????????????',
    keepAlive: false,
    loginCheck: true,
    utype: 2
  }
},
{
  path: '/noticelist',
  name: 'noticeList',
  component: Notice,
  meta: {
    title: '????????????',
    keepAlive: true,
    loginCheck: false
  }
},
{
  path: '/notice/:id(\\d+)',
  name: 'noticeShow',
  component: NoticeShow,
  meta: {
    title: '????????????',
    keepAlive: false,
    loginCheck: false
  }
},
{
  path: '/newslist/:cid(\\d+)?',
  name: 'newsList',
  component: News,
  meta: {
    title: '????????????',
    keepAlive: true,
    loginCheck: false
  }
},
{
  path: '/news/:id(\\d+)',
  name: 'newsShow',
  component: NewShow,
  meta: {
    title: '????????????',
    keepAlive: false,
    loginCheck: false
  }
},
{
  path: '/member/company/index',
  name: 'CompanyIndex',
  component: CompanyIndex,
  meta: {
    title: '????????????',
    // keepAlive: false,
    // loginCheck: false,
    // utype: 1
  }
},{
  path: '/member/company/subscribeProject',
  name: 'subscribeProject',
  component: subscribeProject,
  meta: {
    title: '????????????',
    keepAlive: true,
    loginCheck: false,
    utype: 2
  }
},{
  path: '/member/company/manage',
  name: 'CompanyManagement',
  component: CompanyManagement,
  meta: {
    title: '????????????',
    keepAlive: false,
    loginCheck: true,
    utype: 1
  }
},
{
  path: '/member/company/profile',
  name: 'CompanyProfile',
  component: CompanyProfile,
  meta: {
    title: '??????????????????',
    keepAlive: false,
    loginCheck: true,
    utype: 1
  }
},
{
  path: '/member/company/customer_service',
  name: 'CompanyCustomerService',
  component: CompanyCustomerService,
  meta: {
    title: '????????????',
    keepAlive: false,
    loginCheck: true,
    utype: 1
  }
},
{
  path: '/member/company/AfterSalesEvaluate',
  name: 'AfterSalesEvaluate',
  component: AfterSalesEvaluate,
  meta: {
    title: '??????????????????',
    keepAlive: false,
    loginCheck: true,
    utype: 1
  }
},
{
  path: '/member/company/account',
  name: 'CompamyAccount',
  component: CompamyAccount,
  meta: {
    title: '????????????',
    keepAlive: false,
    loginCheck: true,
    utype: 1
  }
},
{
  path: '/member/company/intelligenceInquiry',
  name: 'intelligenceInquiry',
  component: intelligenceInquiry,
  meta: {
    title: '????????????',
    keepAlive: false,
    loginCheck: true,
    utype: 1
  }
},
{
  path: '/member/company/jobapply',
  name: 'CompamyJobapply',
  component: CompamyJobapply,
  meta: {
    title: '????????????',
    keepAlive: false,
    loginCheck: true,
    utype: 1
  }
},
{
  path: '/member/company/download',
  name: 'CompamyDownload',
  component: CompamyDownload,
  meta: {
    title: '????????????',
    keepAlive: true,
    loginCheck: true,
    utype: 1
  }
},
{
  path: '/member/company/interview',
  name: 'CompanyInterview',
  component: CompanyInterview,
  meta: {
    title: '????????????',
    keepAlive: true,
    loginCheck: true,
    utype: 1
  }
},
{
  path: '/member/company/interview_video',
  name: 'CompanyInterviewVideo',
  component: CompanyInterviewVideo,
  meta: {
    title: '????????????',
    keepAlive: false,
    loginCheck: true,
    utype: 1
  }
},
{
  path: '/member/company/fav',
  name: 'CompanyFav',
  component: CompanyFav,
  meta: {
    title: '????????????',
    keepAlive: false,
    loginCheck: true,
    utype: 1
  }
},
{
  path: '/member/company/view_resume',
  name: 'CompanyViewResume',
  component: CompanyViewResume,
  meta: {
    title: '????????????',
    keepAlive: false,
    loginCheck: true,
    utype: 1
  }
},
{
  path: '/member/company/auth',
  name: 'CompanyAuthIndex',
  component: CompanyAuthIndex,
  meta: {
    title: '????????????',
    keepAlive: false,
    loginCheck: true,
    utype: 1
  }
},
{
  path: '/member/company/jobadd',
  name: 'CompanyJobAdd',
  component: CompanyJobAdd,
  meta: {
    title: '????????????',
    keepAlive: false,
    loginCheck: true,
    utype: 1
  }
},
{
  path: '/member/company/jobedit/:id',
  name: 'CompanyJobEdit',
  component: CompanyJobEdit,
  meta: {
    title: '????????????',
    keepAlive: false,
    loginCheck: true,
    utype: 1
  }
},
{
  path: '/member/company/joblist',
  name: 'CompanyJobList',
  component: CompanyJobList,
  meta: {
    title: '????????????',
    keepAlive: false,
    loginCheck: true,
    utype: 1
  }
},
{
  path: '/member/company/coupon',
  name: 'CompanyCoupon',
  component: CompanyCoupon,
  meta: {
    title: '?????????',
    keepAlive: false,
    loginCheck: true,
    utype: 1
  }
},
{
  path: '/member/company/points',
  name: 'CompanyPoints',
  component: CompanyPoints,
  meta: {
    title: '????????????',
    keepAlive: false,
    loginCheck: true,
    utype: 1
  }
},
{
  path: '/member/company/points_log',
  name: 'CompanyPointsLog',
  component: CompanyPointsLog,
  meta: {
    title: '??????????????????',
    keepAlive: false,
    loginCheck: true,
    utype: 1
  }
},
{
  path: '/member/personal/points_log',
  name: 'PersonalPointsLog',
  component: PersonalPointsLog,
  meta: {
    title: '??????????????????',
    keepAlive: false,
    loginCheck: true,
    utype: 2
  }
},
{
  path: '/member/order/list',
  name: 'OrderList',
  component: OrderList,
  meta: {
    title: '????????????',
    keepAlive: false,
    loginCheck: true,
    utype: 0
  }
},
{
  path: '/member/order/:id(\\d+)',
  name: 'OrderDetail',
  component: OrderDetail,
  meta: {
    title: '????????????',
    keepAlive: false,
    loginCheck: true,
    utype: 0
  }
},
{
  path: '/member/order/add/points',
  name: 'CompanyBuyPoints',
  component: CompanyBuyPoints,
  meta: {
    title: '????????????',
    keepAlive: false,
    loginCheck: true,
    utype: 1
  }
},
{
  path: '/member/order/add/common',
  name: 'CompanyBuyService',
  component: CompanyBuyService,
  meta: {
    title: '????????????',
    keepAlive: false,
    loginCheck: true,
    utype: 1
  }
},
{
  path: '/member/company/mysetmeal',
  name: 'CompanyMySetmeal',
  component: CompanyMySetmeal,
  meta: {
    title: '????????????',
    keepAlive: false,
    loginCheck: true,
    utype: 1
  }
},
{
  path: '/member/company/setmeallog',
  name: 'CompanyMySetmealLog',
  component: CompanyMySetmealLog,
  meta: {
    title: '??????????????????',
    keepAlive: false,
    loginCheck: true,
    utype: 1
  }
},
{
  path: '/member/company/msglist',
  name: 'CompanyMsg',
  component: CompanyMsg,
  meta: {
    title: '????????????',
    keepAlive: false,
    loginCheck: true,
    utype: 1
  }
},
{
  path: '/member/bind',
  name: 'AccountBinding',
  component: AccountBinding,
  meta: {
    title: '?????????????????????',
    keepAlive: false,
    loginCheck: false
  }
},
{
  path: '/member/certification',
  name: 'certification',
  component: () => import('@/views/member/certification'),
  meta: {
    title: '????????????',
    keepAlive: false,
    loginCheck: false
  }
},
{
  path: '/member/addArticle',
  name: 'addArticle',
  component: () => import('@/views/member/addArticle'),
  meta: {
    title: '????????????',
    keepAlive: false,
    loginCheck: false
  }
},
{
  path: '/member/personal/msglist',
  name: 'PersonalMsg',
  component: PersonalMsg,
  meta: {
    title: '????????????',
    keepAlive: false,
    loginCheck: true,
    utype: 2
  }
},
{
  path: '/member/order/add/:type',
  name: 'PersonalOrderAdd',
  component: PersonalOrderAdd,
  meta: {
    title: '????????????',
    keepAlive: false,
    loginCheck: true,
    utype: 2
  }
},
{
  path: '/video/:interview_id',
  name: 'Video',
  component: Video,
  meta: {
    title: '?????????',
    keepAlive: false,
    loginCheck: true,
    utype: 0
  }
},
{
  path: '/member/company/microposte',
  name: 'Microposte',
  component: Microposte,
  meta: {
    title: '?????????',
    keepAlive: false,
    loginCheck: true,
    utype: 1
  }
},
{
  path: '/member/scan_microposte',
  name: 'ScanMicroposte',
  component: ScanMicroposte,
  meta: {
    title: '?????????',
    keepAlive: false,
    loginCheck: false,
    utype: 0
  }
},
{
  path: '/scan_upload',
  name: 'ScanUpload',
  component: ScanUpload,
  meta: {
    title: '??????????????????',
    keepAlive: false,
    loginCheck: false,
    utype: 0
  }
},
{
  path: '/jobfairol',
  name: 'jobfairol',
  component: JobfairolIndex,
  meta: {
    title: '??????????????????',
    keepAlive: true,
    loginCheck: false
  }
},
{
  path: '/jobfairol/:id(\\d+)',
  name: 'jobfairolShow',
  component: JobfairolShow,
  meta: {
    title: '????????????????????????',
    keepAlive: false,
    loginCheck: false
  }
},
{
  path: '/jobfairol/reserve',
  name: 'JobfairolReserve',
  component: JobfairolReserve,
  meta: {
    title: '?????????????????????????????????',
    keepAlive: false,
    loginCheck: true,
    utype: 1
  }
},
{
  path: '/pay/jsapi',
  name: 'JsapiPay',
  component: JsapiPay,
  meta: {
    title: '????????????',
    keepAlive: false,
    loginCheck: true,
    utype: 0
  }
},
{
  path: '/member/regquick',
  name: 'RegQuick',
  component: RegQuick,
  meta: {
    title: '????????????',
    keepAlive: false,
    loginCheck: false
  }
},
{
  path: '/shortvideo/companylist',
  name: 'videocompanylist',
  component: videocompanylist,
  meta: {
    title: '????????????',
    keepAlive: false,
    loginCheck: false
  }
},
// {
//   path: '/shortvideo/personalList',
//   name: 'videopersonallist',
//   component: videopersonallist,
//   meta: {
//     title: '????????????',
//     keepAlive: false,
//     loginCheck: false
//   }
// },
{
  path: '/shortvideo/videoManage',
  name: 'videoManage',
  component: videoManage,
  meta: {
    title: '????????????',
    keepAlive: false,
    loginCheck: false
  }
},
{
  path: '/shortvideo/release',
  name: 'videoRelease',
  component: videoRelease,
  meta: {
    title: '????????????',
    keepAlive: false,
    loginCheck: false
  }
},
{
  path: '/shortvideo/videoplay',
  name: 'videoplay',
  component: videoplay,
  meta: {
    title: '????????????',
    keepAlive: false,
    loginCheck: false
  }
},
{
  path: '/subsitelist',
  name: 'subsiteList',
  component: subsiteList,
  meta: {
    title: '????????????',
    keepAlive: false,
    loginCheck: false
  }
},
{
  path: '/personal/purchasingManagement/myPurchasing',
  name: 'myPurchasing',
  component: myPurchasing,
  meta: {
    title: '????????????'
  }
},
{
  path: '/personal/purchasingManagement/purchasingInformation',
  name: 'purchasingInformation',
  component: purchasingInformation,
  meta: {
    title: '????????????'
  }
},
{
  path: '/personal/purchasingManagement/releasePurchase',
  name: 'releasePurchase',
  component: releasePurchase,
  meta: {
    title: '????????????'
  }
},
{
  path: '/personal/purchasingManagement/purchaseDetails',
  name: 'purchaseDetails',
  component: purchaseDetails,
  meta: {
    title: '????????????'
  }
},{
  path: '/backupsProject/backupsProject',
  name: 'backupsProject',
  component: backupsProject,
  meta: {
    title: '????????????'
  }
},{
  path: '/backupsProject/buildByOneself',
  name: 'buildByOneself',
  component: buildByOneself,
  meta: {
    title: '????????????'
  }
},
{
  path: '/mySchedule',
  name: 'mySchedule',
  component: mySchedule,
  meta: {
    title: '????????????',
  }
},
{
  path: '/myPostSale',
  name: 'myPostSale',
  component: myPostSale,
  meta: {
    title: '????????????',
    keepAlive: true,
    loginCheck: false
  }
},
{
  path: '/postSaleDetails',
  name: 'postSaleDetails',
  component: postSaleDetails,
  meta: {
    title: '????????????',
    keepAlive: false,
    loginCheck: false
  }
},
{
  path: '/addPostSale',
  name: 'addPostSale',
  component: addPostSale,
  meta: {
    title: '????????????',
    keepAlive: false,
    loginCheck: false
  }
},
{
  path: '/ipdeny',
  component: () =>
            import ('@/views/ipdeny'),
  meta: { title: '????????????' }
},
{
  path: '/error',
  component: () =>
            import ('@/views/error'),
  meta: { title: '????????????' }
},
{
  path: '*',
  component: () =>
            import ('@/views/404'),
  meta: { title: '404 Not Found' }
}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
