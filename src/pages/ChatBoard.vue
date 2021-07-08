<template>
  <el-container>
    <el-aside><ChatSideBar/></el-aside>
    <el-main> <ChatArea/> </el-main>
    <el-aside><ChatDetails/></el-aside>
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