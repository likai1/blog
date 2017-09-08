<template>
    <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
        <h3>{{typeData.label}}</h3>
<el-form-item label="中文类名" prop="cn">
    <el-input type="text" v-model="ruleForm.cnname_one" auto-complete="off"></el-input>
</el-form-item>
<el-form-item label="英文类名" prop="en">
    <el-input v-model.number="ruleForm.enname_one"></el-input>
</el-form-item>
<el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
    <el-button @click="resetForm('ruleForm2')">重置</el-button>
</el-form-item>
</el-form>

</template>

<script>
    export default {
        data() {
            var en = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入英文标识'));
                } else {
                    if (/^[A-Za-z]+$/.test(this.ruleForm.enname_one)) {
                        callback();
                    } else {
                        callback(new Error('请输入英文'));
                    }
                }
            };
            return {
                typeData:{
                    label:"",
                    url:"",
                },
                ruleForm:{
                     oldenname_one:"" ,//原一级类名的英文标识
                     enname_one:"",   //新改变一级类名的英文标识
                     cnname_one:"" ,
                     oldenname_two:""
                },
                ruleForm2: {
                    cnname_one: "",
                    enname_one: "",
                },
                rules2: {
                    cn: [{
                        validator: "",
                        trigger: 'blur'
                    }],
                    en: [{
                        validator: en,
                        trigger: 'blur'
                    }]
                }
            };
        },
        created(){
            // console.log(this.$route.params)
            if(this.$route.params.type=="one"){
               this.typeData.label="一级类名设置";
               this.typeData.url="/api/back_class/amend_class_one";
               this.ruleForm.oldenname_one=this.$route.params.data.enname;
               this.ruleForm.enname_one=this.$route.params.data.enname;
               this.ruleForm.cnname_one=this.$route.params.data.cnname;
               
            }else{
               this.typeData.label="二级类名设置";
               this.typeData.url="/api/back_class/amend_class_two";
               this.ruleForm.oldenname_two=this.$route.params.data.enname;
               this.ruleForm.enname_one=this.$route.params.data.enname;
               this.ruleForm.cnname_one=this.$route.params.data.cnname;
               
            }
            // console.log(this.ruleForm.enname_one)
        },
        methods: {
            submitForm(formName) {
            	var _this=this;
                var sendData={
                    enname_two:"",
                    cnname_two:"",
                    oldenname_two:""
                }
                if(this.$route.params.type=="one"){
                    sendData=this.ruleForm;
                }else{
                    sendData.enname_two=this.ruleForm.enname_one;
                    sendData.cnname_two=this.ruleForm.cnname_one;
                    sendData.oldenname_two=this.ruleForm.oldenname_two;
                }
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                    	// alert('submit!');
                    	_this.axios.post(this.typeData.url,sendData).then(function(data){
                    		if(data.data.code=="1052" ||data.data.code=="1062"){
                    			_this.$message({
                                    message:data.data.msg,
                                    type:"success"
                                })
                    		}else{
                    			_this.$message({
                                    message:data.data.msg,
                                    type:"error"
                                })
                    		}
                    		
                    	})
                        
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style scoped>
    h3 {
        margin: 20px 0 20px 40px
    }
</style>