<template>
    <div class="showSearch">
        <div style="text-align: right;">
            <span @click="close">关闭</span>
        </div>
        <div class="showSearch-type">
            <span class="showSearch-type-1" :class="{'showSearch-type-2':type == 0}" @click="type = 0">前期项目</span>
            <span class="showSearch-type-1" :class="{'showSearch-type-2':type == 1}" @click="type = 1">委托项目</span>
        </div>
        <div>
            <van-search v-model="showSearch" shape="round" show-action placeholder="请输入搜索关键词" @search="onSearch">
                <template #action>
                <div @click="onSearch">搜索</div>
                </template>
            </van-search>
        </div>
        <div class="history-box">
        <div class="showSearch-history">
            <h4>历史搜索</h4>
            <van-icon @click="delListorySearch" name="delete-o" />
        </div>
            <div class="history-list">
                <span class="history-list-label" @click="onSearch({text:item.text,type:item.type})" :style="[{'width':(item.length+1.5)+'em'}]" v-for="(item,index) in historySearch">{{item.text}}</span>
            </div>
        </div>
        <div class="showSearch-history showSearch-history-Hot">
             <h4>热门搜索</h4>
        </div>
        <div class="history-list">
             <span class="history-list-label" @click="onSearch(item.name)" :style="[{'width':(item.length+1.5)+'em'}]" v-for="(item,index) in projectHotSearch">{{item.name}}</span>
        </div>
    </div>
</template>

<script>
    import http from '@/utils/http'
    import api from '@/api'
export default {
  name: 'showSearch',
  props:{
    'url':{
        type:String,  //接收类型
        required:true, // 必须
    },
    'changeInput':{
        required:false, // 非必须
    },
    'close':{
         required:false, // 非必须
    }
  },
  data () {
    return {
        type:0,
        showSearch:'',
        historySearch:[],
        projectHotSearch:[],
    }
  },
  watch:{
    'type':{
      handler(n){
        console.log(n)
        this.getProjectHotSearch()
      }
    },
    'showSearch':{
        handler(n){
           if(typeof(this.changeInput) === 'function'){
             this.changeInput(this.showSearch)
           }
      }
    }
  },
  created () {
    // 获取本地存储
    let key = window.localStorage.getItem('historySearch')
    console.log(key,"111")
    let arr = []
    if(key != undefined && key != null){
          arr = JSON.parse(key) 
    }
    this.historySearch = arr
    this.getProjectHotSearch()
  },
  computed: {},
  methods: {
        onSearch(e){
            // 判断点击的历史搜索类型
            if( typeof(e.text) === 'string'){
                this.$router.push('/resumelist?key='+e.text+'&type='+e.type);
                return
            }
            if( typeof(e) === 'string' ){
                this.$router.push('/resumelist?key='+e+'&type='+this.type);
                return
            }
            // 把本地存储拿出来转成json格式
            let key = window.localStorage.getItem('historySearch')
            let arr = []
            // 如果有值就赋予arr
            if(key != undefined && key != null){arr = JSON.parse(key) }
            // 判断输入框的值是否为空 有就追加给arr
            if(this.showSearch != ''){arr.push({text:this.showSearch,type:this.type,})}
            // 转成字符串存入本地尝尝中
            arr = JSON.stringify(arr)
            // 页面显示效果
            this.historySearch.push({text:this.showSearch,type:this.type,})
            // 存储
            window.localStorage.setItem('historySearch',arr)
            // 跳转
            this.$router.push(this.url+'?key='+this.showSearch+'&type='+this.type)
            this.showSearch = ''
        },
     delListorySearch(){
      this.historySearch = []
      localStorage.removeItem('historySearch')
    },
    getProjectHotSearch(){
      this.projectHotSearch = []
      let isApi = this.type == 0 ? api.getBaProjectHotSearch : api.getProjectHotSearch ;
      http.get(isApi,{type:this.type}).then(res=>{
        for (let i = 0; i < res.data.length; i++) {
          setTimeout(() => {
            this.projectHotSearch.push(res.data[i])
          }, 100*i);
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
        @keyframes rotate{
            0%   {opacity: 0;}
            50%  {opacity: .6;}
            100% {opacity: 1;}
        }
    .showSearch{font-size: 15px;padding: 17px;
        &-type{padding: 12px 0 ;
            &-1{padding: 5px;margin: 20px;}
            &-2{color: #0089ff;}
        }
        &-history{display: flex;justify-content: space-between;align-items: center;padding: 9px 0 0;font-size: 17px; position: relative;
            &-Hot{
            h4{padding: 30px 0 0;}
            &::after{content: "";position: absolute;width: 100vh;left: -20px;height: 5px;background: #f3f3f3;right: 0; top: 12px;}
            }
        }
        .history-list{display: flex;padding: 14px 0 9px; flex-wrap: wrap;
            &-label{text-align: center;background: #f3f3f3;width: 4em;border-radius: 9px;color: #979797;margin: 0px 20px 10px 0; animation: rotate 1s linear 1 ;
            }
        }
    }
</style>
