<template>
  <div class="hello">
    <div id="header">
      <h1>个人博客</h1>
      <p>青春是打开了,就合不上的书。人生是踏上了，就回不了头的路，爱情是扔出了，就收不回的赌注。</p>    
    </div>
     <!--header end-->
    <!--nav-->
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
       <!--nav end-->
    <!--content start-->
    
    <div id="content">

        <!--<router-view></router-view>-->
    
         <!--left-->
<div class="left" id="c_left">
   
   <index_left></index_left> 
   
</div>
<div class="right" id="c_right">
<index_right></index_right>
</div>
         <div class="clear"></div>
    </div>
    <!--content end-->
    <!--footer start-->
    <div id="footer">
     <p>Design by:<a href="http://www.duanliang920.com" target="_blank">少年</a> 2014-8-9</p>
       
    </div>
  </div>
</template>

<script>
  import index_left from "./index_left"
  import index_right from "./index_right"
  
  import {mapState} from "vuex"
  export default {
    methods: {

    },
    data() {
      return {
        
      };
    },
    computed:{
        ...mapState({
          data:state=>state.datas
          
        })
     },
    components:{
          index_left,
          index_right
      },
      beforeRouteEnter(to,from,next){
          next(vm=>{
            console.log(vm)
            if(!vm.data){
              vm.$router.push("/")
            }
          })
      }
    
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
