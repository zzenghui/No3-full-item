<template>
  <div class="flex">
    <h1 class="title">XXXX管理系统</h1>
  </div>

  <div class="flex rela">
    <img
      :src="imgurl"
      alt=""
      @click="updateAvar = !updateAvar"
      class="smallimg"
    />
    <el-button type="danger" @click="centerDialogVisible = true"
      >退出登录</el-button
    >
    <!-- 更新信息 -->
    <div class="updateInfo" v-show="updateAvar">
      <label for="file">
        <img :src="imgurl" alt="" class="bigAvar" />
        <input
          ref="avar"
          type="file"
          style="display: none"
          id="file"
          @change="changeImg"
        />
      </label>

      <el-button type="primary" class="el-button-update" @click="Avar"
        >更新信息</el-button
      >
    </div>
  </div>

  <el-dialog
    v-model="centerDialogVisible"
    title="提示"
    width="30%"
    align-center
  >
    <span>确定要退出登陆么?</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="logout"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, shallowRef } from "vue";

import { getCurrentInstance } from "vue";

// this实例
let { proxy } = getCurrentInstance();

//更新盒子是否展示
let updateAvar = ref(false);

//显示退出
const centerDialogVisible = ref(false);

//图片路径
let imgurl = ref("http://localhost:8080/assets/header.jpg");

//图片前台更新
function changeImg() {
  let imgurlUpdate = proxy.$refs.avar.files[0].name;
  imgurlUpdate = "http://localhost:8080/assets/" + imgurlUpdate;
  imgurl.value = imgurlUpdate;
  console.log(imgurl);
}

//图片后台更新
async function Avar() {
  let Upavar = proxy.$refs.avar.files[0];
  let formData = new FormData();
  formData.append("fileName", Upavar);
  let { data } = await proxy.$http({
    method: "post",
    url: "http://localhost:3000/api/upload",
    data: formData,
    contentType: false,
    processData: false,
  });
  if (data.status == 0) {
    ElMessage({
      message: "更新成功",
      grouping: true,
      type: "success",
    });
    imgurl.value = data.data;
    updateAvar.value = false;
  }
}

//退出登录
function logout() {
  centerDialogVisible.value = false;
  localStorage.removeItem("token");
  ElMessage({
    message: "退出成功",
    grouping: true,
    type: "success",
  });
  setTimeout(() => {
    location.reload();
  }, 2000);
}
</script>

<style scoped>
.title {
  color: aliceblue;
}
.el-button {
  margin-right: 100px;
}
img {
  width: 80px;
  height: 80px;
  margin-left: 100px;
}
.avar {
  width: 200px;
}
.avar input {
  vertical-align: middle;
}

.flex .smallimg {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 20px;
}
.rela {
  position: relative;
}
.updateInfo {
  position: absolute;
  background-color: #fff;
  z-index: 999;
  width: 300px;
  height: 300px;
  top: 65px;
  text-align: center;
  box-shadow: 4px 4px 3px #ccc, -4px 3px #ccc;
}
.bigAvar {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin-left: 0 !important;
  border: 1px solid #ccc;
}
.el-button-update {
  margin-left: 100px;
  margin-top: 30px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>