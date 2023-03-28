<template>
  <!-- <three :top="250" /> -->
  <div class="js-cursor-container body">
    <canvas id="canvas" />
    <div class="stars" ref="starsRef">
      <div class="star" v-for="(item, index) in starsCount" :key="index"></div>
    </div>
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
  </div>
</template>

<script setup>
import three from "@/components/three";
import Header from "@/components/Header";
import Nav from "@/components/Nav";
import { init } from "../utils/rain";
import loginParticle from "@/views/loginParticle";
import {
  onMounted,
  getCurrentInstance,
  ref,
  reactive,
  onBeforeMount,
} from "vue";

let ctx = {};

//获取this实例
let { proxy } = getCurrentInstance();

//登陆后的用户名
let username = ref("");

//登陆后的用户信息
let userInfo = ref({});

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

function note() {
  (function () {
    var a_idx = 0;
    window.onclick = function (event) {
      var a = new Array(
        "富强",
        "民主",
        "文明",
        "和谐",
        "自由",
        "平等",
        "公正",
        "法治",
        "爱国",
        "敬业",
        "诚信",
        "友善"
      );

      var heart = document.createElement("b"); //创建b元素
      heart.onselectstart = new Function("event.returnValue=false"); //防止拖动

      document.body.appendChild(heart).innerHTML = a[a_idx]; //将b元素添加到页面上
      a_idx = (a_idx + 1) % a.length;
      heart.style.cssText = "position: fixed;left:-100%;"; //给p元素设置样式

      var f = 16, // 字体大小
        x = event.clientX - f / 2, // 横坐标
        y = event.clientY - f, // 纵坐标
        c = randomColor(), // 随机颜色
        a = 1, // 透明度
        s = 1.2; // 放大缩小

      var timer = setInterval(function () {
        //添加定时器
        if (a <= 0) {
          document.body.removeChild(heart);
          clearInterval(timer);
        } else {
          heart.style.cssText =
            "font-size:16px;cursor: default;position: fixed;color:" +
            c +
            ";left:" +
            x +
            "px;top:" +
            y +
            "px;opacity:" +
            a +
            ";transform:scale(" +
            s +
            ");";

          y--;
          a -= 0.016;
          s += 0.002;
        }
      }, 15);
    };
    // 随机颜色
    function randomColor() {
      return (
        "rgb(" +
        ~~(Math.random() * 255) +
        "," +
        ~~(Math.random() * 255) +
        "," +
        ~~(Math.random() * 255) +
        ")"
      );
    }
  })();
}

let cxt = {};

function initCanvas() {
  const canvas = document.querySelector("#canvas");
  ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init(ctx);
}

let starsRef = ref(null);

onBeforeMount(async () => {
  //获取用户信息
  let res = await proxy.$http({
    method: "get",
    url: "/users/api/getinfo",
    headers: { Authorization: localStorage.getItem("token") },
  });

  userInfo.value = { ...res.data };
  console.log(userInfo);
  if (res.status == 0) {
    username.value = res.data.username;
    // 登陆成功后的提示框
    ElNotification.success({
      title: `您好: ${username.value}`,
      message: "欢迎登录校园宿舍后台系统",
      showClose: false,
      duration: 2000,
      offset: 70,
    });
  }
});

onMounted(() => {
  show();
  note();
  initCanvas();
  // love();
  // shows();
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

#canvas {
  position: absolute;
}
</style>