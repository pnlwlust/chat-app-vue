<template>
  <el-row>
    <el-col :span="6">
      <el-avatar :size="60" src="https://empty" @error="errorHandler">
        <img :src="profile.avatar" alt="profile avatar"/>
      </el-avatar>
    </el-col>
    <el-col class="profile-info-col" :span="18">
      <el-row :gutter="0" type="flex" align="middle">
        <el-col>
          <span class="profile-name">{{profile.name || profile.username}}</span>
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
</template>
<script>
import {mapGetters} from "vuex";

export default {
  data() {
    return {
      isActive: true,
    }
  },
  computed:{
    ...mapGetters(["profile"])
  },
  methods:{

    errorHandler() {
      return true
    },
  }
}
</script>
