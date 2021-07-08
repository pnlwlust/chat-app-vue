<template>
  <el-row type="flex" justify="start">
    <el-col :span="6">
      <el-avatar :size="40" src="https://empty" @error="errorHandler">
        <img :src="value.avatar || person.avatar" :alt="value.alt"/>
      </el-avatar>
    </el-col>
    <el-col class="profile-info-col" :span="18">
      <el-col>{{value.name || value.username || value.sender.username}}</el-col>
      <el-col class="lastmsg"> {{value.msg}}</el-col>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'ReceiverInfoBar',
  data() {
    return {
      person: {
        name: 'person name',
        avatar: '../assets/images/female-profile-80.png'
      }
    }
  },
  props: ["value"],
  methods: {
    errorHandler() {
      return true
    }
  }
}
</script>
<style>

.el-row .profile-info-col {
  text-align: start;
}
.el-row .profile-info-col .lastmsg {
  width: 200px;
  font-size: x-small;
  color: #b4b0b0;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>