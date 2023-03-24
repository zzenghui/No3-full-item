 <template>
  <router-view></router-view>
</template>

<script setup>

</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.flex {
  display: flex;
  align-items: center;
}
.flex-lf {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* 隐藏滚动条 */
::-webkit-scrollbar {
  display: none;
  width: 0 !important;
  height: 0 !important;
  -webkit-appearance: none;
  background: transparent;
  color: transparent;
}
</style>