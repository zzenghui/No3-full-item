<template>
  <el-menu background-color="#545C64" text-color="#fff" router="true">
    <el-sub-menu index="1">
      <template #title>
        <el-icon><Notebook /></el-icon>
        <span>首页</span>
      </template>
      <el-menu-item index="index"
        ><el-icon><House /></el-icon>首页展示</el-menu-item
      >
      <el-menu-item
        index="teacher"
        :disabled="isShowTeacher == 1 ? false : true"
        ><el-icon><Service /></el-icon>管理员列表</el-menu-item
      >
    </el-sub-menu>

    <el-sub-menu index="2">
      <template #title>
        <el-icon><UserFilled /></el-icon>
        <span>我的日常</span>
      </template>
      <el-menu-item index="mystudent"
        ><el-icon><Avatar /></el-icon>我的学生</el-menu-item
      >
      <el-menu-item index="myclass"
        ><el-icon><DataLine /></el-icon>我的班级</el-menu-item
      >
      <el-menu-item index="bedroom"
        ><el-icon><Bowl /></el-icon>我的寝室</el-menu-item
      >
      <el-menu-item index="checkgather"
        ><el-icon><Calendar /></el-icon>查寝汇总</el-menu-item
      >
      <el-menu-item index="checkinfo"
        ><el-icon><CollectionTag /></el-icon>查寝信息</el-menu-item
      >
    </el-sub-menu>

    <el-sub-menu index="3">
      <template #title>
        <el-icon><MoonNight /></el-icon>
        <span>宿舍管理</span>
      </template>
      <el-menu-item index="affairs"><el-icon><Camera /></el-icon>内务管理</el-menu-item>
      <el-menu-item index="checkAffairs"><el-icon><Headset /></el-icon>检查内务</el-menu-item>
    </el-sub-menu>

    <el-sub-menu index="4">
      <template #title>
        <el-icon><Bicycle /></el-icon>
        <span>实习管理</span>
      </template>
      <el-menu-item index="practice"><el-icon><Smoking /></el-icon>学生实习管理</el-menu-item>
    </el-sub-menu>

    <el-sub-menu index="5">
      <template #title>
        <el-icon><Monitor /></el-icon>
        <span>系统管理</span>
      </template>
      <el-menu-item index="system"> <el-icon><Lollipop /></el-icon>学生系统管理</el-menu-item>
    </el-sub-menu>

    <el-sub-menu index="6">
      <template #title>
        <el-icon><VideoCamera /></el-icon>
        <span>监控管理</span>
      </template>
      <el-menu-item index="supervisory"> <el-icon><TakeawayBox /></el-icon>学生监控管理</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script setup>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from "@element-plus/icons-vue";
import { ref } from "vue";
// const handleOpen = (key: string, keyPath: string[]) => {
//   console.log(key, keyPath);
// };
// const handleClose = (key: string, keyPath: string[]) => {
//   console.log(key, keyPath);
// };

let isShowTeacher = JSON.parse(localStorage.getItem("user")).isAdmin;
console.log(isShowTeacher);
</script>

<style scoped>
.el-row {
  width: 100%;
  height: 100%;
}
</style>