<template>
	<div id="app">

		<Head :prepare='true'>项目详情</Head>
		<div class="headBox">
			<div class="headBox1" v-if="true">
				<div class="headBox1User">
					<div class="headBox1UserImg"><img v-if="dataMes.basehead" :src="dataMes.basehead.pimg" /></div>
					<div class="headBox1UserName">
						<div class="headBox1UserNameTop">
							<div class="headBox1UserNameTop1">{{dataMes.basehead&&dataMes.basehead.title}}</div>
						</div>
						<div class="headBox1UserNameBottom">
							<div class="headBox1UserNameBottom1">{{dataMes.basehead&&dataMes.basehead.end_time}} <span
									class="lable">{{dataMes.basehead&&dataMes.basehead.type}}</span></div>
						</div>
					</div>
				</div>
				<p style="padding: 10px 0 0;" v-if="dataMes.basehead&&dataMes.basehead.category.length>0">包含但不限于以下工艺的设备
				</p>
				<div class="lableList">
					<div class="lableListBox" v-for="(item,index) in dataMes.basehead&&dataMes.basehead.category"
						:key="index">
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
				<van-tab title="项目介绍">
					<div class="tab1">
						<div class="tab1List">
							<!-- 是否登录 9/27 ok -->
							<div class="tab1List3 redText" v-if="!dataMes.isLogin">
								下文****为隐藏内容，仅对行业大牛用户开放，注册登录后可免费查看内容详情
							</div>
							<!-- 登录后并且是免费会员 is_free : true==免费会员 false:不是免费会员  9/27 ok-->
							<!-- <div class="tab1List3 redText"
								v-else-if=" dataMes.userinfo.is_free && !dataMes.userinfo.isMonthSetmealSee ">
								<p>（ 下文****为隐藏内容，仅对行业大牛会员开放，您每天可免费查看一条 ）</p>
								<div class="clickLook" @click="getResumeKeepInfo"> 点击查看 </div>
							</div> -->
							<!-- 登录后查询是否购买了月季套餐 如何可以查看这个详情，就隐藏这个按钮 -->
							<!-- <div class="tab1List3 redText"
								v-else-if="dataMes.userinfo.isMonthSetmeal && !dataMes.userinfo.isMonthSetmealSee">
								<p>（ 消耗查看点获取项目详细资料 ）</p>
								<div class="clickLook" @click="getResumeKeepInfos"> 点击查看 </div>
							</div> -->
						</div>
						<div class="textList" v-if="dataMes.basemain&&dataMes.basemain.project_type === 0">
							<div class="tab1List">
								<div class="tab1List1">项目名称</div>
								<div class="tab1List2">：</div>
								<div class="tab1List3"
									:class="{'redText':dataMes.basemain&&dataMes.basemain.project_name === '****'}">
									{{dataMes.basemain&&dataMes.basemain.project_name}}</div>
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
								<div class="tab1List3"
									:class="{'redText':dataMes.basemain&&dataMes.basemain.construction_unit === '****'}">
									{{dataMes.basemain&&dataMes.basemain.construction_unit}}</div>
							</div>
							<div class="tab1List">
								<div class="tab1List1">项目起止年限</div>
								<div class="tab1List2">：</div>
								<div class="tab1List3">{{dataMes.basemain&&dataMes.basemain.start_time}}</div>
							</div>
						</div>
						<!-- 其他项目内容 -->
						<div v-if="dataMes.basemain&&dataMes.basemain.project_type === 1" class=""
							v-html="dataMes.basemain.other_content"></div>
						<div class="tab2" style="border:0;padding: 0;" v-if="!dataMes.userinfo.isMember">
							<p style="color: #000;">项目进展：</p>
							<p style="color: red;text-align:left;padding: 5px 0px 16px; font-size:12px">
								项目进展是行业大牛网通过一定渠道获得的项目进度，帮您提前把握商机！需要高级会员权限才能查询！
							</p>
							<span class="buttonSpan" style="background:#ccc;filter: blur(4px);">****</span>
							<span class="buttonSpan" style="filter: blur(4px);">****</span>
							<span class="buttonSpan" style="background:#ccc;filter: blur(4px);">****</span>
						</div>
					</div>
				</van-tab>
				<!-- //  项目进展  如果 isMember:true === 成为了会员  is_free == 免费会员  -->
				<van-tab
					v-if="!dataMes.userinfo.isMember && dataMes.userinfo.is_free && !dataMes.userinfo.isMonthSetmealSee"
					title="项目进展（1）">
					<div class="tab2">
						<p style="color: red;text-align:left;padding: 16px 0; font-size:12px">
							项目进展是行业大牛网通过一定渠道获得的项目进度，帮您提前把握商机！需要高级会员权限才能查询！
						</p>
						<span class="buttonSpan" style="background:#ccc;filter: blur(4px);">****</span>
						<span class="buttonSpan" style="filter: blur(4px);">****</span>
						<span class="buttonSpan" style="background:#ccc;filter: blur(4px);">****</span>
					</div>
				</van-tab>
				<van-tab title="项目联系人">
					<!-- 如果登录或者是免费会员 is_free:true==免费会员    -->
					<div class="tab2" v-if="!dataMes.isLogin || dataMes.userinfo.is_free">
						<p style="color: #000;padding: 16px 0;font-size: 13px;color: red;"
							v-if="dataMes.basemain&&dataMes.basemain.project_name !== '****'">
							您暂未开通权限，点击立即联系即可查看全部信息；您也可以通过 <span style="color: #1787fb;" @click="go(2)">百度>></span> 搜索一下
						</p>
						<p style="color: #000;padding: 3px 0;">公司名称：<span class="redText">****</span> </p>
						<p style="color: #000;padding: 3px 0;">项目地区：<span class="redText">****</span></p>
						<p style="color: #000;padding: 3px 0;">姓 名：<span class="redText">****</span></p>
						<p style="color: #000;padding: 3px 0;">岗 位：<span class="redText">****</span></p>
						<p style="color: #000;padding: 3px 0;">联系电话：
							<span style="color: #ff3e3e;" @click="look()">点击查看</span>
						</p>
						<p style="color: #00a1ff;padding: 3px 0;" @click="look()">更多项目联系人>></p>
					</div>
					<!-- 登录 && 不是高级会员 && 是免费会员 && 也不是月季套餐会员 isMember:true == 高级级以上  is_free:true == 免费会员 isMonthSetmeal:true == 月季套餐会员身份 -->
					<div class="tab2" style="color: #000;"
						v-else-if="dataMes.isLogin && !dataMes.userinfo.isMember && dataMes.userinfo.is_free && !dataMes.userinfo.isMonthSetmeal">
						<p style="padding: 0 52px;color: #000;">姓名：***</p>
						<p style="padding: 0 52px;color: #000;">岗位：***</p>
						<p style="padding: 0 52px 10px;color: #000;">联系电话：135****</p>
						想要深入了解项目详情，点击<span style="color: #409eff; padding:0 4px;"
							@click="contactUs();">联系我们</span>预计30分钟内项目经理会联系您，请注意来电提醒
					</div>
					<!--  如果是月季套餐 需要点击查看 并且暂时不能查看信息，就会来这里，要是看过的  isMonthSetmealSee:可查看信息 -->
					<div v-else-if="dataMes.userinfo.isMonthSetmeal && !dataMes.userinfo.isMonthSetmealSee">
					 <div class="tab2">
						<div  class="contacts">项目联系人</div>
							<!-- <div>
								<span @click="getResumeKeepInfos" class="consume">获取信息</span>
								消耗查看点数
							</div> -->
							<div class="tab2Information" style="border-top:0" >
								<div class="tab1List" v-if="dataMes.userinfo.nikename">
									<div class="tab1List1">公司名称</div>
									<div class="tab1List2">：</div>
									<div class="tab1List3" style="color:red">{{dataMes.userinfo.contactInfo.company}}</div>
								</div>
								<div class="tab1List" v-if="dataMes.userinfo.nikename">
									<div class="tab1List1">姓名</div>
									<div class="tab1List2">：</div>
									<div class="tab1List3" style="color:red">{{dataMes.userinfo.contactInfo.nikename}}</div>
								</div>
								<div class="tab1List" v-if="dataMes.userinfo.post">
									<div class="tab1List1">岗位</div>
									<div class="tab1List2">：</div>
									<div class="tab1List3" style="color:red">{{dataMes.userinfo.contactInfo.post}}</div>
								</div>
								<div class="tab1List" v-if="dataMes.userinfo.phone">
									<div class="tab1List1">联系电话</div>
									<div class="tab1List2">：</div>
									<div class="tab1List3 co" @click="call = true;callSty=dataMes.userinfo.phone" style="color:red">
										{{dataMes.userinfo.contactInfo.phone}}</div>
								</div>
								<div class="tab1List" v-for="(item,index) in otherPhone">
									<div class="tab1List1">年报电话</div>
									<div class="tab1List2">：</div>
									<div class="tab1List3 co" @click="call = true;callSty=item.phone">{{item.phone}}
									</div>

								</div>

							</div>
						</div> 
					</div>
					<!-- 上条判断否则 判断结果--是月季套餐和高级会员都显示这里 判断号码是否空号 年报电话是否存在 -->
					<!-- <div class="tab2"
						v-else-if="dataMes.userinfo.phone == '' || dataMes.userinfo.phone == null && !otherPhone.length  ">
						<div class="tab1number">年报电话</div>
						<div class="findContacts">抱歉，该项目暂无年报电话，如果您对该项目很感兴趣，您可以咨询<span
								style="color: #409EFF;">【找人脉】</span>服务，不成功不收费!</div>

						<div class="tab1numbers">负责人电话</div>
						<div v-if="!fzrlook">
							<div class="formal">成为正式会员后，可查看项目关键负责人的联系方式，<span style="color: #169BD5;">点击咨询优惠价格>></span>
							</div>
						</div>

						<div v-else class="findContact">您当前为正式会员，如果您需要获取该项目更多联系人，您可以免费发起<span
								style="color: #409EFF;">【找人脉】</span>服务</div>
					</div> -->
					<div v-else class="tab2Information" >
							<div  v-if="otherPhone.length >0 " >
								<div class="tab1List" v-for="(item,index) in otherPhone">
									<div class="tab1List1">年报电话</div>
									<div class="tab1List2">：</div>
									<div class="tab1List3 co" @click="call = true;callSty=item.phone">{{item.phone}}</div>
								</div>
						    </div>
						<!-- v-if="!otherPhone.length >0  " -->
							<div v-if=" otherPhone.length === 0">
								<div class="tab1number">年报电话</div>
								<div class="findContacts">抱歉，该项目暂无年报电话，如果您对该项目很感兴趣，您可以咨询<span style="color: #409EFF;">【找人脉】</span>服务，不成功不收费!</div>
							</div>
						<div>
							<!-- {{fzrlook}} -->
							<!-- <div v-if="!fzrlook">
								<div class="tab1numbers">负责人电话</div>
								<div>
									<div class="formal">成为正式会员后，可查看项目关键负责人的联系方式，<span style="color: #169BD5;"
											@click="handlerJump()">点击咨询优惠价格>></span></div>
								</div>
								<div style="margin-top: 10px;">
									<div class="tab1List">
										<div class="tab1List1">公司名称</div>
										<div class="tab1List2">：</div>
										<div class="tab1List3">{{dataMes.userinfo.contactInfo.company}}</div>
									</div>
									<div class="tab1List">
										<div class="tab1List1">姓名</div>
										<div class="tab1List2">：</div>
										<div class="tab1List3">
											{{fzrlook?dataMes.userinfo.contactInfo.nikename:'*******'}}</div>
									</div>
									<div class="tab1List">
										<div class="tab1List1">岗位</div>
										<div class="tab1List2">：</div>
										<div class="tab1List3">{{fzrlook?dataMes.userinfo.contactInfo.post:'*******'}}
										</div>
									</div>
									<div class="tab1List">
										<div class="tab1List1">联系电话</div>
										<div class="tab1List2">：</div>
										<div class="tab1List3 co"
											@click="call = true;callSty=dataMes.userinfo.contactInfo.phone">
											{{fzrlook?dataMes.userinfo.contactInfo.phone:'*******'}}</div>
									</div>
								</div>
							</div> -->
							<div >
								<div v-if="!dataMes.userinfo.contactInfo.phone" class="formal">
									<div>
										<div class="tab1numbers">负责人电话</div>
										<div>您当前为正式会员，如果您需要获取该项目更多联系人，您可以免费发起<span
											style="color: #169BD5;">【找人脉】</span>服务</div>
									</div>
								</div>
								<div v-if="dataMes.userinfo.contactInfo.phone">
									<div class="tab1numbers">负责人电话</div>
									<div style="margin-top: 10px;">
										<div class="tab1List">
											<div class="tab1List1">公司名称</div>
											<div class="tab1List2">：</div>
											<div class="tab1List3">{{dataMes.userinfo.contactInfo.company}}</div>
										</div>
										<div class="tab1List">
											<div class="tab1List1">姓名</div>
											<div class="tab1List2">：</div>
											<div class="tab1List3">{{dataMes.userinfo.contactInfo.nikename}}</div>
										</div>
										<div class="tab1List">
											<div class="tab1List1">岗位</div>
											<div class="tab1List2">：</div>
											<div class="tab1List3">{{dataMes.userinfo.contactInfo.post}}</div>
										</div>
										<div class="tab1List">
											<div class="tab1List1">联系电话</div>
											<div class="tab1List2">：</div>
											<div class="tab1List3 co"
												@click="call = true;callSty=dataMes.userinfo.contactInfo.phone">
												{{dataMes.userinfo.contactInfo.phone}}</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</van-tab>
				<van-tab title="沟通记录" v-if="dataMes.userinfo.isMonthSetmealSee">
					<div class="tab3">
						<div class="communicate" @click="show = true">添加沟通记录+</div>
						<div class="tab3for" v-for="(item,index) in dataMes.all_record&&dataMes.all_record"
							:key="index">
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
			<!-- <div class="popupDiv" v-if="dataMes.all_record&&dataMes.all_record.length>0"> -->
			<div class="popupDiv">
				<div class="popupDivHaed">
					<div class=""></div>
					<div class="popupDivHaedText">添写沟通记录</div>
					<div class="popupDivHaedGb" @click="show = false">
						<van-icon name="cross" size="26" color="#000000" />
					</div>
				</div>
				<div class="popupCenter">
					<div style="display: flex; justify-content: space-around;align-items: center;">
						<div>项目进展:</div>
						<div @click="process_type = 0" :class="{'process_type':process_type === 0}"
							style="padding: 5px 10px;background: #ccc;color: #fff;">厂房建设</div>
						<div @click="process_type = 1" :class="{'process_type':process_type === 1}"
							style="padding: 5px 10px;background: #ccc;color: #fff;">暂无需求</div>
						<div @click="process_type = 2" :class="{'process_type':process_type === 2}"
							style="padding: 5px 10px;background: #ccc;color: #fff;">采购洽谈</div>
					</div>
					<div class='popupCenterDivTextarea'>
						<div class="popupCenterDivTextareaText"><span style='color: red;'>*</span>本次沟通内容 ：</div>
						<div class="textarea">
							<textarea v-model="textareaText"></textarea>
						</div>
					</div>
					<div class='popupCenterDiv' @click="dateBox = true">
						<div class="popupCenterDivText"><span style='color: red;'>*</span>下次联系时间 ：</div>
						<div class="inputDiv"><input v-model="textareainput2" class="input" type="text" /></div>
					</div>
					<div class="button">
						<div class="button1"></div>
						<div class="button2" @click="homeResumeKeepAddRecord">确认</div>
					</div>
				</div>
			</div>
			<!-- <div v-else style="font-size: 15px;color: #000;padding: 61px 40px;text-indent: .8em;line-height: 30px;">
				为了您的操作更便捷，首次沟通记录需在您在电脑端添加!
			</div> -->
		</van-popup>
		<!-- 时间选择器 -->
		<van-popup v-model="dateBox" position="bottom" :style="{ height: '65%'}">
			<van-datetime-picker type="date" title="选择联系时间" @cancel='dateBox = false' :min-date="minDate"
				@confirm='confirm' />
		</van-popup>
		<!-- 拨打电话 -->
		<van-popup v-model="call" position="bottom" style="background-color: rgba(0, 0, 0, 0);">
			<div v-if="callSty" class="callMe"><a :href="'tel:'+callSty">{{callSty}}</a></div>
			<!-- <div v-else="dataMes.userinfo.phone" class="callMe">暂无号码</div> -->
			<div class="callCancel" @click="call = false">取消</div>
		</van-popup>
		<div class="collectionDiv">
			<div class="collectionDiv2">
				<div @click="call = true" style="font-size:18px">
					<van-icon name="phone-o" />
				</div>
				<div>电话</div>
			</div>
			<div @click="collection" :class="{'star-size':isCollection}" class="collection">
				<div style="font-size:18px">
					<van-icon :name="isCollection?'star':'star-o'" />
				</div>
				<div>收藏</div>
			</div>
			<!-- 判断是否登录 -->
			<div class="addLogin" v-if="!dataMes.isLogin"
				@click="$router.push(`/member/login/company?redirect=/backupsProject/backupsProject?id=${id}`)">
				登录参与
			</div>
			<!-- 登录后点击查看 是免费会员 -->
			<div v-else-if="dataMes.userinfo.is_free" @click="getResumeKeepInfo" class="addCommunicate">立即查看</div>
			<!-- 判断能否查看联系电话---isMonthSetmealSee:true---高级会员和点击查看项目 -->
			<div v-else-if="!dataMes.userinfo.isMonthSetmealSee" @click="getContact" class="addCommunicate">获取联系方式</div>
			<!-- 可以查看号码添加联系方式 -->
			<div v-else @click="resume_keepProjectApply" class="addCommunicate">添加沟通记录</div>
		</div>

		<van-popup v-model="freeView" :style="{ width: '85%'}">
			<div class="freeView-div">
				<h3 class="freeView-h3">今日免费查看权限使用完啦！</h3>
				<p class="freeView-text">成为会员，同时获得以下功能</p>
				<div class="freeView-img">
					<div class="freeView-img-list" v-for="(item,index) in freeViewImg" :key="index">
						<div class="list-img"><img :src="item.imgUrl" width="100%" height="100%" /></div>
						<div>{{item.text1}}</div>
						<div>{{item.text2}}</div>
					</div>
				</div>
				<p class="freeView-p1">进入<span class="freeView-span">会员专场</span>，查看更多权益</p>
				<p class="freeView-p2">90%选择开通会员用户,成交10万单!</p>
				<div class="freeView-button" @click='goCommon()'>进入会员专场</div>
				<div style="position: absolute;top: -3px;right: 4px;font-size: 17px;" @click="freeView = false">&otimes;
				</div>
			</div>
		</van-popup>
		<!-- 购买月季套餐 -->
		<!-- <van-popup v-model="gjUser" :style="{ width: '85%'}">
			<div class="freeView-div-pay">
				<h3 class="freeView-h3">{{title}}</h3>
				<p class="freeView-text">大数据精准计算挖掘 为您找到该项目更多联系人</p>
				<div class="freeView-img" >
					<div class="freeView-img-list-pay" :class="{'freeView-img-list-pay-hvo':item.id === service_id}" @click="clickListPay(item)" v-for="(item,index) in resumeKeepSetmeal" :key="index" >
						<div class="freeView-img-list-pay-first">
							<div v-if="item.isFirstDiscount" class="first-div">首单特享</div>
						</div>
						<div class="pay-month"><span>{{item.name}}</span>个月</div>
						<p class="pay-consult">查阅{{item.seeCount}}次</p>
						<p class="pay-amount">{{item.onePrice}}/条</p>
						<div class="pay-use">{{item.expense}}</div>
					</div>
				</div>
				<div style="text-align: right;padding: 0 0 14px;color: #0094fd;" @click="goPay('/member/order/add/common?type=setmeal')"> 更多优惠套餐>> </div>
				<div class="freeView-wxzf" @click="companyPay('wxpay')">
					微信支付
				</div>
				<div style="position: absolute;top: -3px;right: 4px;font-size: 17px;" @click="gjUser = false">&otimes;</div>
			</div>
		</van-popup> -->
		<!-- 弹窗1：有免费次数没有权限 -->
		<van-popup v-model="gjUser1" :style="{ width: '85%'}" closeable>
			<div class="titlegjUsers">
				<div>
					<div class="Tips">您当前为<span
							style="color:red;">免费会员</span>，无法查看采购单位联系方式，您可以上"百度"搜索，建议您购买试用套餐，快速获取采购商机！</div>
				</div>
				<div class="freeView-img">
					<div class="freeView-img-list-pay" :class="{'freeView-img-list-pay-hvo':item.id === service_id}"
						@click="clickListPay(item)" v-for="(item,index) in resumeKeepSetmeal" :key="index">
						<div v-if="!item.more">
							<p class="pay-consult">查阅<span
									style="font-size: 18px;color: #FF4000;">{{item.seeCount}}</span>次</p>
							<p class="pay-amount">约{{item.onePrice}}/条</p>
							<div class="pay-use">{{item.expense}}元</div>
						</div>
						<div v-else>
							<p class="pay-consult" style="font-size:12px">{{item.seeCount}}</p>
							<p class="pay-amount">{{item.onePrice}}</p>
							<div class="pay-use">{{item.expense}}</div>
						</div>
					</div>

				</div>
				<div class="forward">98%企业选择购买套餐，共成交10万单!</div>
				<div class="transmit">
					<div class="refuse">忍痛拒绝</div>
					<div class="buyNow" @click="companyPay('wxpay')">立即购买</div>
				</div>
			</div>
		</van-popup>
		<!-- 弹窗2：免费会员的免费次数使用完后 -->
		<van-popup v-model="gjUser2" :style="{ width: '85%'}" closeable>
			<div class="titlegjUsers">
				<div class="titlegjUser">
					<div>今日免费次数查看完啦！</div>
					<div>免费会员每天仅可查阅一条信息</div>
					<div class="Package">98%企业选择购买套餐，共成交万单！</div>
				</div>
				<div class="freeView-img">
					<div class="freeView-img-list-pay" :class="{'freeView-img-list-pay-hvo':item.id === service_id}"
						@click="clickListPay(item)" v-for="(item,index) in resumeKeepSetmeal" :key="index">
						<div v-if="!item.more">
							<p class="pay-consult">查阅<span
									style="font-size: 18px;color: #FF4000;">{{item.seeCount}}</span>次</p>
							<p class="pay-amount">约{{item.onePrice}}/条</p>
							<div class="pay-use">{{item.expense}}元</div>
						</div>
						<div v-else>
							<p class="pay-consult" style="font-size:12px">{{item.seeCount}}</p>
							<p class="pay-amount">{{item.onePrice}}</p>
							<div class="pay-use">{{item.expense}}</div>
						</div>
					</div>
				</div>
				<div class="forward">您也可以选择转发分享，每注册一个账号，您可以免费多查看5条项目哦！</div>
				<div class="transmit">
					<div class="sharingRules">查看分享规则</div>
					<div class="buyNow" @click="companyPay('wxpay')">立即购买</div>
				</div>
			</div>
		</van-popup>
		<!-- 弹窗3：购买权限后次数使用完 -->
		<van-popup v-model="gjUser3" :style="{ width: '85%'}" closeable class="texte">
			<div class="titlegjUsers">
				<div>
					<div class="consult_Number">您可查阅的项目为0</div>
					<div class="Open">开通正式会员，享受更多会员权限！</div>
				</div>
				<div class="freeView-img">
					<div class="freeView-img-list-pay" :class="{'freeView-img-list-pay-hvo':item.id === service_id}"
						@click="clickListPay(item)" v-for="(item,index) in resumeKeepSetmeal" :key="index">
						<div v-if="!item.more">
							<p class="pay-consult">查阅<span
									style="font-size: 18px;color: #FF4000;">{{item.seeCount}}</span>次</p>
							<p class="pay-amount">约{{item.onePrice}}/条</p>
							<div class="pay-use">{{item.expense}}元</div>
						</div>
						<div v-else>
							<p class="pay-consult" style="font-size:12px">{{item.seeCount}}</p>
							<p class="pay-amount">{{item.onePrice}}</p>
							<div class="pay-user">{{item.expense}}</div>
						</div>
					</div>
				</div>
				<div class="forward">95%企业开通正式会员，共成交10万单!</div>
				<div class="transmit">
					<div class="refuse">忍痛拒绝</div>
					<div class="buyNow">查看权限</div>
				</div>
			</div>
		</van-popup>
		<!--  -->
		<van-popup>
			<div class="titlegjUsers">

			</div>
		</van-popup>
	</div>
</template>

<script>
import http from '@/utils/http'
import api from '@/api'
import wxshare from "@/assets/js/share.js";
import { isWeiXin } from '@/utils/index'
import { mapState } from 'vuex'
export default {
	data() {
		return {
			title: '您暂无法查看权限',
			isCollection: 0,
			active: 0,
			id: '',				//详情id
			dataMes: {			//页面数据
				userinfo: {}
			},
			process_type: 0,
			textareaText: '',			//文本域
			textareainput1: '',		//设备型号
			textareainput2: '',		//下次联系时间
			show: false,					//弹框隐藏显示
			dateBox: false,
			minDate: new Date(),
			call: false,
			freeView: false,		// 免费查看用光时弹窗
			freeViewImg: [
				{ imgUrl: 'https://qiniucdn.hangyedaniu.com/img/shangji.png', text1: '免费查看', text2: '商机信息' },
				{ imgUrl: 'https://qiniucdn.hangyedaniu.com/img/ava_importman.png', text1: '直接查看', text2: '联系人休息' },
				{ imgUrl: 'https://qiniucdn.hangyedaniu.com/img/genzong.png', text1: '实时跟踪', text2: '项目进展' }
			],
			gjUser1: false,  // 弹窗1：有免费次数没有权限
			gjUser2: false,  //弹窗2：免费会员的免费次数使用完后 
			gjUser3: false,  // 弹窗3：购买权限后次数使用完 
			resumeKeepSetmeal: [],
			service_id: '',   // 支付id
			otherPhone: [],
			callSty: '',
			more: false,
			isMonthSetmealSeeOut: false,
			fzrlook: false,
		}
	},
	created() {
		this.id = this.$route.query.id
		this.checkFav()
		this.homeResumeKeepShow()
		this.getResumeKeepSetmeal()
	},
	computed: {
		...mapState(['userInfo'])
	},
	mounted() { },
	watch: {},
	methods: {
		addClick(){

		},
		handlerJump() {
			this.$router.push('/member/order/add/common?type=setmeal', 1)
		},
		go(n) {
			if (n == 1) {
				location.href = 'https://m.tianyancha.com/search?key=' + this.dataMes.basemain.construction_unit
			}
			if (n == 2) {
				location.href = 'https://m.baidu.com/s?wd=' + this.dataMes.basemain.construction_unit
			}
		},
		getResumeKeepSetmeal() {
			http.get(api.getResumeKeepSetmeal).then(res => {
				this.resumeKeepSetmeal = res.data
				for (const key in res.data) {
					if (res.data[key].isFirstDiscount && !res.data[key].isBuy) return this.service_id = res.data[key].id;
					if (!res.data[key].isFirstDiscount) return this.service_id = res.data[key].id;
				}
			})
		},
		clickListPay(e) {
			// if(e.isFirstDiscount && e.isBuy){
			// 	this.$notify({ type: 'warning', message: '您已购买过"首单特享"的套餐,现已无法购买此套餐!' });
			// 	return
			// }
			this.service_id = e.id;
		},
		companyPay(payment) {
			if (payment == 'wxpay' && !this.$store.state.config.payment_wechat_appid) {
				this.$dialog.alert({
					message: '暂不支持微信付款，请选择其他付款方式'
				}).then(() => { })
				return false
			}
			let openid = localStorage.getItem('weixinOpenid')
			let param = {
				coupon_id: 0,			//  0
				openid,					//  用户openid
				payment,				//    支付类型     微信支付  "wxpay"   支付宝支付  'alipay' 
				return_url: 'http://www.hangyedaniu.com/m/member/order/list',//
				service_id: this.service_id,//  套餐id  
				service_type: 'setmeal',//  "setmeal"
			}
			this.$toast('请稍等,正在跳转支付页面...')
			http.post(api.company_pay, param).then(res => {
				if (res.data.pay_status == 1) {
					this.$notify({ type: 'success', message: '支付成功' })
					setTimeout(() => {
						location.reload()
					}, 1500)
					return false
				} else {
					if (payment == 'wxpay') {
						if (isWeiXin()) {
							/*
								** this.$store.state.config.mobile_domain == 当前的本地域名地址
								** pay/jsapi :这个页面
							*/
							let data = res.data
							let locationUrl = this.$store.state.config.mobile_domain +
								'pay/jsapi?appId=' + data.parameter.jsApiParameters.appId +
								'&timeStamp=' + data.parameter.jsApiParameters.timeStamp +
								'&nonceStr=' + data.parameter.jsApiParameters.nonceStr +
								'&package=' + data.parameter.jsApiParameters.package +
								'&signType=' + data.parameter.jsApiParameters.signType +
								'&paySign=' + data.parameter.jsApiParameters.paySign +
								'&successUrl=' + '/member/order/list';
							window.location.href = locationUrl
						} else {
							window.location.href = data.parameter
						}
					}
				}
				// this.homeResumeKeepShow()
			})
		},
		async goCommon() {
			let data = await this.contactUs()
			console.log(data, "1111")
			this.$router.push('/member/order/add/common?type=setmeal')
		},
		checkFav() {
			http.get(api.checkFav, { id: this.id }).then(res => {
				this.isCollection = res.data.has_fav
			})
		},
		getContact() {
			// this.$dialog.confirm({
			// 	title: '提示',
			// 	message: '消耗查看点数',
			// }).then(() => {
			// 	// 调用接口
			this.getResumeKeepInfos()
			// }).catch(() => { });
		},
		getResumeKeepInfo() {
			console.log(this.dataMes.userinfo.day_look_resumekeep, "0000")
			// 可查看次数this.dataMes.userinfo.day_look_resumekeep
			if(this.dataMes.userinfo.is_free){
				// this.dataMes.userinfo.is_free
				if (this.dataMes.userinfo.day_look_resumekeep > 0) {
				//大于0 就代表免费会员第二次看
					this.gjUser1 = true;
				} else {
					this.gjUser2 = true;
					return
				}
			}

			// if(this.dataMes.userinfo && this.dataMes.userinfo.yearlook){
			// 	//判断能不能看年报号码 如果能看年报电话 证明也可以看负责人的号码
            //     if(this.dataMes.userinfo && this.dataMes.userinfo.fzrlook){//是否可以查看负责人

			// 		if(this.dataMes.userinfo){ //判断负责人有没有

			// 		}
					
			// 	}

			// } else {

			// }
			
			http.get(api.getResumeKeepInfo, { rid: this.id }).then(res => {
				console.log(res, "1111")
				// this.dataMes.userinfo.day_look_resumekeep--
				// this.dataMes.basemain.project_name = res.data.project_name
				// this.dataMes.basemain.construction_unit = res.data.construction_unit
				// this.dataMes.basemain.other_content = res.data.other_content
				this.$notify({ type: 'success', message: res.message });
				this.homeResumeKeepShow()
			})
		},
		collection() {
			if (!this.dataMes.isLogin) {
				this.active = 1
				this.$notify({ type: 'warning', message: '尚未登录' });
				return
			}
			http.post(api.setfac, { type: this.isCollection, id: this.id }).then(res => {
				this.isCollection = this.isCollection ? 0 : 1;
				this.$notify({ type: 'success', message: res.message });
			})
		},
		resume_keepProjectApply() {
			this.active = 2
			this.show = true
		},
		goPay(url) {
			this.$router.push(url)
		},
		// 添加沟通记录
		homeResumeKeepAddRecord() {
			if (this.textareaText == '') {
				this.$notify({ type: 'warning', message: '请输入沟通内容' });
				return
			}
			if (this.textareainput2 == '') {
				this.$notify({ type: 'warning', message: '请选择下次联系时间' });
				return
			}
			http.post(api.homeResume_keepAdd_record, {
				facilityname: this.textareainput1,//设备名称   (post)
				content: this.textareaText,  //内容        
				interview_date: this.textareainput2,  //下次沟通时间
				process_type: this.process_type,
				rid: this.id,  //备案项目id
			}).then(res => {
				let date = new Date()
				let date2 = date.getMonth()
				date2 = +date2 + 1
				let data2 = date.getFullYear() + '-' + date2 + '-' + date.getDate()
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
		async contactUs() {
			return await http.post(api.projectApply, { id: this.id })
		},
		getResumeKeepInfos() {
			// if(isMonthSetmealSeeOut >0){
			// 	this.gjUser3 = true
			// 	// return;
			// }
			http.get(api.getResumeKeepInfo, { uid: this.userInfo.uid, rid: this.id }).then(res => {
				// console.log("啥东西咯",res.data); 
				this.homeResumeKeepShow()
				if (res.data.otherPhone) {
					this.$dialog.confirm({
						title: '项目查看成功提醒',
						type: 'success',
						message: res.message
					})
						.catch(() => {
							// on cancel
						})
				} else {
					// console.log("进入调用");
					this.$dialog.confirm({
						title: '项目查看不成功提醒',
						message: res.message
					})
						.catch(() => {
							// on cancel
						})
				}
				if (res.data.contactInfo) {

				}
			}).catch(e => {
				if (e.code === 300) {
					this.title = '您的会员权限已使用完！'
					this.gjUser3 = true
				}
			})
		},
		look() {
			this.contactUs();
			this.gjUser = true
		},
		getResumeKeep() {
			// 如果不是免费会员就显示
			if (!this.dataMes.userinfo.is_free) {
				//如果不是免费会员 -- 获取天眼查数据
				http.get(api.getResumeKeep, { id: this.id, uid: this.userInfo.uid }).then(res => {
					console.log(res, "天眼查")
					this.otherPhone = res.data.data.otherPhone
				})
			}
		},
		// 获取项目详情
		homeResumeKeepShow() {
			http.get(api.homeResume_keepShow, { id: this.id }).then(res => {
				console.log(res.data, "0000111")
				this.dataMes = res.data
				this.fzrlook = res.data.userinfo.fzrlook
				this.yearlook= res.data.userinfo.yearlook
				//   可查看联系方式并且登录了
				if (this.dataMes.isLogin && this.dataMes.userinfo.isMonthSetmealSee) {
					this.getResumeKeep()
				}
				let text = ''
				for (let i = 0; i < this.dataMes.basehead.category.length; i++) {
					if (i !== 0) {
						text += '/' + res.data.basehead.category[i]
					} else {
						text = res.data.basehead.category[i]
					}
				}
				let fullname = this.dataMes.basehead.title + '-' + text
				let wechatShareInfo = {
					fullname,
					imgUrl: this.dataMes.basehead.pimg,
				};
				wxshare(wechatShareInfo, "backupsProject", location.href);
			})
		},
		confirm(v) {
			let date = v.getMonth()
			date = + date + 1
			this.textareainput2 = v.getFullYear() + '-' + date + '-' + v.getDate()
			this.dateBox = false
		}
	}
}
</script>

<style lang="scss" scoped>
.contacts{
	font-family: 'Arial Negreta', 'Arial Normal', 'Arial', sans-serif;
    font-weight: 700;
    font-style: normal;
    font-size: 14px;
    letter-spacing: 1px;
    color: #494949;
}
.formal {
	font-size: 14px;
	color: #FF271E;
	margin-top: 10px;
}

.tab1numbers {
	font-style: normal;
	font-size: 14px;
	letter-spacing: 1px;
	color: #494949;
	font-family: 'Arial Negreta', 'Arial Normal', 'Arial', sans-serif;
	font-weight: 700;
	margin-top: 20px;
}

.findContact {
	font-family: 'Arial Normal', 'Arial', sans-serif;
	color: #D9001B;
	font-size: 15px;
	letter-spacing: 1px;
	line-height: 25px;

}

.tab1number {
	font-style: normal;
	font-size: 14px;
	letter-spacing: 1px;
	color: #494949;
	font-family: 'Arial Negreta', 'Arial Normal', 'Arial', sans-serif;
	font-weight: 700;
}

.findContacts {
	font-family: '微软雅黑', sans-serif;
	font-weight: 400;
	font-style: normal;
	font-size: 14px;
	text-align: left;
	letter-spacing: 2px;
	line-height: 25px;

}

>>>.van-popup__close-icon {
	right: 6px;
	top: 11px;
}

.consult_Number {
	font-family: 'Arial Negreta', 'Arial Normal', 'Arial', sans-serif;
	font-weight: 700;
	font-style: normal;
	letter-spacing: 2px;
	text-align: center;
	line-height: 45px;
	color: #333333;
}

.Open {
	font-family: '微软雅黑', sans-serif;
	font-weight: 400;
	font-style: normal;
	font-size: 13px;
	text-align: left;
	letter-spacing: 3px;
	color: #0077CB;
	text-align: center;
}

.Tips {
	font-weight: 400;
	font-style: normal;
	font-size: 15px;
	letter-spacing: 2px;
	padding: 20px 20px 5px 20px;
}

.forward {
	letter-spacing: 3px;
	color: #0077CB;
	font-size: 12px;
	padding: 0px 10px 10px 10px;
}

.transmit {
	display: flex;
	align-items: center;
	margin-top: 10px;
}

.refuse {
	background-color: rgba(232, 232, 232, 1);
	width: 175px;
	height: 50px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 5px;
	border-bottom-left-radius: 0px;
	border-bottom-right-radius: 0px;
	border-top-right-radius: 0px;
	color: #6A6A6A;
	font-size: 16px;
}

.sharingRules {
	background-color: rgba(245, 154, 35, 1);
	width: 175px;
	height: 50px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 5px;
	border-bottom-left-radius: 0px;
	border-bottom-right-radius: 0px;
	border-top-right-radius: 0px;
}

.buyNow {
	font-size: 16px;
	padding: 3px;
	background-color: rgba(22, 155, 213, 1);
	width: 175px;
	height: 50px;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #FFFF;
	border-radius: 5px;
	border-bottom-left-radius: 0px;
	border-bottom-right-radius: 0px;
	border-top-left-radius: 0px;
}

.Package {
	color: #409EFF;
	font-size: 12px;
	margin-top: 15px;
}

.titlegjUsers {
	width: 100%;
	// height: 350px;
}

.titlegjUser {
	color: rgb(51, 51, 51);
	letter-spacing: 2px;
	font-family: "Arial Negreta", "Arial Normal", Arial, sans-serif;
	font-weight: 700;
	font-style: normal;
	text-align: center;
	font-size: 16px;
	margin-top: 20px;
	line-height: 25px;
}

.freeView {
	&-div {
		padding: 26px;
		text-align: center;
		position: relative;
	}

	&-h3 {
		color: #000;
		padding: 0 0 10px;
	}

	&-text {
		padding: 0 0 25px;
	}

	&-img {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		margin-top: -8px;

		&-list {
			display: flex;
			flex-direction: column;
			align-items: center;
			padding: 0 0 15px;
		}

		.list-img {
			width: 45px;
			height: 45px;
		}
	}

	&-p1 {
		color: red;
		padding: 0 0 10px;
	}

	&-span {
		color: red;
	}

	&-p2 {
		color: #149dff;
	}

	&-button {
		width: 9em;
		margin: 20px auto 0;
		background: #07baff;
		color: #fff;
		height: 2.2em;
		line-height: 2.2em;
		border-radius: 11px;
	}

	&-wxzf {
		margin: 15px auto 0;
		width: 9em;
		background: url(https://qiniucdn.hangyedaniu.com/img/weixinpay2.png) 12px center / 26px 23px no-repeat #28C445;
		line-height: 2.4em;
		border-radius: 20px;
		text-align: center;
		padding: 0px 0px 0px 29px;
		color: rgb(255, 255, 255);
		cursor: pointer;
	}

	&-div-pay {
		padding: 10px;
		text-align: center;
		position: relative;
	}

	&-img-list-pay {
		border-radius: 5px;
		padding: 0 8px;
		margin: 10px 12px 10px 12px;
		background: linear-gradient(to top, #d6d6d6 1.5em, #f1f1f1 0);
		border: 1px solid #fff;
		border-color: rgba(238, 238, 238, 1);
		background: #FFF;
		background: linear-gradient(to top, #eee 1.5em, #fff 0);
		text-align: center;

		&-first {
			margin: 0 0 6px;
			height: 1.5em;
			width: 4.2em;
		}

		.first-div {
			background: #ccc;
			color: #fff;
			width: 5em;
			border-radius: 0 10px 0 10px;
			position: relative;
			left: -14px;
			line-height: 1.5em;
		}

		.pay-month {
			font-style: italic;
			font-weight: 600;
			padding: 0 0 2px;

			span {
				color: red;
				font-size: 18px;
			}
		}

		.pay-consult {
			padding: 0 0 3px;
			font-size: 12px;
			margin-top: 6px;
		}

		.pay-amount {
			color: #949494;
			padding: 0 0 4px;
			font-size: 12px;
		}

		.pay-use {
			height: 1.5em;
			line-height: 1.4em;
			color: #6b6b6b;
			font-size: 12px;
		}

		.pay-user {
			height: 1.5em;
			line-height: 1.4em;
			color: #6b6b6b;
			font-size: 12px;
		}

		&-hvo {
			border-color: #409eff;
			background: linear-gradient(to top, #409eff 1.5em, #fff 0);

			.pay-use {
				color: #fff;
			}

			.first-div {
				background: red;
			}
		}
	}
}

.buttonSpan {
	margin: 0 0 5px 0;
	background: #53a7fd;
	color: #fff;
	border-radius: 5px;
	padding: 1px 10px;
	display: inline-block;
}

.star-size {
	color: #f90 !important;
}

.redText {
	color: red;
}

#app {
	font-size: 13px;
	height: 100vh;

	>>>.van-tabs__line {
		background-color: #00aaff !important;
	}

	>>>.van-tab--active {
		.van-tab__text {
			color: #00aaff !important
		}
	}

	>>>.van-tab {
		color: #000;
	}

	// 电话
	.callMe {
		height: 45px;
		text-align: center;
		line-height: 45px;
		background-color: #fff;
		border-radius: 15px;
		font-size: 16px;

		a {
			color: #00aaff;
		}
	}

	.callCancel {
		height: 45px;
		text-align: center;
		line-height: 45px;
		background-color: #fff;
		margin: 20px 0 10px;
		border-radius: 15px;
		color: #00aaff;
		font-size: 18px;
	}

	// 弹框
	.popupDiv {
		color: #000;
		height: 100%;

		.popupDivHaed {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 5px 5px;

			.popupDivHaedText {
				font-size: 18px;
				font-weight: 700;
			}

			.popupDivHaedGb {}
		}

		.popupCenter {
			margin-top: 15px;
			display: flex;
			flex-direction: column;
			height: calc(100% - 40px - 15px);

			.process_type {
				color: #0095ff !important;
			}

			.popupCenterDivTextarea {
				padding: 10px;

				.popupCenterDivTextareaText {
					font-size: 15px;
					color: #000;
					padding-bottom: 8px;
				}

				.textarea {
					width: 100%;
					height: 130px;

					textarea {
						width: 100%;
						height: 100%;
						border-radius: 5px;
						border: 1px solid #dadada;
					}
				}
			}

			.popupCenterDiv {
				display: flex;
				align-items: center;
				border-bottom: #eaeaea solid 1px;
				padding: 10px;

				&.bor {
					border-top: 1px solid #eaeaea;
				}

				.inputDiv {
					flex: 1;

					.input {
						border: 0;
						flex: 1;
						height: 100%;
						width: 100%;
					}
				}

				.popupCenterDivText {
					padding-right: 5px;
					font-size: 15px;
				}
			}

			.button {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				flex: 1;
				padding: 0 8px;

				.button2 {
					border-radius: 10px;
					background-color: #00aaff;
					text-align: center;
					height: 40px;
					line-height: 40px;
					color: #fff;
					flex: none;
					margin-bottom: 8px;
				}
			}
		}
	}

	.headBox {
		background-color: #f4f4f4;
		padding: 20px 10px 10px;

		.headBox1 {
			padding: 15px;
			background-color: #fff;
			border-radius: 10px;

			.headBox1User {
				display: flex;

				.headBox1UserImg {
					flex: none;
					margin-right: 10px;
					width: 50px;
					height: 50px;
					border-radius: 50%;
					overflow: hidden;
					background: url('https://www.hangyedaniu.com/upload/resource/user.png') no-repeat center center / 100% 100%;
					object-fit: cover;

					img {
						width: 100%;
						height: 100%;
					}
				}

				.headBox1UserName {
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					flex: 1;

					.headBox1UserNameTop {
						display: flex;
						justify-content: space-between;

						.headBox1UserNameTop1 {
							font-size: 15px;
							color: #000;
							font-weight: 700;
							word-break: break-all;
							overflow: hidden;
							text-overflow: ellipsis;
							display: block;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 1;
						}

						.headBox1UserNameTop2 {
							padding-left: 5px;
							flex: none;
						}
					}

					.headBox1UserNameBottom {
						display: flex;
						justify-content: space-between;

						.headBox1UserNameBottom1 {
							color: #ffaa00;

							.lable {
								padding-left: 2px;
							}
						}

						.headBox1UserNameBottom2 {
							flex: none;
							color: #a8a8a8;
						}
					}
				}
			}

			.lableList {
				display: flex;
				flex-wrap: wrap;
				font-size: 12px;
				color: #1787fb;
				padding: 10px 0px 0px;

				.lableListBox {
					background-color: #f4f9ff;
					padding: 3px 8px;
					margin-right: 10px;
					border-radius: 5px;
					margin-bottom: 8px;
				}
			}

			.address {
				padding: 15px 0 0;
				display: flex;
				justify-content: space-between;
			}
		}
	}

	.tab {
		padding: 0 0 50px;

		.tab1 {
			padding: 20px;
			border-top: 5px solid #f4f4f4;

			.tab1List {
				padding-bottom: 18px;
				font-size: 13px;
				color: #000;
				display: flex;

				.tab1List1 {
					width: 7em;
					text-align-last: justify;
					flex: none;
				}

				.tab1List2 {
					margin: 0 .5em 0 .2em;
				}

				.tab1List3 {
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 1;
					word-break: break-all;
					display: block;

					.clickLook {
						margin: 6px 0 0;
						color: #fff;
						background: #4ea5ff;
						width: 6em;
						height: 2em;
						text-align: center;
						line-height: 2em;
						border-radius: 7px;
					}
				}
			}
		}

		.tab2 {
			padding: 20px;
			font-size: 16px;
			border-top: 5px solid #f4f4f4;

			.tab2Span {
				color: #00aaff;
			}

			.tab2Text1 {
				font-size: 13px;
				padding-bottom: 15px;

				.tab2Text1Span {
					color: #ffaa00;
				}
			}

			.tab2Text2 {
				display: flex;
				align-items: center;
				font-size: 13px;
				padding: 5px 0;

				.text1 {
					width: 7em;
					letter-spacing: 5px;
					text-align: center;
				}

				.text2 {
					padding-right: 10px;
				}

				.text3 {
					color: #55aaff;
				}
			}
		}

		.tab2Information {
			padding: 20px;
			border-top: 5px solid #f4f4f4;

			.textList {
				display: flex;
				flex-direction: column;
			}

			.tab1List {
				padding-bottom: 8px;
				font-size: 13px;
				color: #000;
				display: flex;

				.tab1List1 {
					width: 7em;
					text-align-last: justify;
					flex: none;
				}

				.tab1List2 {
					margin: 0 .5em 0 .2em;
				}

				.tab1List3 {
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 1;
					word-break: break-all;
					display: block;

					&.co {
						color: #00aaff;
					}
				}
			}
		}

		.tab3 {
			padding: 20px;
			border-top: 5px solid #f4f4f4;

			.tab3for {
				margin-bottom: 20px;

				.tab3Top {
					padding-bottom: 6px;
					margin-bottom: 6px;

					.tab3top1 {
						padding-bottom: 8px;
					}

					.tab3top1Text {
						padding-bottom: 6px;
					}

					.tab3top2 {
						text-indent: 1em;
					}
				}

				.tab3Bottom {
					padding-bottom: 6px;
				}
			}

			.communicate {
				color: #00aaff;
				text-align: right;
			}
		}
	}

	.popupDiv {}

	.collectionDiv {
		display: flex;
		border-top: 1px solid #ccc;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background: #fff;

		&2 {
			width: 20%;
			height: 50px;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
		}
	}

	.collection {
		width: 20%;
		height: 50px;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		padding: 0 13px 0 0;
	}

	.addLogin {
		text-align: center;
		flex: 1;
		height: 50px;
		line-height: 50px;
		background: #51a7ff;
		color: #fff;
		border-radius: 7px 0 0 0;
	}

	.addCommunicate {
		text-align: center;
		flex: 1;
		height: 50px;
		line-height: 50px;
		background: rgba(37, 107, 190, 1);
		color: #fff;
		border-radius: 7px 0 0 0;
	}

	.consume {
		display: inline-block;
		margin: 6px 0 0;
		color: #fff;
		background: #4ea5ff;
		width: 6em;
		height: 2em;
		text-align: center;
		line-height: 2em;
		border-radius: 7px;
	}
}
</style>
