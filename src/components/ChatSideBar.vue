<template>
    <el-row>
      <el-col>
        <ProfileStatusbox />
      </el-col>
      <el-divider></el-divider>
      <el-col>
        <ChatListBox/>
      </el-col>
    </el-row>
</template>

<script>
import ProfileStatusbox from "../../ProfileStatusbox";
import ChatListBox from "./ChatListBox";

export default {
  name: 'ChatSideBar',
  components: {ChatListBox, ProfileStatusbox},
  data() {
    return {
      isActive: true,
    }
  },
  methods: {
    errorHandler() {
      return true
    },
  }
}
</script>
<style>

.el-row .profile-info-col {
  text-align: start;
}
.el-row .profile-info-col .el-row .el-col {
  margin-top: 10px;
}
.el-row .profile-info-col .profile-name {
  font-family: monospace;
  font-size: x-large;
}
.profile-bar {
  border-bottom: #b4b0b0;
}
.profile-bar:hover {
  color: inherit;
}
.profile-bar:active {
  color: inherit;
}
</style>