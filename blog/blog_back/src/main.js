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

router.beforeEach(function(to,from,next){
	if(to.name=="login"){
		next()
	}else{
		if(sessionStorage.getItem("userId")){
			next();
		}else{
			next(false)
		}
	}
	
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
