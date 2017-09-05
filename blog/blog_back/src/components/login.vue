<template>
  <div class="login_box">
    <div class="login">
      <h2>欢迎您登录博客</h2>
        <ul>
            <li v-focus:test="loginname">
              <label for="">账号：</label>
              <input type="text" placeholder="请输入账号" v-model.lazy="loginname.val"  @blur="fn(loginname)">
              <i style="color:red;display:block" v-if="loginname.state">{{loginname.msg}}</i>
            </li>
            <li v-focus:test="loginpw">
              <label for="">密码：</label>
              <input type="password" placeholder="请输入密码" v-model.lazy="loginpw.val"  @blur="fn(loginpw)">
              <i style="color:red;display:block" v-if="loginpw.state">{{loginpw.msg}}</i>
            </li>
        </ul>
        <button @click="login()">登录</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
       loginname: {
            val: "",
            msgread: "您输入的姓名不符合中文格式",
            msg: "您输入的姓名不符合中文格式",
            test: /[\u4E00-\u9FA5]+/,
            state: false
        },
         loginpw: {
            val: "",
            msgread: "您输入的密码格式不对",
            blur: false,
            msg: "您输入的密码格式不对",
            test:/^[A-Za-z0-9]+$/,
            // test: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/,
            state: false
        }
    }
  },
  methods:{
    login(){
      // 判断是否值是否正确
        var _this = this
        if (!this.loginpw.state && !this.loginname.state && this.loginpw.val != "" && this.loginname.val != "") {
            this.axios.post("/api/back_class", {
                loginname: this.loginname.val,
                loginpw: this.loginpw.val
            }).then(function(data) {
                console.log(data)
                _this.$message(data.data.msg);
                if (data.data.code == "1001") {
                    sessionStorage.setItem("userId", data.data.userid);
                    sessionStorage.setItem("username", _this.loginname.val);
                    _this.$router.push("/main")
                }
            })
        } else {
            alert("请正确填写用户名密码")
        }
    },
     // 必填项的验证
      fn(val) {
          val.blur = true
      }
  },
  directives: {
            focus: {
                componentUpdated(el, option, vnode, oldVnode) {
                    var $testState = option.value.test.test(option.value.val)
                    if (option.value.val != "") {
                        if ($testState) {
                            option.value.state = false
                        } else {
                            option.value.state = true
                        }
                        option.value.msg = option.oldValue.msgread
                    } else {
                        if (option.arg == "required" && option.value.blur) {
                            option.value.state = true
                            option.value.msg = "不能为空"
                        } else {
                            option.value.state = false
                        }
                    }
                }
            }
        }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .login_box{
      width: 100%;
      height: 638px;
      background: url("../../static/img/login_bg.jpg") no-repeat;
      background-size: 100% 100%;
      position: relative;
    }
    .login{
      width: 400px;
      height: 250px;
      position: absolute;
      top: 50%;
      left: 50%;
      background: #fff;
      opacity: 0.9;
      margin-left: -200px;
      margin-top: -100px;
      border-radius: 10px;
    }
    .login h2{
      width: 180px;
      height: 30px;
      margin: 0 auto;
      font-weight: 100;

    }
    .login ul{
      width: 300px;
      height: 120px;
      margin: 20px auto;
    }
    .login ul li{
        margin-top: 25px;
        height: 40px;
    }
    .login ul li i{
      font-style: normal;
      margin-left: 50px;
      /*height: 20px;*/
    }
    .login ul li input{
        width: 230px;
        height: 40px;
        border-radius: 10px;
        border:0;
        border:1px solid #ccc;
        outline: none;
    }
    .login button{
      width:100px;
      height:40px;
      margin-left: 150px;
      border-radius: 10px;
      margin-top: 5px;
      border:0;
      border:1px solid #ccc;
      outline: none;
      cursor: pointer;
    }
</style>
