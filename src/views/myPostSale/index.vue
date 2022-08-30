<template>
  <div class="main">
     <Head :show_right='"false"' :postSale='true'>我的售后</Head>
     <div class="border"></div>
     <div class="search">
        <!-- 搜索 -->
        <input placeholder="输入姓氏或公司名称" v-model="param.key" class="input" />
        <div class="searchText" @click="onRefresh">搜索</div>
     </div>
     <!-- 数据 -->
     <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <div class="listAll" v-for="(item,index) in list" @click="goDetails(item)">
                <div class="title">
                    <span class="name">{{item.contact_name}}</span>
                    <span class="nameCompany">{{item.comapany_name}} >></span>
                </div>
                <div class="textList">
                    <div class="text1">
                        公司职位：
                    </div>
                    <div class="text2">{{item.contact_post}}</div>
                    <div class="text3" @click.stop="call(item.contact_phone,item.id)">
                        {{item.contact_phone}}<van-icon class="phone" name="phone" />
                    </div>
                </div>
                <div class="textList">
                    <div class="text1">
                        购置设备：
                    </div>
                    <div class="text2">{{item.device_name}}</div>
                    <div class="text4">
                        购置时间:{{item.delivertime}}
                    </div>
                </div>
                <div class="textList" :class="{'red':item.maintaininfo.isSelect}">
                    <div class="text1">
                        保养日期：
                    </div>
                    <div class="text2">{{item.maintaininfo.date}}</div>
                </div>
                <div class="textList" :class="{'red':item.endmoney.isSelect}">
                    <div class="text1">
                        尾款日期：
                    </div>
                    <div class="text2">{{item.endmoney.date}}</div>
                </div>
                <div class="textList" :class="{'red':item.warrantytime.isSelect}">
                    <div class="text1">
                        质保日期：
                    </div>
                    <div class="text2">{{item.warrantytime.date}}</div>
                </div>
                <div class="textList" :class="{'red':item.consumables.isSelect}">
                    <div class="text1">
                        配件更换：
                    </div>
                    <div class="text2">{{item.consumables.date}}</div>
                </div>
                <div class="textList" :class="{'red':item.changetime.isSelect}">
                    <div class="text1">
                        设备更换：
                    </div>
                    <div class="text2">{{item.changetime.date}}</div>
                </div>
                <p class="p">温馨提示：数据统计，智能提醒能明显提高客户回头率。</p>
            </div>
            <div class="zero" v-if="finished">
                  今日没有更多了 <span class="zeroSpan" @click="goAdd('/addPostSale')">新增售后>></span>
                  <br/><br/>
                  点击右上角的 <van-icon class="add-o" name="add-o" />
            </div>
        </van-list>
     </van-pull-refresh>
  </div>
</template>

<script>
    import http from "@/utils/http";
    import api from "@/api";  
export default {
    data(){
        return{
            refreshing:false,       // 下拉刷新效果：true正在加载，false：加载结束
            loading:true,          // 加载状态:true正在加载 ， false加载结束  为true防止重复假装
            finished:false,         //  是否在触发触地事件：true不在触发 ，false还会触发
            param:{
                page: 1,
	            pagesize: 10,
                key:'',
            },
            list:[],
        }
    },
    computed:{
    },
    created(){
        this.getAfterSaleList()
    },
    methods:{
        goDetails(item){
            this.$router.push('/postSaleDetails?id='+item.id)
        },
        goAdd(){
            this.$router.push('/addPostSale')
        },
        getAfterSaleList(){
            http.get(api.getAfterSaleList,this.param).then(res=>{
                let list = res.data.list
                this.list = this.param.page == 1 ? list : [ ...this.list , ...list ];
                this.loading = false
                setTimeout(() => { 
                    this.refreshing = false
                }, 3000)
                if(list.length < this.param.pagesize){
                    this.finished = true
                }
            }).catch(e=>{
                console.log(e)
                this.refreshing = false
                this.loading = false
            })
        },
        call(c,id){
            this.$dialog.confirm({
                title: '提示',
                confirmButtonText:'确认拨打',
                message: '即将拨打电话：' + c,
                }).then(() => {
                    http.post(api.setAfterSale,{id}).then(res=>{
                        location.href = `tel:${c}`;
                    })
                })
        },
        onLoad(){
            this.param.page++
            this.loading = true
            this.getAfterSaleList()
        },
        onRefresh(){
            this.param.page = 1
            this.finished = false
            this.getAfterSaleList()
        },
    }
}
</script>

<style lang="scss" scoped>
    .main{font-size: 16px; color: #000;
        .add-o{color: #00adff !important; font-size: 15px;}
        .red{color: red;}
        >>> .van-pull-refresh__head{background: #94ffa1 !important}
        .phone{transform: rotate(252deg);color: #f9ad4e !important;}
        .border{border-top: 1px solid #e8e8e8;}
        .search{display: flex; align-items: center; justify-content: center;padding: 12px 30px 4px;background: #fff;position: sticky; top: 37px;z-index: 999;
            .input{flex: 1;border: 0; background: #f1f2f8; border-radius: 8px 0 0 8px; height: 30px;padding: 0 10px; color: #888888; font-size: 13px;}
            &Text{background: #409EFF;color: #fff;font-size: 12px;height: 30px;line-height: 30px;width: 43px;text-align: center;border-radius: 0 8px 8px 0;}
        }
        .listAll{ border-bottom: 10px #f1f2f8 solid; padding: 0 0 10px;
            .title{padding: 10px 20px 20px;display: flex;align-items: center;
                .name{font-size: 17px; font-weight: 600; width: 5em;}
                .nameCompany{font-size: 14px;color: #2d8bff;}
            }
            .textList{display: flex;padding: 5px 20px;font-size: 13px; align-items: flex-end;
                .text1{width: 5em;}
                .text2{flex: 1;}
                .text3{border: 1px solid #ccc;height: 25px;line-height: 25px;padding: 0 10px;border-radius: 5px;color: #6b6b6b;}
            }
            .p{color: #FD7900;font-size: 13px;padding: 5px 0 0 20px;}
        }
        .zero{font-size: 14px;text-align: center;padding: 8px 0 20px;
                &Span{color: #0689f9;}
            }
    }
</style>
