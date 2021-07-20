<template>
  <el-tabs tab-position="bottom" v-model="activeTab" type="card" @tab-click="fetchContacts">
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
    <el-tab-pane name="allContacts" >
      <template #label>
        <span><i class="el-icon-message"></i></span>
      </template>
      <AllContacts/>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import AllContacts from "./AllContacts";
import RecentChats from "./RecentChats";
import ActiveUsers from "./ActiveUsers";
import {mapActions} from "vuex";

export default {
  name: 'ChatListBox',
  components: {ActiveUsers, AllContacts, RecentChats},
  data() {
    return {
      isActive: true,
      activeTab: 'recentChats',
      sidebarComps: [{icon:'el-icon-chat-line-round', comp: RecentChats}, {icon:'el-icon-connection', comp: ActiveUsers}, {icon:'el-icon-message', comp: AllContacts}]
    }
  },
  methods: {
    ...mapActions('chat',['fetchAllContacts']),
    fetchContacts(e){
      e.index == 2 && this.fetchAllContacts();
    },
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
