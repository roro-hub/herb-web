<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
    <breadcrumb></breadcrumb>
    <el-divider class="right-divider2" direction="vertical"></el-divider>
    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <img class="user-avatar" :src="avatar">
        <i class="el-icon-caret-bottom"></i>
      </div>
      <el-dropdown-menu class="user-dropdown" slot="dropdown">
        <router-link class="inlineBlock" to="/">
          <el-dropdown-item>
            首页
          </el-dropdown-item>
        </router-link>
        <el-dropdown-item divided>
          <span @click="logout" style="display:block;">退出</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger';


export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'userId'
    ])
  },
  data() {
    return {
      alarmCount: 0
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
  .header-alert {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 275px;
    color: #606266;
    cursor: pointer;
    font-size: 14px;
    .num {
      position: absolute;
      color: #eee;
      top: 5px;
      right: -20px;
      min-width: 19px;
      height: 14px;
      line-height: 14px;
      font-size: 12px;
      font-weight: 500;
      text-align: center;
      padding: 0px 2px;
      background: rgb(255, 77, 79);
      border-radius: 8px;
      border-width: 1px;
      border-style: solid;
      border-color: rgba(255, 255, 255, 0.5);
      border-image: initial;
    }
  }
  .right-divider {
    position: absolute;
    right: 230px;
    top: 15px;
    height: 25px;
  }
  .right-divider2 {
    position: absolute;
    right: 90px;
    top: 15px;
    height: 25px;
  }
}
</style>

