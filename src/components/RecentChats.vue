<template>
  <el-row>
    <el-col v-if="showRecentChats">
      <el-scrollbar id="scrollbar" height="400px" width="10px" >
        <div @click.prevent="receiverBarClicked(item)" class="profile-bar" v-for="(item, index) in recentChats" :key="index">
          <ReceiverInfoBar :value="item"/>
          <el-divider></el-divider>
        </div>
      </el-scrollbar>
    </el-col>
    <el-col class="select-user-msg" v-else>Please select someone to chat with</el-col>
  </el-row>
</template>
<script>
import ReceiverInfoBar from "./ReceiverInfoBar";
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'RecentChats',
  components: {ReceiverInfoBar},
  data() {
    return {
      isActive: true,
    }
  },
  created(){
    this.initRecentChats()
  },
  computed:{
    ...mapGetters(["recentChats"]),
    showRecentChats(){
      return Object.keys(this.recentChats).length

    }
  },
  methods: {
    ...mapActions('chat', ["initRecentChats","fetchRecentChats", "fetchChatHistory"]),
    errorHandler() {
      return true
    },
    receiverBarClicked(item){
      this.fetchChatHistory({...item})
    },
  }
}
</script>
