<template>
    <el-form :model="registerForm" status-icon :rules="rules" ref="registerForm" >
      <el-form-item prop="name">
        <el-input type="input" prefix-icon="el-icon-user" placeholder="Name" v-model="registerForm.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="username">
        <el-input type="username" prefix-icon="el-icon-user" placeholder="Username" v-model="registerForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" prefix-icon="el-icon-lock" placeholder="Password" v-model="registerForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="confirmPassword">
        <el-input type="password" prefix-icon="el-icon-lock" placeholder="Confirm Password" v-model="registerForm.confirmPassword" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('registerForm')">Register</el-button>
        <el-button @click="resetForm('registerForm')">Reset</el-button>
      </el-form-item>
    </el-form>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: 'Register',
  data() {
    return {
      registerForm: {
        name:'',
        username: '',
        password: '',
        confirmPassword: '',
        rememberMe:''
      },
      rules: {
        password: [ { validator: this.validatePass, trigger: 'blur' } ],
        confirmPassword: [ { validator: this.validatePass2, trigger: 'blur' } ],
        username: [ { validator: this.validateUsername, trigger: 'blur' } ]
      }
    };
  },
  methods: {
    ...mapActions('user', ['register']),
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.register(this.registerForm)
        } else {
          console.log(valid)
          console.log('error submit!!');
          return false;
        }
      });
    },
    routeTo(path){
      this.$router.push(path);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    validatePass (rule, value, callback) {
      if (value === '') {
        callback(new Error('Please input the password'));
      } else {
        callback();
      }
    },
    validatePass2 (rule, value, callback) {
      if (value === '' || value !== this.registerForm.password) {
        callback(new Error('Passwords should match'));
      } else {
        callback();
      }
    },
    validateUsername (rule, value, callback) {
      if (value === '') {
        callback(new Error('Please input the username again'));
      } else {
        callback();
      }
    }
  }
}
</script>

