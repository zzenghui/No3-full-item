<template>
  <div class="all">
    <div class="useTable">
      <div>
        <el-button type="primary" class="btn" @click="dialogTableVisible = true"
          >新增管理员</el-button
        >
      </div>
      <div>
        <el-input
          placeholder="请输入用户名查询"
          v-model="searchvalue"
        ></el-input>
        <el-button type="primary" @click="selectTeacher" :icon="Search"
          >查询</el-button
        >
        <el-button type="primary" @click="getTeacherInfo">显示全部</el-button>
      </div>
    </div>

    <!-- 表格 -->
    <el-table
      ref="multipleTableRef"
      :data="tableData"
      @selection-change="handleSelectionChange"
      class="animate__animated animate__bounceInLeft"
      max-height="500px"
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
        property="employeeId"
        label="职工号"
        width="150"
        align="center"
      />
      <el-table-column
        property="username"
        label="用户名"
        width="150"
        align="center"
      />

      <el-table-column property="age" label="年龄" width="130" align="center" />
      <el-table-column property="sex" label="性别" width="130" align="center" />
      <el-table-column
        property="Political"
        label="政治面貌"
        width="180"
        align="center"
      />

      <el-table-column label="操作" width="220" align="center">
        <template #default="scope">
          <el-button
            type="primary"
            :icon="Edit"
            size="small"
            @click="
              updateTeacher(
                scope.row.username,
                scope.row.age,
                scope.row.password,
                scope.row.Political,
                scope.row.employeeId,
                scope.row.sex
              )
            "
          ></el-button>
          <el-button
            size="small"
            type="danger"
            :icon="Delete"
            @click="
              handleDialog(
                scope.row.id,
                scope.row.classList,
                scope.row.bedroomList
              )
            "
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next" :total="1000" />
  </div>
  <!-- 新增管理员 -->
  <el-dialog v-model="dialogTableVisible" title="新增管理员">
    <el-form>
      <el-form-item label="用户名" :label-width="formLabelWidth">
        <el-tooltip
          content="用户名确定后将无法修改,请谨慎填写"
          placement="right"
          effect="light"
          trigger="click"
        >
          <el-input v-model="teacherObj.username" autocomplete="off" />
        </el-tooltip>
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
        <el-radio label="男">男</el-radio>
        <el-radio label="女">女</el-radio>
        <el-radio label="未知" disabled>未知</el-radio>
      </el-radio-group>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取消</el-button>
        <el-button type="primary" @click="addTeacher"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>

  <!-- 修改管理员 -->
  <el-dialog v-model="dialogTableUpdateVisible" title="修改管理员">
    <el-form>
      <el-form-item label="用户名" :label-width="formLabelWidth">
        <el-input
          v-model="updateteacherObj.username"
          autocomplete="off"
          disabled
        />
      </el-form-item>

      <el-form-item label="密码" :label-width="formLabelWidth">
        <el-input
          type="password"
          v-model="updateteacherObj.password"
          autocomplete="off"
        />
      </el-form-item>

      <el-form-item label="确认密码" :label-width="formLabelWidth">
        <el-input
          type="password"
          v-model="updateteacherObj.password"
          autocomplete="off"
        />
      </el-form-item>

      <el-form-item label="年龄" :label-width="formLabelWidth">
        <el-input
          type="number"
          v-model="updateteacherObj.age"
          autocomplete="off"
        />
      </el-form-item>

      <el-form-item label="职工号" :label-width="formLabelWidth">
        <el-input
          type="text"
          v-model="updateteacherObj.employeeId"
          autocomplete="off"
        />
      </el-form-item>

      <el-form-item label="政治面貌" :label-width="formLabelWidth">
        <el-select
          v-model="updateteacherObj.Political"
          placeholder="请输入政治面貌"
        >
          <el-option label="群众" value="群众" />
          <el-option label="共青团员" value="共青团员" />
          <el-option label="预备党员" value="预备党员" />
          <el-option label="党员" value="党员" />
        </el-select>
      </el-form-item>

      <el-radio-group v-model="updateteacherObj.sex">
        <el-radio label="男">男</el-radio>
        <el-radio label="女">女</el-radio>
        <el-radio label="未知" disabled>未知</el-radio>
      </el-radio-group>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogTableUpdateVisible = false">取消</el-button>
        <el-button type="primary" @click="sureUpdate"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>

  <!-- 确定删除对话框 -->
  <el-dialog v-model="centerDialogVisible" title="Warning" width="30%" center>
    <span> 删除后老师信息将全部删除,确定要删除么? </span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="centerDialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="deleteTeacherInfo">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { Delete, Edit, Search } from "@element-plus/icons-vue";
import Logo from "@/components/Logo";
import { reactive, ref, getCurrentInstance, onMounted } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { nanoid } from "nanoid";
import date from "../utils/data";
let { proxy } = getCurrentInstance();
const dialogTableUpdateVisible = ref(false);
const centerDialogVisible = ref(false);
const dialogTableVisible = ref(false);
const formLabelWidth = "140px";

onMounted(async () => {
  //获取老师数据
  getTeacherInfo();
});
//获取老师数据
async function getTeacherInfo() {
  let teacherInfoRes = await proxy.$http({
    method: "get",
    url: "/teacher/getTeacherInfo",
  });
  tableData.value = teacherInfoRes;
}
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
    headteacher: "",
    classname: "",
    dormitoryname: "",
    tid: 0,
    tname: "",
    state: "",
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
    getTeacherInfo();
  } else {
    ElMessage({
      message: res.message,
      grouping: true,
      type: "error",
    });
  }

  dialogTableVisible.value = false;
}
//处理删除弹出框
//接受删除老师信息
let id = "";
let classList = "";
let bedroomList = "";
function handleDialog(ids, classLists, bedroomLists) {
  centerDialogVisible.value = true;
  classList = classLists;
  bedroomList = bedroomLists;
  id = ids;
}
//删除老师数据
async function deleteTeacherInfo() {
  if (classList !== "[]" || bedroomList !== "[]") {
    ElMessage({
      message: "该管理员还有管理的班级或者寝室,无法删除",
      grouping: true,
      type: "error",
    });
  } else {
    let obj = {
      id,
      classList,
      bedroomList,
    };
    let deleteTeacherRes = await proxy.$http({
      method: "post",
      url: "/teacher/deleteTeacher",
      data: obj,
    });
    if (deleteTeacherRes.status == 0) {
      ElMessage({
        message: deleteTeacherRes.message,
        grouping: true,
        type: "success",
      });
      centerDialogVisible.value = false;
      getTeacherInfo();
    }
  }
}
//表格中老师数据
const tableData = ref([]);
//保存老师信息
let teacherObj = reactive({
  username: "",
  password: "",
  surePassword: "",
  age: "",
  sex: "",
  Political: "",
  employeeId: "",
});
//编辑老师信息
let updateteacherObj = reactive({
  username: "",
  password: "",
  age: "",
  employeeId: "",
  Political: "",
  sex: "",
});
//数据回显
function updateTeacher(a, b, c, d, e, f) {
  dialogTableUpdateVisible.value = true;
  updateteacherObj.username = a;
  updateteacherObj.age = b;
  updateteacherObj.password = c;
  updateteacherObj.Political = d;
  updateteacherObj.employeeId = e;
  updateteacherObj.sex = f;
}
//点击修改
async function sureUpdate() {
  let updateTeacherRes = await proxy.$http({
    method: "post",
    url: "/teacher/updateTeacher",
    data: updateteacherObj,
  });
  if (updateTeacherRes.status == 0) {
    ElMessage({
      message: updateTeacherRes.message,
      grouping: true,
      type: "success",
    });
    dialogTableUpdateVisible.value = false;
    getTeacherInfo();
  }
}
//查询
//查询关键字
let searchvalue = ref("");
async function selectTeacher() {
  let search = searchvalue.value;
  let keyword = { search };
  console.log(keyword);
  let searchRes = await proxy.$http({
    method: "post",
    url: "/teacher/searchTeacher",
    data: keyword,
  });
  console.log(searchRes.data);
  if (searchRes.status == 0) {
    ElMessage({
      message: "查询成功",
      grouping: true,
      type: "success",
    });
    tableData.value = searchRes.data;
  } else {
    ElMessage({
      message: searchRes.message,
      grouping: true,
      type: "error",
    });
  }
}
</script>

<style scoped>
.all {
  position: relative;
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
  width: 85% !important;

  /* margin-top: 150px; */
}

.el-pagination {
  /* display: block; */
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 20px;
  justify-self: flex-end;
}
/* .btn {
  margin-top: 100px;
  margin-left: 20px;
} */
.useTable {
  width: 85%;
  display: flex;
  width: 80%;
  margin: 0 auto;
  justify-content: space-between;
  margin: 30px 0;
}
</style>