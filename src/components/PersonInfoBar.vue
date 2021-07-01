<template>
  <el-row type="flex" justify="start">
    <el-col :span="6">
      <el-avatar :size="30" src="https://empty" @error="errorHandler">
        <img :src="value.avatar" :alt="value.alt"/>
      </el-avatar>
    </el-col>
    <el-col class="profile-info-col" :span="18">
      <span>{{value.name}}</span>
      <div class="lastmsg">{{value.lastmsg}}</div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'PersonInfoBar',
  data() {
    return {
      person: {
        name: 'person name',
        avatar: 'https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png'
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
  font-size: 0.225em;
  color: #b4b0b0;
}
</style>