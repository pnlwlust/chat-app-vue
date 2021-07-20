<template>
  <el-container>
    <el-aside><el-card><ChatSideBar/></el-card></el-aside>
    <el-main style="padding: 5px;"><el-card><ChatArea/></el-card></el-main>
    <el-aside><el-card><ChatDetails/></el-card></el-aside>
  </el-container>
</template>

<script>
import ChatSideBar from "../components/ChatSideBar";
import ChatArea from "../components/ChatArea";
import ChatDetails from "../components/ChatDetails";
import {mapActions} from "vuex";

export default {
  name:'ChatBoard',
  components: {ChatSideBar, ChatArea, ChatDetails},
  created() {
    // this.initData();
  },
  methods: {
    ...mapActions('chat', ['initData']),
  }
}
</script>