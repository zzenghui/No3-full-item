<template>
  <div class="js-cursor-container">
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
              :rules="[
                { required: true, message: '格式不对', trigger: 'blur' },
              ]"
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
            <el-button
              type="primary"
              class="el-login-button"
              @click="submitForm"
              >登录</el-button
            >
            <!-- <el-button type="default" class="el-login-button" @click="gotoReg"
            >没有账号,前去注册</el-button
          > -->
          </el-form-item>
        </el-form>
      </div>
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

onMounted(() => {
  show();
  love()
});
//特效
function show() {
  (function fairyDustCursor() {
    var possibleColors = ["#D61C59", "#E7D84B", "#1B8798"];
    var width = window.innerWidth;
    var height = window.innerHeight;
    var cursor = { x: width / 2, y: width / 2 };
    var particles = [];

    function init() {
      bindEvents();
      loop();
    }

    function bindEvents() {
      document.addEventListener("mousemove", onMouseMove);
      window.addEventListener("resize", onWindowResize);
    }

    function onWindowResize(e) {
      width = window.innerWidth;
      height = window.innerHeight;
    }

    function onMouseMove(e) {
      cursor.x = e.clientX;
      cursor.y = e.clientY;

      addParticle(
        cursor.x,
        cursor.y,
        possibleColors[Math.floor(Math.random() * possibleColors.length)]
      );
    }

    function addParticle(x, y, color) {
      var particle = new Particle();
      particle.init(x, y, color);
      particles.push(particle);
    }

    function updateParticles() {
      for (var i = 0; i < particles.length; i++) {
        particles[i].update();
      }

      for (var i = particles.length - 1; i >= 0; i--) {
        if (particles[i].lifeSpan < 0) {
          particles[i].die();
          particles.splice(i, 1);
        }
      }
    }

    function loop() {
      requestAnimationFrame(loop);
      updateParticles();
    }

    function Particle() {
      this.character = "*";
      this.lifeSpan = 120; //ms
      this.initialStyles = {
        position: "fixed",
        display: "inline-block",
        top: "0px",
        left: "0px",
        pointerEvents: "none",
        "touch-action": "none",
        "z-index": "10000000",
        fontSize: "25px",
        "will-change": "transform",
      };

      // Init, and set properties
      this.init = function (x, y, color) {
        this.velocity = {
          x: (Math.random() < 0.5 ? -1 : 1) * (Math.random() / 2),
          y: 1,
        };

        this.position = { x: x + 10, y: y + 10 };
        this.initialStyles.color = color;

        this.element = document.createElement("span");
        this.element.innerHTML = this.character;
        applyProperties(this.element, this.initialStyles);
        this.update();

        document
          .querySelector(".js-cursor-container")
          .appendChild(this.element);
      };

      this.update = function () {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.lifeSpan--;

        this.element.style.transform =
          "translate3d(" +
          this.position.x +
          "px," +
          this.position.y +
          "px, 0) scale(" +
          this.lifeSpan / 120 +
          ")";
      };

      this.die = function () {
        this.element.parentNode.removeChild(this.element);
      };
    }

    function applyProperties(target, properties) {
      for (var key in properties) {
        target.style[key] = properties[key];
      }
    }

    if (!("ontouchstart" in window || navigator.msMaxTouchPoints)) init();
  })();
}
function love() {
  !(function (e, t, a) {
    function r() {
      for (var e = 0; e < s.length; e++)
        s[e].alpha <= 0
          ? (t.body.removeChild(s[e].el), s.splice(e, 1))
          : (s[e].y--,
            (s[e].scale += 0.004),
            (s[e].alpha -= 0.013),
            (s[e].el.style.cssText =
              "left:" +
              s[e].x +
              "px;top:" +
              s[e].y +
              "px;opacity:" +
              s[e].alpha +
              ";transform:scale(" +
              s[e].scale +
              "," +
              s[e].scale +
              ") rotate(45deg);background:" +
              s[e].color +
              ";z-index:99999"));
      requestAnimationFrame(r);
    }

    function n() {
      var t = "function" == typeof e.onclick && e.onclick;
      e.onclick = function (e) {
        t && t(), o(e);
      };
    }

    function o(e) {
      var a = t.createElement("div");
      (a.className = "heart"),
        s.push({
          el: a,
          x: e.clientX - 5,
          y: e.clientY - 5,
          scale: 1,
          alpha: 1,
          color: c(),
        }),
        t.body.appendChild(a);
    }

    function i(e) {
      var a = t.createElement("style");
      a.type = "text/css";
      try {
        a.appendChild(t.createTextNode(e));
      } catch (t) {
        a.styleSheet.cssText = e;
      }
      t.getElementsByTagName("head")[0].appendChild(a);
    }

    function c() {
      return (
        "rgb(" +
        ~~(255 * Math.random()) +
        "," +
        ~~(255 * Math.random()) +
        "," +
        ~~(255 * Math.random()) +
        ")"
      );
    }
    var s = [];
    (e.requestAnimationFrame =
      e.requestAnimationFrame ||
      e.webkitRequestAnimationFrame ||
      e.mozRequestAnimationFrame ||
      e.oRequestAnimationFrame ||
      e.msRequestAnimationFrame ||
      function (e) {
        setTimeout(e, 1e3 / 60);
      }),
      i(
        ".heart{width: 10px;height: 10px;position: fixed;background: #f00;transform: rotate(45deg);-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);}.heart:after,.heart:before{content: '';width: inherit;height: inherit;background: inherit;border-radius: 50%;-webkit-border-radius: 50%;-moz-border-radius: 50%;position: fixed;}.heart:after{top: -5px;}.heart:before{left: -5px;}"
      ),
      n(),
      r();
  })(window, document);
}
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