<template>
<!--<el-row>
<el-col :span="6"><ChatSideBar/></el-col>
<el-col :span="12"> <ChatArea/> </el-col>
  <el-col :span="6"><ChatDetails/></el-col>
</el-row>
</template>-->
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

export default {
  name:'ChatBoard',
  components: {ChatSideBar, ChatArea, ChatDetails}
}
</script>