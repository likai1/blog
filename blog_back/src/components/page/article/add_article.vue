<template>
<div  style="width: 1000px">
<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="标题" prop="article_name" style="width: 317px">
    <el-input v-model="ruleForm.article_name"></el-input>
  </el-form-item>
  <el-form-item label="一级分类" prop="oneId">
	<el-select v-model="ruleForm.oneId" placeholder="请选择" @change="changeClassOne">
    <el-option
      v-for="item in oneClass"
      :key="item.id"
      :label="item.cnname"
      :value="item.id">
    </el-option>
  </el-select>
  </el-form-item>
  
  <el-form-item label="二级分类" prop="twoId">
	<el-select v-model="ruleForm.twoId" placeholder="请选择">
    <el-option
      v-for="item in twoClass"
      :key="item.id"
      :label="item.cnname"
      :value="item.id">
    </el-option>
  </el-select>
  </el-form-item>
  <el-form-item label="作者" prop="editer" style="width: 317px">
    <el-input v-model="ruleForm.editer"></el-input>
  </el-form-item>
  <el-form-item label="时间" prop="time">
    <div class="block">
    <el-date-picker
      v-model="datatime"
      type="datetime"
      placeholder="选择日期时间" @change="timeFn" format="yyyy-MM-dd HH:mm:ss" 
      >
    </el-date-picker>
  </div>
  </el-form-item>
    <el-form-item label="是否推荐" prop="recommend">
    <el-radio class="radio" v-model="ruleForm.recommend" label="1">是</el-radio>
  	<el-radio class="radio" v-model="ruleForm.recommend" label="2">否</el-radio>
  </el-form-item>
  <el-form-item label="是否显示" prop="art_show">
    <el-radio class="radio" v-model="ruleForm.art_show" label="1">是</el-radio>
  	<el-radio class="radio" v-model="ruleForm.art_show" label="2">否</el-radio>
  </el-form-item>
  <el-form-item label="导读" prop="daodu">
    <el-input type="textarea" v-model="ruleForm.daodu"></el-input>
  </el-form-item>
  <el-form-item label="内容" prop="content">
		<quill-editor v-model="ruleForm.content"></quill-editor>
  </el-form-item>
	  
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>
</div>
</template>
<script>
  export default {
    data() {
    	var validatetime = (rule, value, callback) => {

                if (this.datatime === '') {
                    callback(new Error('请选择时间'));
                } else {

                    callback();
                }
            }
      return {
      	oneClass:[],
      	twoClass:[],
      	twoClassAll:[],
      	datatime:"",
        ruleForm: {
          editer: '',
          article_name:'',
          oneId: '',
          twoId: '',
          recommend: '1',
          art_show: '1',
          daodu: '',
          content:"",
          time:"",
          enname_one:"",
          imgsrc:""
        },
        rules: {
          editer: [
            { required: true, message: '不能为空', trigger: 'blur' },
          ],
          article_name: [
            { required: true, message: '不能为空', trigger: 'blur' },
          ],
          oneId: [
            { required: true, message: '请选择一级分类', trigger: 'change' }
          ],
          twoId: [
            { required: true, message: '请选择二级分类', trigger: 'change' }
          ],
          daodu: [
            { required: false, message: '请填写导读', trigger: 'blur' }
          ],
          time: [
            { validator: validatetime, message: '请选择时间', trigger: 'blur' }
          ],
          content: [
            { required: true, message: '请输入内容', trigger: 'blur' }
          ]
        },
        value2: ''
      };
    },
    methods: {
		changeClassOne(){
			this.twoClass=[];
			var oneItem=null;
			this.oneClass.forEach(function(i){
				if(i.id==this.ruleForm.oneId){
					oneItem=i;
				}
			}.bind(this))
			this.twoClassAll.forEach(function(i){
				if(i.parent_id==this.ruleForm.oneId){
					this.twoClass.push(i);
				}
			},this)
			this.ruleForm.twoId="";
			this.ruleForm.enname_one=oneItem.enname;
		},
		timeFn(i){
			this.ruleForm.time=arguments[0]
		},
      submitForm(formName) {
      	console.log(this.ruleForm)
        this.$refs[formName].validate((valid) => {
          if (valid) {
          	this.axios.post("/api/back_article/addArticle", this.ruleForm).then(function(data) {
                if (data.data.code == "3011") {

                    this.open2()
                    var _this = this
                    setTimeout(function() {
                        _this.$router.go(0)
                    }, 1000)

                } else {
                    this.open4()
                }

            }.bind(this))
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            // 成功消息提示
            open2() {
                this.$message({
                    message: '恭喜你，插入数据成功',
                    type: 'success'
                });
            },
            // 失败消息提示
            open4() {
                this.$message.error('不好意思，插入数据失败');
            }
    },
    created(){
    	this.axios.get("/api/back_article/getClass").then(function(data){
    		this.oneClass=data.data.data[0];
    		this.twoClassAll=data.data.data[1];
    		this.ruleForm.oneId=this.oneClass[0].id;
    		this.changeClassOne();
    	}.bind(this))
    },
    mounted(){
    	
    	
    }

  }
</script>