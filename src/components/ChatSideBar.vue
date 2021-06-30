<template>
  <el-container >
    <el-row>
      <el-col>
        <el-row>
          <el-col :span="6">
            <el-avatar :size="60" src="https://empty" @error="errorHandler">
              <img :src="profile.avatar" alt="profile avatar"/>
            </el-avatar>
          </el-col>
          <el-col class="profile-info-col" :span="18">
            <el-row gutter="0" type="flex" align="middle">
              <el-col>
                <span class="profile-name">{{profile.name}}</span>
              </el-col>
              <el-col></el-col>
              <el-col>
                <el-tooltip content="swith to turn offline" placement="end">
                <el-switch
                    v-model="isActive"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                />
                </el-tooltip>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-divider></el-divider>
      </el-col>
      <el-col>
        <el-scrollbar id="scrollbar" height="400px" width="10px" >
          <div v-for="(item, index) in personInfo" :key="index">
            <PersonInfoBar :value="item"/>
          </div>
        </el-scrollbar>
      </el-col>
    </el-row>
  </el-container>
</template>

<script>
import PersonInfoBar from "./PersonInfoBar";

export default {
  name: 'ChatSideBar',
  components: {PersonInfoBar},
  data() {
    return {
      isActive: true,
      profile:{name:"profile name", avatar:"../assets/images/logo.png"},
      personInfo:[{name:'person name', avatar:'../assets/images/male-profile-80.png', alt:'contacts profile avatar'},
        {name:'person one', avatar:'../assets/images/female-profile-80.png', alt:'contacts profile avatar', lastmsg:'how are you'},
        {name:'person two', avatar:'../assets/images/male-profile-80.png', alt:'contacts profile avatar', lastmsg:'this is a nice place'},
        {name:'person three', avatar:'../assets/images/female-profile-80.png', alt:'contacts profile avatar', lastmsg:'what a day'},
        {name:'person four', avatar:'../assets/images/female-profile-80.png', alt:'contacts profile avatar', lastmsg:'I am goint out'},
        {name:'person fivw', avatar:'../assets/images/female-profile-80.png', alt:'contacts profile avatar', lastmsg:'its raining'},
        {name:'person six', avatar:'../assets/images/female-profile-80.png', alt:'contacts profile avatar', lastmsg:'are you coming today?'}
      ]
    }
  },
  methods: {
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
</style>