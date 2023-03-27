<template>
  <!-- <three :top="250" /> -->
  <div class="js-cursor-container body">
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
// function shows() {
//   !(function () {
//     function n(n, e, t) {
//       return n.getAttribute(e) || t;
//     }

//     function e(n) {
//       return document.getElementsByTagName(n);
//     }

//     function t() {
//       var t = e("script"),
//         o = t.length,
//         i = t[o - 1];
//       return {
//         l: o,
//         z: n(i, "zIndex", -1),
//         o: n(i, "opacity", 0.5),
//         c: n(i, "color", "0,0,0"),
//         n: n(i, "count", 99),
//       };
//     }

//     function o() {
//       (a = m.width =
//         window.innerWidth ||
//         document.documentElement.clientWidth ||
//         document.body.clientWidth),
//         (c = m.height =
//           window.innerHeight ||
//           document.documentElement.clientHeight ||
//           document.body.clientHeight);
//     }

//     function i() {
//       r.clearRect(0, 0, a, c);
//       var n, e, t, o, m, l;
//       s.forEach(function (i, x) {
//         for (
//           i.x += i.xa,
//             i.y += i.ya,
//             i.xa *= i.x > a || i.x < 0 ? -1 : 1,
//             i.ya *= i.y > c || i.y < 0 ? -1 : 1,
//             r.fillRect(i.x - 0.5, i.y - 0.5, 1, 1),
//             e = x + 1;
//           e < u.length;
//           e++
//         )
//           (n = u[e]),
//             null !== n.x &&
//               null !== n.y &&
//               ((o = i.x - n.x),
//               (m = i.y - n.y),
//               (l = o * o + m * m),
//               l < n.max &&
//                 (n === y &&
//                   l >= n.max / 2 &&
//                   ((i.x -= 0.03 * o), (i.y -= 0.03 * m)),
//                 (t = (n.max - l) / n.max),
//                 r.beginPath(),
//                 (r.lineWidth = t / 2),
//                 (r.strokeStyle = "rgba(" + d.c + "," + (t + 0.2) + ")"),
//                 r.moveTo(i.x, i.y),
//                 r.lineTo(n.x, n.y),
//                 r.stroke()));
//       }),
//         x(i);
//     }

//     var a,
//       c,
//       u,
//       m = document.createElement("canvas"),
//       d = t(),
//       l = "c_n" + d.l,
//       r = m.getContext("2d"),
//       x =
//         window.requestAnimationFrame ||
//         window.webkitRequestAnimationFrame ||
//         window.mozRequestAnimationFrame ||
//         window.oRequestAnimationFrame ||
//         window.msRequestAnimationFrame ||
//         function (n) {
//           window.setTimeout(n, 1e3 / 45);
//         },
//       w = Math.random,
//       y = { x: null, y: null, max: 2e4 };
//     (m.id = l),
//       (m.style.cssText =
//         "position:fixed;top:0;left:0;z-index:" + d.z + ";opacity:" + d.o),
//       e("body")[0].appendChild(m),
//       o(),
//       (window.onresize = o),
//       (window.onmousemove = function (n) {
//         (n = n || window.event), (y.x = n.clientX), (y.y = n.clientY);
//       }),
//       (window.onmouseout = function () {
//         (y.x = null), (y.y = null);
//       });
//     for (var s = [], f = 0; d.n > f; f++) {
//       var h = w() * a,
//         g = w() * c,
//         v = 2 * w() - 1,
//         p = 2 * w() - 1;
//       s.push({ x: h, y: g, xa: v, ya: p, max: 6e3 });
//     }
//     (u = s.concat([y])),
//       setTimeout(function () {
//         i();
//       }, 100);
//   })();
// }
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
  love();
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
</style>