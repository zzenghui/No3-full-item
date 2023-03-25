<template>
  <div class="all">
    <div class="useTable">
      <el-button type="primary" class="btn" @click="dialogTableVisible = true"
        >新增学生</el-button
      >
      <el-input placeholder="请输入用户名查询"></el-input>
      <el-button type="primary">查询</el-button>
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
      <el-table-column property="username" label="用户名" width="150" />
      <el-table-column property="sno" label="学号" width="150" />
      <el-table-column property="dormitoryId" label="宿舍号" width="130" />
      <el-table-column property="className" label="班级" width="130" />
      <el-table-column property="teacher" label="班主任" width="180" />
      <el-table-column label="操作" width="220">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.row.date)"
            >Edit</el-button
          >
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.row.date)"
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
      <el-form-item label="学号" :label-width="formLabelWidth">
        <el-input v-model="studentObj.sno" autocomplete="off" />
      </el-form-item>

      <el-form-item label="年龄" :label-width="formLabelWidth">
        <el-input type="number" v-model="studentObj.age" autocomplete="off" />
      </el-form-item>

      <el-form-item label="政治面貌" :label-width="formLabelWidth">
        <el-select v-model="studentObj.Political" placeholder="请输入政治面貌">
          <el-option label="群众" value="群众" />
          <el-option label="共青团员" value="共青团员" />
          <el-option label="预备党员" value="预备党员" />
          <el-option label="党员" value="党员" />
        </el-select>
      </el-form-item>

      <el-form-item label="宿舍分配" :label-width="formLabelWidth">
        <el-select v-model="studentObj.Political" placeholder="请输入宿舍号">
          <el-option label="宿舍1号" value="宿舍1号" />
          <el-option label="宿舍2号" value="宿舍2号" />
          <el-option label="宿舍3号" value="宿舍3号" />
          <el-option label="宿舍4号" value="宿舍4号" />
        </el-select>
      </el-form-item>

      <el-form-item label="学生班级" :label-width="formLabelWidth">
        <el-select v-model="studentObj.Political" placeholder="请输入宿舍号">
          <el-option label="宿舍1号" value="宿舍1号" />
          <el-option label="宿舍2号" value="宿舍2号" />
          <el-option label="宿舍3号" value="宿舍3号" />
          <el-option label="宿舍4号" value="宿舍4号" />
        </el-select>
      </el-form-item>

      <el-radio-group v-model="studentObj.sex">
        <el-radio :label="0">男</el-radio>
        <el-radio :label="1">女</el-radio>
        <el-radio :label="2" disabled>未知</el-radio>
      </el-radio-group>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取消</el-button>
        <el-button type="primary" @click="addStudent"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { reactive, ref, getCurrentInstance } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { nanoid } from "nanoid";
import date from "../utils/data";
let { proxy } = getCurrentInstance();

const dialogTableVisible = ref(false);
const formLabelWidth = "140px";

//学生数据
const tableData = [
  {
    createtime: "2023-01-22",
    sno: "123456",
    username: "zzh",
    dormitoryId: "宿舍一号",
    className: "2206班",
    teacher: "小刘",
  },
];

//学生信息
let studentObj = reactive({
  sno: "",
  age: "",
  sex: "",
  Political: "",
});

//添加学生
async function addStudent() {
  let admin = {
    nanoid: nanoid(),
    username: studentObj.sno,
    password: studentObj.sno,
    isAdmin: 0,
    isTeacher: 0,
    isStudent: 1,
    createtime: date(),
    avar: "https://gss0.baidu.com/-vo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/8b82b9014a90f60376baa9db3912b31bb051ed27.jpg",
    age: studentObj.age,
    sex: studentObj.sex,
    Political: studentObj.Political,
    dormitoryId: 0,
    classId: 0,
    sno: "",
    employeeId: "",
    classList: "[]",
    Qualification: 0,
    bedroomList: "[]",
  };
  console.log(admin);

  let res = await proxy.$http({
    method: "post",
    url: "/users/api/register",
    data: admin,
  });

  if (res.status == 0) {
    ElMessage({
      message: "注册成功",
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

  dialogTableVisible.value = false;
}

//编辑
function handleEdit(a) {
  alert(a);
}

//删除
function handleDelete() {
  alert(222);
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
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
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