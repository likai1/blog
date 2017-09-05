<template>
<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="标题" prop="biaoti">
    <el-input v-model="ruleForm.biaoti"></el-input>
  </el-form-item>
  <el-form-item label="一级分类" prop="region1">
    <el-select v-model="ruleForm.region1" placeholder="请选择一级分类">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="二级分类" prop="region2">
    <el-select v-model="ruleForm.region2" placeholder="请选择二级分类">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="作者" prop="name">
    <el-input v-model="ruleForm.name"></el-input>
  </el-form-item>
  <el-form-item label="时间" required>
    <div class="block">
    <el-date-picker
      v-model="value2"
      type="datetime"
      placeholder="选择日期时间"
      align="right"
      :picker-options="pickerOptions1">
    </el-date-picker>
  </div>
  </el-form-item>
    <el-form-item label="推荐" prop="resource1">
    <el-radio-group v-model="ruleForm.resource1">
      <el-radio label="是"></el-radio>
      <el-radio label="否"></el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="状态" prop="resource2">
    <el-radio-group v-model="ruleForm.resource2">
      <el-radio label="显示"></el-radio>
      <el-radio label="隐藏"></el-radio>
    </el-radio-group>
     
  </el-form-item>
  <el-form-item label=导读 prop="desc">
    <el-input type="textarea" v-model="ruleForm.desc"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>
</template>
<script>
  export default {
    data() {
      return {
        ruleForm: {
          name: '',
          biaoti:'',
          region1: '',
          region2: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource1: '',
          resource2: '',
          desc: ''
        },
        rules: {
          name: [
            { required: true, message: '不能为空', trigger: 'blur' },
          ],
          biaoti: [
            { required: true, message: '不能为空', trigger: 'blur' },
          ],
          region1: [
            { required: true, message: '请选择一级分类', trigger: 'change' }
          ],
          region2: [
            { required: true, message: '请选择二级分类', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          resource1: [
            { required: true, message: '请选择', trigger: 'change' }
          ],
          resource2: [
            { required: true, message: '请选择', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写导读', trigger: 'blur' }
          ]
        },
        pickerOptions1: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        value1: '',
        value2: ''
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
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