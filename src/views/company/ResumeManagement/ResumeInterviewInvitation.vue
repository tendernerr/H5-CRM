<template>
  <div id="app">
    <Head>我的回访</Head>
    <ScrollNav :list="navList"></ScrollNav>
    <div style="display: flex;font-size: 12px;position: sticky;top: 53px;background: #fff;z-index: 999;border-bottom: solid 4px rgba(243,243,243);">
      <div @click="bc=0" :class="{'bc':bc!==0}" style="padding: 5px 13px;border-radius: 9px;margin: 10px;background-color: rgb(54 157 255);color: #fff;">
          <van-icon name="smile-o" /> 恰淡中
      </div>
      <div @click="bc=1" :class="{'bc':bc!==1}" style="padding: 5px 13px;border-radius: 9px;margin: 10px;background-color: rgb(54 157 255);color: #fff;">
          <van-icon name="passed" /> 已成交
      </div>
      <div @click="bc=2" :class="{'bc':bc!==2}" style="padding: 5px 13px;border-radius: 9px;margin: 10px;background-color: rgb(54 157 255);color: #fff;">
          <van-icon name="close" /> 不更进
      </div>
    </div>
    <van-empty image="search" description="没有找到对应的信息" style="background-color:#fff" v-if="show_empty === true"/>
    <van-list v-if="dataset.length > 0" v-model="loading" :finished="finished" :finished-text="finished_text" @load="onLoad" :immediate-check="true">
      <div class="box_1">
        <div v-for="(item, index) in dataset" :key="index" @click="goDetails(item.product_source,item.rid)">
          <div class="box_item">
            <div class="tx1">
              <div class="name">{{ item.product_name }}</div>
              <div class="right_txt" :class="{'right_txt2':item.state==='待回访'}" style="color: #000;font-size: 15px;">{{ item.state }}</div>
            </div>
            <div class="tx2">
				      <span style="color: #e79a00;" v-if="item.endtime">{{ item.endtime+'截止' }}</span> <span style="color: rgb(78 137 255);">{{ item.product_type }}</span>
				      <br/><br/>
              <div class="right_txt" style="background: #fff;color: #000;">{{item.addtime}}</div>
            </div>
          </div>
          <div class="ppos" style="display: flex; justify-content: space-between; align-items: center;padding: 0 16px 12px;">
              <div style="display: flex">
                <div class="timew">{{item.product_source}}</div>
              </div>
              <div v-if="item.involved" class="timew" style="wdith: 60px; height: 30px; background-color: #1787fb; border-radius: 5px; align-items: center; color: #e5f1ff; display: flex; padding: 10px;">
                已参与{{ item.involved }}
              </div>
            </div>
            <div class="tx4" style="padding: 12px 14px;">
               <div @click.stop="addRecord(item,index)" :class="[item.state==='待回访'?item.isable==1?'list_btn3':'list_btn2':'list_btn2-orange',]">
                填写回访记录
              </div>
              <div :class="[item.state==='待回访'?'list_btn':'list_btn-orange']" @click.stop="handlerRemark(item,index,item.state==='待回访')">
                不在跟进
              </div>
              <div :class="[item.state==='待回访'?'list_btn':'list_btn-orange']" @click.stop="completePop(item,index,item.state==='待回访')">
                已成交
              </div>
              <div class="clear"></div>
            </div>
          <div class="form_split_10"></div>
        </div>
      </div>
    </van-list>
    <van-dialog v-model="showDetail" title="我的报价详情">
      <div class="interview_details_pop_box">
        <div class="detail_line">
          <div class="line_left">报价案例：</div>
          <div class="line_right">
            <span class="a_black">{{ detailInfo.jobname }}</span>
          </div>
          <div class="clear"></div>
        </div>
        <div class="detail_line">
          <div class="line_left">公司名称：</div>
          <div class="line_right">
            <span class="a_black">{{ detailInfo.companyname }}</span>
          </div>
          <div class="clear"></div>
        </div>
        <div class="detail_line">
          <div class="line_left">报价时间：</div>
          <div class="line_right">
            {{ detailInfo.interview_time | interviewTimeFilter }}
          </div>
          <div class="clear"></div>
        </div>
        <div class="detail_line">
          <div class="line_left">联系信息：</div>
          <div class="line_right">
            <span class="a_blue">{{ detailInfo.tel }}</span>
            ({{ detailInfo.contact }})
          </div>
          <div class="clear"></div>
        </div>
        <div class="detail_line">
          <div class="line_left">报价地址：</div>
          <div class="line_right">
            {{ detailInfo.address }}
          </div>
          <div class="clear"></div>
        </div>
        <div class="detail_line">
          <div class="line_left">备注信息：</div>
          <div class="line_right">
            {{ detailInfo.note == "" ? "无" : detailInfo.note }}
          </div>
          <div class="clear"></div>
        </div>
        <div class="detail_desc">
          温馨提示：供应商企业无权收取任何费用,报价采购中请加强自我保护,避免上当受骗！
        </div>
      </div>
    </van-dialog>
    <van-popup v-model="dialong">
      <div style="width: 300px;height: 220px;">
        <div style="padding: 20px;text-align: center;font-size: 20px;">填写不适合理由</div>
        <div style="padding: 20px;margin-top: -15px;">
          <span style="font-size: 12px">不合适理由</span>
          <select v-model="reason" style="width: 170px; height: 30px; border-radius: 6px; margin-left: 5px;">
            <option value="项目不适合，主动放弃">项目不适合，主动放弃</option>
            <option value="客户已和他人合作">客户已和他人合作</option>
            <option value="自身原因，终止采购">自身原因，终止采购</option>
          </select>
        </div>
        <div style="display: flex;justify-content: space-around;margin-top: 25px;">
          <van-button type="info" style="width: 70px;height: 28px;line-height: 2px;" @click="companyJobEnd">确定</van-button>
          <van-button type="default"  style="width: 70px; height: 28px;line-height: 2px;" @click="dialong = false">取消</van-button>
        </div>
      </div>
    </van-popup>
    <van-popup closeable close-icon-position="top-right" v-model="completePopd" :style="{ width: '80%',padding:'10px' }">
      <div>
        <p style="font-size: 16px;text-align: center;font-weight: 700;color: #000;">确认已成交</p>
        <p style="padding: 10px;font-size: 16px;color: #000;">注意：</p>
        <p style="font-size: 14px;padding: 0px 0 12px 22px;">若客户未与您成交，请点击“取消”;<br/>否则将由您负责该项目的售后问题</p>
        <div style="font-size: 14px;padding: 10px;justify-content: space-around;display: flex;">
          <span style="padding: 4px 10px; border-radius: 8px; background: #3c9cff; color: #fff;" @click="complete">确认已成交</span>
          <span style="padding: 4px 10px; border-radius: 8px;border: 1px solid #ccc;" @click="completePopd = false">误操作，取消</span>
        </div>
      </div>
    </van-popup>
    <van-popup v-model="show" position="bottom" :style="{ height: '65%'}">
              <div class="popupDiv" v-if="listItem.record&&listItem.record.length>0">
                <div class="popupDivHaed">
                  <div class=""></div>
                  <div class="popupDivHaedText">添写沟通记录</div>
                  <div class="popupDivHaedGb" @click="show = false"><van-icon name="cross" size="26" color="#000000" /></div>
                </div>
                <div class="popupCenter">
                  <div v-if="listItem.product_source === '备案项目'"  style="display: flex; justify-content: space-around;align-items: center;">
                    <div style="font-size: 16px;">项目进展:</div>
                    <div @click="process_type = 0" :class="{'process_type':process_type === 0}" style="padding: 5px 10px;background: #ccc;color: #fff;font-size:12px;">厂房建设</div>
                    <div @click="process_type = 1" :class="{'process_type':process_type === 1}" style="padding: 5px 10px;background: #ccc;color: #fff;font-size:12px;">暂无需求</div>
                    <div @click="process_type = 2" :class="{'process_type':process_type === 2}" style="padding: 5px 10px;background: #ccc;color: #fff;font-size:12px;">采购洽谈</div>
                  </div>
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
                  <div class='popupCenterDiv' style="border:0">
                    <div class="popupCenterDivText">沟通记录 ：</div>
                  </div>
                  <div style="padding: 0 0 55px;font-size: 15px;">
                      <div style="padding: 0 0 15px;" v-for="(item,index) in listItem.record">
                        <p style="padding: 0 17px 0;">{{item.addtime}}</p>
                        <p style="padding: 0 19px 0;">沟通内容：</p>
                        <p style="padding: 0 18px;text-indent: 1.5em;word-break: break-all;">{{item.content}}</p>
                        <p style="padding: 0 17px 0;">下次沟通时间：{{item.lasttime}}</p>
                      </div>
                  </div>
                  <div class="button"> 
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
  </div>
</template>

<script>
import { formatTime, parseTime } from '@/utils/index'
import http from '@/utils/http'
import api from '@/api'
import { Dialog } from "vant";
import ScrollNav from '@/components/ScrollNav'
export default {
  name: 'ResumeInterviewInvitation',
  components: {
    ScrollNav
  },
  filters: {
    timeFilter (timestamp) {
      return formatTime(timestamp, '{y}-{m}-{d}', true)
    },
    interviewTimeFilter (timestamp) {
      return parseTime(timestamp, '{y}-{m}-{d} {h}:{i}')
    }
  },
  data () {
    return {
      listItem:"",
      listIndex:"",
      minDate: new Date(),
      textareaText:'',
      textareainput2:'',
      process_type:0,
      all_record:[],
      show:false,
      bc:0,
      id:'',
      dateBox:false,
      completePopd:false,
      dialong:false,
      indexs:'',
      reason:'',
      dataset: [],
      loading: false,
      finished: false,
      finished_text: '',
      show_empty: false,
      params: {
        date:'',
        jobid: 0,
        settr: '',
        page: 1,
        state:0,
        pagesize: 15
      },
      options_job: [],
      options_settr: [
        { text: '不限发送时间', value: '' },
        { text: '3天内', value: 3 },
        { text: '7天内', value: 7 },
        { text: '15天内', value: 15 },
        { text: '30天内', value: 30 }
      ],
      showDetail: false,
      detailInfo: {},
      navList: [
			// { text: '智能推荐', href: '/member/company/intelligenceInquiry', active: false },
        // { text: '主动询价', href: '/member/company/jobapply', active: false },
        { text: '我的报价', href: '/member/company/download', active: false },
        { text: '我的回访', href: '/member/company/interview', active: true },
        // { text: '视频报价', href: '/member/company/interview_video', active: false },
        { text: '我的收藏', href: '/member/company/fav', active: false },
        { text: '浏览记录', href: '/member/company/view_resume', active: false }
      ]
    }
  },
  watch:{
    'params.state':{
      handler(ne){
        this.fetchData(true)
      }
    },
    'bc':{
      handler(ne){
        this.params.state = ne
        this.fetchData(true)
      }
    }
  },
  created () {
    if(this.$route.query.times){
      this.params.date = this.$route.query.times
    }
    this.fetchData(true)
  },
  methods: {
    goDetails(is,id){
      console.log(is,"222")
      if(is==='自建项目'){
          console.log(is,"自建项目")
          this.$router.push('/backupsProject/buildByOneself?id=' + id)
          return
      }
      if(is==='备案项目'){
        this.$router.push('/backupsProject/backupsProject?id=' + id)
          console.log(is,"备案项目")
          return
      }
      if(is==='直采项目'){
        this.$router.push('/resume/' + id)
          console.log(is,"直采项目")
          return
      }
    },
    addRecord(e,i){
      console.log(e,i,"11111")
      this.listItem = e
      this.listIndex = i
      this.show = true
    },
    homeResumeKeepAddRecord(){
		  if(this.textareaText == ''){
			  this.$notify({ type: 'warning', message: '请输入沟通内容' });
			  return
		  }
		  if(this.textareainput2 == ''){
			  this.$notify({ type: 'warning', message: '请选择下次联系时间' });
			  return
		  }
      if(this.listItem.product_source === '自建项目'){
        http.post(api.companyReturn_visitAdd_record,{
          content:this.textareaText,  //内容        
          interview_date:this.textareainput2,  //下次沟通时间
          resume_id:this.listItem.rid,  //备案项目id
        }).then(res=>{
          this.dataset[this.listIndex].record.unshift(res.data)
          this.textareaText = ''
          this.textareainput2 = ''
          this.$notify({type: "success",message:res.message,});
        })
      }
      if(this.listItem.product_source === '直采项目'){
        http.post(api.add_record,{
          content:this.textareaText,  //内容        
          interview_date:this.textareainput2,  //下次沟通时间
          rid:this.listItem.rid,  //备案项目id
        }).then(res=>{
          this.dataset[this.listIndex].record.unshift(res.data)
          this.textareaText = ''
          this.textareainput2 = ''
          this.$notify({type: "success",message:res.message,});
        })
      }
      if(this.listItem.product_source === '备案项目'){
        http.post(api.homeResume_keepAdd_record,{
          content:this.textareaText,  //内容        
          interview_date:this.textareainput2,  //下次沟通时间
          process_type:this.process_type,
          rid:this.listItem.rid,  //备案项目id
        }).then(res=>{
          this.dataset[this.listIndex].record.unshift(res.data)
          this.textareaText = ''
          this.textareainput2 = ''
          this.$notify({type: "success",message:res.message,});
        })
      }
	  },
    confirm(v){
		let date = v.getMonth()
			date = + date +1
		  this.textareainput2 = v.getFullYear() +'-' + date +'-' + v.getDate()
		  this.dateBox = false
	  },
    completePop(item,index,is){
      if(!is){
        return
      }
      this.indexs = index
      this.id = item.id
      this.completePopd = true
    },
    complete(){
        http.post(api.return_visitSetState,{id:this.id,state:1}).then(res=>{
          console.log(res,"提交成功")
          this.completePopd = false
          this.$notify({type: "success",message:res.message,});
          this.dataset.splice(this.indexs,1)
        })
    },
    // 不在跟进
    companyJobEnd(){
        http.post(api.return_visitSetState, {id:this.id,content:this.reason,state:2}).then((res) => {
          console.log(res,"2222")
          this.dialong = false;
          this.dataset.splice(this.indexs,1)
           this.$notify({type: "success",message:res.message,});
        })
        .catch(() => {});
    },
    handlerRemark(item,index,is) {
      if(!is){
        return
      }
      this.id = item.id
      this.indexs = index
      this.dialong = true;
      console.log(item, "我是数据");
    },
    fetchData (init) {
      this.show_empty = false
      if (init === true) {
        this.params.page = 1
        this.finished = false
        this.finished_text = ''
      }
      http.get(api.Return_visitIndex, this.params).then(res => {
          console.log(res,"1111")
          if (init === true) {
            this.dataset = [...res.data.items]
          } else {
            this.dataset = this.dataset.concat(res.data.items)
          }
          // 加载状态结束
          this.loading = false

          // 数据全部加载完成
          if (res.data.items.length < this.params.pagesize) {
            this.finished = true
            if (init === false) {
              this.finished_text = '没有更多了'
            } else if (res.data.items.length === 0) {
              this.show_empty = true
            }
          }
        })
        .catch(() => {})
    },
    onLoad () {
      this.params.page++
      this.fetchData(false)
    },
    doSearch () {
      this.params.page = 1
      this.fetchData(true)
    },
    handlerDetail (item) {
      this.detailInfo = item
      this.showDetail = true
    }
  }
}
</script>

<style lang="scss" scoped>
.bc{
  background: #fff!important;
  border: 1px solid #ccc!important;
  color: #000!important;
}
.popupDiv{color: #000; height: 100%; 
			.popupDivHaed{display: flex; justify-content: space-between; align-items: center; padding: 5px 5px; background: #fff; position: sticky; top: 0;
				.popupDivHaedText{font-size: 18px; font-weight: 700;}
				.popupDivHaedGb{}
			}
			.popupCenter{ margin-top: 15px; display: flex; flex-direction: column; height:calc( 100% - 40px - 15px ) ;
				.process_type{color: #0095ff  !important;}
				.popupCenterDivTextarea{padding: 10px;
					.popupCenterDivTextareaText{font-size: 15px; color: #000; padding-bottom: 8px;}
					.textarea{width: 100%; height: 90px;font-size: 13px;;
						textarea{width: 100%; height: 100%; border-radius: 5px; border: 1px solid #dadada;}
					}
				}
				.popupCenterDiv{display: flex; align-items: center; border-bottom: #eaeaea solid 1px;padding: 10px;
					&.bor{border-top: 1px solid #eaeaea;}
					.inputDiv{flex: 1; font-size: 13px;;
						.input{border: 0; flex: 1; height: 100%; width: 100%;}
					}
					.popupCenterDivText{
						padding-right: 5px; font-size: 15px;
            .inputDiv{font-size: 13px;}
					}
				}
				.button{display: flex; flex-direction: column; justify-content: space-between; flex: 1; padding: 3px 8px 0; position: fixed; bottom: 0; width: 100%; background: #fff;
					.button2{margin: auto 0 0 5px;border-radius: 10px; background-color: #00aaff; text-align: center; height: 40px; line-height: 40px; color: #fff;  flex:none; margin-bottom: 8px;}
				}
			}
		}
.list_btn3{
      background: #e68c06!important;
      float: right;
      font-size: 12px;
      padding: 4px 18px;
      border: 1px solid #e2e2e2;
      color: #fff;
      margin-left: 12px;
      border-radius: 20px;
    }
.tx4 {
      .list_btn {
        float: right;
        font-size: 12px;
        padding: 4px 18px;
        background-color: #fff;
        border: 1px solid #e2e2e2;
        margin-left: 12px;
        border-radius: 20px;
        &-orange {
          float: right;
          font-size: 12px;
          padding: 4px 18px;
          background-color: #fff;
          border: 1px solid #e2e2e2;
          margin-left: 12px;
          border-radius: 20px;
          color: #e2e2e2;
        }
      }
      .list_btn2 {
        float: right;
        font-size: 12px;
        padding: 4px 18px;
        background: #2c90f7;
        border: 1px solid #e2e2e2;
        color: #fff;
        margin-left: 12px;
        border-radius: 20px;
        &-orange {
          float: right;
          font-size: 12px;
          padding: 4px 18px;
          border: 1px solid #e2e2e2;
          margin-left: 12px;
          border-radius: 20px;
          background-color: #fff;
          color: #e2e2e2;
        }
      }
      position: relative;
      width: 100%;
      border-top: 1px dashed #eeeeee;
      padding: 12px 0;
      text-align: right;
    }
.ppos {
  font-size: 13px;
  color: #999999;
  // padding-right: 90px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding-bottom: 17px;
}
.interview_details_pop_box {
  max-height: 300px;
  background: #ffffff;
  overflow-x: hidden;
  overflow-y: auto;
  font-size: 13px;
  padding: 20px;
  .detail_desc {
    width: 100%;
    background-color: #f5f5f5;
    line-height: 1.5;
    color: #666666;
    padding: 8px 20px;
    margin-top: 10px;
  }
  .detail_line {
    line-height: 1.5;
    margin-bottom: 5px;
    .line_left {
      float: left;
      color: #999999;
      text-align: right;
      width: 80px;
      line-height: 1.5;
    }
    .line_right {
      float: left;
      color: #333333;
      word-break: break-all;
      width: 190px;
      text-align: left;
      line-height: 1.5;
      .a_black {
        color: #333333;
        text-decoration: none;
      }
      .a_blue {
        color: #1887fb;
        text-decoration: none;
      }
    }
  }
}
.right_txt2::after{
          position: absolute;
          padding: 3px;
          border-radius: 50%;
          background: red;
          left: -6px;
          top: 2px;
          content: '';
        }
.self_drop {
  &::after {
    border: none;
  }
}
.box_1 {
  width: 100%;
  .box_item {
    width: 100%;
    background-color: #ffffff;
    padding: 0 16px 20px 16px;
    .tx3 {
      width: 100%;
      border-radius: 8px;
      box-shadow: 0 0 5px #c2c2c2;
      position: relative;
      padding: 14px 0 12px;
      &::after{
        position: absolute;right: 17px;top: 31px;width: 7px;height: 7px;border-top: 1px solid #999999;
        border-right: 1px solid #999999;transform: rotate(45deg);content: "";
      }
      .name {
        font-size: 14px;
        color: #333333;
        font-weight: bold;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        max-width: 290px;
        padding: 0 0 0 41px;
        background: url("../../../assets/images/interview_name_ico.png") 18px
          2px no-repeat;
        background-size: 17px 16px;
        margin-bottom: 8px;
      }
      .time_txt {
        font-size: 12px;
        color: #999999;
        padding: 0 0 0 41px;
        .time {
          color: #1787fb;
        }
      }
    }
    .tx2 {
      font-size: 14px;
      color: #666666;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      position: relative;
      padding-right: 60px;
      margin-bottom: 17px;
      .right_txt {
        position: absolute;
        right: 0;
        top: -1px;
        font-size: 12px;
        padding: 3px 8px;
        background-color: #fafafa;
        border-radius: 3px;
        color: #999999;
        &.not_download {
          color: #ff5d24;
          background-color: #fffbf8;
        }
      }
    }
    .tx1 {
      margin-bottom: 9px;
      position: relative;
      padding: 19px 0 0;
      .name {
        min-height: 22px;
        font-size: 16px;
        color: #333333;
        font-weight: bold;
        max-width: 240px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .right_txt {
        position: absolute;
        right: 0;
        top: 22px;
        font-size: 12px;
        color: #999999;
      }
    }
  }
}
</style>
