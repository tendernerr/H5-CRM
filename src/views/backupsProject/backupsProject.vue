<template>
  <div id="app">
		<Head :prepare='true'>项目详情</Head>
		<div class="headBox">
			<!-- <img width="100%" height="200" src="http://www.hangyedaniu.com/upload/resource/fg.png" /> -->
			<div class="headBox1" v-if="true">
				<div class="headBox1User">
					<div class="headBox1UserImg"><img v-if="dataMes.basehead" :src="dataMes.basehead.pimg" /></div>
					<div class="headBox1UserName">
						<div class="headBox1UserNameTop">
							<div class="headBox1UserNameTop1">{{dataMes.basehead&&dataMes.basehead.title}}</div>
							<!-- <div class="headBox1UserNameTop2">项目总投资：{{dataMes.basehead&&dataMes.basehead.project_investment}}</div> -->
						</div>
						<div class="headBox1UserNameBottom">
							<div class="headBox1UserNameBottom1">{{dataMes.basehead&&dataMes.basehead.end_time}} <span class="lable">{{dataMes.basehead&&dataMes.basehead.type}}</span></div>
							<!-- <div class="headBox1UserNameBottom2">被浏览{{dataMes.basehead&&dataMes.basehead.click}}次</div> -->
						</div>
					</div>
				</div>
				<p style="padding: 10px 0 0;" v-if="dataMes.basehead&&dataMes.basehead.category.length>0">包含但不限于以下工艺的设备</p>
				<div class="lableList">
					<div class="lableListBox" v-for="(item,index) in dataMes.basehead&&dataMes.basehead.category" :key="index">
						{{item}}
					</div>
				</div>
				<div class="address">
					<span>{{dataMes.basehead&&dataMes.basehead.add_time}}</span>
					<span>{{dataMes.basehead&&dataMes.basehead.address}}</span>
					<span>总投资：{{dataMes.basehead&&dataMes.basehead.project_investment}}</span>
				</div>
			</div>
		</div>
		<div class="tab">
			<van-tabs v-model="active">
			  <van-tab title="项目信息">
				  <div class="tab1">
						<div class="tab1List">
							<span style="display: flex;align-items: center;margin: 0 0 0 auto;" @click="collection">
								<img width="15" v-if="!isCollection" src="http://qiniucdn.hangyedaniu.com/img/startbefore.png" >
								<img width="15" v-if="isCollection" src="http://qiniucdn.hangyedaniu.com/img/starafter.png" >
								收藏
							</span>
						</div>
						<!-- <div class="tab1List">
							<div class="tab1List1">备案项目编号</div>
							<div class="tab1List2">：</div>
							<div class="tab1List3">{{dataMes.basemain&&dataMes.basemain.number}}</div>
						</div> -->
						<div class="tab1List">
							<div class="tab1List1">项目名称</div>
							<div class="tab1List2">：</div>
							<div class="tab1List3">{{dataMes.basemain&&dataMes.basemain.project_name}}</div>
						</div>
						<div class="tab1List">
							<div class="tab1List1">项目所在地</div>
							<div class="tab1List2">：</div>
							<div class="tab1List3">{{dataMes.basemain&&dataMes.basemain.project_address}}</div>
						</div>
						<div class="tab1List">
							<div class="tab1List1">项目总投资</div>
							<div class="tab1List2">：</div>
							<div class="tab1List3">{{dataMes.basemain&&dataMes.basemain.project_investment}}</div>
						</div>
						<div class="tab1List">
							<div class="tab1List1">项目规模及内容</div>
							<div class="tab1List2">：</div>
							<div class="tab1List3">{{dataMes.basemain&&dataMes.basemain.project_scale}}</div>
						</div>
						<div class="tab1List">
							<div class="tab1List1">建设单位</div>
							<div class="tab1List2">：</div>
							<div class="tab1List3">{{dataMes.basemain&&dataMes.basemain.construction_unit}}</div>
						</div>
						<div class="tab1List">
							<div class="tab1List1">备案机关</div>
							<div class="tab1List2">：</div>
							<div class="tab1List3">{{dataMes.basemain&&dataMes.basemain.authoritykeep}}</div>
						</div>
						<!-- <div class="tab1List">
							<div class="tab1List1">备案申报日期</div>
							<div class="tab1List2">：</div>
							<div class="tab1List3">{{dataMes.basemain&&dataMes.basemain.declaration_date}}</div>
						</div> -->
						<!-- <div class="tab1List">
							<div class="tab1List1">复合通过日期</div>
							<div class="tab1List2">：</div>
							<div class="tab1List3">{{dataMes.basemain&&dataMes.basemain.through_date}}</div>
						</div> -->
						<div class="tab1List">
							<div class="tab1List1">项目起止年限</div>
							<div class="tab1List2">：</div>
							<div class="tab1List3">{{dataMes.basemain&&dataMes.basemain.start_time}}</div>
						</div>
						<!-- <div class="tab1List">
							<div class="tab1List1">项目当前状态</div>
							<div class="tab1List2">：</div>
							<div class="tab1List3">{{dataMes.basemain&&dataMes.basemain.audit}}</div>
						</div> -->
						<div class="tab1List" style="padding: 20px 0 5px;color: #8a8a8a;flex-wrap:wrap">
							<div class="tab1List1" style="width: 60px;">商机分析</div>
							<div class="tab1List2">：</div>
							该项目可能会需要运用到以下工艺的产品！
							<div class="tab1List3" style="display:flex;flex-wrap: wrap;">
								<span v-for="(ite,inde) in dataMes.basehead.category" :key="inde" style="flex:none;padding: 3px 10px 4px;color: #409EFF;background: #e9f8ff;font-size: 12px;border-radius: 6px; margin:2px 5px 3px 0">
									{{ite}}
								</span>
							</div>
						</div>
				  </div>
			  </van-tab>
			  <van-tab v-if="!dataMes.userinfo.isMember" title="项目进展">
				<div class="tab2" v-if="!dataMes.isLogin">
					<p style="color: #000;text-align:center;padding: 16px 0;">您尚未登录，点击登录后可获取联系方式</p>
					<p style="color: #0095ff;text-align:center;" @click="$router.push(`/member/login/company?redirect=/backupsProject/backupsProject?id=${id}`)">去登录>></p>
				</div>
				<div class="tab2" v-else>
					<p style="color: #000;text-align:left;padding: 16px 0;"><span>{{dataMes.basehead&&dataMes.basehead.add_time}}</span>（备案）：***</p>
					<p style="color: #000;text-align:left;padding: 16px 0;">
						想要深入了解项目详情，点击<span style="color: #409eff;" @click="contactUs();"> 联系我们 </span>预计30分钟内项目经理会联系您，请注意来电提醒
					</p>
				</div>
			  </van-tab>
			  <van-tab title="项目联系人">
				  <div class="tab2" v-if="!dataMes.isLogin">
				  	<p style="color: #000;text-align:center;padding: 16px 0;">您尚未登录，点击登录后可获取联系方式</p>
					<p style="color: #0095ff;text-align:center;" @click="$router.push(`/member/login/company?redirect=/backupsProject/backupsProject?id=${id}`)">去登录>></p>
				  </div>
				  <div class="tab2" style="color: #000;" v-if="!dataMes.userinfo.isMember && dataMes.isLogin">
						<p style="padding: 0 52px;color: #000;">姓名：***</p>
						<p style="padding: 0 52px;color: #000;">岗位：***</p>
						<p style="padding: 0 52px 10px;color: #000;">联系电话：135****</p>
						想要深入了解项目详情，点击<span style="color: #409eff; padding:0 4px;" @click="contactUs();">联系我们</span>预计30分钟内项目经理会联系您，请注意来电提醒
				  </div>
				  <!-- <div class="tab2" v-if="!dataMes.userinfo.isMember && dataMes.isLogin">
					  非常抱歉，改内容仅对"行业大牛"会员查阅；开通"行业大牛"会员，第一时间获取相关采购商机，了解<span class="tab2Span" @click="$router.push('/member/order/add/common?type=setmeal')">会员特权>></span>
				  </div> -->
				  <div class="tab2" v-if="dataMes.userinfo.phone == '' && dataMes.userinfo.isMember">
					  <div class="tab2Text1">
						  非常抱歉，系统暂无联系方式！ <span class="tab2Text1Span">建议您试试以下渠道</span>
					  </div>
					  <div class="tab2Text2">
						  <div class="text1">天眼查</div>
						  <div class="text2">：</div>
						  <div class="text3" @click="go(1)">搜索一下>></div>
					  </div>
					  <div class="tab2Text4 tab2Text2">
						  <div class="text1">百度</div>
						  <div class="text2">：</div>
						  <div class="text3" @click="go(2)">搜索一下>></div>
					  </div>
				  </div>
				  <div class="tab2Information" v-if="dataMes.userinfo.phone != '' && dataMes.userinfo.isMember">
					  <div class="tab1List">
					  	<div class="tab1List1">姓名</div>
					  	<div class="tab1List2">：</div>
					  	<div class="tab1List3">{{dataMes.userinfo.nikename}}</div>
					  </div>
					  <div class="tab1List">
					  	<div class="tab1List1">岗位</div>
					  	<div class="tab1List2">：</div>
					  	<div class="tab1List3">{{dataMes.userinfo.post}}</div>
					  </div>
					  <div class="tab1List">
					  	<div class="tab1List1">联系电话</div>
					  	<div class="tab1List2">：</div>
					  	<div class="tab1List3 co" @click="call = true">{{dataMes.userinfo.phone}}</div>
					  </div>
				  </div>
			  </van-tab>
			  <van-tab title="沟通记录" v-if="dataMes.userinfo.isMember">
				  <div class="tab3">
					  <div class="communicate" @click="show = true">添加沟通记录+</div>
					  <div class="tab3for" v-for="(item,index) in dataMes.all_record&&dataMes.all_record" :key="index">
						  <div class="tab3Top">
							  <div class="tab3top1">{{item.createtime}}</div>
							  <div class="tab3top1Text">沟通记录:</div>
							  <div class="tab3top2">{{item.content}}</div>
						  </div>
						  <div class="tab3Bottom">
						  		下次联系时间：{{item.interview_date}}
						  </div>
					  </div>
				  </div>
			  </van-tab>
			</van-tabs>
		</div>
		<!-- 沟通记录弹框 -->
		<van-popup v-model="show" position="bottom" :style="{ height: '65%'}">
			<div class="popupDiv" v-if="dataMes.all_record&&dataMes.all_record.length>0">
				<div class="popupDivHaed">
					<div class=""></div>
					<div class="popupDivHaedText">添写沟通记录</div>
					<div class="popupDivHaedGb" @click="show = false"><van-icon name="cross" size="26" color="#000000" /></div>
				</div>
				<div class="popupCenter">
					<div style="display: flex; justify-content: space-around;align-items: center;">
						<div >项目进展:</div>
						<div @click="process_type = 0" :class="{'process_type':process_type === 0}" style="padding: 5px 10px;background: #ccc;color: #fff;">厂房建设</div>
						<div @click="process_type = 1" :class="{'process_type':process_type === 1}" style="padding: 5px 10px;background: #ccc;color: #fff;">暂无需求</div>
						<div @click="process_type = 2" :class="{'process_type':process_type === 2}" style="padding: 5px 10px;background: #ccc;color: #fff;">采购洽谈</div>
					</div>
					<div class='popupCenterDivTextarea'>
						<div class="popupCenterDivTextareaText"><span style='color: red;'>*</span>本次沟通内容 ：</div>
						<div class="textarea">
							<textarea v-model="textareaText">
								
							</textarea>
						</div>
					</div>
					<div class='popupCenterDiv bor'>
						<div class="popupCenterDivText"><span style='color: red;'>*</span>设备型号 ：</div>
						<div class="inputDiv"><input  v-model="textareainput1" class="input" type="text"/></div>
					</div>
					<div class='popupCenterDiv'  @click="dateBox = true">
						<div class="popupCenterDivText"><span style='color: red;'>*</span>下次联系时间 ：</div>
						<div class="inputDiv"><input  v-model="textareainput2" class="input" type="text"/></div>
					</div>
					<div class="button"> 
						<div class="button1"></div>
						<div class="button2" @click="homeResumeKeepAddRecord">确认</div>
					 </div>
				</div>
			</div>
			<div v-else style="font-size: 15px;color: #000;padding: 61px 40px;text-indent: .8em;line-height: 30px;">
				为了您的操作更便捷，首次沟通记录需在您在电脑端添加!
			</div>
		</van-popup>
		<!-- 时间选择器 -->
		<van-popup v-model="dateBox" position="bottom" :style="{ height: '65%'}">
			<van-datetime-picker type="date" title="选择联系时间" @cancel='dateBox = false' :min-date="minDate" @confirm='confirm' />
		</van-popup>
		<!-- 拨打电话 -->
		<van-popup v-model="call" position="bottom" style="background-color: rgba(0, 0, 0, 0);">
			<div class="callMe"><a :href="'tel:'+dataMes.userinfo.phone">{{dataMes.userinfo.phone}}</a></div>
			<div class="callCancel" @click="call = false">取消</div>
		</van-popup>
  </div>
</template>

<script>
import http from '@/utils/http'
import api from '@/api'
import wxshare from "@/assets/js/share.js";
import {mapState} from 'vuex'
export default {
  data () {
    return {
		 isCollection:0,
		 active:0,
		 id:'',				//详情id
		 dataMes:{			//页面数据
			 userinfo:{}
		 },
		 process_type:0,
		 textareaText:'',			//文本域
		 textareainput1:'',		//设备型号
		 textareainput2:'',		//下次联系时间
		 show:false,					//弹框隐藏显示
		 dateBox:false,			
		 minDate: new Date(),
		 call:false,
	 }
  },
  created () {
	  this.id = this.$route.query.id
	  this.checkFav()
	  this.homeResumeKeepShow()
  },
  mounted () {
  },
  watch: {
	  
  },
  methods: {
	  go(n){
		  if( n == 1){
			  location.href = 'https://m.tianyancha.com/search?key='+this.dataMes.basemain.construction_unit
		  }
		  if( n == 2){
			  location.href = 'https://m.baidu.com/s?wd='+this.dataMes.basemain.construction_unit
		  }
	  },
	  checkFav(){
		http.get(api.checkFav,{id:this.id}).then(res=>{
			this.isCollection = res.data.has_fav
		})
	  },
	  collection(){
		http.post(api.setfac,{type:this.isCollection,id:this.id}).then(res=>{
			this.isCollection = this.isCollection?0:1;
			this.$notify({ type: 'success', message: res.message });
		})
	  },
	  // 添加沟通记录
	  homeResumeKeepAddRecord(){
		  if(this.textareaText == ''){
			  this.$notify({ type: 'warning', message: '请输入沟通内容' });
			  return
		  }
		  if(this.textareainput1 == ''){
			  this.$notify({ type: 'warning', message: '请输入设备型号' });
			  return
		  }
		  if(this.textareainput2 == ''){
			  this.$notify({ type: 'warning', message: '请选择下次联系时间' });
			  return
		  }
		  http.post(api.homeResume_keepAdd_record,{
				facilityname:this.textareainput1,//设备名称   (post)
				content:this.textareaText,  //内容        
				interview_date:this.textareainput2,  //下次沟通时间
				process_type:this.process_type,
				rid:this.id,  //备案项目id
		  }).then(res=>{
			  let date = new Date()
			  let date2 = date.getMonth()
			  date2 = +date2 +1
			  let data2 =  date.getFullYear() +'-' + date2 +'-' + date.getDate()
			  this.dataMes.all_record.unshift({
						content: this.textareaText,
						createtime: data2,  //"2022-06-10"
						facilityname: this.textareainput1,
						interview_date: this.textareainput2,
					})
			  this.show = false
			  this.textareainput2 = ''
			  this.textareainput1 = ''
			  this.textareaText = ''
		  })
	  },
	  contactUs(){
		http.post(api.projectApply,{id:this.query_id}).then(res=>{
			console.log(res,"11111")
			this.$notify({ type: 'success', message: '已收到您的申请，预计30分钟内平台项目经理会联系您，请您注意来电提醒'});
		})
	  },
	  // 获取项目详情
	  homeResumeKeepShow(){
		  http.get(api.homeResume_keepShow,{id:this.id}).then(res=>{
			  this.dataMes = res.data
			  let text = ''
			  for (let i = 0; i < this.dataMes.basehead.category.length; i++) {
				if(i!==0){
					text += '/'+res.data.basehead.category[i]
				} else{
					text = res.data.basehead.category[i]
				}
			  }
			  let fullname = this.dataMes.basehead.title+'-'+text
			  let wechatShareInfo = {
			  fullname,
			  imgUrl: this.dataMes.basehead.pimg,
      		};
			wxshare(wechatShareInfo, "backupsProject", location.href);
		  })
	  },
	  confirm(v){
		let date = v.getMonth()
			date = + date +1
		  this.textareainput2 = v.getFullYear() +'-' + date +'-' + v.getDate()
		  this.dateBox = false
	  }
  }
}
</script>

<style lang="scss" scoped>
	#app{ font-size: 13px; height: 100vh;
		>>> .van-tabs__line{background-color: #00aaff!important;}
		>>> .van-tab--active{
			.van-tab__text{color: #00aaff!important}
		}
		>>> .van-tab{color: #000;}
		// 电话
		.callMe{height: 45px; text-align: center; line-height: 45px; background-color: #fff; border-radius: 15px; font-size: 16px;
			a{ color: #00aaff;}
		}
		.callCancel{height: 45px; text-align: center; line-height: 45px; background-color: #fff; margin: 20px 0 10px; border-radius: 15px;color: #00aaff; font-size: 18px;}
		// 弹框
		.popupDiv{color: #000; height: 100%;
			.popupDivHaed{display: flex; justify-content: space-between; align-items: center; padding: 5px 5px;
				.popupDivHaedText{font-size: 18px; font-weight: 700;}
				.popupDivHaedGb{}
			}
			.popupCenter{ margin-top: 15px; display: flex; flex-direction: column; height:calc( 100% - 40px - 15px ) ;
				.process_type{color: #0095ff  !important;}
				.popupCenterDivTextarea{padding: 10px;
					.popupCenterDivTextareaText{font-size: 15px; color: #000; padding-bottom: 8px;}
					.textarea{width: 100%; height: 130px;
						textarea{width: 100%; height: 100%; border-radius: 5px; border: 1px solid #dadada;}
					}
				}
				.popupCenterDiv{display: flex; align-items: center; border-bottom: #eaeaea solid 1px;padding: 10px;
					&.bor{border-top: 1px solid #eaeaea;}
					.inputDiv{flex: 1;
						.input{border: 0; flex: 1; height: 100%; width: 100%;}
					}
					.popupCenterDivText{
						padding-right: 5px; font-size: 15px;
					}
				}
				.button{display: flex; flex-direction: column; justify-content: space-between; flex: 1; padding: 0 8px;
					.button2{border-radius: 10px; background-color: #00aaff; text-align: center; height: 40px; line-height: 40px; color: #fff;  flex:none; margin-bottom: 8px;}
				}
			}
		}
		.headBox{background-color: #f4f4f4;padding: 20px 10px 10px;
			.headBox1{padding: 15px; background-color: #fff; border-radius: 10px;
				.headBox1User{ display: flex;
					.headBox1UserImg{flex: none ;margin-right: 10px ; width: 50px; height: 50px; border-radius: 50%; overflow: hidden; background: url('https://www.hangyedaniu.com/upload/resource/user.png') no-repeat center center / 100% 100%; object-fit: cover;
						img{width: 100%; height: 100%;}
					}
					.headBox1UserName{ display: flex; flex-direction: column; justify-content: space-around; flex: 1;
						.headBox1UserNameTop{display: flex; justify-content: space-between;
							.headBox1UserNameTop1{font-size: 15px;color: #000; font-weight: 700;word-break: break-all; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1;}
							.headBox1UserNameTop2{padding-left: 5px; flex: none;}
						}
						.headBox1UserNameBottom{display: flex; justify-content: space-between;
							.headBox1UserNameBottom1{color: #ffaa00;
								.lable{padding-left: 2px;}
							}
							.headBox1UserNameBottom2{flex: none; color: #a8a8a8;}
						}
					}
				}
				.lableList{display: flex;flex-wrap: wrap; font-size: 12px; color: #1787fb; padding: 10px 0px 0px;
					.lableListBox{ background-color: #f4f9ff; padding: 3px 8px; margin-right: 10px; border-radius: 5px; margin-bottom: 8px; }
				}
				.address{padding: 15px 0 0;display: flex;justify-content:space-between;}
			}
		}
		.tab{
			.tab1{padding: 20px; border-top:5px solid #f4f4f4;
				.tab1List{padding-bottom: 18px;font-size: 13px; color: #000; display: flex; 
					.tab1List1{width: 7em; text-align-last: justify; flex: none;}
					.tab1List2{margin:0 .5em 0 .2em; }
					.tab1List3{overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1;word-break: break-all; display: block;
						
					}
				}
			}
			.tab2{padding: 20px; font-size: 16px; border-top:5px solid #f4f4f4;
				.tab2Span{color: #00aaff;}
				.tab2Text1{font-size: 13px; padding-bottom: 15px;
					.tab2Text1Span{color: #ffaa00;}
				}
				.tab2Text2{display: flex; align-items: center;font-size: 13px; padding: 5px 0;
					.text1{width: 7em; letter-spacing: 5px; text-align: center;}
					.text2{padding-right: 10px;}
					.text3{color: #55aaff;}
				}
			}
			.tab2Information{padding: 20px; border-top:5px solid #f4f4f4;
				.tab1List{padding-bottom: 8px;font-size: 13px; color: #000; display: flex;
					.tab1List1{width: 7em; text-align-last: justify; flex: none;}
					.tab1List2{margin:0 .5em 0 .2em; }
					.tab1List3{overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1;word-break: break-all; display: block;
						&.co{color: #00aaff;}
					}
				}
			}
			.tab3{padding: 20px;border-top:5px solid #f4f4f4;
				.tab3for{margin-bottom: 20px;
					.tab3Top{padding-bottom: 6px; margin-bottom: 6px;
						.tab3top1{padding-bottom: 8px;}
						.tab3top1Text{padding-bottom: 6px;}
						.tab3top2{text-indent: 1em;}
					}
					.tab3Bottom{padding-bottom: 6px;}
				}
				.communicate{color: #00aaff; text-align: right;}
			}
		}
		.popupDiv{
			
		}
	}
</style>
