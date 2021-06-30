<template>
    <el-row class="chat-details">
      <el-col>
        <el-avatar :size="100" src="https://empty" @error="errorHandler">
          <img :src="profile.avatar" alt="profile avatar"/>
        </el-avatar>
      </el-col>
      <el-col style="margin-top:10px">
        <span class="profile-name">{{profile.name}}</span>
      </el-col>
    </el-row>
</template>

<script>

export default {
  name:'ChatDetails',
  components: {},
  data() {
    return {
      profile: {name: "profile name", avatar: "../assets/images/logo.png"},
    }
  },
  methods:{
    errorHandler(){
      return true;
    }
  }
}
</script>
<style>

.el-row.chat-details .profile-name {
  font-family: monospace;
  font-size: x-large;
}
</style>
