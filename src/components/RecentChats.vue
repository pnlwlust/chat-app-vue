<template>
  <el-row>
  <el-col>
    <el-scrollbar id="scrollbar" height="400px" width="10px" >
      <div @click.prevent="receiverBarClicked(item)" class="profile-bar" v-for="(item, index) in recentChats" :key="index">
        <ReceiverInfoBar :value="item"/>
        <el-divider></el-divider>
      </div>
    </el-scrollbar>
  </el-col>
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
    ...mapGetters(["recentChats"])
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
