<template>
  <div id="app">
    <Login :utype="utype" :redirect="redirect" :single_login="false" @afterLogin="redirectTo"></Login>
	 <div >
		 
	 </div>
  </div>
</template>

<script>
import Login from '@/components/Login'
export default {
  name: 'MemberLogin',
  components: {
    Login
  },
  data () {
    return {
      redirect: '',
      utype: 2,
		register:'',
    }
  },
  created () {
	  if(this.$route.query.register){
		  this.register = this.$route.query.register
	  }
    this.redirect = this.$route.query.redirect !== undefined ? this.$route.query.redirect : ''
  },
  watch: {
    $route: {
      immediate: true,
      handler (to, from) {
        this.utype = this.$route.params.utype_alias === 'company' ? 1 : 2
      }
    }
  },
  methods: {
    redirectTo () {
      if(this.register != ''){
        // 注册这里过来的
        this.$router.go(-1)
        return
      }
      if (this.redirect !== '') {
        this.$router.replace(this.redirect)
      } else {
        if (this.utype === 1) {
          this.$router.push('/member/company/index')
        } else {
          this.$router.push('/member/personal/index')
        }
      }
    }
  }
}
</script>
