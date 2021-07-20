<template>
  <el-row>
    <el-col>
      <el-scrollbar id="scrollbar" height="400px" width="10px" >
        <div @click.prevent="receiverBarClicked(item)" class="profile-bar" v-for="(item, index) in allContacts" :key="index">
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
  name: 'AllContacts',
  components: {ReceiverInfoBar},
  data() {
    return {
      isActive: true,
    }
  },
  computed:{
    ...mapGetters(["allContacts"])
  },
  methods: {
    ...mapActions('chat', ["fetchChatHistory"]),
    errorHandler() {
      return true
    },
    receiverBarClicked(item){
      this.fetchChatHistory({sender: item})
    }
  }
}
</script>
