<template>
  <div class="all">
    <!-- 表格 -->
    <el-table
      ref="multipleTableRef"
      :data="tableData"
      @selection-change="handleSelectionChange"
      height="500"
    >
      <el-table-column type="selection" width="100" align="center" />
      <el-table-column
        label="创建时间"
        property="createtime"
        width="200"
        align="center"
      >
      </el-table-column>
      <el-table-column
        property="bedroomname"
        label="宿舍号"
        width="150"
        align="center"
      />
      <el-table-column
        property="tname"
        label="负责管理员"
        width="150"
        align="center"
      />
      <el-table-column
        property="type"
        label="宿舍类型"
        width="130"
        align="center"
      />
      <el-table-column
        property="max"
        label="宿舍上限人数"
        width="130"
        align="center"
      />
      <el-table-column
        property="num"
        label="宿舍居住人数"
        width="130"
        align="center"
      />

      <el-table-column label="操作" width="220" align="center">
        <template #default="scope">
          <el-button size="small" @click="showStudent(scope.row.bedroomname)"
            >查看人员</el-button
          >
          <el-button
            size="small"
            type="danger"
            @click="deleteBedroom(scope.row.id, scope.row.num)"
            >Delete</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { reactive, ref, getCurrentInstance, onMounted } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
let { proxy } = getCurrentInstance();

const formLabelWidth = "140px";

//宿舍数据
let tableData = ref([]);

onMounted(() => {});
//获取宿舍信息
async function getBedroomInfo() {
  let id = JSON.parse(localStorage.getItem("user")).id;
  let res = await proxy.$http({
    method: "post",
    url: "/bedroom/getBedroomInfoAll",
  });
}
</script>

<style scoped>
.all {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  margin: 0 auto;
}
.el-button--text {
  margin-right: 15px;
}
.el-select {
  width: 300px;
}
.el-input {
  width: 300px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
.el-radio-group {
  margin-left: 140px;
  margin-bottom: 20px;
}

.el-table {
  width: 1300px !important;
  /* position: absolute;
  top: 60%;
  left: 55%;
  transform: translate(-50%, -50%); */
  width: 900px;
  /* margin-top: 150px; */
}

.el-pagination {
  /* display: block; */
  margin-top: 20px;
}
/* .btn {
  margin-top: 100px;
  margin-left: 20px;
} */
.useTable {
  margin-top: 80px;
  margin-left: 250px;
  margin-bottom: 30px;
  width: 100%;
}

.useTable .el-input {
  margin-left: 250px;
}

.el_table_num {
  width: 120% !important;
}
.el_table_item {
  width: 33% !important;
}
</style>