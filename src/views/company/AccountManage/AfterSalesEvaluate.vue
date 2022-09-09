<template>
  <div class="app">
    <Head>我的评价</Head>
    <div>
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh" success-text='刷新成功' >
            <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了~" @load="onLoad">
                <div class="list" v-for="(item,index) in dataList">
                    <div class="title">
                        <div>{{item.companyName}}</div>
                        <div class="label" :class="{'label-red':!item.status}">{{item.status?'已解决':'未解决'}}</div>
                    </div>
                    <div class="p">
                        <div class="p-title">联系电话:</div>
                        <div class="call" @click.stop="callPhone(item.phone)">{{item.phone}}</div>
                    </div>
                    <div class="p">
                        <div class="p-title">原因:</div>
                        <div class="reason">{{item.note}}</div>
                    </div>
                    <div class="p">
                        <div style="display: flex; flex-wrap: wrap;">
                            <span class="p-list" :class="{'p-list-red':!item.status}" v-for="(ite,inde) in item.satisfaction_text">{{ite}}</span>
                        </div>
                    </div>
                    <div class="p">
                        <div style="letter-spacing: 1px">
                            近期 <span class="call">{{item.rebuy?'有':'无'}}</span> 复购计划
                        </div>
                    </div>
                    <div class="p end">
                        <div class="p-title">售后人:</div>
                        <div>{{item.companyUser}}</div>
                    </div>
                    <div class="date end">
                        <div>{{item.time}}</div>
                    </div>
                </div>
                <div class="empty" v-if="empty">
                    这里空空如也~
                </div>
            </van-list>
        </van-pull-refresh>
        <van-popup v-model="call" position="bottom" style="background-color: rgba(0, 0, 0, 0);">
            <CALL :phone='phone' @closeCall='closeCall' />
        </van-popup>
    </div>
  </div>
</template>

<script>
import http from '@/utils/http'
import api from '@/api'
import CALL from '@/components/call/call'
export default {
    components:{
        CALL
    },
  data () {
    return {
        refreshing:false,        // 下拉刷新
        loading:true,            // 上拉刷新中
        finished:false,          // 停止上拉加载
        param:{
            page:1,  //页码
            pagesize:10,  //页数
        },
        dataList:[],
        empty:false,
        call:false,
        phone:'',
    }
  },
  created () {
    this.getMyEvaluate()
  },
  methods: {
    closeCall(){
        setTimeout(() => {
            this.phone = ''
        }, 300);
        this.call = false
    },
    callPhone(p){
        this.call = true
        this.phone = p
    },
    getMyEvaluate(){
        this.loading = true
        http.get(api.getMyEvaluate,this.param).then(res=>{
              let list = res.data.data
              if(list.length===0){this.empty = true}   //显示无数据
              this.dataList = this.param.page === 1 ? list : [...this.dataList,...list];
              if(list.length < this.param.pagesize){this.finished = true} // 停止上拉加载
              this.loading = false
              this.refreshing = false
		  }).catch(e=>{
            console.log(e,"11111")
          })
    },
    /*
        触底加载导致首次进入页面滚动条会出现在中间
        * vant 组件首次加载会触发 触底函数 这会导致首次加载滚动条会出现在中间
        * 如何避免这个问题，在初始化data时将loading（正在加载中）设置为 true （正在加载）
        * 在并且在每次请求函数之前将loading设置为true,在请求完数据之后设置为false
        * 在dataList列表为0的时候并且还没请求列表时，提示正在加载，请求完之后判断列表是否为空，在判断列表是否空的展示
    */
    onRefresh(){
        this.param.page = 1
        this.finished = false
        this.getMyEvaluate()
    },
    // 触底加载
    onLoad(){
        console.log("触底加载")
        this.param.page++
        this.getMyEvaluate()
    }
  }
}
</script>

<style lang="scss" scoped>
.app{ font-size: 12px; color: #000;
    .list{ display: flex; flex-direction: column; padding: 0.5em 1em 0;border-bottom: 1px solid #e8e5e5;
        &:first-child{border-top: 1px solid #e8e5e5;}
        .title{display: flex; padding: 0 0 0.5em; font-size: 15px; align-items: center;}
        .label{align-self: flex-start;flex: none;margin: 0 0 0 auto;width: 3.9em;text-align: center;border: 1px solid #00d602;border-radius: 5px;color: #00d602;background: #e0faed;
                &-red{ border: 1px solid red;color: red;background: #ffeaea;}
            }
        .p{display: flex; padding: 0 0.5em 0.5em; font-size: 15px;
            &-title{width: 4.5em;text-align-last: justify; flex: none; margin: 0 3px 0 0 ;}
            .call{color: #00a1ff;}
            .reason{word-break: break-all;}
            &-list{background: #e9f8ff;border-radius: 5px;padding: 0 7px;color: #3f97ff; margin: 0 5px 5px 0;}
        }
        .p-list-red{background: #ffeaea !important;color: red !important;}
        .date{color: #9a9a9a;padding: 0 0.5em 0.5em;}
        .end{justify-content: flex-end;text-align: right;}
    }
    .empty{text-align: center; padding: 20px 0;line-height: 200px;font-size: 18px;border-top: 1px solid #e8e5e5; }
}
</style>
