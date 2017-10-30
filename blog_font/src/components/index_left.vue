<template>
<div>
           <div class="s_tuijian">
           <h2>文章<span>推荐</span></h2>
           </div>
          <div class="content_text">
           <!--wz-->
           <div class="wz" v-for="i in temp">
            <h3><a href="#" title="浅谈：html5和html的区别">{{i.article_name}}</a></h3>
             <dl>
               <dt><img src="static/images/s.jpg" width="200"  height="123" alt=""></dt>
               <dd>
                 <p class="dd_text_1">{{i.daodu}}</p>
               <p class="dd_text_2">
               <span class="left author">{{i.editer}}</span><span class="left sj">{{i.time}}</span>
               <span class="left fl">分类:<a href="#" title="学无止境">学无止境</a></span><span class="left yd">
                      <a title="阅读全文" @click="btnFn(i.id)">阅读全文</a>
               </span>
                <div class="clear"></div>
               </p>
               </dd>
               <div class="clear"></div>
             </dl>
            </div>
           <!--wz end-->              
           </div>
           <div class="block">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage4"
              :page-sizes="[4, 8, 10, 15]"
              :page-size="page"
              layout="total, sizes, prev, pager, next, jumper"
              :total="data.length">
            </el-pagination>
          </div>
         </div>
    </template>
    <script>
      import {mapState,mapActions} from "vuex"
      export default {
        data() {
          return {
            // currentPage1: 5,
            // currentPage2: 5,
            // currentPage3: 5,
            currentPage4:0,
            page:1,
            temp:[],
            num:5
          };
        },
        methods:{
          btnFn(id){
            this.$router.push({
              name:"content",
              query:{
                id:id,
                // data:data
              }
            })
          },
          handleSizeChange(val) {
            
          },
          handleCurrentChange(val) {
            console.log(val)
            this.page=val;
            this.temp=this.data.slice((this.page-1)*this.num,this.num*this.page);
            console.log(this.temp)
          },
          ...mapActions(["getData"])
        },
        computed:{
          ...mapState({
            data:state=>state.datas
            
          })
        },
        mounted(){
          
        },
      

        
      }
    </script>