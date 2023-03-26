<template>
  <div class="all">
    <div class="useTable">
      <el-button type="primary" class="btn" @click="dialogTableVisible = true"
        >新增宿舍</el-button
      >
      <el-input placeholder="请输入宿舍名查询" v-model="keyword"></el-input>
      <el-button type="primary" @click="searchBedroom">查询</el-button>
      <el-button type="primary" @click="getBedroomInfo">查看全部</el-button>
    </div>

    <!-- 表格 -->
    <el-table
      ref="multipleTableRef"
      :data="tableData"
      @selection-change="handleSelectionChange"
      height="500"
    >
      <el-table-column type="selection" width="100" />
      <el-table-column label="创建时间" property="createtime" width="200">
      </el-table-column>
      <el-table-column property="bedroomname" label="宿舍号" width="150" />
      <el-table-column property="tname" label="负责管理员" width="150" />
      <el-table-column property="type" label="宿舍类型" width="130" />
      <el-table-column property="max" label="宿舍上限人数" width="130" />
      <el-table-column property="num" label="宿舍居住人数" width="130" />

      <el-table-column label="操作" width="220">
        <template #default="scope">
          <el-button
            size="small"
            @click="showStudent(scope.row.id, scope.row.num)"
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

    <!-- 分页 -->
    <el-pagination background layout="prev, pager, next" :total="100" />
  </div>

  <el-dialog v-model="dialogTableVisible" title="新增管理员">
    <el-form>
      <el-form-item label="宿舍楼号" :label-width="formLabelWidth">
        <el-select v-model="bedroomObj.louhao" placeholder="请输入宿舍楼号">
          <el-option
            v-for="(p, index) in 30"
            :key="index"
            :label="`${p > 10 ? p : '0' + p}栋`"
            :value="`${p > 10 ? p : '0' + p}`"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="宿舍楼层" :label-width="formLabelWidth">
        <el-select v-model="bedroomObj.louceng" placeholder="请输入宿舍楼层">
          <el-option
            v-for="(p, index) in 30"
            :key="index"
            :label="`${p > 10 ? p : '0' + p}楼`"
            :value="`${p > 10 ? p : '0' + p}`"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="宿舍号" :label-width="formLabelWidth">
        <el-select v-model="bedroomObj.hao" placeholder="请输入宿舍号">
          <el-option
            v-for="(p, index) in 30"
            :key="index"
            :label="`${p > 10 ? p : '0' + p}楼`"
            :value="`${p > 10 ? p : '0' + p}`"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="宿舍人数" :label-width="formLabelWidth">
        <el-input type="number" v-model="bedroomObj.max" autocomplete="off" />
      </el-form-item>

      <el-form-item label="宿舍类型" :label-width="formLabelWidth">
        <el-select v-model="bedroomObj.type" placeholder="请输入宿舍类型">
          <el-option label="男" value="男" />
          <el-option label="女" value="女" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取消</el-button>
        <el-button type="primary" @click="addBedroom"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>

  <!-- 删除的dialog -->
  <el-dialog v-model="centerDialogVisible" title="Warning" width="30%" center>
    <span> 删除后教室信息将全部删除,确定要删除么? </span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="centerDialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="surehandleDelete">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>

  <!-- 查看宿舍人数 -->
  <el-dialog v-model="dialogshowStudentTableVisible" title="宿舍人员">
    <el-table :data="gridData">
      <el-table-column property="username" label="姓名" width="200" />
      <el-table-column property="classname" label="班级" />
    </el-table>
  </el-dialog>
</template>

<script setup>
import { reactive, ref, getCurrentInstance, onMounted } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { nanoid } from "nanoid";
import date from "../utils/data";
let { proxy } = getCurrentInstance();

const dialogTableVisible = ref(false);
const formLabelWidth = "140px";
const centerDialogVisible = ref(false);
const dialogshowStudentTableVisible = ref(false);
//宿舍数据
let tableData = ref([]);

onMounted(() => {
  getBedroomInfo();
});

//获取宿舍信息
async function getBedroomInfo() {
  let id = JSON.parse(localStorage.getItem("user")).id;

  if (id == 1) {
    let res = await proxy.$http({
      method: "get",
      url: "/bedroom/getBedroom",
    });
    console.log(res.data);
    tableData.value = res.data;
  } else {
    let res = await proxy.$http({
      method: "post",
      url: "/bedroom/getAdminBedroom",
      data: { id },
    });
    tableData.value = res.data;
    console.log(res);
  }
}

//宿舍信息
let bedroomObj = reactive({
  louhao: "",
  louceng: "",
  hao: "",
  max: "",
  type: "",
});

//添加宿舍
async function addBedroom() {
  let bedroomObjInfo = {
    bedroomname: `${bedroomObj.louhao}#${bedroomObj.louceng}${bedroomObj.hao}`,
    max: bedroomObj.max,
    num: 0,
    type: bedroomObj.type,
    tid: JSON.parse(localStorage.getItem("user")).id,
    tname: JSON.parse(localStorage.getItem("user")).username,
    createtime: date(),
  };
  let res = await proxy.$http({
    method: "post",
    url: "/bedroom/addBedroom",
    data: bedroomObjInfo,
  });
  if (res.status == 0) {
    ElMessage({
      message: "添加成功",
      grouping: true,
      type: "success",
    });
    getBedroomInfo();
    dialogTableVisible.value = false;
  } else {
    ElMessage({
      message: "该宿舍已经创建",
      grouping: true,
      type: "error",
    });
  }
  console.log(res);
}

//宿舍没有重新编辑
//查看宿舍学生
const gridData = [
  {
    username: "John Smith",
    classname: "No.1518,  Jinshajiang Road, Putuo District",
  },
  {
    username: "John Smith",
    classname: "No.1518,  Jinshajiang Road, Putuo District",
  },
  {
    username: "John Smith",
    classname: "No.1518,  Jinshajiang Road, Putuo District",
  },
  {
    username: "John Smith",
    classname: "No.1518,  Jinshajiang Road, Putuo District",
  },
];

function showStudent(a, b) {
  //查找所有相同宿舍号的学生
  dialogshowStudentTableVisible.value = true;
}

//删除
let bid;
let bnum;
function deleteBedroom(id, num) {
  centerDialogVisible.value = true;
  bid = id;
  bnum = num;
}
//确认删除
async function surehandleDelete() {
  if (bnum > 0) {
    ElMessage({
      message: "该宿舍还存在学生,无法强制删除",
      grouping: true,
      type: "error",
    });
  } else {
    let obj = { bid };
    console.log(obj);
    let res = await proxy.$http({
      method: "post",
      url: "/bedroom/deleteBedroom",
      data: { bid },
    });
    if (res.status == 0) {
      ElMessage({
        message: "删除成功",
        grouping: true,
        type: "success",
      });
      getBedroomInfo();
      centerDialogVisible.value = false;
    }
  }
}

//查询功能
let keyword = ref("");
async function searchBedroom() {
  let res = await proxy.$http({
    method: "post",
    url: "/bedroom/searchBedroom",
    data: { keyword: keyword.value },
  });
  if (res.status == 0) {
    tableData.value = res.data;
    ElMessage({
      message: "查询成功",
      grouping: true,
      type: "success",
    });
  } else {
    ElMessage({
      message: res.message,
      grouping: true,
      type: "error",
    });
  }
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
</style>