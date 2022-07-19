<template>
	<div id="app" class="my_app">
		<Meta v-if="base_info.fullname !== undefined" pagealias="resumeshow" :custom_data="{
        fullname: base_info.fullname,
        sex: base_info.sex_text,
        education: base_info.education_text,
        experience: base_info.experience_text,
        district: base_info.intention_district_text,
        jobcategory: base_info.intention_jobs_text,
        specialty: base_info.specialty,
      }" />
		<!-- <Head>{{ base_info.fullname }}的项目</Head> -->
		<Head>项目详情</Head>
		<van-skeleton title avatar :row="10" :loading="mainLoading">
			<div class="co-text" @click="$router.push('/member/order/add/stick')">
				项目没曝光？快来试试项目置顶，立即提高5倍曝光量！&gt;
			</div>
			<div class="box_1">
				<div class="content">
					<div class="up">
						<div class="avatar_box">
							<img :src="base_info.photo_img_src" :alt="base_info.fullname" />
							<div class="gender" :class="base_info.sex == 1 ? 'male' : 'female'"></div>
						</div>
						<div class="tx1" style="display: flex; justify-content: space-between">
							<div>
								<div class="name">{{ base_info.fullname }}</div>
								<div class="level_ico" v-if="base_info.high_quality == 1"></div>
								<div class="clear"></div>
							</div>
							<!-- <div class="wage">{{ base_info.intention_wage }}</div> -->
							<!-- <div class="item_apply" @click="doDownload1">立即买断</div> -->
							<div class="yusuan">采购预算：{{ base_info.minwage[0] }}</div>
						</div>
						<div class="tx2">
							{{ base_info.birthday || "半年后" }}截止 ·
							{{ base_info.education_text }} ·

							<span class="num" style="font-size: 10px">
								被浏览{{ base_info.click }}次</span>
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
							项目在：{{ intention_list[0].address }}
						</div>
						<div class="wage">
							<!-- 预算{{ base_info.intention_wage || "面议" }} -->
							{{base_info&&base_info.involved_count}}/{{base_info&&base_info.involved}}
						</div>
					</div>
				</div>
			</div>
			<div class="box_nav" v-if="$store.state.config.shortvideo_enable === '1'">
				<div class="item" :class="resumeShow === 'resume' ? 'active' : 'resource'"
					@click="resumeShow = 'resume'">
					项目信息
				</div>
				<div class="item" :class="resumeShow === 'video' ? 'active' : 'resource'" @click="resumeShow = 'video'">
					参考资料
				</div>
				<div class="item " :class="resumeShow === 'resource' ? 'active' : 'resource'"
					@click="resumeShow = 'resource'">
					报价单位
				</div>
			</div>
			<div class="box_resume_some" v-if="resumeShow === 'resume'">
				<div class="box_2" v-if="
            base_info.tag_text_arr != undefined &&
            base_info.tag_text_arr.length > 0
          ">
					<div class="box_head">
						<div class="txt">个性标签</div>
					</div>
					<div class="content">
						<div class="item" v-for="(tag, index) in base_info.tag_text_arr" :key="index">
							{{ tag }}
						</div>
						<div class="clear"></div>
					</div>
				</div>
				<div class="content_wrapper">
					<div class="box_3">
						<div class="box_head">
							<div class="txts">基本信息</div>
							<!-- <div class="right_text">{{base_info.current_text}}</div> -->
						</div>
						<div class="productName">产品名称： {{ base_info.idcard }}</div>
						<div class="box_content">
							<div class="tx2" v-for="(item, index) in intention_list" :key="index">
								<div class="Industry">
									<!-- 所属行业：{{ base_info.major_text || '不限' }} -->
									所属行业：{{ base_info.majorName || "不限" }}
								</div>
								<div class="Industry">所在地区： {{ item.address }}</div>
								<div class="Industry">
									截止日期：{{ base_info.birthday || "半年后" }}
								</div>
								<div class="Industry">
									项目预算： {{ item.minwage }}
									<!-- ，{{ item.nature_text }} -->
									{{
                    field_rule.intention.trade !== undefined &&
                    field_rule.intention.trade.is_display === 1 &&
                    item.trade_text
                      ? `，${item.trade_text}`
                      : ""
                  }}
								</div>
								<div class="Industry">
									地区要求：{{ base_info.classifiy || "" }}
								</div>
							</div>
						</div>
					</div>
					<div style="border-bottom: 2px solid #e3e3e3; width: 100%"></div>
					<div class="content_wrapper">
						<!--自我描述-->
						<div class="box_5" v-if="base_info.specialty != ''">
							<div class="box_head">
								<div class="txtss">需求描述</div>
							</div>
							<div class="box_content">
								<div class="decs" v-for="(item, index) in base_info.specialty" :key="index">
									{{ item }}
								</div>
							</div>
						</div>
						<div style="border-bottom: 2px solid #e3e3e3; width: 100%"></div>
					</div>
					<!--联系方式-->
					<div class="box_cac">
						<div class="box_head">
							<div class="txts">联系方式</div>
							<span class="phone_tip" v-if="
                  show_contact == 1 &&
                  phone_protect_open &&
                  phone_protect_type == 1
                ">请使用
								<span class="phone" v-text="cur_com_mobile">}</span>
								的手机号拔号</span>
						</div>

						<div class="box_content" v-if="show_contact == 1 && !phone_protect_open">
							<div class="item phone">手机：{{ contact_info.mobile }}</div>
							<div class="item wx" v-if="
                  field_rule.contact.weixin != undefined &&
                  field_rule.contact.weixin.is_display == 1 &&
                  contact_info.weixin != ''
                ">
								微信：{{ contact_info.weixin }}
							</div>
							<div class="item email" v-if="
                  field_rule.contact.email != undefined &&
                  field_rule.contact.email.is_display == 1 &&
                  contact_info.email != ''
                ">
								邮箱：{{ contact_info.email }}
							</div>
							<div class="item qq" v-if="
                  field_rule.contact.qq != undefined &&
                  field_rule.contact.qq.is_display == 1 &&
                  contact_info.qq != ''
                ">
								QQ：{{ contact_info.qq }}
							</div>
						</div>
						<div class="code_pro_wrap" v-if="show_contact == 1 && phone_protect_open">
							<img class="secret" src="../../../assets/images/318.jpg" />
							<div v-if="phone_protect_type == 1" class="pro_tip">
								1.需要使用指定号码拔打,非指定号码无法拔通; 2.隐私号码有效<span v-text="phone_protect_timeout"></span>秒,过期后需再次点击拔号
							</div>
						</div>

						<div class="contact_tip" v-if="show_contact == 0 && show_contact_note == 'need_login'"
							@click="showLogin = true">
							<div class="tx1">您尚未登录</div>
							<div class="tx2">
								<span class="link">点击登录</span>后可获取项目联系方式
							</div>
						</div>
						<div class="contact_tip" v-if="
                show_contact == 0 && show_contact_note == 'need_company_login'
              ">
							<div class="tx1">项目联系方式</div>
							<div class="tx2">仅对企业会员开放</div>
						</div>
						<div class="contact_tip" v-if="show_contact == 0 && show_contact_note == 'need_download'"
							@click="doDownload">
							<div class="tx1"><span class="link">立即报价</span></div>
							<div class="tx2">获取项目联系方式</div>
						</div>
					</div>
				</div>
				<div class="form_split_10"></div>

				<div class="form_split_10"></div>
				<div class="content_wrapper">
					<div class="box_9" v-if="
              resume_module.project !== undefined &&
              resume_module.project.is_display == 1 &&
              project_list.length > 0
            ">
						<div class="box_head">
							<div class="txt">项目经历</div>
						</div>
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
				<div class="form_split_10" v-if="
            resume_module.certificate !== undefined &&
            resume_module.language !== undefined &&
            resume_module.certificate.is_display == 1 &&
            certificate_list.length > 0 &&
            resume_module.language.is_display == 1 &&
            language_list.length > 0
          "></div>
				<div class="content_wrapper" v-if="
            resume_module.certificate !== undefined &&
            resume_module.language !== undefined &&
            resume_module.certificate.is_display == 1 &&
            certificate_list.length > 0 &&
            resume_module.language.is_display == 1 &&
            language_list.length > 0
          ">
					<div class="box_12">
						<div class="box_head">
							<div class="txt">我的作品</div>
						</div>
						<div class="box_content">
							<swiper :options="swiperOption" v-if="$store.state.swiperLoaded">
								<swiper-slide v-for="(item, index) in img_list" :key="index">
									<img :src="item.img_src" alt="项目照片作品" @click="previewImg(index)" />
								</swiper-slide>
								<div class="swiper-pagination" slot="pagination"></div>
							</swiper>
						</div>
					</div>
				</div>
				<div class="form_split_10"></div>
				<div class="content_wrapper">
					<div class="box_report">
						<div class="tx1">如遇无效虚假项目信息，请立即举报！</div>
						<div class="tx2">
							供应商过程中，若联系方式、采购状态不实请反馈。
						</div>
						<div class="tx3" @click="handlerReport">举报</div>
					</div>
				</div>
				<div class="form_split_10"></div>
				<!-- <div class="box_13"> -->
					<!-- <div class="bottom_bar"> -->
						<!-- <div class="item_call" @click="doTel">电话</div> -->
						<!-- <div :class=" -->
                <!-- has_fav == 1 ? 'item_collect item_collect_ac' : 'item_collect' -->
              <!-- " @click="doFav"> -->
							<!-- {{ has_fav == 1 ? "已收藏" : "收藏" }} -->
						<!-- </div> -->
						<!-- <div :class="['item_chat',!isSubscribe?'':'item_chat1' ]" @click="doMsg"> -->
							<!-- {{isSubscribe?'已订阅':'订阅项目'}}</div> -->
						<!-- <div v-if="!base_info.isbuy" class="item_apply" @click="doDownload">立即报价</div> -->
						<!-- <div v-if="base_info.isbuy" class="item_apply" @click="doDownload">买断项目</div> -->
						<!-- <div class="item_apply" v-if="show_contact===0" @click="doDownload">立即报价</div> -->
						<!-- <div class="item_apply" v-else @click="doInterview">我的报价</div> -->
						<!-- <div class="clear"></div> -->
					<!-- </div> -->
				<!-- </div> -->
			</div>
			<div class="box_video_some" v-if="resumeShow === 'video'">
				<div style="font-size: 16px; padding: 20px; color: #000">
					参考图片：
				</div>
				<div style="
            word-wrap: break-word;
            width: 100vw;
            display: flex;
            flex-wrap: wrap;
          ">
					<div v-for="(item, index) in img_list" :key="index">
						<img :src="item.img_src" alt="" style="width: 100px; height: 100px; margin: 12px"
							@click="dianji(item.img_src)" />
					</div>
				</div>
				<VideoList :videotype="2" :id="query_id" :gointype="'unitplay'"></VideoList>
			</div>
			<div class="" v-if="resumeShow === 'resource'">
				<van-list  v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="getUnit()">
					<div class="box-list" v-for="(item,index) in resumeQuotateList">
						<div class="title">{{item.companyname}}</div>
						<div class="dl-text">
							<div class="dt-text">主营产品：</div>
							<div>家具</div>
						</div>
						<div class="dl-text">
							<div class="dt-text">案例客户：</div>
							<div class="co">15家</div>
						</div>
						<div class="dl-text">
							<div class="dt-text">售后服务：</div>
							<div>14.8分</div>
						</div>
						<div class="dl-text">
							<div class="dt-text dd-text">联系人：<span style="margin-left: 29px;">{{item.contactName}}</span></div>
							<div class="border-nub">{{item.mobile}}</div>
						</div>
					</div>
				</van-list>
			</div>
		</van-skeleton>
		<van-popup v-model="showLogin" position="right" :overlay="false" style="width: 100%; height: 100%">
			<Login :utype="1" :single_login="true" @afterLogin="afterLogin" :after_login_data="after_login_data">
			</Login>
		</van-popup>

		<van-dialog v-model="showDirectService" title="立即报价" show-cancel-button
			:confirm-button-text="directServiceInfo.btnCn" @confirm="handlerDirectService">
			<div class="dialog_tip_wrapper">
				<div class="tx1" v-if="directServiceInfo.use_type == 'points'">
					你的立即报价点数不足，下载该项目需要支付
					<span class="red">{{ directServiceInfo.need_points }}</span>
					{{ $store.state.config.points_byname }}。
				</div>
				<div class="tx1" v-if="directServiceInfo.use_type == 'money'">
					你的立即报价点数不足，下载该项目需要支付
					<span class="red">{{ directServiceInfo.need_expense }}</span>
					元。
				</div>
				<div class="tx2" v-if="parseInt(directServiceInfo.discount) > 0">
					购买项目包价格低至<span class="red">{{
            directServiceInfo.discount
          }}</span>折，<router-link to="/member/order/add/common?type=service&service_type=resume_package" class="blue">
						立即了解</router-link>
				</div>
			</div>
		</van-dialog>

		<van-dialog v-model="codePro.show" show-cancel-button :confirm-button-text="codePro.btnCn"
			@confirm="callCodePro" confirm-button-color="#1989fa">
			<div class="line18 m-top">拔打号码</div>
			<div class="line18 color-orange font15 bold" v-text="codePro.x"></div>
			<div class="line18 font12">
				(电话<span class="color-orange" v-text="codePro.timeout"></span>秒后失效,请尽快拔打)
			</div>
			<div v-if="phone_protect_type == 1" class="m-btm line18 font12 color-gray">
				仅支持使用<span v-text="codePro.a"></span>的手机卡拔号
			</div>
		</van-dialog>
		<!-- 添加沟通聊天记录 -->
		<van-popup v-model="showRecord" position="right" :overlay="false" style="width: 100%; height: 100%; padding: 0">
			<Head :goback_custom="true" @gobackCustomMethod="showRecord = false">
				填写沟通记录
			</Head>
			<van-form @submit="submitRemark1">
				<van-cell-group inset>
					<van-field style="padding: 10px" v-model="form1.facilityname" name="设备型号" label="设备型号"
						placeholder="请填写设备型号" :rules="[{ required: true, message: '请填写设备型号' }]" />
					<van-field style="padding: 10px" type="textarea" rows="2" name="remark" v-model="form1.content"
						label="本次沟通内容" placeholder="请输入备注内容" />

					<van-field style="padding: 10px" required readonly clickable name="interview_date"
						v-model="form1.interview_date" label="下次联系时间" placeholder="请选择" @click="showDatePicker = true"
						class="form_choose reset_after" :rules="[{ required: true, message: '请选择下次联系时间' }]" />
					<van-popup v-model="showDatePicker" position="bottom">
						<van-datetime-picker type="date" title="选择下次联系时间" :min-date="minDate" :formatter="formatterDate"
							@confirm="handlerDate" />
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
			<PopupPayment :amount="directServiceInfo.need_expense" @handlerSubmit="handlerDirectPay"></PopupPayment>
		</van-popup>
		<van-dialog v-model="showDetail" title="更多基本信息">
			<div class="details_pop_box">
				<div class="detail_line" v-if="
            field_rule.basic.marriage !== undefined &&
            field_rule.basic.marriage.is_display == 1 &&
            base_info.marriage_text
          ">
					<div class="line_left">
						{{ field_rule.basic.marriage.field_cn }}：
					</div>
					<div class="line_right">
						{{ base_info.marriage_text }}
					</div>
					<div class="clear"></div>
				</div>
				<div class="detail_line" v-if="
            field_rule.basic.height !== undefined &&
            field_rule.basic.height.is_display == 1 &&
            base_info.height != '' &&
            base_info.height > 0
          ">
					<div class="line_left">{{ field_rule.basic.height.field_cn }}：</div>
					<div class="line_right">{{ base_info.height }}CM</div>
					<div class="clear"></div>
				</div>
				<div class="detail_line" v-if="
            field_rule.basic.major !== undefined &&
            field_rule.basic.major.is_display == 1 &&
            base_info.major_text
          ">
					<div class="line_left">{{ field_rule.basic.major.field_cn }}：</div>
					<div class="line_right">
						{{ base_info.major_text }}
					</div>
					<div class="clear"></div>
				</div>
				<div class="detail_line" v-if="
            field_rule.basic.householdaddress !== undefined &&
            field_rule.basic.householdaddress.is_display == 1 &&
            base_info.householdaddress
          ">
					<div class="line_left">
						{{ field_rule.basic.householdaddress.field_cn }}：
					</div>
					<div class="line_right">
						{{ base_info.householdaddress }}
					</div>
					<div class="clear"></div>
				</div>
				<div class="detail_line" v-if="
            field_rule.basic.residence !== undefined &&
            field_rule.basic.residence.is_display == 1 &&
            base_info.residence
          ">
					<div class="line_left">
						{{ field_rule.basic.residence.field_cn }}：
					</div>
					<div class="line_right">
						{{ base_info.residence }}
					</div>
					<div class="clear"></div>
				</div>
				<div class="detail_line" v-if="
            field_rule.basic.custom_field_1 !== undefined &&
            field_rule.basic.custom_field_1.is_display == 1 &&
            base_info.custom_field_1
          ">
					<div class="line_left">
						{{ field_rule.basic.custom_field_1.field_cn }}：
					</div>
					<div class="line_right">
						{{ base_info.custom_field_1 }}
					</div>
					<div class="clear"></div>
				</div>
				<div class="detail_line" v-if="
            field_rule.basic.custom_field_2 !== undefined &&
            field_rule.basic.custom_field_2.is_display == 1 &&
            base_info.custom_field_2
          ">
					<div class="line_left">
						{{ field_rule.basic.custom_field_2.field_cn }}：
					</div>
					<div class="line_right">
						{{ base_info.custom_field_2 }}
					</div>
					<div class="clear"></div>
				</div>
				<div class="detail_line" v-if="
            field_rule.basic.custom_field_3 !== undefined &&
            field_rule.basic.custom_field_3.is_display == 1 &&
            base_info.custom_field_3
          ">
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
		<van-popup :lazy-render="false" v-model="showInvite" position="right" :overlay="false"
			style="width: 100%; height: 100%">
			<AddInvitation ref="child" from="detail" :apply_fullname="base_info.fullname" :resume_id="base_info.id"
				@closePopup="showInvite = false"></AddInvitation>
		</van-popup>
		<van-popup :lazy-render="false" v-model="showTipoff" position="right" :overlay="false"
			style="width: 100%; height: 100%">
			<Tipoff ref="tipoff" :type="2" :target_id="base_info.id" :fullname="base_info.fullname"
				@closePopout="showTipoff = false"></Tipoff>
		</van-popup>
		<div class="alw-wx-layer" v-if="showWxLayer" @click="cancelShare"></div>
		<div class="alw-layer" v-if="showLayer" @click="cancelShare"></div>
		<SharePoster v-if="showPoster" @closePoster="closePoster" :type="'resume'" :infoid="shareid"></SharePoster>
		<van-overlay z-index="3" :show="showPoster" @click="showPoster = false" />
		<van-popup v-model="showShare" position="bottom">
			<Share @cancelShare="cancelShare" @handleForward="handleForward" @handlePoster="handlePoster"></Share>
		</van-popup>
		<div class="generate_posters" @click="handlePoster">生成<br />海报</div>
		<!-- 绑定微信开始 -->
		<van-dialog v-model="bindWeixinShow" title="系统提示" :show-cancel-button="false" :show-confirm-button="true"
			@confirm="handleImCheckBind">
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
			<SelectJob @handleCommunicate="handleCommunicate" @handleCloseSelectJob="handleCloseSelectJob"
				:chatid="imChatid" :companyId="companyId" :isSelectJob="false"></SelectJob>
		</van-overlay>
		<!-- 切花案例结束 -->
		<!-- 图片弹窗 -->
		<div class="imgs_srcp" v-if="imgloading" catch:touchmove @touchmove.prevent>
		</div>
		<div v-if="imgloading" @click="dianji('')" class="qq" catch:touchmove @touchmove.prevent>
			<div><img :src="imgs_src_hell" alt="" style="width:100%;height:400px" /></div>
		</div>
		<!-- 订阅弹框 -->
		<div class="subscribe_pu" v-if="subscribe_pu">
			<div :class="['text1',!isSubscribe?'text':'']">
				{{ !isSubscribe ?'已经取消订阅':'您已成功订阅类似项目，有新项目时会第一时间通知到您微信'}}<br />
				<span v-if="isSubscribe" class="span1">微信绑定：{{!isWeixin ?'您尚未绑定微信，':'：已经微信绑定'}}<span v-if="!isWeixin"
						class="span2" @click="go('/member/company/account')">去绑定>></span></span>
			</div>
			<div class="text2" v-if="isSubscribe" @click="subscribe_pu = false">
				<div>完成</div>
			</div>
		</div>
		<!-- 订阅弹框 -->
		<div class="subscribe_pu" v-if="company_auth_pop">
			<div :class="['text1']">
				<span class="span1">参与报价需要进行业务认证，认证后的企业更容易获得采购方信任<span class="span2"
						@click="go('/member/company/account')">立即认证>></span></span>
			</div>
			<div class="text2" @click="company_auth_pop = !company_auth_pop">
				<div>关闭</div>
			</div>
		</div>
		<div class="appear" v-if="appear">
			该项目为付费项目，参与报价需支付{{base_info.service_amount}}元服务费，支付后即可获得采购方联系方式
			<br /><br />
			平台承诺：所有采购项目均为真实有效，若发现信息虚假，可全额退款！
			<img src="@/assets/images/gb.png" @click="appear = false" />
			<div class="appearBox">
				<div class="appearBox1" @click="appearPayment(1)">点券支付（充值优惠）</div>
				<div class="appearBox2" @click="appearPayment(2)">微信支付</div>
			</div>
		</div>
		<div class="subscribe_pu" v-if="insufficient">
			<div :class="['text1','text']">
				<span class="span1">您的点券余额不足<span class="span2"
						@click="go('/member/order/add/common')">去充值>></span></span>
			</div>
			<div class="text2" @click="insufficient = !insufficient">
				<div>关闭</div>
			</div>
		</div>
		<div class="subscribe_pu" v-if="prove">
			<div :class="['text1','text']">
				<span class="span1">该项目参与人数已满，<span class="span2"
						@click="householdaddress">点击订阅类似项目</span>，我们将第一时间为您推送</span>
			</div>
			<div class="text2" @click="prove = !prove">
				<div>关闭</div>
			</div>
		</div>
		<div v-if="appear" style="position: fixed;top: 0; left: 0; right: 0; bottom: 0; z-index: 9; "></div>
		
		<van-popup v-model="sourceShow" style="border-radius: 10px;">
			<div style="width: 320px; height: 150px; background-color: #fff; font-size: 13px; display: flex ; align-items: center; justify-content: center; flex-direction: column;">
				<div style="padding-bottom: 14px; font-size: 18px;">请选择供应商来源</div>
				<div>
					<div style="display:flex; justify-content: center;align-items: center; ">
						<span @click="source = true"><input style='position: relative;top: 1px;' type="radio" :checked="source"/>来源平台方</span>
						<span style="margin-left: 10px;" @click="source = false"><input style='position: relative;top: 1px;' type="radio" :checked="!source"/>来源其他渠道</span>
					</div>
				</div>
				<div style="display: flex; font-size: 15px; padding: 22px 0 0;">
					<div style="border: #ccc solid 1px;width: 88px;height: 28px;line-height: 28px;text-align: center;border-radius: 5px;" @click="sourceShow=false">跳过选择</div>
					<div @click="completePurchase" style="margin-left: 15px;border: #ccc solid 1px;width: 66px;height: 28px;line-height: 28px;text-align: center;border-radius: 5px; background-color: #2295ff;color: #fff;">确认</div>
				</div>
			</div>
		</van-popup>
		
		<div class="fle-bottom" v-if="base_info.statetext != '已停止'">
			<div class="fle-bottom1" @click='showButtom(1)'>停止采购</div>
			<div class="fle-bottom2" @click='showButtom(2)'>已完成采购</div>
			<div class="fle-bottom3" @click='showButtom(3)'>刷新</div>
			<div class="fle-bottom4" @click="$router.push('/member/order/add/stick?id='+query_id)">项目置顶</div>
		</div>
		<div class="fle-bottom"  v-if="base_info.statetext == '已停止'">
			<div class="fle-bottom1 bc" @click='stop'>停止采购</div>
			<div class="fle-bottom2 bc" @click='stop'>已完成采购</div>
			<div class="fle-bottom3 bc" @click='stop'>刷新</div>
			<div class="fle-bottom4 bc" @click="stop">项目置顶</div>
		</div>
	</div>
</template>

<script>
	import VideoList from "../../shortvideo/components/VideoListtwo";
	import wxshare from "@/assets/js/share.js";
	import Tipoff from "@/components/Tipoff";
	import AddInvitation from "@/components/AddInvitation";
	import {isWeiXin,parseTime} from "@/utils/index";
	import PopupPayment from "@/components/service/PopupPayment";
	import http from "@/utils/http";
	import api from "@/api";
	import Login from "@/components/Login";
	import Share from "@/components/share/Share";
	import SharePoster from "@/components/share/SharePoster";
	import Vue from "vue";
	import {ImagePreview,Dialog} from "vant";
	import SelectJob from "@/views/im/components/SelectJob.vue";
	import {mapMutations} from "vuex";
	import {mapState} from "vuex";
	import wx from 'weixin-js-sdk';
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
			SelectJob
		},
		filters: {
			monthTimeFilter(timestamp) {
				return parseTime(timestamp, "{y}-{m}");
			},
		},
		data() {
			return {
				imgs_src_hell: "",
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
				showDirectService: false,
				directServiceInfo: {},
				enableClick: true,
				mainLoading: true,
				query_id: "",
				is_company_login: false,
				showLogin: false,
				after_login_data: {},
				resume_module: {},
				field_rule: {
					basic: {},
					contact: {},
					intention: {},
					education: {}
				},
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
						renderBullet: function(index, className) {
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
				subscribe_pu: false, //弹框
				isSubscribe: false, //是否订阅
				isWeixin: false, //是否微信绑定
				time: null, //定时器
				appear: false,
				showWeixin: false, //微信弹框
				params: {},
				insufficient: false, //点券不住弹框
				company_auth: 0, //是否企业认证 0未认证
				company_auth_pop: false, //企业认证的弹框
				prove: false,
				finished: false,				//报价加载	是否已经完成全部数据
				loading: true,					//报价加载	触底状态，为true防止多次加载
				isButtom:0,					//按钮
				sourceShow:false,				//来源
				source:false,					//来源
				pageSize:10,
				page:1,
				resumeQuotateList:[]
			};
		},
		computed: {
			...mapState(['userInfo', 'userIminfo', 'openId'])
		},
		watch:{
			resumeShow : {
				handler (n,o) {
					if( n = 'resource'){
						this.resumeQuotate()
					}
				}
			}
		},
		created() {
			console.log(this.userIminfo, 'vuexxxxxxxxxxxxxxxxxxxxx')
			console.log(this.userInfo, 'vuexxxxxxxxxxxxxxxxxxxxx')
			console.log(this.$route, '$route$route$route$route$route$route')
			this.query_id = this.$route.query.id;
			this.is_company_login = !!(
				this.$store.state.LoginOrNot === true && this.$store.state.LoginType == 1
			);
			// 请求数据
			this.fetchData();
			this.getScanQrcodeImg();
			if (this.$store.state.config.shortvideo_enable === "1") {
				this.fetchVideonum();
			}
		},
		methods: {
			stop() {
				Dialog({ message: '项目已停止' });
			},
			completePurchase(){
				this.sourceShow = false
				let channel = this.source == true ? 1 : 2 ;
				http.get(api.completePurchase,{rid:this.query_id,channel}).then(res=>{
						console.log(res,"完成采购")
						this.$notify({ type: 'success', message: res.message })
				})
			},
			showButtom(is){
				if(is == 1){
					Dialog.confirm({
					  title: '提示',
					  message:'停止后您的采购需求将不再展示',}).then(() => {
					    http.get(api.stopPurchase,{rid:this.query_id}).then(res=>{
							 console.log(res,"停止采购")
							 this.$notify({ type: 'success', message: res.message })
						 })
					  }).catch(() => {
					    console.log("取消")
					  });
					return
				}
				if(is == 2){
					Dialog.confirm({
					  title: '提示',
					  message:'请确认改采购项目已完成',}).then(() => {
						 this.sourceShow = true
						 http.get(api.completePurchase,{rid:this.query_id}).then(res=>{
							console.log(res,"完成采购")
							this.$notify({ type: 'success', message: res.message })
						 })
					  }).catch(() => {
					    console.log("取消")
					  });
					return
				}
				if(is == 3){
					this.$router.go(0)
				}
				// 获取数据
			},
			resumeQuotate(){
				http.get(api.resumeQuotate,{
					rid:this.query_id,
					page:this.page,
					pageSize:this.pageSize
				}).then(res=>{
					let list = res.data
					this.loading = false
					this.resumeQuotateList = this.page == 1 ? list:[...this.resumeQuotateList,...list];
					if(list.length < this.pageSize){
						this.loading = true
						this.finished = true
					}
				})
			},
			getUnit(){
				this.page++
				this.resumeQuotate()
			},
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
				http.get(api.get_qrcode, {
					type: "bind_weixin"
				}).then((res) => {
					this.scanQrcodeImg = res.data;
				});
			},
			callCodePro() {
				location.href = `tel:${this.codePro.x}`;
			},
			async fetchData(next_method = null) {
				const params = {
					id: this.query_id,
				};
				let res = await http.get(api.resumeshow, params);
				console.log(res, "数据res、++++++++++++++++++数据")
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
				} = {
					...res.data
				};
				console.log(res.data, '1212')
				this.resume_module = resume_module;
				this.field_rule = field_rule;
				this.company_auth = res.data.company_auth
				this.isSubscribe = res.data.base_info.isSubscribe; //是否订阅
				this.isWeixin = res.data.base_info.isWeixin; // 绑定微信
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
				this.previewImgList = this.img_list.map(function(item) {
					return item.img_src;
				});
			},
			async doTel() {
				if (this.show_contact == 1) {
					if (this.phone_protect_open) {
						let res = await http.get(api.secret_phone, {
							resume_id: this.query_id,
						});
						const {
							code,
							message,
							data
						} = res;
						if (code == 200) {
							this.codePro.x = data.x;
							this.codePro.timeout = data.timeout;
							this.codePro.a = data.a;
							this.codePro.show = true;
							let that = this;
							this.$nextTick(() => {
								let tmh = null;
								let tm = function() {
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
						this.showRecord = false;
					})
					.catch(() => {});
			},
			go(url) {
				// 关闭弹窗
				this.insufficient = false
				this.subscribe_pu = false
				this.showWeixin = false
				this.company_auth_pop = false
				this.$router.push(url);
			},
			doMsg() {
				clearTimeout(this.time)
				if (this.isSubscribe) { //是否订阅
					http.post(api.saveUserResume, {
						type: 2,
						householdaddress: [],
						uid: this.userInfo.uid,
						resumeid: this.base_info.id
					}).then(res => {
						this.isSubscribe = false
						this.prove = false
						this.subscribe_pu = true
						this.time = setTimeout(() => {
							this.subscribe_pu = false
						}, 1500)
					})
				} else {
					this.householdaddress()
				}
			},
			householdaddress() {
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
					console.log(this.base_info, '数据数据')
					let arr = [];
					arr.push(this.base_info.householdaddress)
					http.post(api.saveUserResume, {
						type: 2,
						householdaddress: arr,
						uid: this.userInfo.uid,
						resumeid: this.base_info.id
					}).then(res => {
						if (this.isWeixin) {
							this.prove = false
							this.isSubscribe = true
							this.subscribe_pu = true
							this.time = setTimeout(() => {
								this.subscribe_pu = false
							}, 1500)
						} else {
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
						var {
							companyinfo
						} = res.data;

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
										this.$router.push({
											path: "/im/" + res.data.chatid
										});
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
												this.$router.push({
													path: "/member/personal/resume"
												});
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
				this.$dialog
					.confirm({
						title: "提示",
						message: "您确定买断该项目吗？",
						confirmButtonText: "立即买断",
					})
					.then(() => {
						// this.showLogin = true
						this.doDownload(1);
					})
					.catch(() => {});
			},
			doDownload(is_) {
				if (this.base_info.involved_count >= this.base_info.involved) {
					this.prove = true
					return false
				}
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
								method: "doDownload",
							};
						})
						.catch(() => {});
				} else {
					console.log(this.company_auth, "微信微信微信")
					if (this.company_auth === 0) { //company_auth == 0 未得到企业认证
						this.company_auth_pop = true
					} else {
						this.appear = true
						this.params = {
							resume_id: this.query_id,
							buyout: is_ == 1 ? 1 : 0,
						};
					}
				}
			},
			appearPayment(isT) {
				console.log(isT, "数据")
				if (this.base_info.audit != 1) {
					console.log(this.base_info.audit,
						'该项目还未审核通过，不能继续此操作base_info.auditbase_info.auditbase_info.auditbase_info.audit')
					this.enableClick = true;
					this.$notify("该项目还未审核通过，不能继续此操作");
					return false;
				}
				// 点券支付
				if (isT === 1) {
					http.post(api.resumedownload, this.params).then((res) => {
						this.enableClick = true;
						this.appear = false
						//res.data.done == 0 , 点券不足，跳转到其他页面
						if (res.data.done == 0) {
							this.go('/member/order/add/common/?type=service&resumePackage=resume_package')
							// this.insufficient = true
							return
							this.showDirectService = true;
							this.directServiceInfo = {
								use_type: res.data.use_type,
								need_points: res.data.need_points,
								need_expense: res.data.need_expense,
								discount: res.data.discount,
								resume: this.query_id,
								btnCn: res.data.use_type == "points" ? "立即兑换" : "立即支付",
							};
							return false;
						} else {
							// 显示上方的购买次数
							if (this.base_info.isbuy) {
								this.base_info.involved_count = this.base_info.involved
							} else {
								this.base_info.isbuy = true
								this.base_info.involved_count++
							}
							// 重新渲染
							this.fetchData();
							//下载成功
							this.$notify({
								type: "success",
								message: res.message
							});
						}
					}).catch(() => {
						this.enableClick = true;
					});
				}
				// 微信支付
				if (isT === 2) {
					let openId = localStorage.getItem("weixinOpenid");
					let params = {
						service_type: 'single_resume_down', //single_resume_down 快捷消费-下载单份项目   single_job_refresh  快捷消费-刷新项目
						deduct_points: 0, //积分  负值为扣积分  正值加积分
						payment: "wxpay", //支付方式  wxpay 微信支付、其他
						resumeid: this.query_id, //项目id
						return_url: `http://www.hangyedaniu.com/m/resume/${this.query_id}`, //页面的路径
						openid: openId, //微信的openid
					}
					http.post(api.company_pay_direct_service, params).then((res) => {
						this.appear = false
						if (res.data.pay_status == 1) {
							// 显示上方的购买次数
							if (this.base_info.isbuy) {
								this.base_info.involved_count = this.base_info.involved
							} else {
								this.base_info.isbuy = true
								this.base_info.involved_count++
							}
							this.$notify({
								type: "success",
								message: "支付成功"
							});
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
			// 触发微信支付
			handlerDirectPay(payment) {
				let openid = localStorage.getItem("weixinOpenid");
				let pay_data = {
					service_type: "single_resume_down",
					deduct_points: this.directServiceInfo.use_type == "points" ? this.directServiceInfo.need_points :
						0,
					payment,
					resumeid: this.query_id,
					return_url: this.$store.state.config.mobile_domain + "resume/" + this.query_id,
					openid: openid,
				};
				http.post(api.company_pay_direct_service, pay_data).then((res) => {
						if (res.data.pay_status == 1) {
							this.$notify({
								type: "success",
								message: "支付成功"
							});
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
							this.$notify({
								type: "success",
								message: res.message
							});
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
				http
					.get(api.shortvideo_total, {
						rid: this.query_id
					})
					.then((res) => {
						this.videonum = res.data;
					})
					.catch(() => {});
			},
			//图片放大缩小
		},
	};
</script>

<style lang="scss">
	.yusuan {
		font-size: 10px;
		color: #101010;
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

	.qq {
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
			width: 45px;
			height: 100%;
			padding-top: 45px;
			color: #ff6600;
			font-size: 12px;
			text-align: center;
			background: url("../../../assets/images/report_ico_js.png") center 14px no-repeat;
			background-size: 19px 23pxp
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
		width: 100px;
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
	.fle-bottom{display: flex; justify-content: space-around; align-items: center; position: fixed; bottom: 0; left: 0; right: 0; height: 60px; background-color: #fff;
		div{padding: 8px 5px; font-size: 14px; border-radius: 4px;  text-align: center;}
		.fle-bottom1{color: #FD7900; background-color: #E0E0E0 ;}
		.fle-bottom2{color: #FD7900; background-color: #F4C592 ;}
		.fle-bottom3{color: #fff; background-color: #4199FE ; width: 65px;}
		.fle-bottom4{color: #fff; background-color: #FD7900 ;}
		.bc{background-color: #ccc; color: #000;}
	}
	.co-text{width: 96%; height: 35px; color: #fff; font-size: 13px; line-height: 35px; margin: auto ; text-align: center; background-color: #FDB600 ; border-radius: 5px;}
	.box-list{padding: 12px 10px; border-top: 1px solid #ccc; margin-top: 10px;
		.title{font-size: 18px;}
		.dl-text{display: flex; font-size: 13px;line-height: 25px;
			.dt-text{width: 80px;}
			.dd-text{ flex: 1;}
			.co{color: #0482f2;}
			.border-nub{border: 1px solid #ccc; padding: 0px 3px; border-radius: 4px;}
		}
	}
	.my_app {
		padding-bottom: 60px;
		overflow: hidden;

		.subscribe_pu {
			position: fixed;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			z-index: 555;
			background-color: #ffffff;
			padding: 18px 13px 0;
			width: 295px;
			box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.4);
			border-radius: 10px;
			border: 1px solid rgba(187, 187, 187, 100);
			font-size: 15px;
			color: #000;

			.text1 {
				padding-bottom: 6px;

				.span1 {
					padding-top: 5px;
					display: block;
				}

				.span2 {
					color: #009bff;
				}
			}

			.text {
				text-align: center;
				padding-bottom: 12px;
			}

			.text2 {
				color: #7B7575;
				height: 15px;
				width: 50px;
				display: flex;
				justify-content: center;
				align-items: center;
				width: 100%;
				padding: 15px 15px 20px;

				div {
					width: 75px;
					height: 25px;
					text-align: center;
					line-height: 25px;
					border: #ccc solid 1px;
					border-radius: 5px;
				}
			}
		}

		.appear {
			position: fixed;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			background-color: #fff;
			width: 88%;
			padding: 28px 13px 13px 13px;
			border-radius: 10px;
			box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.4);
			z-index: 10000;
			font-size: 16px;
			color: rgba(101, 101, 101, 100);
			word-wrap: break-word;
			word-break: break-all;

			img {
				width: 18px;
				height: 18px;
				position: absolute;
				top: 8px;
				right: 8px;
			}

			.appearBox {
				display: flex;
				width: 100%;
				justify-content: space-around;
				padding: 16px 0px;
				color: #fff;
				font-size: 14px;

				.appearBox1 {
					background-color: #FD7900;
					height: 37px;
					line-height: 37px;
					text-align: center;
					border-radius: 4px;
					padding: 0px 6px;
				}

				.appearBox2 {
					background-color: #287B30;
					height: 37px;
					line-height: 37px;
					text-align: center;
					border-radius: 4px;
					padding: 0px 18px;
				}
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

			.item_chat1 {
				background: #ffe9de;
				border: 1px solid #ff7356;
				color: #ff5d3c;
			}

			.item_call {
				flex-shrink: 0;
				// float: left;
				width: 60px;
				height: 46px;
				padding: 32px 0 4px;
				text-align: center;
				font-size: 10px;
				color: #333333;
				background: url("../../../assets/images/calling_ico.svg") center 9px no-repeat;
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
				background: url("../../../assets/images/com_show_col_ico_2.png") center 9px no-repeat;
				background-size: 17px;

				&.item_collect_ac {
					background: url("../../../assets/images/com_show_col_ico_2_ac.png") center 9px no-repeat;
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
			justify-content: center;
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

				.van-tag+.van-tag {
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
			.item {
				&.phone {
					background: url("../../../assets/images/cac_phone_ico.svg") 2px center no-repeat;
					background-size: 16px;
				}

				&.wx {
					background: url("../../../assets/images/cac_wx_ico.svg") 0 center no-repeat;
					background-size: 16px;
				}

				&.email {
					background: url("../../../assets/images/cac_email_ico.svg") 0 center no-repeat;
					background-size: 16px;
				}

				&.qq {
					background: url("../../../assets/images/cac_qq_ico.svg") 0 center no-repeat;
					background-size: 16px;
				}

				font-size: 15px;
				color: #333333;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				padding: 0 20px 0 23px;
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
				background: #f9f9f9 url("../../../assets/images/com_show_share_ico.png") 8px center no-repeat;
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
				background: #f9f9f9 url("../../../assets/images/com_show_col_ico.png") 8px center no-repeat;
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
					font-size: 14px;
					border-radius: 4px;
					width: 76px;
					height: 28px;
					text-align: center;
					line-height: 28px;
					font-weight: bold;
					color: #fff;
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
					background: url("../../../assets/images/resume_list_level_ico.png") 0 center no-repeat;
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
					background: #ffa57d url("../../../assets/images/fab_ico.svg") 5px center no-repeat;
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
						background: url("../../../assets/images/resume_list_level_ico.png") 0 center no-repeat;
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
							background: #ff8d65 url("../../../assets/images/female_ico.svg") center no-repeat;
							background-size: 9px;
						}

						&.male {
							background: #4fa5fa url("../../../assets/images/male_ico.svg") center no-repeat;
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
		border: 1px solid #fd9638;
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
		font-size: 12px;
		color: #101010;
	}

	//图片点击
</style>
