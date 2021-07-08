<template>
  <el-row>
    <el-col>
      <el-card v-if="showChatBox" class="box-card chat-card">
        <el-header class="clearfix card-header">
          <span>{{ receiver.name || receiver.username }}</span>
        </el-header>
        <el-card class="box-card" shadow="never" :body-style="{ padding:'10px' }">
          <el-scrollbar id="scrollbar" height="400px" width="10px">
            <el-row ref="message-content" class="msg-box" id="message-content" >
              <el-col :id="'message-'+ index" class="msg-col" v-for="(msg, index) of messages" :key="msg._id">
                <MessageItem :message="msg"></MessageItem>
              </el-col>
            </el-row>
          </el-scrollbar>
        </el-card>
        <el-card class="msg-input-box" shadow="never" :body-style="{ padding:'10px' }">
          <el-form :inline="true" ref="newMessageForm" :model="newMessage"
                   label-width="0px" class="newMessageForm" >
            <el-form-item  prop="text" style="width: 500px" >
              <el-input type="textarea" spellcheck="false" v-model="newMessage.msg" @keyup.enter="sendMessage"></el-input>
            </el-form-item>
            <el-form-item  prop="text">
              <el-button class="send-message" icon="caret-right" @click="sendMessage()" type="primary">Send</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-card>
      <el-card class="select-user-msg" v-else>Please select someone to chat with</el-card>
    </el-col>
  </el-row>
</template>

<script>

import MessageItem from "./MessageItem";
import {mapActions, mapGetters} from "vuex";

export default {
  name:'ChatArea',
  components: {MessageItem},

  data() {
    return {
      typing:false,
      newMessage: {msg:''}
    }
  },
  computed:{
    ...mapGetters({messages: 'chatHistory', profile: 'profile', receiver: 'receiverProfile'}),
    showChatBox(){
      return Object.keys(this.receiver).length
    }
  },
  watch: {
    newMessage(value) {
      value ? this.$socket.emit('typing', { profile: this.profile, value: true}) : this.$socket.emit('typing', { profile: this.profile, value: false})
    }
  },
  methods:{
    ...mapActions('chat',['saveMessage']),
    scrollToEnd: function () {
      const lastIndex = this.messages.length - 1;
      this.$nextTick(() => {
        const el = this.$el.querySelector("#message-"+ lastIndex);
        if(el)
          el.scrollIntoView({behaviour:'smooth'})
      })
    },
    sendMessage() {
      this.$refs.newMessageForm.validate((valid) => {
        if (valid) {
          console.log("sending message to ")
          console.log(this.receiver)
          const msg = {
            id: this.profile.id,
            sender: this.profile,
            author: this.profile.name,
            isSelf: true,
            createdTime: new Date(),
            avatar: this.profile.avatar,
            msg: this.newMessage.msg,
            receiver: this.receiver
          }
          this.$socket.emit('send-msg', msg)
          this.saveMessage(msg)
          this.resetForm("newMessageForm")
          this.scrollToEnd()
        } else {
          this.$message.error('There was some error');
        }
        this.$refs.newMessageForm.resetFields();
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.newMessage.msg='';
    }
  }
}
</script>
<style>

.el-row .msg-box .msg-col {
  margin-top: 10px;
}
.select-user-msg {
  margin:auto 0px;
}
</style>
