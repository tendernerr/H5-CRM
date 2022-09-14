<template>
  <div id="app" class="my_app">
    <Meta
      v-if="base_info.fullname !== undefined"
      pagealias="resumeshow"
      :custom_data="{
        fullname: base_info.fullname,
        sex: base_info.sex_text,
        education: base_info.education_text,
        experience: base_info.experience_text,
        district: base_info.intention_district_text,
        jobcategory: base_info.intention_jobs_text,
        specialty: base_info.specialty,
      }"
    />
    <!-- <Head>{{ base_info.fullname }}的项目</Head> -->
    <Head>项目详情</Head>
    <van-notice-bar scrollable left-icon="volume-o" text="此项目已经过人工核实，可放心参与！"/>
    <van-skeleton title avatar :row="10" :loading="mainLoading">
      <div class="box_1">
        <div class="content">
          <div class="up">
            <div class="avatar_box">
              <img :src="base_info.photo_img_src" :alt="base_info.fullname" />
            </div>
            <div
              class="tx1"
              style="display: flex; justify-content: space-between"
            >
              <div>
                <div class="name">{{ base_info.fullname }}</div>
                <div class="level_ico" v-if="base_info.high_quality == 1"></div>
                <div class="clear"></div>
              </div>
              <!-- <div class="wage">{{ base_info.intention_wage }}</div> -->
              <!-- <div class="item_apply" @click="doDownload1">立即买断</div> -->
               <div class="yusuan" >预算：{{ base_info.minwage[0] }}</div>
            </div>
            <div class="tx2" style="color: #ff8e50;">
              {{ base_info.birthday || "半年后" }}截止 ·
				  <span style="color: #3a89e6;">{{ base_info.education_text }} ·</span>
              <span class="num" style="font-size: 10px; color: #7f7f7f;">
                被浏览{{ base_info.click }}次
					</span>
            </div>
            <div class="tag" v-if="base_info.service_tag != ''">
              {{ base_info.service_tag }}
            </div>
          </div>
          <div class="mid" style="display: flex; justify-content: space-between">
            <!-- 两周内：主动投递
            <span class="num">{{ apply_num }}</span>
            次；被下载
            <span class="num">{{ download_num }}</span>
            次；被浏览
            <span class="num">{{ base_info.click }}</span>
            次 -->

            <!-- <div >   {{ base_info.householdaddress }}</div> -->
            <div>
              <div class="dry">{{ base_info.householdaddress_name }}</div>
            </div>

            <div>{{ base_info.updatetime }}更新</div>
          </div>
          <div class="down" style="display: flex; justify-content: space-between">
            <div>
              <span v-if="base_info.is_setmeal || !base_info. isFortyEightHours" style="color: rgb(255 177 0);font-size: 14px;">{{!base_info.isbuy?'所需点券':'买断所需点券'}}：{{base_info.service_amount}}</span>
              <span v-else style="font-size: 14px;">{{ intention_list[0].address || '' }}</span>
              <!-- <div
              class="right"
              @click="showDetail = !showDetail"
              v-if="moreDetailBtn"
            >
             项目标签
            </div> -->
            </div>
            <div class="wage" :class="{'wageColor':true}">
              <!-- 预算{{ base_info.intention_wage || "面议" }} -->
					已参与{{base_info&&base_info.involved_count}}/{{base_info&&base_info.involved}}
            </div>
          </div>
          <!--  <div class="collect" @click="doFav">
            {{ has_fav == 1 ? "已收藏" : "收藏" }}
          </div>
            <div class="share" @click="doShare">分享</div>-->
        </div>
      </div>
      <div class="box_nav" v-if="$store.state.config.shortvideo_enable === '1'">
        <div
          class="item"
          :class="resumeShow === 'resume' ? 'active' : 'resource'"
          @click="resumeShow = 'resume'"
        >
          项目信息
        </div>
        <div class="item" :class="resumeShow === 'video' ? 'active' : 'resource'" @click="resumeShow = 'video'">
          <span style="position: relative; display: inline-block;">
            参考资料
            <div v-if="hasImg" style="padding: 5px;border-radius: 50%;background-color: red;position: absolute;right: -6px;top: -2px;"></div>
          </span>
          <!-- ({{videonum}}) -->
        </div>
         <div 
          v-if="show_contact == 1"
          class="item "
          :class="resumeShow === 'resource' ? 'active' : 'resource'"
          @click="resumeShow = 'resource'"
        >
          沟通记录
          <!-- ({{videonum}}) -->
        </div>
      </div>
      <div class="box_resume_some" v-if="resumeShow === 'resume'">
        <div
          class="box_2"
          v-if="
            base_info.tag_text_arr != undefined &&
            base_info.tag_text_arr.length > 0
          "
        >
          <div class="box_head"><div class="txt">个性标签</div></div>
          <div class="content">
            <div class="item" v-for="(tag,index) in base_info.tag_text_arr" :key="index">
              {{ tag }}
            </div>
            <div class="clear"></div>
          </div>
        </div>
        <div class="content_wrapper">
          <div class="box_3" style="padding: 0 13px;">
            <div class="box_head">
              <!-- <div class="right_text">{{base_info.current_text}}</div> -->
            </div>
            <div class="productName">产品名称： {{ base_info.idcard }}</div>
            <div class="box_content">
              <div class="tx2" v-for="(item, index) in intention_list" :key="index">
                <div class="Industry">
                  <!-- 所属行业：{{ base_info.major_text || '不限' }} -->
                  所属行业：{{ base_info.majorName || "不限" }}
                </div>
                <div class="Industry">
                  采购数量：{{ base_info.purchase_quantity || "" }}
                </div>
                <div class="Industry">
                  地区要求：{{ base_info.classifiy || "" }}
                </div>
                <div class="Industry">
                  发票类型：{{ base_info.invoice_type || "" }}
                </div>
                <div class="Industry">
                  项目在：{{ intention_list[0].address || '' }}
                </div>
              </div>
            </div>
          </div>
          <!-- <div style="border-bottom: 2px solid #e3e3e3; width: 100%"></div> -->
          <div class="content_wrapper" style="border-top: 1px solid #ccc;">
            <!--自我描述-->
            <div class="box_5" v-if="base_info.specialty != ''">
              <div class="box_head"><div class="txtss">需求描述</div></div>
              <div class="box_content">
                <div class="decs" v-for="(item, index) in base_info.specialty" :key="index">
                  {{ item }}
                </div>
                <div class="explain decs">
                     说明：以上需求描述为项目专员代客户整理发布，相关产品参数和采购要求，以客户电话描述为主！
                </div>
              </div>
            </div>
            <!-- <div style="border-bottom: 2px solid #e3e3e3; width: 100%"></div> -->
          </div>
          <!--联系方式-->
          <div class="box_cac">
            <div class="box_head">
              <div class="txts">联系方式</div>
            </div>
            <div class="box_content">
              <div class="item">
                联系人：{{ contact_info.name }}
              </div>
				  <div class="item">
				    岗位：{{ contact_info.post }}
				  </div>
          <div class="item">
				    联系电话：{{ contact_info.mobile }}
				  </div>
          <div class="item">
				    微信：{{ contact_info.weixin }}
				  </div>
				  <div class="item">
				    公司名称：{{ contact_info.companyname }}
				  </div>
				  <div class="item" v-if="isLogin">
				    公司地区：{{ contact_info.address }}
				  </div>
				  <div class="item"  v-if="isLogin">
				    成立日期：{{ contact_info.incorporation_date }}
				  </div>
          <div class="item"  v-if="isLogin">
				    注册资本：{{ contact_info.registered_capital }}
				  </div>
          <div class="item"  v-if="isLogin">
				    企业类型：{{ contact_info.company_type }}
				  </div>
          <div class="item"  v-if="isLogin && base_info.isbuy">
				    项目来源：{{ contact_info.project_source }}
				  </div>
          <div class="getMore">
            <span v-if="isLogin && !base_info.isbuy" @click="doDownload">
              我要查看更多联系信息>>
            </span>
            <span v-if="!isLogin" @click="goLogin('/member/login/company')"> 立即登录，获取更多报价信息
            </span>
				  </div>
            </div>
            <div class="code_pro_wrap" v-if="show_contact == 1 && phone_protect_open">
              <img class="secret" src="../assets/images/318.jpg" />
              <div v-if="phone_protect_type == 1" class="pro_tip">
                1.需要使用指定号码拔打,非指定号码无法拔通; 2.隐私号码有效<span v-text="phone_protect_timeout" ></span>
					 秒,过期后需再次点击拔号
              </div>
            </div>
            <div class="contact_tip" v-if="show_contact == 0 && show_contact_note == 'need_login'" @click="showLogin = true">
              <div class="tx1">您尚未登录</div>
              <div class="tx2">
                <span class="link">点击登录</span>后可获取项目联系方式
              </div>
            </div>
            <div class="contact_tip" v-if="   show_contact == 0 && show_contact_note == 'need_company_login'">
              <div class="tx1">项目联系方式</div>
              <div class="tx2">仅对企业会员开放</div>
            </div>
            <!-- <div class="contact_tip" v-if="show_contact == 0 && show_contact_note == 'need_download'" @click="doDownload">
              <div class="tx1"><span class="link">立即报价</span></div>
              <div class="tx2">获取项目联系方式</div>
            </div> -->
          </div>
        </div>
        <div class="form_split_10"></div>

        <div class="form_split_10"></div>
        <div class="content_wrapper">
          <!--项目经历-->
          <div
            class="box_9"
            v-if="
              resume_module.project !== undefined &&
              resume_module.project.is_display == 1 &&
              project_list.length > 0
            "
          >
            <div class="box_head"><div class="txt">项目经历</div></div>
            <div class="box_content">
              <div class="tx1" v-for="(item, index) in project_list" :key="index">
                <div class="t1">{{ item.projectname }}</div>
                <div class="t2">
                  {{ item.starttime | monthTimeFilter }}
                  <span v-if="item.todate == 1">至今</span>
                  <span v-else>至 {{ item.endtime | monthTimeFilter }}</span>
                </div>
                <div class="t3">{{ item.role }}</div>
                <div class="t4">
                  {{ item.description }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="form_split_10"
          v-if="
            resume_module.certificate !== undefined &&
            resume_module.language !== undefined &&
            resume_module.certificate.is_display == 1 &&
            certificate_list.length > 0 &&
            resume_module.language.is_display == 1 &&
            language_list.length > 0
          "
        ></div>
        <div
          class="content_wrapper"
          v-if="
            resume_module.certificate !== undefined &&
            resume_module.language !== undefined &&
            resume_module.certificate.is_display == 1 &&
            certificate_list.length > 0 &&
            resume_module.language.is_display == 1 &&
            language_list.length > 0
          "
        >
          <!--我的作品-->
          <div class="box_12">
            <div class="box_head"><div class="txt">我的作品</div></div>
            <div class="box_content">
              <swiper :options="swiperOption" v-if="$store.state.swiperLoaded">
                <swiper-slide v-for="(item, index) in img_list" :key="index">
                  <img
                    :src="item.img_src"
                    alt="项目照片作品"
                    @click="previewImg(index)"
                  />
                </swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
              </swiper>
            </div>
          </div>
        </div>
			<div class="attention">
				<div class="attention1"><img src="http://qiniucdn.hangyedaniu.com/img/logo.jpg" /></div>
				<div class="attention2">
					<div class="attention2Text1">机械大牛</div>
					<div class="attention2Text2">关注公众号, 及时获取商机</div>
				</div>
				<div class="attention3" @click="attention">
					去关注
				</div>
			</div>
			<div class="form_split_10"></div>
        <div class="content_wrapper">
          <div class="box_report">
            <div class="tx1">项目经人工审核无误后发布，请及时参与报价！</div>
            <div class="tx2">
              若发现采购已经结束，请立即申请退款
            </div>
            <div class="tx3" @click="handlerReport" style="display: flex; justify-content: space-between; flex-direction: column;">
				    	<span>我要申诉</span>
				    </div>
          </div>
        </div>
        <div class="form_split_10"></div>
        <div class="box_13">
          <div class="bottom_bar">
            <div class="item_call" @click="doTel">电话</div>
            <div
              :class="
                has_fav == 1 ? 'item_collect item_collect_ac' : 'item_collect'
              "
              @click="doFav"
            >
              {{ has_fav == 1 ? "已收藏" : "收藏" }}
            </div>
            <!-- <div :class="['item_chat',!isSubscribe?'':'item_chat1' ]" @click="doMsg">{{isSubscribe?'已订阅':'订阅项目'}}</div> -->
            <!-- base_info.isbuy：是否本人买过 -->
            <!-- base_info.is_user_buyout：是否本人买断 -->
            <div v-if="!base_info.isbuy" class="item_apply" @click="doDownload">获取联系方式</div>
            <!-- 买过 -->
            <div v-else-if="base_info.involved_count != base_info.involved" class="item_apply" @click="doDownload1">买断项目</div>
            <div v-else-if="base_info.is_user_buyout" class="item_apply" @click="doDownload">
              你已买断
            </div>
            <div class="item_apply" @click="doDownload" v-else>
                该项目参与人数已满
            </div>
            <!-- base_info.involved_count}}/{{base_info&&base_info.involved}} -->
            
            <!-- <div class="item_apply" v-if="show_contact===0" @click="doDownload">立即报价</div> -->
            <!-- <div class="item_apply" v-else @click="doInterview">我的报价</div> -->
            <!-- <div class="clear"></div> -->
          </div>
        </div>
      </div>
      <div v-if="!isLogin" style="text-align:center;font-size:15px;padding:20px 0">
          <p>您尚未登录，点击登录后可获取联系方式</p>
          <p style="padding: 5px;color: #0072ff;" @click="showLogin = true">去登录>></p>
      </div>
      <div class="box_video_some" v-if="resumeShow === 'video' && isLogin">
        <div style="font-size: 16px; padding: 20px; color: #000">
          参考图片：
        </div>
        <div style=" word-wrap: break-word; width: 100vw; display: flex; flex-wrap: wrap; ">
          <div v-for="(item, index) in img_list" :key="index">
            <img v-if="item.img_src.indexOf('.mp4') < 0" :src="item.img_src" alt="" style="width: 100px; height: 100px; margin: 12px"  @click="previewImg(index)"/>
            <video v-else style="width: 280px; height: 130px; margin: 12px" controls>
              <source :src="item.img_src" type="video/mp4">
              <source :src="item.img_src" type="video/ogg">
               您的浏览器不支持Video标签。
            </video>
          </div>
        </div>
        <VideoList v-if="img_list.length < 1" :videotype="2" :id="query_id" :gointype="'unitplay'"></VideoList>
      </div>
      <div class="box_video_some" v-if="resumeShow === 'resource'">
        <!-- <div style="font-size:16px;padding:20px;color:#000;">沟通记录：</div> -->
        <div v-for="item in allrecord" :key="item">
          <div style="font-size: 16px; padding: 20px 20px 0 20px; color: #000">
            设备型号：{{ item.facilityname }}
          </div>
          <div
            style="font-size: 16px; padding: 10px 20px 20px 20px; color: #000"
          >
            {{ item.interview_date }}：{{ item.content }}
          </div>
        </div>
        <div class="addrecord" @click="showRecord = true">
          +添加新的沟通记录
        </div>
        <!-- <VideoList :videotype="2" :id="query_id" :gointype="'unitplay'"></VideoList> -->
      </div>
    </van-skeleton>
    <van-popup
      v-model="showLogin"
      position="right"
      :overlay="false"
      style="width: 100%; height: 100%"
    >
      <Login
        :utype="1"
        :single_login="true"
        @afterLogin="afterLogin"
        :after_login_data="after_login_data"
      ></Login>
    </van-popup>

    <van-popup v-model="showDirectService" closeable round :style="{ width: '85%' }">
      <div style="padding: 0 0 20px 0;">
        <div style="font-size: 18px;text-align: center;height: 50px;line-height: 50px;color: #000;font-weight: 500;">
          选择支付方式
        </div>
        <div style="font-size: 18px;text-align: center;height: 50px;line-height: 50px;color: #000;font-weight: 500;background: #e4e4e4;">
          ￥{{base_info.service_amount}}
        </div>
        <div v-if="false" style="border-bottom: 1px solid #eaeaea;font-size: 13px;text-align: center;height: 50px;line-height: 50px;color: rgb(0, 0, 0);font-weight: 500;display: flex;padding: 0 20px 0 20px;">
          <div style="display: flex;align-items: center;">
            <img width="22" src="@/assets/images/u69.png" /> 积分<span style="color: red;">免费</span>兑换项目
          </div>
          <div style="flex: 1;text-align: right;color: #4690ff;font-size: 13px;">
            去获取 >
          </div>
        </div>
        <div @click="go('/member/order/add/common?type=setmeal')" style="border-bottom: 1px solid #eaeaea;font-size: 13px;text-align: center;height: 50px;line-height: 50px;color: rgb(0, 0, 0);font-weight: 500;display: flex;padding: 0 20px 0 20px;">
          <div style="display: flex;align-items: center;">
            <img width="22" src="@/assets/images/u65.png" /> 点券支付（充值优惠）(<span style="color: red;">{{base_info.download_resume_point}}</span>)
          </div>
          <div style="flex: 1;text-align: right;color: #4690ff;font-size: 13px;">
             >
          </div>
        </div>
        <div v-if="!base_info.is_setmeal" @click="appearPayment(2)" style="border-bottom: 1px solid #eaeaea;font-size: 13px;text-align: center;height: 50px;line-height: 50px;color: rgb(0, 0, 0);font-weight: 500;display: flex;padding: 0 20px 0 20px;">
          <div style="display: flex;align-items: center;">
            <img width="22" src="https://www.hangyedaniu.com/upload/resource/img-guanwang/weixin.png"/> 微信支付(推荐)
          </div>
          <div style="flex: 1;text-align: right;color: #4690ff;font-size: 13px;">
             >
          </div>
        </div>
        <div style="font-size: 13px;padding: 10px;font-weight: 500;">
            平台承诺：所有采购项目均为真实有效，若发现信息虚假，可全额退款！
            <span style="color: #4690ff;" @click="rotate = !rotate">展开更多<span :class="{'rotate':rotate}" style="transform: rotate(90deg);transition-duration: .5s;display: inline-block;" >></span></span>
        </div>
        <span v-show="rotate">
          <div style="font-size: 13px;padding: 5px;font-weight: 500;">
              项目满足以下任意条件可<span style="color: red;">全额退款</span>：
          </div>
          <div style="font-size: 13px;padding: 5px;font-weight: 500;">
              1.支付服务费用后，打给采购方，采购方电话显示为空号；
          </div>
          <div style="font-size: 13px;padding: 5px;font-weight: 500;">
              2.支付服务费用后，打给采购方，采购方明确告知供应方已经确定下来了；
          </div>
          <div style="font-size: 13px;padding: 5px;font-weight: 500;">
              注：款项退款时间3小时内（咨询：<span style="color: #4690ff;"><a href="tel:17675797686">17675797686</a></span>）
          </div>
        </span>
      </div>
    </van-popup>

    <van-dialog
      v-model="codePro.show"
      show-cancel-button
      :confirm-button-text="codePro.btnCn"
      @confirm="callCodePro"
      confirm-button-color="#1989fa"
    >
      <div class="line18 m-top">拔打号码</div>
      <div class="line18 color-orange font15 bold" v-text="codePro.x"></div>
      <div class="line18 font12">
        (电话<span class="color-orange" v-text="codePro.timeout"></span
        >秒后失效,请尽快拔打)
      </div>
      <div
        v-if="phone_protect_type == 1"
        class="m-btm line18 font12 color-gray"
      >
        仅支持使用<span v-text="codePro.a"></span>的手机卡拔号
      </div>
    </van-dialog>
    <!-- 添加沟通聊天记录 -->
    <van-popup
      v-model="showRecord"
      position="right"
      :overlay="false"
      style="width: 100%; height: 100%; padding: 0"
    >
      <Head :goback_custom="true" @gobackCustomMethod="showRecord = false">
        填写沟通记录
      </Head>
      <van-form @submit="submitRemark1">
        <van-cell-group inset>
          <van-field
            style="padding: 10px"
            v-model="form1.facilityname"
            name="设备型号"
            label="设备型号"
            placeholder="请填写设备型号"
            :rules="[{ required: true, message: '请填写设备型号' }]"
          />
          <van-field
            style="padding: 10px"
            type="textarea"
            rows="2"
            name="remark"
            v-model="form1.content"
            label="本次沟通内容"
            placeholder="请输入备注内容"
          />

          <van-field
            style="padding: 10px"
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
        <div style="margin: 16px">
          <van-button round block type="info" native-type="submitRemark1">
            确定
          </van-button>
        </div>
      </van-form>
    </van-popup>
    <van-popup v-model="showPayment" closeable position="bottom">
      <PopupPayment
        :amount="directServiceInfo.need_expense"
        @handlerSubmit="handlerDirectPay"
      ></PopupPayment>
    </van-popup>
    <van-dialog v-model="showDetail" title="更多基本信息">
      <div class="details_pop_box">
        <div
          class="detail_line"
          v-if="
            field_rule.basic.marriage !== undefined &&
            field_rule.basic.marriage.is_display == 1 &&
            base_info.marriage_text
          "
        >
          <div class="line_left">
            {{ field_rule.basic.marriage.field_cn }}：
          </div>
          <div class="line_right">
            {{ base_info.marriage_text }}
          </div>
          <div class="clear"></div>
        </div>
        <div
          class="detail_line"
          v-if="
            field_rule.basic.height !== undefined &&
            field_rule.basic.height.is_display == 1 &&
            base_info.height != '' &&
            base_info.height > 0
          "
        >
          <div class="line_left">{{ field_rule.basic.height.field_cn }}：</div>
          <div class="line_right">{{ base_info.height }}CM</div>
          <div class="clear"></div>
        </div>
        <div
          class="detail_line"
          v-if="
            field_rule.basic.major !== undefined &&
            field_rule.basic.major.is_display == 1 &&
            base_info.major_text
          "
        >
          <div class="line_left">{{ field_rule.basic.major.field_cn }}：</div>
          <div class="line_right">
            {{ base_info.major_text }}
          </div>
          <div class="clear"></div>
        </div>
        <div
          class="detail_line"
          v-if="
            field_rule.basic.householdaddress !== undefined &&
            field_rule.basic.householdaddress.is_display == 1 &&
            base_info.householdaddress
          "
        >
          <div class="line_left">
            {{ field_rule.basic.householdaddress.field_cn }}：
          </div>
          <div class="line_right">
            {{ base_info.householdaddress }}
          </div>
          <div class="clear"></div>
        </div>
        <div
          class="detail_line"
          v-if="
            field_rule.basic.residence !== undefined &&
            field_rule.basic.residence.is_display == 1 &&
            base_info.residence
          "
        >
          <div class="line_left">
            {{ field_rule.basic.residence.field_cn }}：
          </div>
          <div class="line_right">
            {{ base_info.residence }}
          </div>
          <div class="clear"></div>
        </div>
        <div
          class="detail_line"
          v-if="
            field_rule.basic.custom_field_1 !== undefined &&
            field_rule.basic.custom_field_1.is_display == 1 &&
            base_info.custom_field_1
          "
        >
          <div class="line_left">
            {{ field_rule.basic.custom_field_1.field_cn }}：
          </div>
          <div class="line_right">
            {{ base_info.custom_field_1 }}
          </div>
          <div class="clear"></div>
        </div>
        <div
          class="detail_line"
          v-if="
            field_rule.basic.custom_field_2 !== undefined &&
            field_rule.basic.custom_field_2.is_display == 1 &&
            base_info.custom_field_2
          "
        >
          <div class="line_left">
            {{ field_rule.basic.custom_field_2.field_cn }}：
          </div>
          <div class="line_right">
            {{ base_info.custom_field_2 }}
          </div>
          <div class="clear"></div>
        </div>
        <div
          class="detail_line"
          v-if="
            field_rule.basic.custom_field_3 !== undefined &&
            field_rule.basic.custom_field_3.is_display == 1 &&
            base_info.custom_field_3
          "
        >
          <div class="line_left">
            {{ field_rule.basic.custom_field_3.field_cn }}：
          </div>
          <div class="line_right">
            {{ base_info.custom_field_3 }}
          </div>
          <div class="clear"></div>
        </div>
      </div>
    </van-dialog>
    <van-popup
      :lazy-render="false"
      v-model="showInvite"
      position="right"
      :overlay="false"
      style="width: 100%; height: 100%"
    >
      <AddInvitation
        ref="child"
        from="detail"
        :apply_fullname="base_info.fullname"
        :resume_id="base_info.id"
        @closePopup="showInvite = false"
      ></AddInvitation>
    </van-popup>
    <van-popup
      :lazy-render="false"
      v-model="showTipoff"
      position="right"
      :overlay="false"
      style="width: 100%; height: 100%"
    >
      <Tipoff
        ref="tipoff"
        :type="2"
        :target_id="base_info.id"
        :fullname="base_info.fullname"
        @closePopout="showTipoff = false"
      ></Tipoff>
    </van-popup>
    <div class="alw-wx-layer" v-if="showWxLayer" @click="cancelShare"></div>
    <div class="alw-layer" v-if="showLayer" @click="cancelShare"></div>
    <SharePoster
      v-if="showPoster"
      @closePoster="closePoster"
      :type="'resume'"
      :infoid="shareid"
    ></SharePoster>
    <van-overlay z-index="3" :show="showPoster" @click="showPoster = false" />
    <van-popup v-model="showShare" position="bottom">
      <Share
        @cancelShare="cancelShare"
        @handleForward="handleForward"
        @handlePoster="handlePoster"
      ></Share>
    </van-popup>
    <!-- <div class="generate_posters" @click="handlePoster">生成<br />海报</div> -->
    <!-- 绑定微信开始 -->
    <van-dialog
      v-model="bindWeixinShow"
      title="系统提示"
      :show-cancel-button="false"
      :show-confirm-button="true"
      @confirm="handleImCheckBind"
    >
      <div class="bind-weixin-box">
        <div class="title-1">您当前未绑定微信，绑定后可发起聊天。</div>
        <div class="img">
          <img :src="scanQrcodeImg" alt="" />
        </div>
        <div class="title-2">使用微信扫一扫，按提示快速绑定</div>
      </div>
    </van-dialog>
    <!-- 绑定微信结束 -->
    <!-- 切换案例开始 -->
    <van-overlay :show="selectJobShow" z-index="3" :lock-scroll="false">
      <SelectJob
        @handleCommunicate="handleCommunicate"
        @handleCloseSelectJob="handleCloseSelectJob"
        :chatid="imChatid"
        :companyId="companyId"
        :isSelectJob="false"
      ></SelectJob>
    </van-overlay>
    <!-- 切花案例结束 -->
    <!-- 图片弹窗 -->
    <div class="imgs_srcp" v-if="imgloading" catch:touchmove @touchmove.prevent >
    </div>
    <div v-if="imgloading" @click="dianji('')" class="qq" catch:touchmove @touchmove.prevent>
         <div><img :src="imgs_src_hell" alt="" style="width:100%;height:400px" /></div>
    </div>
	<!-- 订阅弹框 -->
	<div class="subscribe_pu" v-if="subscribe_pu">
		<div :class="['text1',!isSubscribe?'text':'']">
			{{ !isSubscribe ?'已经取消订阅':'您已成功订阅类似项目，有新项目时会第一时间通知到您微信'}}<br/>
			<span v-if="isSubscribe" class="span1">微信绑定：{{!isWeixin ?'您尚未绑定微信，':'：已经微信绑定'}}<span v-if="!isWeixin" class="span2" @click="go('/member/company/account')">去绑定>></span></span>
		</div>
		<div class="text2" v-if="isSubscribe" @click="subscribe_pu = false">
			<div>完成</div>
		</div>
	</div>
	<!-- 订阅弹框 -->
	<div class="subscribe_pu" v-if="company_auth_pop">
		<div :class="['text1']">
			<span class="span1">参与报价需要进行业务认证，认证后的企业更容易获得采购方信任<span class="span2" @click="go('/member/company/account')">立即认证>></span></span>
		</div>
		<div class="text2" @click="company_auth_pop = !company_auth_pop">
			<div>关闭</div>
		</div>
	</div>
	<div class="appear" v-if="appear">
		该项目为付费项目，参与报价需支付{{base_info.service_amount}}元服务费，支付后即可获得采购方联系方式
		<br /><br />
		平台承诺：所有采购项目均为真实有效，若发现信息虚假，可全额退款！
		<img src="@/assets/images/gb.png" @click="appear = false"/>
		<div class="appearBox">
			<div class="appearBox1" @click="appearPayment(1)">点券支付（充值优惠）</div>
			<div class="appearBox2" @click="appearPayment(2)">微信支付</div>
		</div>
	</div>
	<div class="subscribe_pu" v-if="insufficient">
		<div :class="['text1','text']">
			<span class="span1">您的点券余额不足<span class="span2" @click="go('/member/order/add/common')">去充值>></span></span>
		</div>
		<div class="text2" @click="insufficient = !insufficient">
			<div>关闭</div>
		</div>
	</div>
	<div class="subscribe_pu" v-if="prove">
		<div :class="['text1','text']">
			<span class="span1">该项目参与人数已满，<span class="span2" @click="householdaddress">点击订阅类似项目</span>，我们将第一时间为您推送</span>
		</div>
		<div class="text2" @click="prove = !prove">
			<div>关闭</div>
		</div>
	</div>
	<div v-if="appear" style="position: fixed;top: 0; left: 0; right: 0; bottom: 0; z-index: 9; "></div>

  <van-popup v-model="DownloadSucceeded" :style="{ width: '85%' }" round closeable >
      <div style="padding: 0 0 0px 0;">
        <div style="font-size: 15px;text-align: center;height: 45px;line-height: 45px;">下载成功 </div>
        <p style="font-size: 15px;padding: 0px 13px 12px;">温馨提示：若项目匹配度高，建议您买断该项目！买断后，任何人不得参与此项目，会大大提高您的成交率！</p>
        <div style="font-size:15px;display: flex;">
          <div @click="DownloadSucceeded = false" style="text-align: center;width: 50%;background: rgb(220 220 220);color: rgb(0 0 0);height: 40px;border-radius: 10px 0px 0px 10px;line-height: 40px;">取消</div>
          <div @click="doDownload1" style="text-align: center;width: 50%;background: #fb2;color: #fff;height: 40px;border-radius: 0 10px 10px 0;line-height: 40px;">立刻买断</div>
        </div>
      </div>
  </van-popup>
  <van-popup v-model="insufficientConsumption" :style="{ width: '85%' }" round closeable >
      <div style="padding: 0 0 10px 0;">
        <div style="font-size: 15px;text-align: center;height: 45px;line-height: 45px;background: #e2e2e2;color: #131313;">点券支付</div>
        <div style="font-size: 15px;padding: 8px 20px;color: #000;">参与项目<span style="padding:0 0 0 30px;">{{base_info.fullname}}</span></div>
        <div style="font-size: 15px;padding: 8px 20px;color: #000;">所需点券<span style="padding:0 0 0 30px;color: #FF6600;">￥{{base_info.service_amount}}</span></div>
        <div style="font-size: 15px;padding: 8px 20px;color: #000;">
          支付方式
          <span class="insufficientConsumptionSpan" style="">
               点券支付（充值更优惠）
          </span>
        </div>
        <div style="font-size: 12px;padding: 8px 20px;text-align: right; color: #409EFF;"> 我的点券：{{base_info.download_resume_point}}  个去充值> </div>
        <p style="font-size:12px;padding: 8px 20px;">买断该项目后，该项目会立即下线，其他人不能再通过购买项目方式联系采购方；将会大大提高您的中签率！！</p>
      </div>
  </van-popup>
  
  </div>
</template>

<script>
import VideoList from "./shortvideo/components/VideoListtwo";
import wxshare from "@/assets/js/share.js";
import Tipoff from "@/components/Tipoff";
import AddInvitation from "@/components/AddInvitation";
import { isWeiXin, parseTime } from "@/utils/index";
import PopupPayment from "@/components/service/PopupPayment";
import http from "@/utils/http";
import api from "@/api";
import Login from "@/components/Login";
import Share from "@/components/share/Share";
import SharePoster from "@/components/share/SharePoster";
import Vue from "vue";
import { ImagePreview,Dialog } from "vant";
import SelectJob from "@/views/im/components/SelectJob.vue";
import { mapMutations } from "vuex";
import { mapState } from "vuex";
Vue.use(ImagePreview);
export default {
  name: "ResumeShow",
  components: {
    VideoList,
    Login,
    PopupPayment,
    AddInvitation,
    Tipoff,
    Share,
    SharePoster,
    SelectJob,
  },
  filters: {
    monthTimeFilter(timestamp) {
      return parseTime(timestamp, "{y}-{m}");
    },
  },
  data() {
    return {
      hasImg:'',
      isLogin:false,
      imgs_src_hell:"",
      imgloading: false,
      resumeShow: "resume",
      codePro: {
        show: false,
        x: "",
        timeout: 0,
        a: "",
        btnCn: "立即拔打",
      },
      showRecord: false,
      showTipoff: false,
      showInvite: false,
      moreDetailBtn: false,
      showDetail: false,
      showPayment: false,
      directServiceInfo: {},
      enableClick: true,
      mainLoading: true,
      query_id: "",
      is_company_login: false,
      showLogin: false,
      after_login_data: {},
      resume_module: {},
      field_rule: { basic: {}, contact: {}, intention: {}, education: {} },
      base_info: {},
      intention_list: [],
      show_contact: 0,
      show_contact_note: "",
      contact_info: {},
      work_list: [],
      education_list: [],
      project_list: [],
      training_list: [],
      language_list: [],
      certificate_list: [],
      img_list: [],
      showDatePicker: false,
      minDate: new Date(),
      maxDate: new Date(2029, 10, 1),
      apply_num: 0,
      download_num: 0,
      has_fav: 0,
      phone_protect_open: false,
      phone_protect_timeout: 0,
      phone_protect_type: 0,
      cur_com_mobile: "",
      form1: {
        facilityname: "",
        content: "",
        interview_date: "",
        rid: "",
      },
      swiperOption: {
        pagination: {
          el: ".swiper-pagination",
          renderBullet: function (index, className) {
            return (
              '<span class="' + className + ' resume-show-swiper-span"></span>'
            );
          },
          bulletActiveClass: "resume-show-swiper-bullet-active",
        },
        autoplay: true,
        slidesPerView: 3,
        slidesPerGroup: 3,
        freeMode: true,
        speed: 600,
        watchOverflow: true,
      },
      shareid: 0,
      showShare: false,
      showWxLayer: false,
      showLayer: false,
      showPoster: false,
      previewImgList: [],
      page: 1,
      finished: false,
      loading: false,
      finished_text: "",
      videonum: 0,
      bindWeixinShow: false,
      jobid: 0,
      selectJobShow: false,
      imChatid: "",
      companyId: "",
      selectJobObj: {},
      // 绑定微信二维码
      scanQrcodeImg: "",
      allrecord: "",
	  subscribe_pu:false,	//弹框
	  isSubscribe:false,  //是否订阅
	  isWeixin:false , 		//是否微信绑定
	  time:null,			//定时器
	  appear:false,
	  showWeixin:false,	//微信弹框
	  params:{},
    showDirectService: false, //点券不足弹框
	  insufficient:false,		//点券不足弹框  暂时不用
	  company_auth:0,				//是否企业认证 0未认证
	  company_auth_pop:false,	//企业认证的弹框
	  prove:false,
    insufficientConsumption:false,
    DownloadSucceeded:false,   //立刻买断
    rotate:false,
    };
  },
  computed:{
	  ...mapState(['userInfo','userIminfo','openId'])
  },
  created() {
    this.query_id = this.$route.params.id;
    this.is_company_login = !!(this.$store.state.LoginOrNot === true && this.$store.state.LoginType == 1);
    // 请求数据
    this.fetchData();
    this.all_record();
    this.getScanQrcodeImg();
    if (this.$store.state.config.shortvideo_enable === "1") {
      this.fetchVideonum();
    }
  },
  methods: {
    dianji(images) {
      // console.log(images);
      if (images) {
        this.imgs_src_hell = images;
        this.imgloading = true;
      } else {
        this.imgloading = false;
      }
    },
    ...mapMutations(["setImShowParams", "setimChatid"]),
    /**
     * 绑定微信二维码
     */
    formatterDate(type, val) {
      if (type === "year") {
        return `${val}年`;
      } else if (type === "month") {
        return `${val}月`;
      } else if (type === "day") {
        return `${val}日`;
      }
      return val;
    },
    getScanQrcodeImg() {
      http.get(api.get_qrcode, { type: "bind_weixin" }).then((res) => {
        this.scanQrcodeImg = res.data;
      });
    },
    callCodePro() {
      location.href = `tel:${this.codePro.x}`;
    },
    async all_record() {
      const params = {
        id: this.query_id,
      };
      let { data } = await http.get(api.all_record, params);
      this.allrecord = data;
    },
    async fetchData(next_method = null) {
      const params = {
        id: this.query_id,
      };
      let res = await http.get(api.resumeshow, params);
		console.log(res,"数据res、++++++++++++++++++数据")
    this.isLogin = res.data.base_info.isLogin
      const {
        resume_module,
        field_rule,
        base_info,
        intention_list,
        show_contact,
        show_contact_note,
        contact_info,
        work_list,
        education_list,
        project_list,
        training_list,
        language_list,
        certificate_list,
        img_list,
        apply_num,
        download_num,
        has_fav,
        phone_protect_open,
        phone_protect_timeout,
        cur_com_mobile,
        phone_protect_type,
      } = { ...res.data };
	  console.log(res.data,'1212')
    this.hasImg = res.data.hasImg
      this.resume_module = resume_module;
      this.field_rule = field_rule;
		this.company_auth = res.data.company_auth
	  this.isSubscribe = res.data.base_info.isSubscribe;  //是否订阅
	  this.isWeixin = res.data.base_info.isWeixin; 		// 绑定微信
      let specialty = base_info.specialty.split("\n");
      // 需求
      base_info.specialty = specialty;
      // console.log(base_info.specialty, "11111111111111");
      this.base_info = base_info;
      // 判断是否显示更多基本信息按钮
      for (const key in this.field_rule.basic) {
        let item = this.field_rule.basic[key];
        if (item.is_display == 1 && this.base_info[key]) {
          this.moreDetailBtn = true;
          break;
        }
      }
      this.intention_list = intention_list;
      this.show_contact = show_contact;
      this.show_contact_note = show_contact_note;
      this.contact_info = contact_info;
      this.work_list = work_list;
      this.education_list = education_list;
      this.project_list = project_list;
      this.training_list = training_list;
      this.language_list = language_list;
      this.certificate_list = certificate_list;
      this.img_list = img_list;
      this.apply_num = apply_num;
      this.download_num = download_num;
      this.has_fav = has_fav;
      this.phone_protect_open = phone_protect_open;
      this.phone_protect_timeout = phone_protect_timeout;
      this.cur_com_mobile = cur_com_mobile;
      this.phone_protect_type = phone_protect_type;
      let wechatShareInfo = {
        fullname: base_info.fullname,
        sex: base_info.sex == 1 ? "男" : "女",
        age: base_info.age + "岁",
        education: base_info.education_text,
        experience: base_info.experience_text,
        intention_jobs: base_info.intention_jobs_text,
        imgUrl: base_info.photo_img_src,
      };
      wxshare(wechatShareInfo, "resumeshow", location.href);
      this.mainLoading = false;
      if (next_method !== null) {
        this[next_method]();
      }
      // this.previewImgList = this.img_list.map(function (item) {
      //   if(item.img_src.indexOf('.mp4') < 0){
      //       return item.img_src;
      //   } else{
      //     return false
      //   }
      // });
      for (let index = 0; index < this.img_list.length; index++) {
        if(this.img_list[index].img_src.indexOf('.mp4') < 0){
           this.previewImgList.push(this.img_list[index].img_src)
        }
      }
    },
    async doTel() {
      if (this.show_contact == 1) {
        if (this.phone_protect_open) {
          let res = await http.get(api.secret_phone, {
            resume_id: this.query_id,
          });
          const { code, message, data } = res;
          if (code == 200) {
            this.codePro.x = data.x;
            this.codePro.timeout = data.timeout;
            this.codePro.a = data.a;
            this.codePro.show = true;
            let that = this;
            this.$nextTick(() => {
              let tmh = null;
              let tm = function () {
                if (that.codePro.show && that.codePro.timeout > 0) {
                  that.codePro.timeout--;
                  tmh = setTimeout(tm, 1000);
                } else {
                  that.codePro.show = false;
                  clearTimeout(tmh);
                }
              };
              setTimeout(tm, 1000);
            });
          } else {
            this.$message.error(message);
          }
        } else {
          this.$dialog
            .confirm({
              title: "提示",
              message: "即将拨打号码：" + this.contact_info.mobile,
              confirmButtonText: "确定拨打",
            })
            .then(() => {
              window.location.href = `tel:${this.contact_info.mobile}`;
            })
            .catch(() => {});
        }
      } else if (this.is_company_login === false) {
        this.$dialog
          .confirm({
            title: "提示",
            message: "当前操作需要登录企业账号",
            confirmButtonText: "去登录",
          })
          .then(() => {
            this.showLogin = true;
            this.after_login_data = {
              method: "doTel",
            };
          })
          .catch(() => {});
      } else {
        if (this.show_contact_note == "need_download") {
          this.$notify("请先立即报价");
        }
      }
    },
    submitRemark1(values) {
      this.form1.rid = this.query_id;
      http
        .post(api.add_record, this.form1)
        .then((res) => {
          this.all_record();
          this.showRecord = false;
        })
        .catch(() => {});
    },
	go(url){
		// 关闭弹窗
		this.insufficient = false
		this.subscribe_pu = false
		this.showWeixin = false
		this.company_auth_pop = false
		this.$router.push(url);
	},
  goLogin(url){
    this.$router.push(url+'?redirect=/resume/'+this.query_id);
  },
    doMsg() {
		clearTimeout(this.time)
			if(this.isSubscribe){ //是否订阅
				http.post(api.saveUserResume,{type:2,householdaddress:[],uid:this.userInfo.uid,resumeid:this.base_info.id}).then(res=>{
					this.isSubscribe = false
					this.prove = false
					this.subscribe_pu = true
					this.time = setTimeout(()=>{
					  this.subscribe_pu = false
					},1500)
				})
			} else{
				this.householdaddress()
			}
    },
	 householdaddress(){
	 		if (this.is_company_login === false) {
	 		  this.$dialog
	 		    .confirm({
	 		      title: "提示",
	 		      message: "当前操作需要登录企业账号",
	 		      confirmButtonText: "去登录",
	 		    })
	 		    .then(() => {
	 		      this.showLogin = true;
	 		      this.after_login_data = {
	 		        method: "doMsg",
	 		      };
	 		    })
	 		    .catch(() => {});
	 		} else {
	 		console.log(this.base_info,'数据数据')
	 		let arr = [];
	 		arr.push(this.base_info.householdaddress)
	 		http.post(api.saveUserResume,{type:2,householdaddress:arr,uid:this.userInfo.uid,resumeid:this.base_info.id}).then(res=>{
	 		  if(this.isWeixin){
				  this.prove = false
	 			  this.isSubscribe = true
	 			  this.subscribe_pu = true
	 		    this.time = setTimeout(()=>{
	 		  	  this.subscribe_pu = false
	 		    },1500)
	 		  } else{
				  this.prove = false
	 			  this.isSubscribe = true
	 			  this.subscribe_pu = true
	 		  }
	 		})
	 		return
	 		  // if (this.base_info.audit != 1) {
	 		  //   this.$notify('该项目还未审核通过，不能继续此操作')
	 		  //   return false
	 		  // }
	 		  http.post(api.company_index, {}).then((res) => {
	 		    var { companyinfo } = res.data;
	 		
	 		    // if (this.jobid == 0) {
	 		    this.companyId = companyinfo.id;
	 		    //   this.selectJobShow = true
	 		    //   return false
	 		    // }
	 		    http
	 		      .post(api.imStart, {
	 		        token: this.$store.state.imToken,
	 		        resumeid: this.base_info.id,
	 		        jobid: this.jobid,
	 		      })
	 		      .then((res) => {
	 		        // disabled 不能使用功能
	 		        // bind_weixin绑定微信
	 		        // complete_resume完善项目
	 		        // 空字符串 正常使用
	 		        // choose_job 选择案例
	 		        // pay 需要购买增值服务，触屏是快捷支付
	 		        console.log(res);
	 		        if (parseInt(res.code) == 200) {
	 		          if (res.data.next == "") {
	 		            this.setImShowParams({
	 		              jobname: this.selectJobObj.jobname,
	 		              name: this.base_info.fullname,
	 		              resumeid: this.base_info.id,
	 		              jobid: this.jobid,
	 		              companyId: companyinfo.id,
	 		            });
	 		            this.setimChatid(res.data.chatid);
	 		            this.$router.push({ path: "/im/" + res.data.chatid });
	 		            return false;
	 		          }
	 		          if (res.data.next == "disabled") {
	 		            // this.$notify({ type: 'danger', message: res.message })
	 		            this.$dialog({
	 		              title: "系统提示",
	 		              message: res.message,
	 		              showConfirmButton: true,
	 		            }).then(() => {});
	 		            return false;
	 		          }
	 		          if (res.data.next == "complete_resume") {
	 		            this.$dialog
	 		              .confirm({
	 		                title: "系统提示",
	 		                message: res.message,
	 		                confirmButtonText: "去完善项目",
	 		                showCancelButton: true,
	 		              })
	 		              .then(() => {
	 		                this.$router.push({ path: "/member/personal/resume" });
	 		              })
	 		              .catch(() => {});
	 		            return false;
	 		          }
	 		          if (res.data.next == "bind_weixin") {
	 		            this.bindWeixinShow = true;
	 		          }
	 		          if (res.data.next == "pay") {
	 		            // 快捷支付
	 		            this.$dialog
	 		              .confirm({
	 		                title: "系统提示",
	 		                message: res.message,
	 		                confirmButtonText: "去支付",
	 		              })
	 		              .then(() => {
	 		                this.$router.push({
	 		                  path: "/member/order/add/common?type=service",
	 		                });
	 		              })
	 		              .catch(() => {});
	 		          }
	 		          if (res.data.next == "choose_job") {
	 		            this.selectJobShow = true;
	 		          }
	 		        }
	 		      });
	 		  });
	 		  // this.$router.push('/im/' + this.base_info.im_userid)
	 		}
	 		//  else {
	 		//   this.$notify('暂时无法与当前用户进行职聊')
	 		//   return false
	 		// }
	 },
    /**
     * 选择沟通案例
     * @jobItem 当前沟通案例信息
     */
    handleCommunicate(jobItem) {
      this.selectJobShow = false;
      this.jobid = jobItem.id;
      this.selectJobObj = jobItem;
      this.doMsg();
    },
    /**
     * 是否绑定微信公众号
     */
    handleImCheckBind() {
      http.get(api.imCheckBind).then((res) => {
        if (res.data != 0) {
          location.reload(true);
        }
      });
    },
    /**
     * 选择案例弹窗关闭
     */
    handleCloseSelectJob() {
      this.selectJobShow = false;
    },
    doInterview() {
      if (this.is_company_login === false) {
        this.$dialog
          .confirm({
            title: "提示",
            message: "当前操作需要登录企业账号",
            confirmButtonText: "去登录",
          })
          .then(() => {
            this.showLogin = true;
            this.after_login_data = {
              method: "doInterview",
            };
          })
          .catch(() => {});
      } else {
        if (this.base_info.audit != 1) {
          this.$notify("该项目还未审核通过，不能继续此操作");
          return false;
        }
        this.showInvite = true;
        this.$refs.child.initCB();
      }
    },
    doDownload1() {
      this.doDownload(1);
      return
      this.$dialog.confirm({
          title: "提示",
          message: "您确定买断该项目吗？",
          confirmButtonText: "立即买断",
        }).then(() => {
          // this.showLogin = true
          this.doDownload(1);
        })
        .catch(() => {});
    },
    doDownload(is_) {
		 if(this.base_info.involved_count >= this.base_info.involved){
			 this.prove = true
			 return false
		 }
      if (this.is_company_login === false) {
        this.$dialog.confirm({
            title: "提示",
            message: "当前操作需要登录企业账号",
            confirmButtonText: "去登录",
          }).then(() => {
            this.showLogin = true;
            this.after_login_data = {
              method: "doDownload",
            };
          }).catch(() => {});
      } else {
        // 判断是否会员,不是会员=>判断是不是24小时项目
        if(!this.base_info.is_setmeal){
          //  记录一次用户行为
            http.post(api.projectApply,{id:this.query_id}).then(res=>{console.log(res,"11111")})
          // 如果不2小时，允许购买 跳过 is_setmeal 这个判断 或者是不是会员买过，如果会员买过也不能购买
            if(this.base_info.isFortyEightHours || this.base_info.is_setmeal_buy){
            this.$dialog.confirm({
                title: "非常抱歉",
                message: `<div style='text-align: left;color: #ffba20;padding: 3px 0;'>该项目为会员项目，您无权参与该报价！</div><div  style='text-align: left;padding: 3px 0;'>项目报价原则：</div><div  style='text-align: left;padding: 3px 0;'>1.会员单位优先于非会员单位<span style='color:#0089ff'>>查看会员价格<</span></div><div  style='text-align: left;padding: 3px 0;'>2.会员单位报价后，非会员单位不得参与报价；</div><div  style='text-align: left;padding: 3px 0;'>3.会员单位2小时内不参与报价，非会员会员方可参与报价；</div>`,
                confirmButtonText: "查看会员价格",
              }).then(() => {
                this.go('/member/order/add/common?type=service')
              })
              .catch(() => {});
            return
          }
        }
        if(this.company_auth === 0){  //company_auth == 0 未得到企业认证
          this.company_auth_pop = true
        } else{
          // 让用户显示确认弹框
          // this.appear = true
          this.params = {
            resume_id: this.query_id,
            buyout: is_ == 1 ? 1 : 0,
          };
            // 判断项目是否过期
          if(this.base_info.statetext == '已停止'){
            Dialog({ message: '项目已停止' });
            Dialog.confirm({
			      title: '提示',
            messageAlign:'left',
            confirmButtonText:'继续参与',
            confirmButtonColor:'#0043ff',
            message: '项目报价日期截止不代表客户真的已经确定好供应商，若您仍想继续参与此项目，请点击继续参与！<span style="color:red;">平台承诺：如果该企业已确定好供应商，您可以发起投诉，经平台核实无误后会全款退还给您</span><br/>(咨询热线：<a href="tel:17675797686">17675797686</a>)',
            }).then(() => {
              this.appearPayment(1)
            }).catch(() => {});
            return
          }
          // 直接点券支付
          this.appearPayment(1)
        }
      }
    },
	 attention(){
		 let vuexs = JSON.parse(localStorage.getItem('vuex'))
		 console.log(vuexs,"121")
		 window.location.href='https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=Mzg3MzcxODMwMQ==&scene=117#wechat_redirect'
		 return
		 // if(vuexs.userInfo == undefined || vuexs.userInfo.uid == undefined){
			 // Dialog.confirm({
			   // title: '未登录',
			   // message: '抱歉，您还未登录，请先登陆',
			 // })
			   // .then(() => {
					// this.$router.push(`/member/login/company?redirect=/resume/${this.query_id}`)
			   // })
			   // .catch(() => {
			     // on cancel
			   // });
		 // } else{
			 // window.location.href='https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=Mzg3MzcxODMwMQ==&scene=117#wechat_redirect'
		 // }
	 },
	 appearPayment(isT){
		 console.log(isT,"数据")
		 if (this.base_info.audit != 1) {
			 console.log(this.base_info.audit,'该项目还未审核通过，不能继续此操作base_info.auditbase_info.auditbase_info.auditbase_info.audit')
		   this.enableClick = true;
		   this.$notify("该项目还未审核通过，不能继续此操作");
		   return false;
		 }
		 // 点券支付
		 if(isT === 1){
			 http.post(api.resumedownload, this.params).then((res) => {
        console.log(res,"1111")
        console.log(this.base_info.isbuy,"1111")
         if(this.base_info.isbuy){
          // 之前是不是买过  isbuy == true 买过 == 买断项目
          console.log(res.data.done,"2222")
            if(res.data.done === 0){
              // 如果购买失败 == 点券不足
                // this.showDirectService = true;
                this.DownloadSucceeded = false
                this.showDirectService = true
                this.directServiceInfo = {
                    use_type: res.data.use_type,
                    need_points: res.data.need_points,
                    need_expense: res.data.need_expense,
                    discount: res.data.discount,
                    resume: this.query_id,
                    btnCn: res.data.use_type == "points" ? "立即兑换" : "立即支付",
                };
                return
            } else{
               this.fetchData();
               this.DownloadSucceeded = false
               this.$notify({ type: "success", message: res.message });
               return
            }
         }
         this.fetchData();
			 	 this.enableClick = true;
				 this.appear = false
				 //res.data.done == 0 , 点券不足，跳转到其他页面
         console.log(res,"点券不足，跳转到其他页面")
			 	 if (res.data.done == 0) {
					//  this.go('/member/order/add/common/?type=service&resumePackage=resume_package')
					//  return
          // 弹窗:不足提示
			 		this.showDirectService = true;
			 		this.directServiceInfo = {
			 		  use_type: res.data.use_type,
			 		  need_points: res.data.need_points,
			 		  need_expense: res.data.need_expense,
			 		  discount: res.data.discount,
			 		  resume: this.query_id,
			 		  btnCn: res.data.use_type == "points" ? "立即兑换" : "立即支付",
			 		};
          // 小提示充值
          // this.insufficient = true
			 		return false;
			 	 } else {
          // 购买成功
					 // 显示上方的购买次数
					//  if(this.base_info.isbuy){
					// 	 this.base_info.involved_count=this.base_info.involved
					//  }else{
					// 	 this.base_info.isbuy = true
					// 	 this.base_info.involved_count++
					//  }
					 // 重新渲染
					//  this.fetchData();
          //  判断是不是会员
          if(this.base_info.is_setmeal){
            // true==会员
            this.DownloadSucceeded = true
          } else{
            this.$dialog.confirm({
              title: "下载成功",
              message: "温馨提示：由于您是<span style='color:#ffb50f;'>非会员单位</span>，只能查看发布2小时后的项目，平台仅对项目电话真实性负责，不再对项目的有效性负责；",
              confirmButtonText: "了解会员特权",
              cancelButtonText:'知道了',
            }).then(() => {
              this.go('/member/order/add/common?type=service')
            }).catch(() => {
              this.DownloadSucceeded = true
            });
           }
					 //下载成功
			 		// this.$notify({ type: "success", message: res.message });
			 	 }
			   }).catch(() => {
			 	 this.enableClick = true;
			   });
		 }
		 // 微信支付
		 if(isT === 2){
			 let openId = localStorage.getItem("weixinOpenid");
			 let params = {
          service_type : 'single_resume_down',   //single_resume_down 快捷消费-下载单份项目   single_job_refresh  快捷消费-刷新项目
          deduct_points : 0,    //积分  负值为扣积分  正值加积分
          payment : "wxpay",  //支付方式  wxpay 微信支付、其他
          resumeid : this.query_id,   //项目id
          return_url : `http://www.hangyedaniu.com/m/resume/${this.query_id}`,   //页面的路径
          openid : openId,    //微信的openid
			 }
			 http.post(api.company_pay_direct_service,params).then((res) => {
				 this.appear = false
				 if (res.data.pay_status == 1) {
					// 显示上方的购买次数
					if(this.base_info.isbuy){
						this.base_info.involved_count=this.base_info.involved
					}else{
						this.base_info.isbuy = true
						this.base_info.involved_count++
					}
				   this.$notify({ type: "success", message: "支付成功" });
				   this.fetchData(true);
				   return false;
				 } else {
				   this.handlerPay(res.data.parameter, 'wxpay');
				 }
			   }).catch(() => {
			 	 this.enableClick = true;
			   });
		 }
	 },
	 // 点击弹框的立即支付
	 handlerDirectService() {
	   if (this.directServiceInfo.use_type == "points") {
	     this.handlerDirectPay("points");
	   } else {
	     this.showPayment = true;
	   }
	 },
   windolLoca(url){
      window.location.href = url
   },
	 // 触发微信支付
	 handlerDirectPay(payment) {
	   let openid = localStorage.getItem("weixinOpenid");
	   let pay_data = {
	     service_type: "single_resume_down",
	     deduct_points:this.directServiceInfo.use_type == "points"? this.directServiceInfo.need_points : 0,
	     payment,
	     resumeid: this.query_id,
	     return_url: this.$store.state.config.mobile_domain + "resume/" + this.query_id,
	     openid: openid,
	   };
	   http.post(api.company_pay_direct_service, pay_data).then((res) => {
	       if (res.data.pay_status == 1) {
	         this.$notify({ type: "success", message: "支付成功" });
	         this.fetchData(true);
	         return false;
	       } else {
	         this.handlerPay(res.data.parameter, payment);
	       }
	     })
	     .catch(() => {});
	 },
    doFav() {
      if (this.is_company_login === false) {
        this.$dialog
          .confirm({
            title: "提示",
            message: "当前操作需要登录企业账号",
            confirmButtonText: "去登录",
          })
          .then(() => {
            this.showLogin = true;
            this.after_login_data = {
              method: "doFav",
            };
          })
          .catch(() => {});
      } else {
        if (this.enableClick === false) {
          return false;
        }
        this.enableClick = false;
        if (this.base_info.audit != 1) {
          this.enableClick = true;
          this.$notify("该项目还未审核通过，不能继续此操作");
          return false;
        }
        const params = {
          resume_id: this.query_id,
        };
        let _api_url = this.has_fav == 1 ? api.resumefav_cancel : api.resumefav;
        http
          .post(_api_url, params)
          .then((res) => {
            this.enableClick = true;
            this.has_fav = this.has_fav == 1 ? 0 : 1;
            this.$notify({ type: "success", message: res.message });
          })
          .catch(() => {
            this.enableClick = true;
          });
      }
    },
    doShare() {
      this.showShare = true;
    },
    cancelShare() {
      this.showShare = false;
      this.showWxLayer = false;
      this.showLayer = false;
    },
    handleForward() {
      const agent = navigator.userAgent.toLowerCase();
      if (agent.indexOf("micromessenger") < 0) {
        setTimeout(() => {
          this.showLayer = true;
        }, 150);
      } else {
        setTimeout(() => {
          this.showWxLayer = true;
        }, 150);
      }
    },
    handlerDate(e) {
      console.log(e, 8588);
      let d = new Date(e);
      this.form1.interview_date =
        d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
      this.showDatePicker = false;
    },
    handlePoster() {
      this.shareid = this.query_id;
      this.showPoster = true;
    },
    closePoster() {
      this.showPoster = false;
    },
    afterLogin(data) {
      this.showLogin = false;
      this.is_company_login = true;
      let method = null;
      if (data.method != undefined) {
        method = data.method;
      }
      this.fetchData(method);
    },
    handlerPay(parameter, payment) {
      if (payment == "wxpay") {
        if (isWeiXin()) {
          let successUrl = this.$route.path;
          let locationUrl =
            this.$store.state.config.mobile_domain +
            "pay/jsapi?appId=" +
            parameter.jsApiParameters.appId +
            "&timeStamp=" +
            parameter.jsApiParameters.timeStamp +
            "&nonceStr=" +
            parameter.jsApiParameters.nonceStr +
            "&package=" +
            parameter.jsApiParameters.package +
            "&signType=" +
            parameter.jsApiParameters.signType +
            "&paySign=" +
            parameter.jsApiParameters.paySign +
            "&successUrl=" +
            successUrl;
          window.location.href = locationUrl;
        } else {
          window.location.href = parameter;
        }
      } else {
        window.location.href = parameter;
      }
    },
    handlerReport() {
      if (this.is_company_login === false) {
        this.$dialog
          .confirm({
            title: "提示",
            message: "当前操作需要登录企业账号",
            confirmButtonText: "去登录",
          })
          .then(() => {
            this.showLogin = true;
            this.after_login_data = {
              method: "handlerReport",
            };
          })
          .catch(() => {});
      } else {
        if (this.base_info.audit != 1) {
          this.$notify("该项目还未审核通过，不能继续此操作");
          return false;
        }
        this.$refs.tipoff.initCB();
        this.showTipoff = true;
      }
    },
    // 预览作品
    previewImg(index) {
      ImagePreview({
        images: this.previewImgList,
        showIndex: true,
        loop: false,
        startPosition: index,
        closeOnPopstate: true,
        closeable: true,
      });
    },
    fetchVideonum() {
      http.get(api.shortvideo_total, { rid: this.query_id }).then((res) => {
          this.videonum = res.data;
        }).catch(() => {});
    },
    //图片放大缩小
  },
};
</script>

<style lang="scss">
.yusuan{
  font-size: 10px;
  color:#101010;
}

.rotate{
      transform: rotate(-90deg)!important;transition-duration: .5s!important;
	}
.insufficientConsumptionSpan{
  padding: 5px 5px 5px 20px;margin-left: 28px;border: 1px solid #FF6600;background: url('../assets/images/u65.png') no-repeat 1px center / 20px 20px; text-indent: 4em;
}

.imgs_srcp {
  position: absolute;
    width: 100%;
    top: 0;
    z-index: 10;
    height: 1000px;
    background-color: #000;
    opacity: 0.2;
}
.qq{  
    position: absolute;
  width: 100%;
  height: 8rem;
  top: 220px;
  z-index: 20;
}
.generate_posters {
  position: fixed;
  z-index: 1;
  width: 41px;
  height: 41px;
  border-radius: 999px;
  background-color: rgba(0, 0, 0, 0.7);
  right: 15px;
  bottom: 100px;
  font-size: 12px;
  color: #ffffff;
  line-height: 14px;
  text-align: center;
  padding-top: 7px;
}
.box_report {
  position: relative;
  padding: 17px 0;
  &::after {
    content: "";
    position: absolute;
    right: 55px;
    top: 50%;
    height: 46px;
    border-left: 1px solid #f3f3f3;
    margin-top: -23px;
  }
  .tx3 {
    position: absolute;
    right: 0;
    top: 0;
    width: 53px;
    height: 100%;
    padding-top: 45px;
    color: #ff6600;
    font-size: 12px;
    text-align: center;
    background: url("../assets/images/zixun-tousu.png")  no-repeat center 12px/30px 30px;
  }
  .tx1 {
    font-size: 13px;
    color: #ff6600;
    margin-bottom: 5px;
  }
  .tx2 {
    font-size: 12px;
    color: #666;
  }
}
.resume-show-swiper-span {
  width: 6px;
  height: 6px;
  border-radius: 100%;
}
.resume-show-swiper-bullet-active {
  background-color: #1787fb;
  border-radius: 6px;
  opacity: 1;
}
</style>

<style lang="scss" scoped>
.item_apply {
  // float: left;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background-color: #286e34;
  color: #ffffff;
  font-size: 15px;
  flex: 1;
  margin-right: 15px;
  border-radius: 5px;
  flex-shrink: 0;
}
.details_pop_box {
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
.my_app {
  padding-bottom: 45px;
  overflow: hidden;
	.subscribe_pu{position: fixed; top: 50%;left: 50%;transform: translate(-50%,-50%);z-index: 555;background-color: #ffffff;padding: 18px 13px 0;width: 295px;box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.4);border-radius: 10px;border: 1px solid rgba(187, 187, 187, 100);font-size: 15px;color: #000;
		.text1{padding-bottom: 6px;
			.span1{padding-top: 5px;display: block;}
			.span2{color: #009bff;}
		}
		.text{text-align: center;padding-bottom: 12px;}
		.text2{color: #7B7575;height: 15px;width: 50px; display: flex; justify-content: center; align-items: center;width: 100%; padding: 15px 15px 20px;
			div{width: 75px;height: 25px;text-align: center; line-height: 25px;border: #ccc solid 1px; border-radius: 5px;}
		}
	}
	.appear{ position: fixed; top: 50%; left: 50%; transform: translate(-50%,-50%); background-color: #fff; width: 88%; padding: 28px 13px 13px 13px; border-radius: 10px; box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.4); z-index: 10000; font-size: 16px ; color: rgba(101, 101, 101, 100); word-wrap:break-word; word-break: break-all;
		img{width: 18px; height: 18px; position: absolute; top: 8px; right: 8px;}
		.appearBox{display: flex; width: 100%; justify-content: space-around; padding: 16px 0px; color: #fff;font-size: 14px;
			.appearBox1{background-color: #FD7900 ; height: 37px ; line-height: 37px; text-align: center; border-radius: 4px; padding: 0px 6px; }
			.appearBox2{background-color: #287B30 ; height: 37px ; line-height: 37px; text-align: center; border-radius: 4px; padding: 0px 18px; }
		}
	}
}
.box_13 {
  .bottom_bar {
    .item_apply {
      // float: left;
      height: 43px;
      line-height: 43px;
      text-align: center;
      background-color: #1787fb;
      color: #ffffff;
      font-size: 15px;
      width: 100px;
      margin-left: 15px;
      border-radius: 5px;
      flex-shrink: 0;
    }
    .item_chat {
      flex-shrink: 0;
      // float: left;
      border-radius: 5px;
      width: 92px;
      height: 43px;
      text-align: center;
      font-size: 15px;
      color: #000;
      background-size: 17px;
      position: relative;
      border: 1px solid #ccc;
      line-height: 41px;
      margin-left: 12px;
      background: #ffffff;
		padding: 0px 10px;
      &::after {
        position: absolute;
        box-sizing: border-box;
        content: " ";
        pointer-events: none;
        right: 0;
        top: 0;
        left: 0;
        border-bottom: 0.026667rem solid #f3f3f3;
      }
    }
	 .item_chat1{background: #ffe9de;border: 1px solid #ff7356;color: #ff5d3c;}
    .item_call {
      flex-shrink: 0;
      // float: left;
      width: 60px;
      height: 46px;
      padding: 32px 0 4px;
      text-align: center;
      font-size: 10px;
      color: #333333;
      background: url("../assets/images/calling_ico.svg") center 9px no-repeat;
      background-size: 17px;
      position: relative;
    }
    .item_collect {
      flex-shrink: 0;
      width: 60px;
      height: 46px;
      padding: 32px 0 4px;
      text-align: center;
      font-size: 10px;
      color: #333333;
      position: relative;
      background: url("../assets/images/com_show_col_ico_2.png") center 9px
        no-repeat;
      background-size: 17px;
      &.item_collect_ac {
        background: url("../assets/images/com_show_col_ico_2_ac.png") center 9px
          no-repeat;
        background-size: 17px;
      }
    }
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ffffff;
    z-index: 3;
    height: 63px;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    &::after {
      position: absolute;
      box-sizing: border-box;
      content: " ";
      pointer-events: none;
      right: 0;
      top: 0;
      left: 0;
      border-bottom: 0.026667rem solid #f3f3f3;
    }
  }
  position: relative;
  width: 100%;
  height: 63px;
  background-color: #ffffff;
}
.attention{display: flex; padding: 0 20px; align-items: center; height: 60px;
	.attention1{ width: 40px; height: 40px; margin-right: 5px;flex: none;
		img{width: 100%; height: 100%; object-fit: cover;}
	}
	.attention2{font-size: 12px; flex: 1; 
		.attention2Text1{font-weight: 700;}
	}
	.attention3{font-size: 15px; width: 55px; height: 30px; line-height: 30px; text-align: center; border-radius: 30px; background-color: #009bff; color: #fff;}
}
.box_12 {
  width: 100%;
  .swiper-pagination {
    bottom: 0px;
  }
  .swiper-slide {
    text-align: center;
  }
  .box_content {
    img {
      width: 100px;
      height: 100px;
      border: 0;
      border-radius: 3px;
      display: inline-block;
      vertical-align: top;
      margin-bottom: 23px;
    }
    padding-bottom: 10px;
    width: 100%;
  }
}
.box_11 {
  width: 100%;
  border-bottom: 1px solid #f5f5f5;
  .box_content {
    .tx1 {
      .right_txt {
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translate(0, -50%);
        font-size: 14px;
        color: #666666;
      }
      &:not(:last-child) {
        margin-bottom: 14px;
      }
      font-size: 15px;
      color: #333333;
      position: relative;
    }

    padding-bottom: 17px;
  }
}
.box_10 {
  width: 100%;
  border-bottom: 1px solid #f5f5f5;
  .box_content {
    .tx1 {
      .right_txt {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translate(0, -50%);
        font-size: 14px;
        color: #666666;
      }
      &:not(:last-child) {
        margin-bottom: 14px;
      }
      font-size: 15px;
      color: #333333;
      position: relative;
    }
    padding-bottom: 17px;
  }
}
.box_9 {
  width: 100%;
  border-bottom: 1px solid #f5f5f5;
  .box_content {
    .tx1 {
      &::before {
        content: " ";
        position: absolute;
        left: 4px;
        top: 6px;
        width: 4px;
        height: 4px;
        border-radius: 100%;
        border: 2px solid #3388ff;
        background-color: #ffffff;
      }
      &::after {
        content: " ";
        position: absolute;
        left: 7px;
        top: 16px;
        height: 93%;
        border-right: 1px solid #f5f5f5;
      }
      .t4 {
        line-height: 1.8;
        font-size: 12px;
        color: #666666;
      }
      .t3 {
        font-size: 12px;
        color: #666666;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-bottom: 5px;
      }
      .t2 {
        font-size: 12px;
        color: #999999;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-bottom: 6.5px;
      }
      .t1 {
        font-size: 15px;
        color: #333333;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-bottom: 10.5px;
      }
      &:not(:last-child) {
        margin-bottom: 15px;
      }
      padding: 0 25px;
      position: relative;
    }
    padding-bottom: 17.5px;
  }
}
.box_8 {
  width: 100%;
  border-bottom: 1px solid #f5f5f5;
  .box_content {
    .tx1 {
      &::before {
        content: " ";
        position: absolute;
        left: 4px;
        top: 6px;
        width: 4px;
        height: 4px;
        border-radius: 100%;
        border: 2px solid #3388ff;
        background-color: #ffffff;
      }
      &::after {
        content: " ";
        position: absolute;
        left: 7px;
        top: 16px;
        height: 93%;
        border-right: 1px solid #f5f5f5;
      }
      .t4 {
        line-height: 1.8;
        font-size: 12px;
        color: #666666;
      }
      .t3 {
        font-size: 12px;
        color: #666666;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-bottom: 5px;
      }
      .t2 {
        font-size: 12px;
        color: #999999;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-bottom: 6.5px;
      }
      .t1 {
        font-size: 15px;
        color: #333333;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-bottom: 10.5px;
      }
      &:not(:last-child) {
        margin-bottom: 15px;
      }
      padding: 0 25px;
      position: relative;
    }
    padding-bottom: 17.5px;
  }
}
.box_7 {
  width: 100%;
  border-bottom: 1px solid #f5f5f5;
  .box_content {
    .tx1 {
      &::before {
        content: " ";
        position: absolute;
        left: 4px;
        top: 6px;
        width: 4px;
        height: 4px;
        border-radius: 100%;
        border: 2px solid #3388ff;
        background-color: #ffffff;
      }
      &::after {
        content: " ";
        position: absolute;
        left: 7px;
        top: 16px;
        height: 93%;
        border-right: 1px solid #f5f5f5;
      }
      .t4 {
        line-height: 1.8;
        font-size: 12px;
        color: #666666;
        word-break: normal;
        word-wrap: break-word;
      }
      .t3 {
        font-size: 12px;
        color: #666666;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-bottom: 5px;
      }
      .t2 {
        font-size: 12px;
        color: #999999;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-bottom: 6.5px;
      }
      .t1 {
        font-size: 15px;
        color: #333333;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-bottom: 10.5px;
      }
      &:not(:last-child) {
        margin-bottom: 15px;
      }
      padding: 0 25px;
      position: relative;
    }
    padding-bottom: 17.5px;
  }
}
.box_6 {
  width: 100%;
  border-bottom: 1px solid #f5f5f5;
  .box_content {
    .tx1 {
      &::before {
        content: "";
        position: absolute;
        left: 4px;
        top: 6px;
        width: 4px;
        height: 4px;
        border-radius: 100%;
        border: 2px solid #3388ff;
        background-color: #ffffff;
      }
      &::after {
        content: " ";
        position: absolute;
        left: 7px;
        top: 16px;
        height: 93%;
        border-right: 1px solid #f5f5f5;
      }
      .t3 {
        font-size: 12px;
        color: #666666;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .t2 {
        font-size: 12px;
        color: #999999;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-bottom: 6.5px;
      }
      .t1 {
        font-size: 15px;
        color: #333333;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-bottom: 10.5px;
      }
      &:not(:last-child) {
        margin-bottom: 15px;
      }
      padding: 0 25px;
      position: relative;
    }
    padding-bottom: 17.5px;
  }
}
.box_5 {
  width: 100%;
  .box_content {
    .tag {
      margin-bottom: 10px;
      .van-tag + .van-tag {
        margin-left: 5px;
      }
    }
    .dec {
      line-height: 1.8;
      font-size: 13px;
      color: #666666;
      word-break: break-all;
    }
    padding-bottom: 20px;
  }
}
.decs {
  font-size: 12px;
  color: black;
  margin-left: -25px;
  margin-top: -8px;
  padding: 5px 0px 5px 0px;
}
.box_cac {
  .phone_tip {
    display: inline-block;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(0, -50%);
    color: #666;
    font-size: 12px;
    .phone {
      color: #ffa54e;
    }
  }
  .code_pro_wrap {
    .secret {
      width: 100%;
    }
    .pro_tip {
      margin-top: 0.08rem;
      color: #888;
      font-size: 12px;
    }
  }
  .box_content {
	  border: 1px solid #ccc;
	  border-radius: 10px;
	  padding: 15px 5px;
	  box-shadow: 5px 5px 5px 0px #ccc;
    .item {
      &.phone {
        background: url("../assets/images/cac_phone_ico.svg") 2px center
          no-repeat;
        background-size: 16px;
      }
      &.wx {
        background: url("../assets/images/cac_wx_ico.svg") 0 center no-repeat;
        background-size: 16px;
      }
      &.email {
        background: url("../assets/images/cac_email_ico.svg") 0 center no-repeat;
        background-size: 16px;
      }
      &.qq {
        background: url("../assets/images/cac_qq_ico.svg") 0 center no-repeat;
        background-size: 16px;
      }
      font-size: 15px;
      color: #333333;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      padding: 0 20px 0 10px;
      word-break: break-all;
      &:not(:last-child) {
        margin-bottom: 8px;
      }
    }
  }
  .contact_tip {
    .tx2 {
      padding-bottom: 15.5px;
    }
    .tx1 {
      padding-top: 16px;
      margin-bottom: 3px;
    }
    .link {
      color: #1787fb;
    }
    text-align: center;
    font-size: 14px;
    color: #333333;
    box-shadow: 0 0 8px #c2c2c2;
    border-radius: 7px;
  }
  width: 100%;
  padding-bottom: 17px;
  border-bottom: 1px solid #f5f5f5;
}
.box_3 {
  .tx2 {
    &:not(:first-child) {
      margin-top: 13.5px;
    }
    .intent {
      font-size: 12px;
      color: #666666;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .name {
      font-size: 15px;
      color: #333333;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin-bottom: 5.5px;
    }
  }
  .box_content {
    padding-bottom: 17.5px;
  }
  width: 100%;
  border-top: 1px solid #f5f5f5;
  margin-left: -8px;
}
.content_wrapper {
  width: 100%;
  background-color: #ffffff;
  padding: 0 17px;
}
.box_nav {
  .item {
    &.active {
      &::after {
        content: " ";
        position: absolute;
        bottom: 12px;
        left: 48%;
        transform: translate(-50%, 0);
        width: 20%;
        height: 1px;
        background-color: #009bff;
        border-radius: 3px;
      }
      color: #009bff;
      // font-weight: 200;
    }
    flex: 1;
    position: relative;
    padding: 15px 0;
    text-align: center;
    font-size: 15px;
    font-weight: 500;
    color: #333333;
  }
  width: 100%;
  background-color: #ffffff;
  display: flex;
  box-shadow: 0 1px 5px #f1eded;
  z-index: 1;
  position: relative;
  margin-top: 10px;
}
.box_2 {
  .content {
    .item {
      float: left;
      font-size: 13px;
      color: #8096a3;
      padding: 8px 15px;
      background-color: #e9f8ff;
      border-radius: 33px;
      margin-bottom: 9px;
      margin-right: 9px;
    }
    padding-bottom: 10px;
  }
  width: 100%;
  background-color: #ffffff;
  padding: 0 0 0 17px;
}
.txtss {
  margin-left: -25px;
  font-size: 14px;
  color: #101010;
  margin-top: 5px;
}
.box_head {
  .txts {
    font-size: 14px;
    color: #101010;
    margin-top: 5px;
  }
  .right_text {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(0, -50%);
    font-size: 13px;
    color: #999;
  }
  position: relative;
  width: 100%;
  padding: 13px 0;
}
.box_1 {
  .content {
    .share {
      position: absolute;
      right: 16px;
      top: 18px;
      font-size: 12px;
      color: #999999;
      padding: 4px 8px 4px 25px;
      border-radius: 7px;
      background: #f9f9f9 url("../assets/images/com_show_share_ico.png") 8px
        center no-repeat;
      background-size: 12px;
    }
    .collect {
      position: absolute;
      right: 80px;
      top: 18px;
      font-size: 12px;
      color: #999999;
      padding: 4px 8px 4px 25px;
      border-radius: 7px;
      background: #f9f9f9 url("../assets/images/com_show_col_ico.png") 8px
        center no-repeat;
      background-size: 12px;
    }
    .down {
		 // position: relative;
		 align-items: center;
		 padding: 12.5px 2px;
		 font-size: 12px;
		 color: #999999;
		 border-top: 1px solid #f8f8f8;
		 .wage {
		 	background-color: #A4ADB3;
		   font-size: 13px;
			border-radius: 4px;
			width: 76px;
			height: 28px;
			text-align: center;
			line-height: 28px;
		   font-weight: bold;
		   color: #fff;
			&.wageColor{ color: #00aaff; background-color: #fff; border: 1px solid #00aaff ; }
		 }
      .right {
        &::after {
          position: absolute;
          right: 2px;
          top: 11px;
          width: 6px;
          height: 6px;
          border-top: 1px solid #666666;
          border-right: 1px solid #666666;
          transform: rotate(45deg);
          content: " ";
        }
        position: absolute;
        right: 2px;
        top: 50%;
        transform: translate(0, -50%);
        font-size: 12px;
        color: #999999;
        padding: 5px 11px 5px 0;
      }
    }
    .mid {
      .num {
        color: #ff6600;
      }
      padding: 13px 0;
      font-size: 12px;
      color: #999999;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .tx122 {
      .level_ico {
        float: left;
        margin-left: 10px;
        width: 36px;
        height: 25px;
        background: url("../assets/images/resume_list_level_ico.png") 0 center
          no-repeat;
        background-size: 36px 15px;
      }
      .name {
        float: left;
        font-size: 18px;
        font-weight: bold;
        color: #333333;
      }
      position: relative;
      padding-top: 22.5px;
    }
    .up {
      .tag {
        padding: 1px 5px 1px 17px;
        border-radius: 3px;
        color: #ffffff;
        font-size: 10px;
        width: fit-content;
        margin-top: 9px;
        background: #ffa57d url("../assets/images/fab_ico.svg") 5px center
          no-repeat;
        background-size: 10px;
      }
      .tx2 {
        font-size: 13px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: #666666;
      }
      .tx1 {
        margin-bottom: 8px;
        .level_ico {
          float: left;
          margin-left: 10px;
          width: 36px;
          height: 27px;
          background: url("../assets/images/resume_list_level_ico.png") 0 center
            no-repeat;
          background-size: 36px 15px;
        }
        .name {
          float: left;
          font-size: 19px;
          font-weight: bold;
          color: #333333;
        }
      }
      .avatar_box {
        .gender {
          &.female {
            background: #ff8d65 url("../assets/images/female_ico.svg") center
              no-repeat;
            background-size: 9px;
          }
          &.male {
            background: #4fa5fa url("../assets/images/male_ico.svg") center
              no-repeat;
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
        top: 30px;
        width: 49px;
        height: 49px;
      }
      position: relative;
      padding: 31px 0 0 61px;
    }
    position: relative;
    width: 350px;
    margin: 0 auto;
    box-shadow: 0 0 5px #c2c2c2;
    padding: 0 17px;
    border-radius: 7px;
  }
  width: 100%;
  background-color: #ffffff;
  border-top: 1px solid #f3f3f3;
  padding-top: 20px;
}
.orange-phone {
  color: #ffa54e;
  font-weight: bold;
}
.font12 {
  font-size: 12px;
}
.font15 {
  font-size: 15px;
}
.line18 {
  line-height: 25px;
  text-align: center;
}
.color-orange {
  color: #ffa54e;
}
.m-top {
  margin-top: 25px;
}
.m-btm {
  margin-bottom: 20px;
}
.bold {
  font-weight: bold;
}
// 绑定微信开始
.bind-weixin-box {
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 10px 0;
  .title-1 {
    color: #646566;
    font-size: 14px;
  }
  .img {
    width: 111px;
    height: 111px;
    margin: 13px auto 10px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .title-2 {
    color: #999999;
    font-size: 13px;
  }
}
.addrecord {
  display: flex;
  justify-content: end;
  margin-right: 20px;
  font-size: 16px;
  color: #128bed;
}
//绑定微信结束

//烘干
.dry {
  border-radius: 5px;
  padding: 2px 7px 3px 7px;
  color: black;
}
//产品名称
.productName {
  font-size: 12px;
  color: #101010;
  margin-top: -10px;
}
.Industry {
  padding-top: 5px;
  font-size: 12px;
  color: #101010;
}
//图片点击
.explain{
  color: #909090;font-size: 12px;padding-top: 8px;
}
.getMore{
  padding-top: 8px;color: #009bff; text-align: center; font-size: 15px;
}
</style>
