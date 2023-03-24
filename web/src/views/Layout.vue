<template>
  <div class="common-layout">
    <el-container>
      <el-header class="flex-lf">
        <Header :userInfo="userInfo" />
      </el-header>
      <el-container>
        <el-aside>
          <Nav />
        </el-aside>
        <router-view></router-view>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import Header from "@/components/Header";
import Nav from "@/components/Nav";
import {
  onMounted,
  getCurrentInstance,
  ref,
  reactive,
  onBeforeMount,
} from "vue";

//获取this实例
let { proxy } = getCurrentInstance();

//登陆后的用户名
let username = ref("");

//登陆后的用户信息
let userInfo = ref({});

onBeforeMount(async () => {
  //获取用户信息
  let res = await proxy.$http({
    method: "get",
    url: "/users/api/getinfo",
    headers: { Authorization: localStorage.getItem("token") },
  });

  userInfo.value = {...res.data};
  console.log(userInfo);
  if (res.status == 0) {
    username.value = res.data.username;
    // 登陆成功后的提示框
    ElNotification.success({
      title: `您好: ${username.value}`,
      message: "欢迎登录XXXX后台系统",
      showClose: false,
      duration: 2000,
      offset: 70,
    });
  }
});
</script>

<style scoped>
.el-header {
  width: 100%;
  height: 80px;
  background-color: #545c64;
}

.el-aside {
  width: 200px;
  height: 100%;
  background-color: #545c64;
}
.el-main {
  width: calc(100% - 200px);
  height: 100%;
  background-color: yellow;
}
.el-container {
  height: 100vh;
}
</style>