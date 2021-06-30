<template>
  <el-card class="box-card login-card">
    <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" >
      <el-form-item prop="username">
        <el-input type="username" prefix-icon="el-icon-user" v-model="loginForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="pass">
        <el-input type="password" prefix-icon="el-icon-lock" v-model="loginForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="rememberMe" left>
        <el-checkbox v-model="loginForm.rememberMe">Remember Me</el-checkbox>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('loginForm')">Submit</el-button>
        <el-button @click="resetForm('loginForm')">Reset</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password'));
      } else {
        callback();
      }
    };
    var validateUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the username again'));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: '',
        pass: '',
        rememberMe:''
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        username: [
          { validator: validateUsername, trigger: 'blur' }
        ],
        rememberMe: {message: 'Remember Me'}
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit('loggedIn' , true);
        } else {
          console.log('error submit!!');
          this.$emit('loggedIn' , false);
          return false;
        }
      });
    },
    toChatView() {
      let self = this
      let username = self.loginForm.username
      let password = self.loginForm.pass

      let params = { username: username, password: password }
      this.axios.get('/api/login', { params: params })
          .then(function (res) {
            if (res.data.success) {
              self.$router.push({path: `/chat/${username}`})
              // self.$socket.emit('login', self.loginForm.username)
            } else {
              self.$message.error(res.data.message);
            }
          })
          .catch(function (err) {
            console.log(err);
          });
    },
    routeTo(path){
      this.$router.push(path);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style>

.login-card{
  width: 500px;
  margin: 0 auto;
}
</style>
