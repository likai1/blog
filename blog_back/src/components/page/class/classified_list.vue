<template>
<div>
<div class="list">
	<table v-for="(i,index) in list">
		<thead>
			<th>一级类名：{{i.onedata.cnname}}</th>
			<th>标识：{{i.onedata.enname}}</th>
			<th>文章数量：0</th>
			<th>
			<button>
        <router-link to="/main/amend_class">
              <el-button type="text" @click="editor(i.onedata,'one')">编辑</el-button>
        </router-link>
				
			</button>
			<button class="delete">
				  	<el-button class="delete" type="text" @click="delete1(i.onedata.id,i.onedata.enname,index)">删除</el-button>
			</button></th>
		</thead>
		<tbody>
			<tr v-for="(j,ind) in i.twodata">
				<td>二级类名：{{j.cnname}}</td>
				<td>标识：{{j.enname}}</td>
				<td>文章数量：0</td>
				<td>
				<button>
        <router-link to="/main/amend_class">
              <el-button type="text" @click="editor(j,'two')">编辑</el-button>
        </router-link>
					
				</button>
				<button>
					  <el-button class="delete" type="text" @click="delete2(i.onedata.id,j.id,i.onedata.enname,ind,index)">删除</el-button>
				</button>
				</td>
			</tr>
		</tbody>
	</table>
</div>
</div>
</template>

<script>
  export default {
    data() {
      return {
      	list:null
      }
    },
    methods:{
      editor(i,j){
        this.$router.push({
          name:"amend_class",
          params:{
            data:i,
            type:j
          }
        })
      },
      delete1(id,enname_one,index){
      	var _this=this;
      	
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        	_this.axios.post("/api/back_class/delete_one",{
        		id:id,
        		enname_one:enname_one
        	})

          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          _this.list.splice(index,1)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      delete2(oneId,twoId,enname_one,ind,index){
      	var _this=this;
      	// console.log(2)
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        	_this.axios.post("/api/back_class/delete_two",{
        		oneId:oneId,
        		twoId:twoId,
        		enname_one:enname_one
        	})

          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          _this.list[index].twodata.splice(ind,1)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      }
    },
    mounted(){
    	var _this=this;
    	this.axios.get("/api/back_class/class_list").then(function(data){
    		_this.list=data.data.data;
    	})
    }
  }
</script>
<style scoped>
table{
	border-collapse: collapse;
}
thead{
	width: 1166px;
	background: skyblue;
	height: 50px;
}
thead th{
	height: 50px;
	width: 291.015px;
}

tbody{
	width: 1166px;
	height: 40px;
	background: #E3F2F7;
}
tbody tr{
	margin-top: 10px;
}
tbody tr td{
	text-align: center;
	width: 291.015px;
	height: 40px;
}
button{
	width: 70px;
	height: 30px;
	border: none;
	outline: none;
	border-radius: 10px;
	cursor: pointer;
	text-align:center;
}
.delete{
	color:red;
}
</style>