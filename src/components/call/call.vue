<template>
    <div>
        <div v-if="phone" class="callMe"><a :href="'tel:'+phone">{{phone}}</a></div>
        <div v-else="phone" class="callMe">暂无号码</div>
        <div class="callCancel" @click="close">取消</div>
    </div>
</template>

<script>
export default {
  props:{
        "phone":{
            type:[String,Number],  //接收类型
            default:''
        }
    },
  data () {
    return {
    }
  },
  mounted () {

  },
  created () {
    
  },
  computed: {},
  methods: {
    close(){
        this.$emit('closeCall')
    }
  }
}
</script>

<style lang="scss" scoped>
    .callMe{height: 45px; text-align: center; line-height: 45px; background-color: #fff; border-radius: 15px; font-size: 16px;
			a{ color: #00aaff;}
		}
    .callCancel{
        height: 45px; text-align: center; line-height: 45px; background-color: #fff; margin: 20px 0 10px; border-radius: 15px;color: #00aaff; font-size: 18px;
        }
		
</style>
