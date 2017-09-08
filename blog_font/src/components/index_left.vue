<template>
<div>
           <div class="s_tuijian">
           <h2>文章<span>推荐</span></h2>
           </div>
          <div class="content_text">
           <!--wz-->
           <div class="wz" v-for="i in data_left.data">
            <h3><a href="#" title="浅谈：html5和html的区别">{{i.article_name}}</a></h3>
             <dl>
               <dt><img src="static/images/s.jpg" width="200"  height="123" alt=""></dt>
               <dd>
                 <p class="dd_text_1">{{i.daodu}}</p>
               <p class="dd_text_2">
               <span class="left author">{{i.editer}}</span><span class="left sj">{{i.time}}</span>
               <span class="left fl">分类:<a href="#" title="学无止境">学无止境</a></span><span class="left yd">
                 <router-link to="/content">
                      <a title="阅读全文">阅读全文</a>
                 </router-link>
                 
                 
               </span>
                <div class="clear"></div>
               </p>
               </dd>
               <div class="clear"></div>
             </dl>
            </div>
           <!--wz end-->              
           </div>
         </div>
    </template>
    <script>
      export default {
        props:["data_left"],
        data(){
          return{

          }
        },
        mounted(){
          
        }
        
      }
    </script>