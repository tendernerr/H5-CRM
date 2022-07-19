<template>
  <div id="app">
    <Head>我的付费</Head>
    <ScrollNav :list="navList"></ScrollNav>
    <div class="form_split_10"></div>
    <van-empty
      image="search"
      description="没有找到对应的信息"
      style="background-color: #fff"
      v-if="show_empty === true"
    />
    <van-list
      v-if="dataset.length > 0"
      v-model="loading"
      :finished="finished"
      :finished-text="finished_text"
      @load="onLoad"
      :immediate-check="true"
    >
      <div class="list_wrapper">
        <div
          v-for="(item, index) in dataset"
          :key="index"
          @click="$router.push('/resume/' + item.resume_id)"
        >
          <div class="list">
            <div class="tx1">
              <div class="avatar_box">
                <img :src="item.photo_img_src" alt="照片" />
              </div>
              <div class="name">
                <div class="name_txt">{{ item.fullname }}</div>
                <div class="level" v-if="item.high_quality == 1"></div>
                <div class="clear"></div>
                <div class="wagw">采购预算：{{ item.minwage }}</div>
                <!-- <div class="time">{{ item.addtime | timeFilter }}</div> -->
              </div>
              <!-- <div class="some">
                {{ item.age }}岁 · {{ item.sex_text }} ·
                {{ item.education_text }} · {{ item.experience_text }}
              </div> -->
              <div style="display: flex; justify-content: space-between">
                <div class="oop">
                  <div class="txs2">{{ item.birthday || "半年后" }}截止</div>
                  <div class="tes1">{{ item.education_text }}</div>
                </div>
                <div class="chuli" >{{item.status}}</div>
              </div>
            </div>
            <!-- <div class="tx2">
              想找
              <span class="text">{{ item.intention_jobs }}</span>
              案例
            </div> -->

            <!-- <div class="tx2">
              想在
              <span class="text">{{ item.intention_district }}</span>
              案例
            </div> -->
            <!-- <div class="tx3" v-if="item.recent_work != ''">
              最近案例：{{ item.recent_work }}
            </div> -->
            <div
              class="ppos"
              style="
                display: flex;
                justify-content: space-between;
                align-items: center;
              "
            >
              <div style="display: flex">
                <div class="timew">{{ item.refreshtime }}更新</div>
                <div class="timew" style="margin-left: 20px">
                  项目在：{{ item.address }}
                </div>
              </div>
              <div
                class="timew"
                style="
                  wdith: 60px;
                  height: 30px;
                  background-color: #1787fb;
                  border-radius: 5px;
                  align-items: center;
                  color: #e5f1ff;
                  display: flex;
                  padding: 10px;
                "
              >
                已参与{{ item.involved_count }}/{{ item.involved }}
              </div>
            </div>
            <div class="tx4">
              <div class="list_btn" @click.stop="handlerRemark(item)">
                不合适
              </div>
              <div class="list_btn" @click.stop="openAddInvitation(item)">
                联系报价
              </div>
              <div class="clear"></div>
            </div>
          </div>
          <div class="form_split_10"></div>
        </div>
      </div>
    </van-list>
    <van-popup
      :lazy-render="false"
      v-model="showInvite"
      position="right"
      :overlay="false"
      style="width: 100%; height: 100%"
    >
      <AddInvitation
        ref="child"
        from="download"
        :apply_fullname="apply_fullname"
        :resume_id="apply_resume_id"
        @closePopup="closeAddInvitation"
      ></AddInvitation>
    </van-popup>
    <van-popup
      v-model="showRemark"
      position="right"
      :overlay="false"
      style="width: 100%; height: 100%"
    >
      <Head :goback_custom="true" @gobackCustomMethod="showRemark = false">
      </Head>

      <!-- <van-form @submit="submitRemark">
        <van-field
          type="textarea"
          rows="2"
          name="remark"
          v-model="remark_item.remark"
          label=""
          placeholder="请输入备注内容3"
        />
        <div style="margin: 16px">
          <van-button round block type="info" native-type="submit">
            确定
          </van-button>
        </div>
      </van-form> -->
    </van-popup>
    <van-popup v-model="dialong">
      <div style="width: 300px;    height: 220px;">
        <div style="padding: 20px; text-align: center;font-size: 20px;">填写不适合理由</div>
        <div style="padding: 20px;    margin-top: -15px;">
          <span style="font-size: 12px">不合适理由</span>
          <select style="    width: 170px;
    height: 30px;
    border-radius: 6px;
    margin-left: 5px;">
            <option value="222">111</option>
            <option value="111">1131</option>
            <option value="333">1114</option>
          </select>
        </div>
        <div style="    display: flex;
    justify-content: space-around;margin-top: 25px;">
          <van-button type="info" style="    width: 70px;
    height: 28px;
    line-height: 2px;" @click="dialog=false" v-model="show" >确定</van-button>
          <van-button type="default"  style="    width: 70px;
    height: 28px;
    line-height: 2px;" @click="dialong = false">取消</van-button>
        </div>
      </div>
    </van-popup>
    <!-- <div class="offd" v-if="dialong">
      <div style="padding:20px;text-align:center;">填写不适合理由</div>
      <div style="padding: 20px">
        <span style="font-size:12px">不合适理由</span>
        <select style="width: 100px">
          <option value="222">111</option>
          <option value="111">1131</option>
          <option value="333">1114</option>
        </select>
      </div>
      <div style="display: flex; justify-content: space-around; padding: 40px">
        <div>确定</div>
        <div>取消</div>
      </div>
    </div> -->
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
      params: {
        page: 1,
        pagesize: 15,
      },
     
      navList: [
			{ text: '智能推荐', href: '/member/company/intelligenceInquiry', active: false },
        { text: "主动询价", href: "/member/company/jobapply", active: false },
        { text: "我的付费", href: "/member/company/download", active: true },
        { text: "我的报价", href: "/member/company/interview", active: false },
        // {
        //   text: '视频报价',
        //   href: '/member/company/interview_video',
        //   active: false
        // },
        { text: "我的收藏", href: "/member/company/fav", active: false },
        {
          text: "浏览记录",
          href: "/member/company/view_resume",
          active: false,
        },
      ],
    };
  },
  created() {
    this.fetchData(true);
  },
  methods: {
    queding(){

    },
    quxiao(){

    },
    fetchData(init) {
      this.show_empty = false;
      if (init === true) {
        this.params.page = 1;
        this.finished = false;
        this.finished_text = "";
      }
      http
        .get(api.company_downresume_list, this.params)
        .then((res) => {
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
        })
        .catch(() => {});
    },
    onLoad() {
      this.params.page++;
      this.fetchData(false);
    },
    openAddInvitation(item) {
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
    handlerRemark(item) {
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
      http
        .post(api.remark_resume, values)
        .then((res) => {
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
  font-size: 0.32rem;
  color: #fff;
  background-color: #fd7900;
  border-radius: 0.133333rem;
  padding: 0px 0px 0px 10px;
  height: 20px;
  line-height: 20px;
}
.wagw {
  font-size: 12px;
  color: #101010;
  position: absolute;
  right: 8px;
  top: 25px;
}
.timew {
  margin-top: 60px;
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
        border-radius: 5px;
        &.orange {
          border-color: #ff5d24;
          color: #ff5d24;
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
          max-width: 175px;
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
