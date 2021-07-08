<template>
  <el-tabs tab-position="bottom" v-model="selectedSidebarTab" type="card" >
    <el-tab-pane name="recentChats">
      <template #label>
        <span><i class="el-icon-chat-line-round"></i></span>
      </template>
      <RecentChats/>
    </el-tab-pane>
    <el-tab-pane name="activeUsers">
      <template #label>
        <span><i class="el-icon-connection"></i></span>
      </template>
      <ActiveUsers/>
    </el-tab-pane>
    <el-tab-pane name="allContacts">
      <template #label>
        <span><i class="el-icon-message"></i></span>
      </template>
      <AllContacts/>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import AllContacts from "./AllContacts";
import RecentChats from "./RecentChats";
import ActiveUsers from "./ActiveUsers";

export default {
  name: 'ChatListBox',
  components: {ActiveUsers, AllContacts, RecentChats},
  data() {
    return {
      isActive: true,
      selectedSidebarTab:'recentChats',
      sidebarComps: [{icon:'el-icon-chat-line-round', comp: RecentChats}, {icon:'el-icon-connection', comp: ActiveUsers}, {icon:'el-icon-message', comp: AllContacts}]
    }
  },
  computed:{
    ...mapGetters(["recentChats"])
  },
  methods: {
    ...mapActions('chat', ["fetchRecentChats", "fetchChatHistory"]),
    errorHandler() {
      return true
    },
    receiverBarClicked(item){
      console.log("Person bar clicked")
      console.log(item)
      this.fetchChatHistory(item)
    }
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
