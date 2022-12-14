<template>
    <div class="management">
        <div class="content">
            <router-view></router-view>
        </div>
        <div class="nav">
            <!-- <van-tabbar v-model="active" @change="onChange">
                <van-tabbar-item>
                    <span>工作台</span>
                    <template #icon="props">
                        <img src="@/assets/menuIcon1.png" style="width: 33px;height: 30px;" />
                    </template>
                </van-tabbar-item>
                <van-tabbar-item>
                    <span>销售动态</span>
                    <template #icon="props">
                        <img src="@/assets/menuIcon2.png" style="width: 33px;height: 30px;">
                    </template>
                </van-tabbar-item>
                <van-tabbar-item icon="setting-o">
                    <span>我的</span>
                    <template #icon="props">
                        <img src="@/assets/menuicon3.png" style="width: 33px;height: 30px;" />
                    </template>
                </van-tabbar-item>
            </van-tabbar> -->
            <tabbartube v-if="this.administration" :getData="formData"></tabbartube>
            <tabbarstaff v-if="!this.administration" :getData="formData"></tabbarstaff>
        </div>

    </div>
</template>

<script type=“text/javascript”>
import tabbartube from '@/components/tabbartube.vue'
import tabbarstaff from '@/components/tabbarstaff.vue'
import { memberIndex } from '@/api/user'
export default {
    props: {
    },
    components: {
        tabbartube,
        tabbarstaff
    },
    watch: {
        // 监听里面有2个回调参数 nld是最新监听到的参数 old 是上一次监听到的参数
        '$route': {
            immediate: true,
            handler(nld, old) {
                // 然后我们监听路由的name值 也就是routes里面定义的name名字
                if (nld.name == "quicks") {
                    this.active = 0
                }
                if (nld.name == "salestrend") {
                    this.active = 1
                }
                if (nld.name == "mydatas") {
                    this.active = 2
                }
            }
        }
    },
    data() {
        return {
            active: 0,// 默认为2的话他显示的是管理中心 刷新后默认
            administration: false,
            formData: {},
        }
    },
    created() {
        this.memberIndexList();
    },
    methods: {
        onChange(v) {
            if (v == 0) {
                this.$router.push({ name: "quicks" })
            }
            if (v == 1) {
                this.$router.push({ name: "salestrend" })
            }
            if (v == 2) {
                this.$router.push({ name: "mydatas" })
            }
        },
        memberIndexList() {
            memberIndex({}).then(res => {
                this.formData = res.data.data
                this.administration = res.data.data.isLeader
            })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>