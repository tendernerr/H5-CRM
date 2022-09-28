<template>
  <div class="content">
     <Head>添加订阅</Head>
     <div class="box">
        <p class="box-t">  您最多可添加3个标签</p>
        <div class="box-list">
            <div @click="clickLabel(item,index)" class="box-label" :style="[{'width':(item.name.length + 1.5)+'em'}]" :class="{'box-label-check':item.isSelect}" v-for="(item,index) in list" :key="index">
                {{item.name}}
            </div>
        </div>
        <div class="box-preservation" @click="preservation">保存</div>
     </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import http from '@/utils/http'
import api from '@/api'
export default {
  data () {
    return {
        list:[],
        idList:[],
        timer:null,
	 }
  },
  created () {
    this.getCategoryList()
  },
  computed:{
    ...mapState(['userInfo'])
   },
  watch: {},
  methods: {
    getCategoryList(){
        http.get(api.getCategoryList,{}).then(res=>{
            this.list = res.data.list
            for (const key in this.list) {
                if (this.list[key].isSelect) {
                    this.idList.push(this.list[key].id)
                }
            }
        })
    },
    clickLabel(e,i){
        if(!e.isSelect && this.idList.length >= 3) return this.$toast('添加订阅不可大于3');
        if(e.isSelect){
            // 高亮的情况下 需 取消
            let idIndex = this.idList.indexOf(e.id)
            this.idList.splice(idIndex,1)
        } else{
            this.idList.push(e.id)
        }
        this.list[i].isSelect = !this.list[i].isSelect
    },
    preservation(){
        clearTimeout(this.timer)
        http.post(api.saveUserResume,{householdaddress:this.idList,uid:this.userInfo.uid}).then(res=>{
            this.$toast('已保存订阅')
            this.timer = setTimeout(()=>{
                this.$router.back()
            },800)
        })
    },
  }
}
</script>

<style lang="scss" scoped>
    .content{
      .box{ min-height: calc( 100vh - 53px );display: flex;flex-direction: column; padding: 0 0 20px;
         &-t{font-size: 13px;color: #adadad;height: 50px;border-top: 1px solid #ccc;line-height: 50px; text-indent: 1em;}
         &-list{flex: 1;display: flex;flex-wrap: wrap; padding: 0 10px; }
         &-label{background: #f3f3f3;height: 25px;font-size: 14px;color: #979797;text-align: center;line-height: 25px;border-radius: 11px; margin:  0 8px 8px 0px;
            &-check{background: #f4f9ff;color: #1787fb;}
         }
         &-preservation{font-size: 19px;width: 80%; background: #1989f9; color: #fff; text-align: center; margin: 20px auto 0 ; border-radius: 20px; height: 2em; line-height: 2em;}
       }
    }
</style>
