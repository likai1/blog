import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import main from '@/components/main'

import classified_list from '@/components/page/api/classified_list'

// 接口文档
import add_api from '@/components/page/api/api_insert'
import api_list_font from '@/components/page/api/api_list_font'
import api_list_back from '@/components/page/api/api_list_back'
import api_detail from '@/components/page/api/api_detail'
import api_amend from '@/components/page/api/api_amend'

//分类管理
import add_one_class from '@/components/page/class/add_one_class'
import add_two_class from '@/components/page/class/add_two_class'

//文章管理
import add_article from '@/components/page/article/add_article'
import article_list from '@/components/page/article/article_list'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/main',
      name: 'main',
      component: main,
      children:[
      	{
      		path: 'add_one_class',
		    name: 'add_one_class',
		    component: add_one_class,
      	},
      	{
      		path: 'add_two_class',
		    name: 'add_two_class',
		    component: add_two_class,
      	},
      	{
      		path: 'classified_list',
		    name: 'classified_list',
		    component: classified_list,
      	},
      	{
            path: 'add_api',
            name: 'add_api',
            component: add_api,
        }, {
            path: 'api_list_font',
            name: 'api_list_font',
            component: api_list_font,
        }, {
            path: 'api_list_back',
            name: 'api_list_back',
            component: api_list_back,
        }, {
            path: 'api_detail',
            name: 'api_detail',
            component: api_detail,
        }, {
            path: 'api_amend',
            name: 'api_amend',
            component: api_amend,
        },{
            path: 'add_article',
            name: 'add_article',
            component: add_article,
        },{
            path: 'article_list',
            name: 'article_list',
            component: article_list,
        }
      ]
    }
  ]
})
