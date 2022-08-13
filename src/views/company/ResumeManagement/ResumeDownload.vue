<template>
  <div id="app">
    <Head>我的报价</Head>
    <ScrollNav :list="navList"></ScrollNav>
     <div style="display: flex;font-size: 12px;position: sticky;top: 53px;background: #fff;z-index: 999;border-bottom: solid 4px rgba(243,243,243);">
      <div @click="bc=0" :class="{'bc':bc!==0}" style="padding: 5px 13px;border-radius: 9px;margin: 10px;background-color: rgb(54 157 255);color: #fff;">
          <van-icon name="contact" /> 未处理
      </div>
      <div @click="bc=4" :class="{'bc':bc!==4}" style="padding: 5px 13px;border-radius: 9px;margin: 10px;background-color: rgb(54 157 255);color: #fff;">
          <van-icon name="envelop-o" /> 已成交
      </div>
      <div @click="bc=3" :class="{'bc':bc!==3}" style="padding: 5px 13px;border-radius: 9px;margin: 10px;background-color: rgb(54 157 255);color: #fff;">
          <van-icon name="wap-home-o" /> 不适合
      </div>
    </div>
    <van-empty image="search" description="没有找到对应的信息" style="background-color: #fff" v-if="show_empty === true"/>
    <van-list v-if="dataset.length > 0" v-model="loading" :finished="finished" :finished-text="finished_text" @load="onLoad" :immediate-check="true">
      <div class="list_wrapper">
        <div v-for="(item, index) in dataset" :key="index" @click="$router.push('/resume/' + item.resume_id)">
          <div class="list">
            <div class="tx1">
              <div class="avatar_box">
                <img :src="item.photo_img_src" alt="照片" />
              </div>
              <div class="name">
                <div class="name_txt">{{ item.fullname }}</div>
                <div class="level" v-if="item.high_quality == 1"></div>
                <div class="clear"></div>
              </div>
              <div style="display: flex; justify-content: space-between">
                <div class="oop">
                  <div class="txs2">{{ item.birthday || "半年后" }}截止</div>
                  <div class="tes1">{{ item.education_text }}</div>
                </div>
                <div class="chuli" :class="{'chuli-span':item.status==='未处理'}" >{{item.status}}</div>
              </div>
            </div>
            <div class="ppos timew" style="padding: 0;">
                {{item.householdaddress_name}}
            </div>
            <div class="ppos" style="display: flex; justify-content: space-between; align-items: center;">
              <div style="display: flex">
                <div class="timew">{{ item.refreshtime }}更新</div>
                <div class="timew" style="margin-left: 20px">
                  项目在：{{ item.address }}
                </div>
              </div>
              <div class="timew" style="wdith: 60px; height: 30px; background-color: #1787fb; border-radius: 5px; align-items: center; color: #e5f1ff; display: flex; padding: 10px;">
                已参与{{ item.involved_count }}/{{ item.involved }}
              </div>
            </div>
            <div class="tx4">
              <!-- <div :class="[item.status!=='不适合'&&item.status!=='已成交'?'list_btn2':'list_btn2-orange']" @click.stop="openAddInvitation(item,index,item.status!=='不适合'&&item.status!=='已成交')">
                填写沟通记录
              </div> -->
               <div :class="[item.status!=='不适合'&&item.status!=='已成交'?'list_btn2':'list_btn2-orange']">
                填写沟通记录
              </div>
              <div :class="[item.status!=='不适合'&&item.status!=='已成交'?'list_btn':'list_btn-orange']" @click.stop="completePop(item,index,item.status!=='不适合'&&item.status!=='已成交')">
                已成交
              </div>
              <div :class="[item.status!=='不适合'&&item.status!=='已成交'?'list_btn':'list_btn-orange']" @click.stop="handlerRemark(item,index,item.status!=='不适合'&&item.status!=='已成交')">
                不合适
              </div>
              <div class="clear"></div>
            </div>
          </div>
          <div class="form_split_10"></div>
        </div>
      </div>
    </van-list>
    <van-popup :lazy-render="false" v-model="showInvite" position="right" :overlay="false" style="width: 100%; height: 100%">
      <AddInvitation ref="child" from="download" :apply_fullname="apply_fullname" :resume_id="apply_resume_id" @closePopup="closeAddInvitation"></AddInvitation>
    </van-popup>
    <van-popup v-model="showRemark" position="right" :overlay="false" style="width: 100%; height: 100%" >
      <Head :goback_custom="true" @gobackCustomMethod="showRemark = false"></Head>
    </van-popup>
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
        <div style="    font-size: 14px;padding: 10px;justify-content: space-around;display: flex;">
          <span style="padding: 4px 10px; border-radius: 8px; background: #3c9cff; color: #fff;" @click="complete">确认已成交</span>
          <span style="padding: 4px 10px; border-radius: 8px;border: 1px solid #ccc;" @click="completePopd = false">误操作，取消</span>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { formatTime } from "@/utils/index";
import AddInvitation from "@/components/AddInvitation";
import http from "@/utils/http";
import api from "@/api";
import ScrollNav from "@/components/ScrollNav";
export default {
  name: "ResumeDownload",
  components: {
    AddInvitation,
    ScrollNav,
  },
  filters: {
    timeFilter(timestamp) {
      return formatTime(timestamp, "{y}-{m}-{d}", true);
    },
  },
  data() {
    return {
      completePopd:false,
      reason:'',
      id:'',
      bc:0,
      show:false,
      dialong: false,
      apply_resume_id: 0,
      apply_fullname: "",
      showInvite: false,
      showRemark: false,
      remark_item: {},
      dataset: [],
      loading: false,
      finished: false,
      finished_text: "",
      show_empty: false,
      indexs:0,
      params: {
        page: 1,
        pagesize: 10,
        status:0,
      },
     
      navList: [
			// { text: '智能推荐', href: '/member/company/intelligenceInquiry', active: false },
        // { text: "主动询价", href: "/member/company/jobapply", active: false },
        { text: "我的报价", href: "/member/company/download", active: true },
        { text: "我的回访", href: "/member/company/interview", active: false },
        // { text: '视频报价', href: '/member/company/interview_video', active: false },
        { text: "我的收藏", href: "/member/company/fav", active: false },
        { text: "浏览记录", href: "/member/company/view_resume", active: false,},
      ],
    };
  },
  created() {
    this.fetchData(true);
  },
  watch:{
    'bc':{
      handler(ne){
        this.params.status = ne
        this.fetchData(true)
      }
    }
  },
  methods: {
    fetchData(init) {
      this.show_empty = false;
      if (init === true) {
        this.params.page = 1;
        this.finished = false;
        this.finished_text = "";
      }
      http.get(api.companyDown_resumeIndex, this.params).then((res) => {
        console.log(res,"1111111111")
          if (init === true) {
            this.dataset = [...res.data.items];
          } else {
            this.dataset = this.dataset.concat(res.data.items);
          }
          // 加载状态结束
          this.loading = false;
          // 数据全部加载完成
          if (res.data.items.length < this.params.pagesize) {
            this.finished = true;
            if (init === false) {
              this.finished_text = "没有更多了";
            } else if (res.data.items.length === 0) {
              this.show_empty = true;
            }
          }
        }).catch(() => {});
    },
    onLoad() {
      this.params.page++;
      this.fetchData(false);
    },
    complete(){
        http.get(api.companyJobCooperation,{rid:this.id}).then(res=>{
          console.log(res,"提交成功")
          this.completePopd = false
          this.$notify({type: "success",message:res.message,});
          this.dataset.splice(this.indexs,1)
        })
    },
    completePop(item,index,is){
      if(!is){
        return
      }
      this.indexs = index
      this.id = item.id
      this.completePopd = true
    },
    openAddInvitation(item,index,is) {
      if(!is){
        return
      }
      if (item.audit != 1) {
        this.$notify("该项目尚未通过审核，不能继续此操作");
        return false;
      }
      this.apply_fullname = item.fullname;
      this.apply_resume_id = item.resume_id;
      this.$refs.child.initCB();
      this.showInvite = true;
    },
    closeAddInvitation() {
      this.showInvite = false;
    },
    companyJobEnd(){
        http.get(api.companyJobEnd, {rid:this.id,reason:this.reason}).then((res) => {
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
      // this.$dialog
      //   .confirm({
      //     title: "填写不适合理由",
      //     message: "确定删除该项目吗？",
      //   })
      //   .then(() => {
      //     http
      //       .post(api.company_jobapply_del, { id: item.id })
      //       .then((res) => {
      //         this.$notify({
      //           type: "success",
      //           message: "项目删除成功",
      //         });
      //         this.dataset.splice(index, 1);
      //       })
      //       .catch(() => {});
      //   })
      //   .catch(() => {
      //     // on cancel
      //   });
    },

    submitRemark(values) {
      values.resume_id = this.remark_item.resume_id;
      http.post(api.remark_resume, values).then((res) => {
          this.dataset.forEach((element) => {
            if (element.resume_id == this.remark_item.resume_id) {
              element.remark = values.remark;
            }
          });
          this.showRemark = false;
        })
        .catch(() => {});
    },
  },
};
</script>

<style lang="scss" scoped>

.bc{
  background: #fff!important;
  border: 1px solid #ccc!important;
  color: #000!important;
}

.van-popup--center {
    top: 50%;
    left: 50%;
    -webkit-transform: translate3d(-50%,-50%,0);
    transform: translate3d(-50%,-50%,0);
    border-radius: 10px;
}
.offd {
  width: 370px;
  height: 220px;
  background-color: #eee;
  border-radius: 10px;
  position: absolute;
  top: 50%;
  z-index: 9999;
}
.chuli {
  width: 20%;
  font-size: 0.37rem;
  color: #8a8484;
  padding: 0px 0px 0px 10px;
  height: 20px;
  line-height: 20px;
  &-span{position: relative;
    &::after{position: absolute;content: "";width: 6px;background: red;height: 6px;border-radius: 50%;left: 0;top: 6px;}}
}
.wagw {
  font-size: 12px;
  color: #101010;
  position: absolute;
  right: 8px;
  top: 25px;
}
.timew {
  margin-top: 25px;
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
.oop {
  display: flex;
  font-size: 8px;
}
.tes1 {
  color: #8295ff;
  margin-left: 15px;
}
.txs2 {
  color: #ff6600;
}
.list_wrapper {
  .list {
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
    .tx3 {
      .link {
        color: #1787fb;
      }
      font-size: 13px;
      color: #999999;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      padding-bottom: 16px;
    }
    .tx2 {
      .text {
        color: #666666;
      }
      font-size: 13px;
      color: #999999;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin-bottom: 8px;
    }
    .tx1 {
      .new {
        position: absolute;
        right: -15px;
        top: 0;
        width: 24px;
        height: 24px;
        background: url("../../../assets/images/arrow_new_ico.svg") 0 no-repeat;
        background-size: 24px;
      }
      .avatar_box {
        img {
          width: 49px;
          height: 49px;
          border: 0;
          border-radius: 100%;
        }
        position: absolute;
        left: 0;
        top: 18px;
        width: 49px;
        height: 49px;
      }
      .some {
        font-size: 15px;
        color: #666666;
        padding: 0 0 0;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-bottom: 11px;
      }
      .name {
        margin-bottom: 7px;
        .time {
          position: absolute;
          right: 0;
          top: 24px;
          font-size: 12px;
          color: #999999;
        }
        .level {
          float: left;
          width: 35px;
          height: 25px;
          background: url("../../../assets/images/level_hight_ico.png") 0 6px
            no-repeat;
          background-size: 35px 14px;
        }
        .name_txt {
          float: left;
          font-size: 18px;
          font-weight: bold;
          color: #333333;
          padding-right: 8px;
          max-width: 100%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        padding-top: 21px;
        position: relative;
      }
      position: relative;
      padding-left: 63px;
    }
    width: 100%;
    background-color: #ffffff;
    padding: 0 15px;
  }
  width: 100%;
}
</style>
