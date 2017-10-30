// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import vueAxios from 'vue-axios'

Vue.use(vueAxios,axios)
Vue.config.productionTip = false

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
Vue.use(ElementUI)

import vuex from 'vuex'
Vue.use(vuex)

var store=new vuex.Store({
  state:{
    datas:""
  },
  mutations:{
    Ajax(state,data){
      state.datas=data;
    }
  },
  actions:{
      getData({commit},_this){
        return new Promise(function(reslove,reject){
            _this.axios.get("/api/front_article/getArticleAll").then(function(data){ 
            commit("Ajax",data.data.data);
            _this.$router.push({path:"/index"})
            reslove("ok")
           },function(err){
             reject(err)
           })
        })

      }
    }
  
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
