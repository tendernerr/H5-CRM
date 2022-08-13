<template>
  <div></div>
</template>

<script>
import http from '@/utils/http'
import api from '@/api'
export default {
  name: 'OauthWeixin',
  data () {
    return {
    }
  },
  created () {
    this.init()
  },
  methods: {
    doLogin (user) {
      http
        .post(api.oauth_weixin_login, user)
        .then(response => {
          if (parseInt(response.code) === 200) {
            this.$store.commit('clearCountDownFun')
            this.$store.commit('setLoginState', {
              whether: true,
              utype: response.data.utype,
              token: response.data.token,
              mobile: response.data.mobile,
              userIminfo: response.data.user_iminfo,
				      userInfo : response.data
            })
            if (response.data.utype === 1) {
              this.$router.push('/member/company/index')
            } else {
              this.$router.push('/member/personal/index')
            }
          } else {
            this.$message.error(response.message)
          }
        })
        .catch(() => {})
    },
	 
	 
	 // 微信开发工具会报错
    getUserinfo (code) {
      let postData = {
        code
      }
      http
        .post(api.oauth_weixin_getuserinfo, postData)
        .then(res => {
			this.$store.commit('setopenId',res.data)
          this.doLogin(res.data)
        })
        .catch(() => {})
    },
    init () {
      let code = this.$route.query.code
      console.log(this.$route,"回调的时候发现路径上的code没有，就去微信接口调用")
      console.log(this.$store,"本地的api")
      if (code !== undefined) {
        this.getUserinfo(code)
        return false
      } else {
        let appid = this.$store.state.config.wechat_appid
        // let redirect_uri = encodeURIComponent(location.href)
        let redirect_uri = encodeURI(location.href)
		  // let url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=https%3A%2F%2Fwww.hangyedaniu.com%2Fm%2Findex%2Findex&response_type=code&scope=snsapi_userinfo&state=oauth&connect_redirect=1#wechat_redirect`;
        let url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appid + '&redirect_uri=' + redirect_uri + '&response_type=code&scope=snsapi_userinfo&state=oauth#wechat_redirect'
        window.location.href = url
      }
    }
  }
}
</script>
