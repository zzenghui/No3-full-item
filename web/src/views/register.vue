<template>
  <div class="reg-form">
    <loginParticle />
    <div class="form-reg animate__animated animate__zoomInDown">
      <el-form ref="ruleFormRef" status-icon label-width="70px">
        <el-form-item label="用户名" prop="username" class="label">
          <el-tooltip
            content="至少六位,包含字母,数字,下划线其中两种"
            placement="right"
            effect="light"
            trigger="click"
            class="label"
          >
            <el-input
              v-model="userInfos.username"
              class="el-input-reg"
              type="text"
              clearable="true"
            />
          </el-tooltip>
        </el-form-item>

        <el-form-item label="密码" prop="password" class="label">
          <el-tooltip
            content="至少六位,包含大小写字母,数字,下划线其中三种"
            placement="right"
            effect="light"
            trigger="click"
          >
            <el-input
              v-model="userInfos.password"
              class="el-input-reg"
              type="password"
              show-password="true"
              clearable="true"
            />
          </el-tooltip>
        </el-form-item>

        <el-form-item label="确认密码" prop="password" class="label">
          <el-input
            v-model="userInfos.SurePassword"
            class="el-input-reg"
            type="password"
            show-password="true"
            clearable="true"
          />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="register">注册</el-button>
          <el-button type="default" @click="gotoLogin"
            >已有帐号,前去登录</el-button
          >
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
import { ElMessage } from "element-plus";
import { nanoid } from "nanoid";
import Data from "../utils/data";

let { proxy } = getCurrentInstance();
let store = useStore();
let router = useRouter();

//用户信息
let userInfos = reactive({
  username: "",
  password: "",
  SurePassword: "",
});

//注册
async function register() {
  //正则
  let userReg = /^[\w-]{4,16}$/;
  let passReg =
    /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\W_!@#$%^&*`~()-+=]+$)(?![0-9\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\W_!@#$%^&*`~()-+=]/;

  //判断两次密码是否相同   正则
  if (
    userReg.test(userInfos.username) &&
    passReg.test(userInfos.password) &&
    userInfos.password == userInfos.SurePassword
  ) {
    let userInfo = {
      nanoid: nanoid(),
      username: userInfos.username,
      password: userInfos.password,
      createtime: Data(),
      avar:'https://gss0.baidu.com/-vo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/8b82b9014a90f60376baa9db3912b31bb051ed27.jpg'
    };
    let res = await proxy.$http({
      method: "post",
      url: "/users/api/register",
      data: userInfo,
    });

    if (res.status == 0) {
      ElMessage({
        message: "注册成功",
        grouping: true,
        type: "success",
      });
      setTimeout(() => {
        router.push({
          path: "/login",
        });
      }, 3000);
    } else {
      ElMessage({
        message: res.message,
        grouping: true,
        type: "error",
      });
    }
  } else {
    ElMessage({
      message: "账号或密码格式不正确",
      grouping: true,
      type: "error",
    });
  }
}

//前去登录
function gotoLogin() {
  router.push({
    path: "/login",
  });
}
</script>

<style>
.reg-form {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: black;
  background-image: url("../../public/assets/4.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  /* background-color: red; */
}
.el-input-reg {
  width: 300px;
  height: 40px;
}

.form-reg {
  display: flex;
  width: 450px;
  height: 250px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  padding: 20px;
  box-shadow: -30px -30px 30px #fff, 30px 30px 30px #fff;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* border-radius: 20px; */
  border-top-left-radius: 50px;
}
.label .el-form-item__label {
  color: #fff;
}
</style>