<template>
  <div id="app">
    <router-view/>
  </div>
</template>



<script>
import { mapMutations } from 'vuex';
export default{
    data(){
      return {

      }
    },
    methods:{
      ...mapMutations(['SET_USERINFO']),
    },
    destroyed(){ 
    },
    created(){
      // alert(JSON.stringify(this.$route));
      // 持久化
      let userInfo = JSON.parse(localStorage.getItem("userInfo"))||"";
      // 如果用户已经登录
      if(userInfo.token){
        this.SET_USERINFO(userInfo);
      // this.$store.dispatch("autoCaseLoad")
      }
      // else{
      //     Notify({ type: 'danger', message: `未登录，跳转到登录页` });
      //     this.$router.push({name:'authorization'})
      // }
    }
  }
</script>
