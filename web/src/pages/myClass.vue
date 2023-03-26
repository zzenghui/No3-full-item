<template>
  <div class="all">
    <div class="useTable">
      <el-button type="primary" class="btn" @click="dialogTableVisible = true"
        >新增班级</el-button
      >
      <el-input placeholder="请输入用户名查询" v-model="keyword"></el-input>
      <el-button type="primary" @click="searchclass">查询</el-button>
      <el-button type="primary" @click="getClassInfo">查看全部</el-button>
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
      <el-table-column property="classname" label="班级名称" width="150" />
      <el-table-column property="numberP" label="班级人数" width="150" />
      <el-table-column property="grade" label="年级" width="130" />
      <el-table-column property="subject" label="专业" width="130" />
      <el-table-column property="tname" label="班主任" width="180" />
      <el-table-column label="操作" width="220">
        <template #default="scope">
          <el-button
            size="small"
            @click="
              handleEdit(
                scope.row.classname,
                scope.row.grade,
                scope.row.subject
              )
            "
            >Edit</el-button
          >
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.row.id, scope.row.numberP)"
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
      <el-form-item label="班级名称" :label-width="formLabelWidth">
        <el-input v-model="classObj.classname" autocomplete="off" />
      </el-form-item>

      <el-form-item label="班级年级" :label-width="formLabelWidth">
        <el-select v-model="classObj.grade" placeholder="请输入班级年级">
          <el-option label="2019级" value="2019级" />
          <el-option label="2020级" value="2020级" />
          <el-option label="2021级" value="2021级" />
          <el-option label="2022级" value="2022级" />
        </el-select>
      </el-form-item>

      <el-form-item label="班级专业" :label-width="formLabelWidth">
        <el-input v-model="classObj.subject" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取消</el-button>
        <el-button type="primary" @click="addClassRoom"> 确认 </el-button>
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

  <!-- 修改的dialog -->
  <el-dialog v-model="dialogUpdateTableVisible" title="修改班级">
    <el-form>
      <el-form-item label="班级名称" :label-width="formLabelWidth">
        <el-input v-model="updateData.classname" autocomplete="off" disabled />
      </el-form-item>

      <el-form-item label="班级年级" :label-width="formLabelWidth">
        <el-select v-model="updateData.grade" placeholder="请输入班级年级">
          <el-option label="2019级" value="2019级" />
          <el-option label="2020级" value="2020级" />
          <el-option label="2021级" value="2021级" />
          <el-option label="2022级" value="2022级" />
        </el-select>
      </el-form-item>

      <el-form-item label="班级专业" :label-width="formLabelWidth">
        <el-input v-model="updateData.subject" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogUpdateTableVisible = false">取消</el-button>
        <el-button type="primary" @click="sureUpdate"> 确认 </el-button>
      </span>
    </template>
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
const dialogUpdateTableVisible = ref(false);
//班级数据
let tableData = ref([]);
//班级信息
let classObj = reactive({
  classname: "",
  tname: "",
  grade: "",
  subject: "",
});
onMounted(() => {
  getClassInfo();
});
//获取班级信息
async function getClassInfo() {
  let tid = JSON.parse(localStorage.getItem("user")).id;
  if (tid == 1) {
    //管理员的id
    let res = await proxy.$http({
      method: "post",
      url: "/classroom/adminGetClassInfo",
    });
    console.log(res);
    tableData.value = res.data;
  } else {
    //普通老师的id
    let res = await proxy.$http({
      method: "post",
      url: "/classroom/teacherGetClassInfo",
      data: { tid },
    });
    console.log(res);
    tableData.value = res.data;
  }
}
//添加班级
async function addClassRoom() {
  let admin = {
    classname: classObj.classname,
    numberP: 0,
    createtime: date(),
    tname: JSON.parse(localStorage.getItem("user")).username,
    tid: JSON.parse(localStorage.getItem("user")).id,
    grade: classObj.grade,
    subject: classObj.subject,
  };
  console.log(admin);

  let res = await proxy.$http({
    method: "post",
    url: "/classroom/addClassRoom",
    data: admin,
  });
  console.log(res);
  if (res.status == 0) {
    ElMessage({
      message: "添加成功",
      grouping: true,
      type: "success",
    });
    getClassInfo();
    dialogTableVisible.value = false;
  } else {
    ElMessage({
      message: res.message,
      grouping: true,
      type: "error",
    });
  }
}
//编辑
let updateData = reactive({
  classname: "",
  grade: "",
  subject: "",
});
function handleEdit(a, b, c) {
  dialogUpdateTableVisible.value = true;
  updateData.classname = a;
  updateData.grade = b;
  updateData.subject = c;
}
//确认修改
async function sureUpdate() {
  let res = await proxy.$http({
    method: "post",
    url: "/classroom/updateClass",
    data: updateData,
  });
  if (res.status == 0) {
    ElMessage({
      message: "修改成功",
      grouping: true,
      type: "success",
    });
    dialogUpdateTableVisible.value = false;
    getClassInfo();
  } else {
    ElMessage({
      message: "修改失败",
      grouping: true,
      type: "error",
    });
  }
}

//删除功能
let cid;
let numPs;
function handleDelete(id, numP) {
  centerDialogVisible.value = true;
  cid = id;
  numPs = numP;
}

//确定删除
async function surehandleDelete() {
  if (numPs == 0) {
    let res = await proxy.$http({
      method: "post",
      url: "/classroom/deleteClass",
      data: { id: cid },
    });
    if (res.status == 0) {
      centerDialogVisible.value = false;
      ElMessage({
        message: "删除成功",
        grouping: true,
        type: "success",
      });
      getClassInfo();
    } else {
      ElMessage({
        message: "删除失败",
        grouping: true,
        type: "error",
      });
    }
  } else {
    ElMessage({
      message: "此班级存在学生,无法强制删除",
      grouping: true,
      type: "error",
    });
    centerDialogVisible.value = false;
  }
}

//查询班级
let keyword = ref("");
async function searchclass() {
  let res = await proxy.$http({
    method: "post",
    url: "/classroom/searchClass",
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
      message: "未找到匹配的值",
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
  /* position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%); */
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