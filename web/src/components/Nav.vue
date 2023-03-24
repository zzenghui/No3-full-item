<template>
  <el-menu background-color="#545C64" text-color="#fff" router="true">
    <el-sub-menu index="1">
      <template #title>
        <el-icon><User /></el-icon>
        <span>账号管理</span>
      </template>
      <el-menu-item index="account">用户账号列表</el-menu-item>
    </el-sub-menu>

    <el-sub-menu index="2">
      <template #title>
        <el-icon><EditPen /></el-icon>
        <span>角色管理</span>
      </template>
      <el-menu-item index="character">用户角色列表</el-menu-item>
    </el-sub-menu>

    <el-sub-menu index="3">
      <template #title>
        <el-icon><IceDrink /></el-icon>
        <span>商品管理</span>
      </template>
      <el-menu-item index="store">商品列表</el-menu-item>
    </el-sub-menu>

    <el-sub-menu index="4">
      <template #title>
        <el-icon><FolderChecked /></el-icon>
        <span>订单管理</span>
      </template>
      <el-menu-item index="orders">用户订单列表</el-menu-item>
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
// const handleOpen = (key: string, keyPath: string[]) => {
//   console.log(key, keyPath);
// };
// const handleClose = (key: string, keyPath: string[]) => {
//   console.log(key, keyPath);
// };
</script>

<style scoped>
.el-row {
  width: 100%;
  height: 100%;
}
</style>