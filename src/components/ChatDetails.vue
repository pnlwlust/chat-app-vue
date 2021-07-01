<template>
    <el-row class="chat-details">
      <el-col>
        <el-avatar :size="100" src="https://empty" @error="errorHandler">
          <img :src="contactProfile.avatar" alt="profile avatar"/>
        </el-avatar>
      </el-col>
      <el-col style="margin-top:10px">
        <span class="profile-name">{{contactProfile.name}}</span>
      </el-col>
    </el-row>
</template>

<script>

import {mapGetters} from "vuex";

export default {
  name:'ChatDetails',
  components: {},
  data() {
    return {
    }
  },
  computed:{
    ...mapGetters(["contactProfile"])
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
