import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


import Vant from 'vant';
import 'vant/lib/index.css';

import Vuex from 'vuex'
Vue.use(Vuex)

Vue.use(Vant);


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


