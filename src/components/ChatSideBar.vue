<template>
  <el-container >
    <el-row>
      <el-col>
        <ProfileStatusbox />
      </el-col>
      <el-divider></el-divider>
      <el-col>
        <el-scrollbar id="scrollbar" height="400px" width="10px" >
          <div @click.prevent="personbarClicked(item)" class="profile-bar" v-for="(item, index) in recentChats" :key="index">
            <PersonInfoBar :value="item"/>
            <el-divider></el-divider>
          </div>
        </el-scrollbar>
      </el-col>
    </el-row>
  </el-container>
</template>

<script>
import PersonInfoBar from "./PersonInfoBar";
import {mapActions, mapGetters} from "vuex";
import ProfileStatusbox from "./ProfileStatusbox";

export default {
  name: 'ChatSideBar',
  components: {ProfileStatusbox, PersonInfoBar},
  data() {
    return {
      isActive: true,
    }
  },
  mounted() {
    this.fetchRecentChats();
  },
  computed:{
    ...mapGetters(["recentChats"])
  },
  methods: {
    ...mapActions('chat', ["fetchRecentChats", "fetchChatHistory"]),
    errorHandler() {
      return true
    },
    personbarClicked(item){
      console.log("Person bar clicked")
      console.log(item)
      this.fetchChatHistory(item)
    },
    fetchRecentChats(){

    },
    fetchContacts(){

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