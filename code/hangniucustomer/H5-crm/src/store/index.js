import Vue from 'vue'
import Vuex from 'vuex'
import { post, get, request } from '@/config/index';
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 存用户信息
    userInfo: {},
    // 存token
    token: "",
    // 是否已经登录
    hashLogin: false,
    mapList: []
  },
  getters: {
  },
  mutations: {
    SET_USERINFO(state, data) { 
      state.userInfo = data;
      state.token = data.token;
      state.hashLogin = true
    },
    LoginOut(state) {
      state.userInfo = {};
      state.token = "";
      state.hashLogin = false;
      localStorage.removeItem("userInfo");
      localStorage.removeItem("token");
      localStorage.clear();
      // token 不返回 = = 
    }
  },
  // actions: {
  //   autoCaseLoad(state) {
  //     request('get', '/v1_0/home/classify/index', { type: "experience,citytwocategory" }).then((res) => {
  //       if (res.code == 200) {
  //         state.mapList = res.data.citytwocategory.map(item => {
  //           return { text: item.label, id: item.value }
  //         })
  //       }

  //     })
  //   },
  // },
  modules: {
  }
})

