<template>
  <div class="account">
    <div class="tong">
      <el-row :gutter="16">
        <el-col :span="8">
          <div class="statistic-card">
            <el-statistic :value="98500">
              <template #title>
                <div style="display: inline-flex; align-items: center">
                  Daily active users
                  <el-tooltip
                    effect="dark"
                    content="Number of users who logged into the product in one day"
                    placement="top"
                  >
                    <el-icon style="margin-left: 4px" :size="12">
                      <Warning />
                    </el-icon>
                  </el-tooltip>
                </div>
              </template>
            </el-statistic>
            <div class="statistic-footer">
              <div class="footer-item">
                <span>than yesterday</span>
                <span class="green">
                  24%
                  <el-icon>
                    <CaretTop />
                  </el-icon>
                </span>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="statistic-card">
            <el-statistic :value="693700">
              <template #title>
                <div style="display: inline-flex; align-items: center">
                  Monthly Active Users
                  <el-tooltip
                    effect="dark"
                    content="Number of users who logged into the product in one month"
                    placement="top"
                  >
                    <el-icon style="margin-left: 4px" :size="12">
                      <Warning />
                    </el-icon>
                  </el-tooltip>
                </div>
              </template>
            </el-statistic>
            <div class="statistic-footer">
              <div class="footer-item">
                <span>month on month</span>
                <span class="red">
                  12%
                  <el-icon>
                    <CaretBottom />
                  </el-icon>
                </span>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="statistic-card">
            <el-statistic :value="72000" title="New transactions today">
              <template #title>
                <div style="display: inline-flex; align-items: center">
                  New transactions today
                </div>
              </template>
            </el-statistic>
            <div class="statistic-footer">
              <div class="footer-item">
                <span>than yesterday</span>
                <span class="green">
                  16%
                  <el-icon>
                    <CaretTop />
                  </el-icon>
                </span>
              </div>
              <div class="footer-item">
                <el-icon :size="14">
                  <ArrowRight />
                </el-icon>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="line animate__animated animate__bounceInDown" ref="line"></div>
    <div class="pie animate__animated animate__bounceInUp" ref="pie"></div>
    <el-carousel :interval="3000" type="card" height="150px">
      <el-carousel-item>
        <el-descriptions class="margin-top" :column="3" :size="size" border>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <el-icon :style="iconStyle">
                  <user />
                </el-icon>
                Username
              </div>
            </template>
            kooriookami
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <el-icon :style="iconStyle">
                  <iphone />
                </el-icon>
                Telephone
              </div>
            </template>
            18100000000
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <el-icon :style="iconStyle">
                  <location />
                </el-icon>
                Place
              </div>
            </template>
            Suzhou
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <el-icon :style="iconStyle">
                  <tickets />
                </el-icon>
                Remarks
              </div>
            </template>
            <el-tag size="small">School</el-tag>
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <el-icon :style="iconStyle">
                  <office-building />
                </el-icon>
                Address
              </div>
            </template>
            No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province
          </el-descriptions-item>
        </el-descriptions>
      </el-carousel-item>
      <el-carousel-item>
        <el-descriptions class="margin-top" :column="3" :size="size" border>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <el-icon :style="iconStyle">
                  <user />
                </el-icon>
                Username
              </div>
            </template>
            kooriookami
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <el-icon :style="iconStyle">
                  <iphone />
                </el-icon>
                Telephone
              </div>
            </template>
            18100000000
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <el-icon :style="iconStyle">
                  <location />
                </el-icon>
                Place
              </div>
            </template>
            Suzhou
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <el-icon :style="iconStyle">
                  <tickets />
                </el-icon>
                Remarks
              </div>
            </template>
            <el-tag size="small">School</el-tag>
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <el-icon :style="iconStyle">
                  <office-building />
                </el-icon>
                Address
              </div>
            </template>
            No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province
          </el-descriptions-item>
        </el-descriptions>
      </el-carousel-item>
      <el-carousel-item>
        <el-descriptions class="margin-top" :column="3" :size="size" border>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <el-icon :style="iconStyle">
                  <user />
                </el-icon>
                Username
              </div>
            </template>
            kooriookami
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <el-icon :style="iconStyle">
                  <iphone />
                </el-icon>
                Telephone
              </div>
            </template>
            18100000000
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <el-icon :style="iconStyle">
                  <location />
                </el-icon>
                Place
              </div>
            </template>
            Suzhou
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <el-icon :style="iconStyle">
                  <tickets />
                </el-icon>
                Remarks
              </div>
            </template>
            <el-tag size="small">School</el-tag>
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <el-icon :style="iconStyle">
                  <office-building />
                </el-icon>
                Address
              </div>
            </template>
            No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province
          </el-descriptions-item>
        </el-descriptions>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script setup>
import { ref, getCurrentInstance, reactive, onMounted } from "vue";
import * as echarts from "echarts";

let { proxy } = getCurrentInstance();
const startTime = ref("");
const endTime = ref("");

onMounted(() => {
  // 折线图
  let myLineChart = echarts.init(proxy.$refs.line);

  let option = reactive({
    title: {
      text: "宿舍统计",
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["正常", "异常", "请假"],
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "正常",
        type: "line",
        data: [800, 700, 900, 850, 900, 860, 900],
      },
      {
        name: "异常",
        type: "line",
        data: [150, 100, 50, 100, 10, 40, 10],
      },
      {
        name: "请假",
        type: "line",
        data: [50, 200, 50, 50, 90, 100, 90],
      },
    ],
  });
  myLineChart.setOption(option);

  //饼状图
  let myPieChart = echarts.init(proxy.$refs.pie);
  let optionPie = reactive({
    title: {
      text: "查寝情况",
      subtext: "Fake Data",
      left: "center",
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "vertical",
      left: "left",
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: "50%",
        data: [
          { value: 1048, name: "正常" },
          { value: 135, name: "请假" },
          { value: 180, name: "夜不归宿" },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  });
  myPieChart.setOption(optionPie);
});
</script>

<style scoped>
.account {
  padding: 20px;
  width: 100%;
}
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}
.el-carousel {
  width: 100%;
}

.line {
  float: left;
  width: 700px;
  height: 300px;
  margin-top: 50px;
  margin-left: 100px;
}

.pie {
  float: left;
  width: 450px;
  height: 348px;
  margin-left: 150px;
  margin-top: 50px;
}
.tong {
  width: 80%;
  margin: 0 auto;
}
:global(h2#card-usage ~ .example .example-showcase) {
  background-color: var(--el-fill-color) !important;
}

.el-statistic {
  --el-statistic-content-font-size: 28px;
}

.statistic-card {
  height: 100%;
  padding: 20px;
  border-radius: 4px;
  background-color: var(--el-bg-color-overlay);
}

.statistic-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  font-size: 12px;
  color: var(--el-text-color-regular);
  margin-top: 16px;
}

.statistic-footer .footer-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.statistic-footer .footer-item span:last-child {
  display: inline-flex;
  align-items: center;
  margin-left: 4px;
}

.green {
  color: var(--el-color-success);
}
.red {
  color: var(--el-color-error);
}
</style>