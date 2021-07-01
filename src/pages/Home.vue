<template>
  <el-row style="">
    <el-col>
      <Authentication v-if="!isLoggedIn"/>
      <ChatBoard v-else/>
    </el-col>
  </el-row>
</template>
<script>

import Authentication from "./AuthenticationPage";
import ChatBoard from "./ChatBoard";
import {mapGetters} from "vuex";

export default {
  name: 'Home',
  data() {
    return {
      loggedIn: false
      }
  },
  components: {
    ChatBoard,
    Authentication
  },
  computed:{
    ...mapGetters(['isLoggedIn']),
  },
  methods:{
  }
}
</script>