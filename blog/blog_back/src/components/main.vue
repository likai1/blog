<template>
  <div>
    <el-row>
      <el-col :span="24"><div class="grid-content bg-purple-dark"><h2>个人博客</h2><p>当前登录账户:{{userName}}</p></div>
      </el-col>
    </el-row>
    <div class="pageList">
      <page-list></page-list>
    </div>
    <div class="pageContent">
      <router-view></router-view>
    </div>
    <!-- <div class="pageContent">
      <page-content></page-content>
    </div> -->
  </div>
</template>

<script>
import pageList from "./page/main_left"
import pageContent from "./page/main_right"
export default {
  name: 'hello',
  data () {
    return {
      userName:""
    }
  },
  components:{
    pageList,
    pageContent
  },
  mounted(){
    this.userName=sessionStorage.getItem("username");
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-row {
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .grid-content h2{
    line-height: 36px;
    float: left;
    margin-left: 5px;
  }
  .grid-content p{
    line-height: 36px;
    float: right;
    margin-right: 5px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .pageList{
    width: 200px;
    float: left;
  }
  .pageContent{
    float: left;
  }
</style>
