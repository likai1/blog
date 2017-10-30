import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import content from '@/components/content'
import loading from '@/components/loading'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'loading',
      component: loading,
    },
    {
      path: '/index',
      name: 'index',
      component: index,
    },
    {
        path: '/content',
        name: 'content',
        component: content,
    }
  ]
})
