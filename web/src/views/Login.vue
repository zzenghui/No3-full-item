<template>
  <div class="login_form">
    <loginParticle />
    <div class="form-log animate__animated animate__zoomInDown">
      <el-form ref="ruleFormRef" status-icon>
        <el-form-item
          label="用户名"
          prop="username"
          label-width="60px"
          class="label"
        >
          <el-input
            v-model="username"
            type="text"
            class="el-input-log"
            :rules="[{ required: true, message: '格式不对', trigger: 'blur' }]"
            autofocus
            clearable="true"
          />
        </el-form-item>

        <el-form-item
          label="密码"
          prop="password"
          label-width="60px"
          label-color="#fff"
          class="label"
        >
          <el-input
            v-model="password"
            class="el-input-log"
            type="password"
            show-password="true"
            clearable="true"
          />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" class="el-login-button" @click="submitForm"
            >登录</el-button
          >
          <!-- <el-button type="default" class="el-login-button" @click="gotoReg"
            >没有账号,前去注册</el-button
          > -->
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import loginParticle from "./loginParticle.vue";
import { onMounted, reactive, ref, getCurrentInstance } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

let store = useStore();
let router = useRouter();
let { proxy } = getCurrentInstance();

//收集用户名和密码
let username = ref("");
let password = ref("");

onMounted(() => {});

//登录提交
async function submitForm() {
  let userInfo = {
    username: username.value,
    password: password.value,
  };
  let res = await proxy.$http({
    method: "post",
    url: "/users/api/login",
    data: userInfo,
  });
  console.log(res);
  if (res.status == 0) {
    let token = res.token;
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(res.data));
    ElMessage({
      message: "登陆成功",
      grouping: true,
      type: "success",
    });

    setTimeout(() => {
      if (res.data.isTeacher == 1 || res.data.isAdmin == 1) {
        router.push({
          path: "/",
        });
      } else {
        router.push({
          path: "/student",
        });
      }
    }, 2000);
  } else {
    ElMessage({
      message: res.message,
      grouping: true,
      type: "error",
    });
  }
}

//前去注册
function gotoReg() {
  router.push({
    path: "/register",
  });
}
</script>

<style>
.login_form {
  width: 100vw;
  height: 100vh;
  background-image: url("../../public/assets/4.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  /* background-position: -150px 0; */
  overflow: hidden;
  /* background-color: red; */
}
.el-input-log {
  width: 300px;
  height: 40px;
}
.el-login-button {
  margin-left: 60px;
  margin-top: 30px;
}

.form-log {
  display: flex;
  width: 450px;
  height: 250px;
  padding-top: 50px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  box-shadow: -30px -30px 30px #fff, 30px 30px 30px #fff;
  border-top-left-radius: 50px;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* background-color: #fff; */
  /* background-color: rgba(255, 255, 255, 0.3); */
}
.label .el-form-item__label {
  color: #fff;
}
</style>