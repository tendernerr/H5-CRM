<template>
	<div id="app">
		<Head ref="Head" :goback_custom="goback_custom" :show_right="'false'" @gobackCustomMethod="gobackCustomMethod">
		</Head>
		<div class="log_wrapper">
			<!-- <span @click="handlerReg" class="head_reg_txt">
				{{ layout.utype_current_text }}用户注册
			</span> -->
			<div class="bottom_other_login">
				<div class="other_cell c_wx"></div>
			</div>
			<div v-if="isWx">
				<div class="tx1" v-if="false">{{ layout.utype_current_text }}用户登录</div>
				<div class="field_cell_group">
					<div class="field_cell" v-if="way == 'pwd'">
						<label>
							<input class="log_field" type="text" placeholder="请输入手机号/用户名/邮箱" autocomplete="off"
								v-model="formPwd.username" />
						</label>
					</div>
					<div class="field_cell" v-if="way == 'pwd'">
						<label>
							<input class="log_field" :type="showPwd ? 'text' : 'password'" placeholder="请输入密码"
								autocomplete="off" v-model="formPwd.password" />
						</label>
						<div :class="showPwd ? 'toggle_pwd show' : 'toggle_pwd'" @click="showPwd = !showPwd"></div>
					</div>
					<div class="field_cell" v-if="way == 'code'">
						<label>
							<input class="log_field" type="number" placeholder="请输入手机号" autocomplete="off"
								v-model="formCode.mobile" />
						</label>
					</div>
					<div class="field_cell" v-if="way == 'code'">
						<label>
							<input class="log_field" type="number" placeholder="请输入验证码" autocomplete="off"
								v-model="formCode.code" />
						</label>
						<button class="log_get_btn" :style="'color:'+$store.state.sendSmsBtnTextColor" @click="sendSms">
							{{ $store.state.sendSmsBtnText }}
						</button>
					</div>
				</div>
				<div class="switch_bar">
					<span class="switch_type" @click="changeWay">
						{{ layout.way_other_text }}
					</span>
					<router-link :to="'/member/forget/' + utype" class="right_forget">
						忘记密码?
					</router-link>
				</div>
				<div class="btn_group">
					<van-button class="btn_mb" type="info" size="large" round @click="handleSubmit">
						{{ layout.utype_current_text }}登录/注册
					</van-button>
					<van-button v-if="!single_login" type="info" size="large" round plain hairline
						@click="$router.push(layout.utype_other_login_route)">
						{{ layout.utype_other_text }}登录/注册
					</van-button>
				</div>
			</div>
			<div class="bottom_other_loginButton"  @click="wxLogin">
				<!-- <div class="other_cell c_qq" @click="qqLogin" v-if="$store.state.config.account_qqlogin_open==1">QQ登录</div> -->
				<div style="width: 25px;height: 25px; flex: none;" ><img style="width: 100%;height: 100%;" src="../assets/freelance/images/wx.png" /></div>
				<div style="text-indent: 8px;">微信快速登录/注册</div>
			</div>
			<div class="bottom_other_loginButton" style="background-color: #dadada;" v-if="!isWx"  @click="isWx = true">
				<!-- <div class="other_cell c_qq" @click="qqLogin" v-if="$store.state.config.account_qqlogin_open==1">QQ登录</div> -->
				<div style="width: 30px;height: 30px; flex: none;" ><img style="width: 100%;height: 100%;" src="../assets/freelance/images/sj.png" /></div>
				<div style="text-indent:3px; color: #000;">账号密码登录</div>
			</div>
			<div class="bottom_agree">
				<div class="agree_content">
					<van-checkbox v-model="checked" icon-size="16px">
						继续登录表示您同意
						<span class="link" @click.stop="showAgreement('agreement')">《用户协议》</span>
						和
						<span class="link" @click.stop="showAgreement('privacy')">《隐私政策》</span>
					</van-checkbox>
				</div>
			</div>
		</div>
		<van-popup :lazy-render="false" v-model="showText" position="right" :overlay="false"
			style="width:100%;height:100%">
			<Head :goback_custom="true" @gobackCustomMethod="showText = false" :show_right="'false'">{{ showTextTitle }}
			</Head>
			<div class="text_content">
				<span style="white-space: pre-line;" v-html="showTextContent"></span>
			</div>
		</van-popup>
		<Captcha ref="captcha"></Captcha>
	</div>
</template>

<script>
	import {
		handlerHttpError
	} from '@/utils/error'
	import {
		isWeiXin
	} from '@/utils/index'
	import http from '@/utils/http'
	import api from '@/api'
	import Captcha from '@/components/captcha/index'
	export default {
		name: 'Login',
		props: [
			'goback_custom',
			'utype',
			'single_login',
			'after_login_data',
			'redirect'
		],
		components: {
			Captcha
		},
		data() {
			return {
				isWx:false,
				showTextTitle: '注册协议',
				showTextContent: '',
				showText: false,
				inWeixin: false,
				layout: {
					utype_current_text: '',
					utype_other_text: '采购方',
					way_other_text: '手机验证码登录',
					utype_other_login_route: '',
					utype_current_reg_route: ''
				},
				formPwd: {
					username: '',
					password: ''
				},
				formCode: {
					mobile: '',
					code: ''
				},
				way: 'pwd',				//
				showPwd: false,
				checked: true,
				regularMobile: /^13[0-9]{9}$|14[0-9]{9}$|15[0-9]{9}$|18[0-9]{9}$|17[0-9]{9}$|16[0-9]{9}$|19[0-9]{9}$/
			}
		},
		created() {
			this.inWeixin = isWeiXin()
			this.$store.commit('clearCountDownFun')
		},
		watch: {
			utype: {
				immediate: true,
				handler(val) {
					this.initLayout()
				}
			}
		},
		methods: {
			handlerReg() {
				if (this.$store.state.LoginOrNot) {
					this.$dialog
						.confirm({
							title: '系统提示',
							message: '此操作会退出当前账号，确定退出吗？'
						})
						.then(() => {
							this.$store.commit('setLoginState', {
								whether: false,
								utype: 0,
								token: '',
								mobile: '',
								userIminfo: {}
							})
							this.$router.push(this.layout.utype_current_reg_route)
						})
						.catch(() => {
							// on cancel
						})
				} else {
					this.$router.push(this.layout.utype_current_reg_route)
				}
			},
			showAgreement(alias) {
				this.showTextContent = ''
				this.showText = true
				this.showTextTitle = alias == 'agreement' ? '注册协议' : '隐私政策'
				http
					.get(api.agreement, {})
					.then(res => {
						if (parseInt(res.code) === 200) {
							this.showTextContent =
								alias == 'agreement' ? res.data.agreement : res.data.privacy
						} else {
							this.$notify(res.message)
						}
					})
					.catch(() => {})
			},
			qqLogin() {
				if (!this.checked) {
					this.$notify('请同意用户协议和隐私政策')
					return false
				}
				this.$router.push('/member/oauth/qq/login')
			},
			wxLogin() {
				if (!this.checked) {
					this.$notify('请同意用户协议和隐私政策')
					return false
				}
				this.$router.push('/member/oauth/weixin')
			},
			initLayout() {
				this.layout.utype_current_text = this.utype === 1 ? '供应方' : '采购方'
				this.layout.utype_other_text = this.utype === 1 ? '采购方' : '供应方'
				this.layout.utype_other_login_route =
					this.utype === 1 ? '/member/login/personal' : '/member/login/company'
				this.layout.utype_current_reg_route =
					this.utype === 1 ? '/member/reg/company' : '/member/reg/personal'
				if (this.redirect) {
					this.layout.utype_other_login_route =
						this.layout.utype_other_login_route + '?redirect=' + this.redirect
					this.layout.utype_current_reg_route =
						this.layout.utype_current_reg_route + '?redirect=' + this.redirect
				}
			},
			changeWay() {
				if (this.way === 'pwd') {
					this.way = 'code'
					this.layout.way_other_text = '账号密码登录'
				} else {
					this.way = 'pwd'
					this.layout.way_other_text = '手机验证码登录'
				}
			},
			doSubmitPwd() {
				if (!this.formPwd.username) {
					this.$notify('请输入手机号/用户名/邮箱')
					return false
				}
				if (!this.formPwd.password) {
					this.$notify('请输入密码')
					return false
				}
				let postData = {
					...this.formPwd
				}
				postData.utype = this.utype
				http.get(api.login_pwd, postData).then(check_res => {


					console.log(check_res, 'sadsadasd')
					let setShow = false
					if (check_res.data == 1) {
						setShow = true
					}
					this.$refs.captcha.show(res => {

						console.log(res, '2222222222222222')
						if (res !== undefined) {
							postData.captcha = res
						}
						http
							.post(api.login_pwd, postData)
							.then(response => {
								console.log(response, '数据数据数据')
								if (parseInt(response.code) === 200) {
									this.$store.commit('clearCountDownFun')
									this.$store.commit('setLoginState', {
										whether: true,
										utype: response.data.utype,
										token: response.data.token,
										mobile: response.data.mobile,
										userIminfo: response.data.userIminfo,
										userInfo: response.data.userInfo,
									})
									if (response.data.next_code != 200) {
										handlerHttpError({
											code: response.data.next_code,
											message: ''
										})
									} else {
										// 最后在这里
										this.$refs.Head.getImToken()
										this.$emit('afterLogin', this.after_login_data)
									}
								} else {
									this.$notify(response.message)
								}
							})
							.catch(() => {})
					}, setShow)
				}).catch(() => {})
			},
			doSubmitCode() {
				if (!this.formCode.mobile) {
					this.$notify('请输入手机号')
					return false
				}
				if (!this.regularMobile.test(this.formCode.mobile)) {
					this.$notify('手机号格式不正确')
					return false
				}
				let postData = {
					...this.formCode
				}
				postData.utype = this.utype
				http.get(api.login_code, postData).then(check_res => {
					let setShow = false
					if (check_res.data == 1) {
						setShow = true
					}
					this.$refs.captcha.show(res => {
						if (res !== undefined) {
							postData.captcha = res
						}
						http.post(api.login_code, postData).then(response => {
								if (parseInt(response.code) === 200) {
									this.$store.commit('clearCountDownFun')
									this.$store.commit('setLoginState', {
										whether: true,
										utype: response.data.utype,
										token: response.data.token,
										mobile: response.data.mobile,
										userIminfo: response.data.user_iminfo
									})
									if (response.data.next_code != 200) {
										handlerHttpError({
											code: response.data.next_code,
											message: ''
										})
									} else {
										this.$emit('afterLogin', this.after_login_data)
									}
								} else {
									this.$notify(response.message)
								}
							})
							.catch(() => {})
					}, setShow)
				}).catch(() => {})
			},
			// 提交之前的验证
			handleSubmit() {
				if (!this.checked) {
					this.$notify('请同意用户协议和隐私政策')
					return false
				}
				if (this.way == 'pwd') {	
					//都会进这里
					this.doSubmitPwd()
				} else {
					this.doSubmitCode()
				}
			},
			// 发送验证码
			sendSms() {
				if (this.$store.state.sendSmsBtnDisabled) {
					return false
				}
				if (!this.formCode.mobile) {
					this.$notify('请输入手机号')
					return false
				}
				if (!this.regularMobile.test(this.formCode.mobile)) {
					this.$notify('手机号格式不正确')
					return false
				}
				this.$refs.captcha.show(res => {
					this.$store
						.dispatch('sendSmsFun', {
							url: api.get_login_code,
							mobile: this.formCode.mobile,
							type: this.utype,
							captcha: res
						})
						.then(response => {
							if (response.code === 200) {
								this.$notify({
									type: 'success',
									message: this.$store.state.sendSmsMessage
								})
							} else {
								this.$notify(this.$store.state.sendSmsMessage)
							}
						})
				})
			},
			gobackCustomMethod() {
				this.$emit('gobackCustomMethod')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.text_content {
		font-size: 14px;
		padding: 20px;
	}
	
	#app{
		background-color: rgba(246, 246, 246, 1);
		min-height: 100vh;
	}
	
	.log_wrapper {
		width: 323px;
		margin: 0 auto;
	}

	.tx1 {
		padding: 50px 0 23px;
		font-size: 26px;
		color: #333333;
	}

	.field_cell_group {
		.field_cell:last-child {
			margin-bottom: 20px;
		}
	}

	.field_cell {
		width: 100%;
		border-bottom: 1px solid #eeeeee;
		position: relative;
		padding-top: 20px;
	}

	.log_field {
		border: 0;
		width: 100%;
		display: block;
		color: #333333;
		font-size: 15px;
		padding: 7px 0;

		&::placeholder {
			color: #c9c9c9;
		}
	}

	.has_account {
		text-align: center;
		padding: 26px 0;
		font-size: 16px;
		color: #999999;
		margin-bottom: 40px;

		a {
			color: #333333;
		}
	}

	.bottom_agree {
		margin: 0 auto;
		text-align: center;
		font-size: 12px;
		color: #999999;
		padding: 35px 0;
		width: fit-content;

		.agree_content {
			display: inline-block;

			a {
				color: #333333;
			}

			.link {
				color: #1787fb;
			}
		}
	}

	.log_get_btn {
		position: absolute;
		right: 0;
		bottom: 0;
		border: 0;
		padding: 7px 0;
		font-size: 15px;
		color: #c9c9c9;
		background-color: #ffffff;
	}
	
	.bottom_other_loginButton{
		margin: auto;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 95%;
		height: 44px;
		line-height: 44px;
		text-align: center;
		background-color: #00b82e;
		color: #ffffff;
		font-size: 15px;
		border-radius: 45px;
		margin-top: 15px;
	}
	
	.bottom_other_login {
		display: flex;
		.other_cell {
			flex: none;
			width: 92px;
			text-align: center;
			font-size: 12px;
			color: #999999;
			padding-top: 73px;
			margin: auto;
			&.c_wx {
				background: url("http://qiniucdn.hangyedaniu.com/img/logo.jpg") no-repeat center center / 100% 100% ;
			}

			&.c_qq {
				background: url("../assets/images/log_qq.svg") center 0 no-repeat;
				background-size: 43px;
			}
		}
	}

	.btn_group {
		margin-bottom: 30px;
	}

	.switch_bar {
		position: relative;
		margin-bottom: 26px;

		.right_forget {
			font-size: 15px;
			color: #666666;
			position: absolute;
			right: 0;
			top: 50%;
			transform: translate(0, -50%);
		}
	}

	.switch_type {
		display: block;
		width: fit-content;
		font-size: 15px;
		color: #666666;
		padding-right: 17px;
		position: relative;

		&::after {
			position: absolute;
			right: 7px;
			top: 7px;
			width: 6px;
			height: 6px;
			border-top: 1px solid #666666;
			border-right: 1px solid #666666;
			transform: rotate(45deg);
			content: " ";
		}
	}

	.btn_mb {
		margin-bottom: 16px;
	}

	.head_reg_txt {
		position: absolute;
		right: 0;
		top: 0;
		font-size: 16px;
		color: #1787fb;
		padding: 18px;
		z-index: 3;
	}

	.toggle_pwd {
		position: absolute;
		right: 0;
		bottom: 0;
		height: 35px;
		width: 36px;
		background: url("../assets/images/hidden_pwd.svg") center no-repeat;
		background-size: 16px;

		&.show {
			background: url("../assets/images/show_pwd.svg") center no-repeat;
			background-size: 18px;
		}
	}
</style>
