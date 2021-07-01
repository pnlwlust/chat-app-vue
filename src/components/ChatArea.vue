<template>
  <el-row>
    <el-col>
      <el-card class="box-card chat-card">
        <el-header class="clearfix card-header">
          <span>{{ profile.name }}</span>
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
                  <el-input type="textarea" spellcheck="false" v-model="newMessage.text" @keyup.enter="addMessage"></el-input>
                </el-form-item>
                <el-form-item  prop="text">
                  <el-button class="send-message" icon="caret-right" @click="addMessage()" type="primary">Send</el-button>
                </el-form-item>
              </el-form>
        </el-card>
      </el-card>
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
      profile:{name:'Ram'},
      newMessage: {text:''}
    }
  },
  updated() {
    // whenever data changes and the component re-renders, this is called.
  },
  computed:{
    ...mapGetters({messages: 'chatHistory'})
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
    addMessage() {
      this.$refs.newMessageForm.validate((valid) => {
        if (valid) {
          const msg = {
            _id: 100 * Math.random(),
            author: 'Ram',
            isSelf: true,
            createdTime: new Date(),
            headImgSrc: 'https://vuefe.cn/images/logo.png',
            text: this.newMessage.text
          }
          this.saveMessage(msg)
          this.scrollToEnd()
        } else {
          this.$message.error('There was some error');
        }
        this.$refs.newMessageForm.resetFields();
      });
    },
  }
}
</script>
<style>

.el-row .msg-box .msg-col {
  margin-top: 10px;
}
</style>
