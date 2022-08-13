<template>
  <div id="app">
		<Head :prepare='true'>项目详情</Head>
		<div class="headBox">
			<div class="headBox1">
				<div class="headBox1User">
					<div class="headBox1UserImg"><img v-if="head.pimg" :src="head.pimg" /></div>
					<div class="headBox1UserName">
						<div class="headBox1UserNameTop">
							<div class="headBox1UserNameTop1">{{head.title}}</div>
						</div>
					</div>
				</div>
				<div class="lableList">
				</div>
				<div class="address">
					{{head.addtime}}添加
				</div>
			</div>
		</div>
		<div class="tab">
			<van-tabs v-model="active">
			  <van-tab title="项目信息">
				  <div class="tab1">
                        <h3 style="color: #000;padding-bottom: 10px;">联系方式</h3>
						<div class="tab1List">
							<div class="tab1List1">联系人</div>
							<div class="tab1List2">：</div>
							<div class="tab1List3">{{contact.name}}</div>
						</div>
						<div class="tab1List">
							<div class="tab1List1">联系电话</div>
							<div class="tab1List2">：</div>
							<div class="tab1List3">{{contact.phone}}</div>
                            <div class="tab1List3" style="padding: 0 0 0 10px;color: #55a9ff;" @click="call=true">立即呼叫<van-icon name="phone-circle-o" /></div>
						</div>
						<div class="tab1List">
							<div class="tab1List1">岗位</div>
							<div class="tab1List2">：</div>
							<div class="tab1List3">{{contact.post}}</div>
						</div>
						<div class="tab1List">
							<div class="tab1List1">客户所属地</div>
							<div class="tab1List2">：</div>
							<div class="tab1List3">{{contact.address}}</div>
						</div>
						<div class="tab1List">
							<div class="tab1List1">公司名称</div>
							<div class="tab1List2">：</div>
							<div class="tab1List3">{{contact.company_name}}</div>
						</div>
				  </div>
			  </van-tab>
			  <van-tab title="沟通记录">
				  <div class="tab3">
					  <div class="communicate" @click="show = true">添加沟通记录+</div>
					  <div class="tab3for" v-for="(item,index) in record" :key="index">
						  <div class="tab3Top">
							  <div class="tab3top1">{{item.addtime}}</div>
							  <div class="tab3top1Text">沟通记录:</div>
							  <div class="tab3top2">{{item.content}}</div>
						  </div>
						  <div class="tab3Bottom">
						  		下次联系时间：{{item.lasttime}}
						  </div>
					  </div>
				  </div>
			  </van-tab>
			</van-tabs>
		</div>
		<!-- 沟通记录弹框 -->
		<van-popup v-model="show" position="bottom" :style="{ height: '65%'}">
			<div class="popupDiv">
				<div class="popupDivHaed">
					<div class=""></div>
					<div class="popupDivHaedText">添写沟通记录</div>
					<div class="popupDivHaedGb" @click="show = false"><van-icon name="cross" size="26" color="#000000" /></div>
				</div>
				<div class="popupCenter">
					<div class='popupCenterDivTextarea'>
						<div class="popupCenterDivTextareaText"><span style='color: red;'>*</span>本次沟通内容 ：</div>
						<div class="textarea">
							<textarea v-model="textareaText"></textarea>
						</div>
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
		</van-popup>
        <!-- 时间选择器 -->
		<van-popup v-model="dateBox" position="bottom" :style="{ height: '65%'}">
			<van-datetime-picker type="date" title="选择联系时间" @cancel='dateBox = false' :min-date="minDate" @confirm='confirm' />
		</van-popup>
		<!-- 拨打电话 -->
		<van-popup v-model="call" position="bottom" style="background-color: rgba(0, 0, 0, 0);">
			<div class="callMe"><a :href="'tel:'+contact.phone">{{contact.phone}}</a></div>
			<div class="callCancel" @click="call = false">取消</div>
		</van-popup>
  </div>
</template>

<script>
import http from '@/utils/http'
import api from '@/api'
import {mapState} from 'vuex'
export default {
  data () {
    return {
		 active:0,
		 id:'',				//详情id
		 dataMes:{			//页面数据
			 userinfo:{}
		 },
         contact:{},
         record:[],
         head:{},
		 textareaText:'',			//文本域
		 textareainput2:'',		//下次联系时间
		 show:false,					//弹框隐藏显示
		 dateBox:false,			
		 minDate: new Date(),
		 call:false,
	 }
  },
  created () {
	  this.id = this.$route.query.id
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
	  // 添加沟通记录
	  homeResumeKeepAddRecord(){
		  if(this.textareaText == ''){
			  this.$notify({ type: 'warning', message: '请输入沟通内容' });
			  return
		  }
		  if(this.textareainput2 == ''){
			  this.$notify({ type: 'warning', message: '请选择下次联系时间' });
			  return
		  }
		  http.post(api.companyReturn_visitAdd_record,{
				content:this.textareaText,  //内容        
				interview_date:this.textareainput2,  //下次沟通时间
				resume_id:this.id,  //备案项目id
		  }).then(res=>{
			  let date = new Date()
			  let date2 = date.getMonth()
			  date2 = +date2 +1
			  let data2 =  date.getFullYear() +'-' + date2 +'-' + date.getDate()
			  this.record.unshift({
						content: this.textareaText,
						createtime: data2,  //"2022-06-10"
						lasttime: this.textareainput2,
					})
              this.$notify({ type: 'success', message: res.message });
			  this.show = false
			  this.textareainput2 = ''
			  this.textareaText = ''
		  })
	  },
	  // 获取项目详情
	  homeResumeKeepShow(){
		  http.get(api.return_visitBuildSelf,{id:this.id}).then(res=>{
			  console.log(res,"数据")
              this.contact = res.data.contact
              this.record = res.data.record
              this.head = res.data.head
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
						.headBox1UserNameTop{display: flex;
							.headBox1UserNameTop1{font-size: 15px;color: #000; font-weight: 700;word-break: break-all; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1;}
							.headBox1UserNameTop2{padding-left: 5px; flex: none;}
						}
					}
				}
				.lableList{display: flex;flex-wrap: wrap; font-size: 12px; color: #1787fb; padding: 20px 0px;
					.lableListBox{ background-color: #f4f9ff; padding: 3px 8px; margin-right: 10px; border-radius: 5px; margin-bottom: 8px; }
				}
                .address{text-align: right;}
			}
		}
		.tab{
			.tab1{padding: 20px; border-top:5px solid #f4f4f4;
				.tab1List{padding-bottom: 8px;font-size: 13px; color: #000; display: flex;
					.tab1List1{width: 5.2em; text-align-last: justify; flex: none;}
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
