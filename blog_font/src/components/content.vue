<template>
  <div>
    <div id="header">
      <h1>个人博客</h1>
      <p>青春是打开了,就合不上的书。人生是踏上了，就回不了头的路，爱情是扔出了，就收不回的赌注。</p>    
    </div>
     <div id="nav">
        <ul>
         <li><a href="index.html">首页</a></li>
         <li><a href="about.html">关于我</a></li>
         <li><a href="shuo.html">碎言碎语</a></li>
         <li><a href="riji.html">个人日记</a></li>
         <li><a href="xc.html">相册展示</a></li>
         <li><a href="learn.html">学无止境</a></li>
         <li><a href="guestbook.html">留言板</a></li>
         <div class="clear"></div>
        </ul>
      </div>
      <div id="content">
      <div class="left" id="c_left">
           <div class="s_tuijian">
           <h2>文章<span>推荐</span></h2>
           </div>
          <div class="content_text">
           <!--wz-->
           <div class="wz">
            <h3><a href="#" title="浅谈：html5和html的区别">浅谈：html5和html的区别</a></h3>
             <dl>
               <dd>
   
               <p class="dd_text_2">
               <span class="left author">{{datas.editer}}</span><span class="left sj">{{datas.time}}</span>
               <span class="left fl">分类:<a href="#" title="学无止境">学无止境</a></span><span class="left yd">
                 
               </span>
                <div class="clear"></div>
               </p>
               </dd>
               <div class="clear"></div>
             </dl>
             <div v-html="datas.content">
               {{datas.content}}
             </div>
            </div>              
           </div>
         </div>  
         <div class="right" id="c_right">
            <index_right></index_right>
        </div>
      </div>    
  </div>
    </template>
    <script>
      import index_right from "./index_right"
      export default {
        data(){
          return{
            // id:"",
            datas:"",
            shows:""
          }
        },
        components:{
          index_right
      },
      mounted(){
        this.axios.get(`/api/front_article/getArticle?id=${this.$route.query.id}`).then(function(data){
            this.datas=data.data.data;
            console.log(data.data.data)
        }.bind(this))
      }
      }
    </script>