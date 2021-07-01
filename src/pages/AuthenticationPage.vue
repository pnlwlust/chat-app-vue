<template>
<!--  <el-card class="box-card login-card">-->
    <el-tabs class="login-card" tab-position="left" style="height: auto;">
      <el-tab-pane label="Login"><Login/></el-tab-pane>
      <el-tab-pane label="Register"><Register/></el-tab-pane>
    </el-tabs>
<!--  </el-card>-->
</template>
<script>

import Login from "@/components/Login";
import Register from "@/components/Register";

export default {
  name: 'Authentication',
  data() {
    return {
      loggedIn: false
    }
  },
  components: {
    Login,
    Register
  },
  methods:{
  }
}
</script>
<style>

.login-card{
  width: 500px;
  margin: 0 auto;
}
</style>
