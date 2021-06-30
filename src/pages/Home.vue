<template>
  <el-row style="">
    <el-col>
      <Login @loggedIn="isLoggedIn" v-if="!loggedIn"/>
      <ChatBoard v-else/>
    </el-col>
  </el-row>
</template>
<script>

import Login from "@/components/Login";
import ChatBoard from "./ChatBoard";

export default {
  name: 'Home',
  data() {
    return {
      loggedIn: false
      }
  },
  components: {
    ChatBoard,
    Login
  },
  methods:{
    isLoggedIn(value){
     this.loggedIn = value;
    }
  }
}
</script>