<template>
    <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
        <h3>一级类名选择</h3>
<el-form-item label="中文类名" prop="region">
    <el-select v-model="ruleForm2.oneId" placeholder="请选择一级类名">
        <template v-for="i in ClassOne">
            <el-option :label="i.cnname" :value="i.id"></el-option>
        </template>
      
    </el-select>
  </el-form-item>
<h3>二级类名设置</h3>
<el-form-item label="中文类名" prop="cn">
    <el-input type="text" v-model="ruleForm2.cnname_two" auto-complete="off"></el-input>
</el-form-item>
<el-form-item label="英文类名" prop="entwo">
    <el-input v-model.number="ruleForm2.enname_two"></el-input>
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
                    console.log(this.ruleForm2.enname_one)
                    if (/^[A-Za-z]+$/.test(this.ruleForm2.enname_one)) {
                        callback();
                    } else {
                        callback(new Error('请输入英文'));
                    }
                }
            };
            var entwo = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入英文标识'));
                } else {
                    console.log(this.ruleForm2.enname_two)
                    if (/^[A-Za-z]+$/.test(this.ruleForm2.enname_two)) {
                        callback();
                    } else {
                        callback(new Error('请输入英文'));
                    }
                }
            };
            return {
                ClassOne:[],
                ruleForm2: {
                    oneId:"",
                    cnname_two: "",
                    enname_two: "",
                },
                rules2: {
                    cn: [{
                        validator: "",
                        trigger: 'blur'
                    }],
                    en: [{
                        validator: en,
                        trigger: 'blur'
                    }],
                    entwo: [{
                        validator: entwo,
                        trigger: 'blur'
                    }]
                }
            };
        },
        created(){
            var _this=this;
            this.axios.get("/api/back_class/select_one_class").then(function(data){
                if(data.data.code=="1021"){
                    _this.ClassOne=data.data.data;
                }
            })
        },
        methods: {
            submitForm(formName) {
            	var _this=this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // alert('submit!');
                    	_this.axios.post("/api/back_class/add_two_class",this.ruleForm2).then(function(data){
                            if(data.data.code=="1032"){
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