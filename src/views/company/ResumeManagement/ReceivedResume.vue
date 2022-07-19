<template>
  <div id="app">
    <!-- <Head>收到的项目</Head> -->
    <Head>主动询价</Head>
    <ScrollNav :list="navList"></ScrollNav>
    <div class="box_1">
      <van-dropdown-menu>
        <van-dropdown-item
          v-model="params.jobid"
          :options="options_job"
          @change="doSearch"
        />
        <van-dropdown-item
          v-model="params.status"
          :options="options_status"
          @change="doSearch"
        />
        <van-dropdown-item
          v-model="params.is_look"
          :options="options_look"
          @change="doSearch"
        />
        <van-dropdown-item
          v-model="params.source"
          :options="options_source"
          @change="doSearch"
        />
      </van-dropdown-menu>
    </div>
    <div class="form_split_10"></div>
    <van-empty
      image="search"
      description="没有找到对应的信息"
      style="background-color:#fff"
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
          @click="handlerLook(item)"
        >
          <div class="list">
            <div class="tx1">
              <!--<div class="new" v-if="item.is_look == 0"></div>-->
              <div :class="[parseInt(item.is_look) === 0 ? 'avatar_box no_look' : 'avatar_box']">
                <img :src="item.photo_img_src" alt="照片" />
              </div>
              <div class="name">
                <div class="name_txt">{{ item.fullname }}</div>
                <div class="level" v-if="item.high_quality == 1"></div>
                <div class="clear"></div>
                <div class="time">{{ item.addtime | timeFilter }}</div>
              </div>
              <div class="some">
                {{ item.birthday }}截止 ·
                 <!-- {{ item.sex_text }} · -->
                {{ item.education_text }}
                 <!-- · {{ item.experience_text }} -->
                <van-tag type="warning" v-if="item.handle_status == 0">
                  待处理
                </van-tag>
                <van-tag type="primary" v-if="item.handle_status == 1">
                  已购买
                </van-tag>
                <van-tag type="danger" v-if="item.handle_status == 2">
                  已报价
                </van-tag>
              </div>
            </div>
            <div class="tx2">
              想找
              <span class="text">{{ item.intention_jobs }}</span>
              案例
            </div>
            <div class="tx2">
              想在
              <span class="text">{{ item.intention_district }}</span>
              案例
            </div>
            <div class="tx3">
              
              <div>
              询价案例：  <span class="link">{{ item.jobname }}</span>
              </div>
              <div class="canyu_btn">
                     已参与{{item.involved_count}}/{{item.involved}}
              </div>
            </div>
            <div class="tx4">
              
               <div class="list_btn" @click.stop="handlerRecord(item, index)"   v-if="item.handle_status == 1"> 
                添加沟通记录 
              </div>
              <div class="list_btn" @click.stop="handlerDel(item, index)">
                删除
              </div>
              <div class="list_btn" @click.stop="handlerRemark(item)">备注</div>
              <div
                class="list_btn"
                v-if="item.handle_status == 0"
                @click.stop="handlerRefuse(item)"
              >
                婉拒
              </div>
              <div
                class="list_btn"
                v-if="item.handle_status == 0"
                @click.stop="handlerAgree(item, index)"
              >
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
      style="width:100%;height:100%"
    >
      <AddInvitation
        ref="child"
        from="apply"
        :apply_id="apply_id"
        :apply_dataset_index="apply_dataset_index"
        :apply_fullname="apply_fullname"
        @closePopup="closeAddInvitation"
      ></AddInvitation>
    </van-popup>
    <!-- 添加沟通聊天记录 -->
     <van-popup
      v-model="showRecord"
      position="right"
      :overlay="false"
      style="width:100%;height:100%;padding:0;"
    >
      <Head :goback_custom="true" @gobackCustomMethod="showRecord = false">
        填写沟通记录
      </Head>
      <van-form @submit="submitRemark1">
        <van-cell-group inset >
            <van-field
              style="padding:10px;"
              v-model="form1.facilityname"
              name="设备型号"
              label="设备型号"
              placeholder="请填写设备型号"
              :rules="[{ required: true, message: '请填写设备型号' }]"
            />
            <van-field
              style="padding:10px;"

                type="textarea"
                rows="2"
                name="remark"
                v-model="form1.content"
                label="本次沟通内容"
                placeholder="请输入备注内容"
              />
   
                <van-field
              style="padding:10px;"

                  required
                  readonly
                  clickable
                  name="interview_date"
                  v-model="form1.interview_date"
                  label="下次联系时间"
                  placeholder="请选择"
                  @click="showDatePicker = true"
                  class="form_choose reset_after"
                  :rules="[{ required: true, message: '请选择下次联系时间' }]"
                />
                <van-popup v-model="showDatePicker" position="bottom">
                  <van-datetime-picker
                    type="date"
                    title="选择下次联系时间"
                    :min-date="minDate"
                    :formatter="formatterDate"
                    @confirm="handlerDate"
                  />
                </van-popup>
              </van-cell-group>
            <div style="margin: 16px;">
          <van-button round block type="info" native-type="submitRemark1">
            确定
          </van-button>
        </div>
      </van-form>
    </van-popup>
    <van-popup
      v-model="showRemark"
      position="right"
      :overlay="false"
      style="width:100%;height:100%"
    >
      <Head :goback_custom="true" @gobackCustomMethod="showRemark = false">
         备注 
      </Head>
      <van-form @submit="submitRemark">
        <van-field
          type="textarea"
          rows="2"
          name="remark"
          v-model="remark_item.remark"
          label=""
          placeholder="请输入备注内容2"
        />
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit">
            确定
          </van-button>
        </div>
      </van-form>
    </van-popup>
       
  </div>
</template>

<script>
import { formatTime } from '@/utils/index'
import AddInvitation from '@/components/AddInvitation'
import http from '@/utils/http'
import api from '@/api'
import ScrollNav from '@/components/ScrollNav'
export default {
  name: 'ReceivedResume',
  components: {
    AddInvitation,
    ScrollNav
  },
  filters: {
    timeFilter (timestamp) {
      return formatTime(timestamp, '{y}-{m}-{d}', true)
    }
  },
  data () {
    return {
      form:{
        model: '',
        password: '',
      },
      form1:{
        facilityname:'',
        content:'',
        interview_date:'',
        rid:'',
      },
        minDate: new Date(2022, 0, 1),
      maxDate: new Date(2029, 10, 1),
      currentDate: new Date(),
showDatePicker:false,
      showRecord:false,
      showRemark: false,
      remark_item: {},
      apply_id: 0,
      apply_dataset_index: 0,
      apply_fullname: '',
      showInvite: false,
      dataset: [],
      loading: false,
      finished: false,
      finished_text: '',
      show_empty: false,
      params: {
        jobid: 0,
        status: '',
        source: '',
        is_look: '',
        page: 1,
        pagesize: 15
      },
      options_job: [{ text: '全部案例', value: 0 }],
      options_status: [
        { text: '处理状态', value: '' },
        { text: '待处理', value: 0 },
        { text: '已购买', value: 1 },
        { text: '已报价', value: 2 }
      ],
      options_source: [
        { text: '全部来源', value: '' },
        { text: '自主投递', value: 0 },
        { text: '委托投递', value: 1 }
      ],
      options_look: [
        { text: '查看状态', value: '' },
        { text: '未查看', value: 0 },
        { text: '已查看', value: 1 }
      ],
      navList: [
			{ text: '智能推荐', href: '/member/company/intelligenceInquiry', active: false },
        { text: '主动询价', href: '/member/company/jobapply', active: true },
        { text: '我的付费', href: '/member/company/download', active: false },
        { text: '我的报价', href: '/member/company/interview', active: false },
        // {
        //   text: '视频报价',
        //   href: '/member/company/interview_video',
        //   active: false
        // },
        { text: '我的收藏', href: '/member/company/fav', active: false },
        {
          text: '浏览记录',
          href: '/member/company/view_resume',
          active: false
        }
      ]
    }
  },
  created () {
    this.fetchData(true)
  },
  methods: {
    fetchData (init) {
      this.show_empty = false
      if (init === true) {
        this.params.page = 1
        this.finished = false
        this.finished_text = ''
      }
      http
        .get(api.company_jobapply_list, this.params)
        .then((res) => {
          if (init === true) {
            this.options_job = [{ text: '全部案例', value: 0 }]
            let options_job = [...res.data.option_jobs]
            options_job.forEach((element) => {
              this.options_job.push({
                text: element.jobname,
                value: element.id
              })
            })
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
        formatterDate (type, val) {
      if (type === 'year') {
        return `${val}年`
      } else if (type === 'month') {
        return `${val}月`
      } else if (type === 'day') {
        return `${val}日`
      }
      return val
    },
    onLoad () {
      this.params.page++
      this.fetchData(false)
    },
    doSearch () {
      this.params.page = 1
      this.fetchData(true)
    },
    handlerAgree (item, index) {
      if (item.audit != 1) {
        this.$notify('该项目尚未通过审核，不能继续此操作')
        return false
      }
      http
        .post(api.company_jobapply_set_agree_pre, { id: item.id })
        .then((res) => {
          if (res.data.finish === 1) {
            item.handle_status = 1
            item.is_look = 1
            this.$notify({
              type: 'success',
              message: '项目处理成功'
            })
          } else {
            this.openAddInvitation(item, index)
          }
        })
        .catch(() => {})
    },
       handlerDate (e) {
      console.log(e,8588)
      let d = new Date(e)
      this.form1.interview_date =
        d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
      this.showDatePicker = false
    },
    openAddInvitation (item, index) {
      this.apply_id = item.id
      this.apply_dataset_index = index
      this.apply_fullname = item.fullname
      this.$refs.child.initCB()
      this.showInvite = true
    },
    closeAddInvitation (index) {
      if (index !== undefined) {
        this.dataset[index].handle_status = 1
        this.dataset[index].is_look = 1
      }
      this.showInvite = false
    },
    handlerRefuse (item) {
      if (item.audit != 1) {
        this.$notify('该项目尚未通过审核，不能继续此操作')
        return false
      }
      this.$dialog
        .confirm({
          title: '系统提示',
          message: '确定将处理状态更改为【已婉拒】吗？'
        })
        .then(() => {
          http
            .post(api.company_jobapply_set_refuse, { id: item.id })
            .then((res) => {
              this.$notify({
                type: 'success',
                message: '项目处理成功'
              })
              item.handle_status = 2
            })
            .catch(() => {})
        })
        .catch(() => {
          // on cancel
        })
    },
    handlerDel (item, index) {
      this.$dialog
        .confirm({
          title: '系统提示',
          message: '确定删除该项目吗？'
        })
        .then(() => {
          http
            .post(api.company_jobapply_del, { id: item.id })
            .then((res) => {
              this.$notify({
                type: 'success',
                message: '项目删除成功'
              })
              this.dataset.splice(index, 1)
            })
            .catch(() => {})
        })
        .catch(() => {
          // on cancel
        })
    },
    handlerLook (item) {
      if (item.is_look === 0) {
        item.is_look = 1
        http
          .post(api.company_jobapply_set_looked, { id: item.id })
          .then((res) => {
            this.$router.push('/resume/' + item.resume_id)
          })
          .catch(() => {})
      } else {
        this.$router.push('/resume/' + item.resume_id)
      }
    },
    handlerRemark (item) {
      this.showRemark = true
      this.remark_item = item
    },
    handlerRecord (item) {
      this.showRecord = true
      this.remark_item = item
    },
    submitRemark (values) {
      values.resume_id = this.remark_item.resume_id
      http
        .post(api.remark_resume, values)
        .then((res) => {
          this.dataset.forEach(element => {
            if (element.resume_id == this.remark_item.resume_id) {
              element.remark = values.remark
            }
          })
          this.showRemark = false
        })
        .catch(() => {})
    },
    submitRemark1 (values) {
      console.log(values)
      values.resume_id = this.remark_item.resume_id
      this.form1.rid = this.remark_item.resume_id
      http
        .post(api.add_record,  this.form1)
        .then((res) => {
          this.showRecord = false

         this.fetchData(true)
        })
        .catch(() => {})
    }
  }
}
</script>

<style lang="scss" scoped>
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
        border-radius: 26px;
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
      display: flex;
      justify-content: space-between;
      align-content: center;
      .canyu_btn{
        width: 75px;
        padding: 5px;
        background-color: #1787fb; 
        color:#eeeeee;
        border-radius: 6px;
      }
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
        width: 30px;
        height: 30px;
        background: url('../../../assets/images/arrow_new_ico.svg') 0 no-repeat;
        background-size: 30px;
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
        &.no_look {
          &::after {
            content: '';position: absolute;right: 1px;top: 2px;width: 9px;height: 9px;background-color: #ff5200;
            border-radius: 999px;border: 1PX solid #ffffff;
          }
        }
      }
      .some {
        .van-tag {
          position: absolute;
          right: 0;
          top: 1.5px;
        }
        position: relative;
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
          background: url('../../../assets/images/level_hight_ico.png') 0 6px
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
