<template>
  <div class="all">
    <div class="useTable">
      <el-button type="primary" class="btn" @click="dialogTableVisible = true"
        >新增管理员</el-button
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

      <el-table-column property="employeeId" label="职工号" width="150" />
      <el-table-column property="username" label="用户名" width="150" />

      <el-table-column property="age" label="年龄" width="130" />
      <el-table-column property="sex" label="性别" width="130" />
      <el-table-column property="Political" label="政治面貌" width="180" />

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
    <el-pagination background layout="prev, pager, next" :total="1000" />
  </div>

  <el-dialog v-model="dialogTableVisible" title="新增管理员">
    <el-form>
      <el-form-item label="用户名" :label-width="formLabelWidth">
        <el-input v-model="teacherObj.username" autocomplete="off" />
      </el-form-item>

      <el-form-item label="密码" :label-width="formLabelWidth">
        <el-input
          type="password"
          v-model="teacherObj.password"
          autocomplete="off"
        />
      </el-form-item>

      <el-form-item label="确认密码" :label-width="formLabelWidth">
        <el-input
          type="password"
          v-model="teacherObj.surePassword"
          autocomplete="off"
        />
      </el-form-item>

      <el-form-item label="年龄" :label-width="formLabelWidth">
        <el-input type="number" v-model="teacherObj.age" autocomplete="off" />
      </el-form-item>

      <el-form-item label="职工号" :label-width="formLabelWidth">
        <el-input
          type="text"
          v-model="teacherObj.employeeId"
          autocomplete="off"
        />
      </el-form-item>

      <el-form-item label="政治面貌" :label-width="formLabelWidth">
        <el-select v-model="teacherObj.Political" placeholder="请输入政治面貌">
          <el-option label="群众" value="群众" />
          <el-option label="共青团员" value="共青团员" />
          <el-option label="预备党员" value="预备党员" />
          <el-option label="党员" value="党员" />
        </el-select>
      </el-form-item>

      <el-radio-group v-model="teacherObj.sex">
        <el-radio :label="0">男</el-radio>
        <el-radio :label="1">女</el-radio>
        <el-radio :label="2" disabled>未知</el-radio>
      </el-radio-group>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取消</el-button>
        <el-button type="primary" @click="addTeacher"> 确认 </el-button>
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

//老师数据
const tableData = [
  {
    username: "小刘",
    age: 18,
    sex: 0,
    employeeId: "126456",
    Political: "共青团员",
    createtime: "2022-12-11",
  },
];

//老师信息
let teacherObj = reactive({
  username: "",
  password: "",
  surePassword: "",
  age: "",
  sex: "",
  Political: "",
  employeeId: "",
});
//添加老师
async function addTeacher() {
  let admin = {
    nanoid: nanoid(),
    username: teacherObj.username,
    password: teacherObj.password,
    isAdmin: 0,
    isTeacher: 1,
    isStudent: 0,
    createtime: date(),
    avar: "https://gss0.baidu.com/-vo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/8b82b9014a90f60376baa9db3912b31bb051ed27.jpg",
    age: teacherObj.age,
    sex: teacherObj.sex,
    Political: teacherObj.Political,
    dormitoryId: 0,
    classId: 0,
    sno: "",
    employeeId: teacherObj.employeeId,
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