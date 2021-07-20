<template>
    <el-row type="flex" :justify=" isSelf === true?'end':'start' ">
      <el-col :span="2" v-if="!isSelf">
        <el-avatar :size="40"  @error="errorHandler">
          <img :src="message.avatar" :alt="message.alt">
        </el-avatar>
      </el-col >
      <el-col :span="16">
        <el-card class="content msg-bubble" :body-style="{ padding: '10px' }">
          <el-row type="flex" :justify=" isSelf === true?'end':'start' ">
            <el-col :span="6" class="title">
              <span class="author">{{ isSelf? "me": message.contact.username }}</span>.
              <time class="time msg-time">{{ formatTime(message.createdAt) }}</time>
            </el-col>
            <el-col>
                <p class="content">{{ message.msg }}</p>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  data () {
    return {}
  },
  props: {
    message: Object
  },
  computed: {
    ...mapGetters(["profile"]),
    isSelf(){
      return this.message.user.userID === this.profile.userID
    }
  },
  methods: {
    formatTime(time){
      // const nowTime = new Date()
      const date = new Date(time)
      const hour = date.getHours().toString().padStart(2, '0')
      const minute = date.getMinutes().toString().padStart(2, '0')
      return `${hour}:${minute}`
    },
    formatDateAndTime(time){
      const date = new Date(time)
      const year = date.getFullYear()
      const day = date.getDate().toString().padStart(2, '0')
      const mouth = (date.getMonth() + 1).toString().padStart(2, '0')
      const hour = date.getHours().toString().padStart(2, '0')
      const minute = date.getMinutes().toString().padStart(2, '0')
      return `${year}-${mouth}-${day} ${hour}:${minute}`
    },
    errorHandler() {
      return true
    }
  }
}
</script>

<style scoped>
.msg-time {
  font-size: x-small;
}
.row .msg-box img {
  height: 40px;
  width: 40px;
  margin: 10px;
}
.el-row .msg-bubble .title {
  font-size: x-small;
  color: #b4b0b0;
}
.el-row .msg-box .content {
  width: 100%;
  word-wrap: break-word;
  word-break: normal;
  text-align: justify;
  text-justify: inter-word;
}
</style>