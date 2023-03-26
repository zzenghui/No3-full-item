<template>
  <div class="all">
    <div class="useTable">
      <el-button type="primary" class="btn" @click="dialogTableVisible = true"
        >新增学生</el-button
      >
      <el-input placeholder="请输入用户名查询" v-model="keyword"></el-input>
      <el-button type="primary" @click="searchStu">查询</el-button>
      <el-button type="primary" @click="getStudetInfo">展示所有</el-button>
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
      <el-table-column property="sex" label="性别" width="80" />
      <el-table-column property="dormitoryname" label="宿舍号" width="130" />
      <el-table-column property="classname" label="班级" width="130" />
      <el-table-column property="tname" label="班主任" width="130" />
      <el-table-column label="操作" width="220">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.row.date)"
            >Edit</el-button
          >
          <el-button
            size="small"
            type="danger"
            @click="deleteStudent(scope.row)"
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
        <el-select
          v-model="studentObj.dormitoryname"
          placeholder="请输入宿舍号"
        >
          <el-option
            :label="`${item.bedroomname}`"
            :value="`${item.bedroomname}`"
            v-for="(item, index) in bedroomData"
            :key="index"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="学生班级" :label-width="formLabelWidth">
        <el-select v-model="studentObj.classname" placeholder="请输入班级">
          <el-option
            :label="`${item.classname}`"
            :value="`${item.classname}`"
            v-for="(item, index) in classData"
            :key="index"
          />
        </el-select>
      </el-form-item>

      <el-radio-group v-model="studentObj.sex">
        <el-radio label="男">男</el-radio>
        <el-radio label="女">女</el-radio>
        <el-radio label="未知" disabled>未知</el-radio>
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
import { reactive, ref, getCurrentInstance, onMounted, toRaw } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { nanoid } from "nanoid";
import date from "../utils/data";
let { proxy } = getCurrentInstance();

const dialogTableVisible = ref(false);
const formLabelWidth = "140px";

//学生数据
const tableData = ref([]);

//学生信息
let studentObj = reactive({
  sno: "",
  age: "",
  sex: "",
  Political: "",
  classname: "",
  dormitoryname: "",
});

onMounted(() => {
  getClassInfo();
  getBedroomInfo();
  getStudetInfo();
});

// 获取当前老师的学生信息;
async function getStudetInfo() {
  let id = JSON.parse(localStorage.getItem("user")).id;
  let res = await proxy.$http({
    method: "post",
    url: "/users/getStudent",
    data: { id },
  });
  tableData.value = res.data;
  console.log(res.data);
}

//获取当前老师的班级
let classData = ref([]);
async function getClassInfo() {
  let tid = JSON.parse(localStorage.getItem("user")).id;
  let res = await proxy.$http({
    method: "post",
    url: "/classroom/teacherGetClassInfo",
    data: { tid },
  });
  console.log(res);
  classData.value = res.data;
}

//获取当前老师的宿舍
let bedroomData = ref([]);
async function getBedroomInfo() {
  let id = JSON.parse(localStorage.getItem("user")).id;
  let res = await proxy.$http({
    method: "post",
    url: "/bedroom/getAdminBedroom",
    data: { id },
  });
  bedroomData.value = res.data;
}

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
    sno: studentObj.sno,
    employeeId: "",
    classList: "[]",
    Qualification: 0,
    bedroomList: "[]",
    headteacher: JSON.parse(localStorage.getItem("user")).username,
    classname: studentObj.classname,
    dormitoryname: studentObj.dormitoryname,
    tid: JSON.parse(localStorage.getItem("user")).id,
    tname: JSON.parse(localStorage.getItem("user")).username,
  };

  let res = await proxy.$http({
    method: "post",
    url: "http://localhost:3000/users/addStudent",
    data: admin,
  });
  if (res.status == 0) {
    dialogTableVisible.value = false;
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

  // //修改班级和寝室信息
  // let resBed = await proxy.$http({
  //   method: "post",
  //   url: "/bedroom/changenum",
  //   data: { bedName: admin.dormitoryname },
  // });
  // if (resBed.status == 0) {
  //   //修改教室信息
  //   let resClass = await proxy.$http({
  //     method: "post",
  //     url: "/classroom/changeClassNum",
  //     data: { classname: admin.classname },
  //   });
  //   console.log(resClass);
  //   let res = await proxy.$http({
  //     method: "post",
  //     url: "/users/api/register",
  //     data: admin,
  //   });

  //   if (res.status == 0) {
  //     ElMessage({
  //       message: "注册成功",
  //       grouping: true,
  //       type: "success",
  //     });
  //   } else {
  //     ElMessage({
  //       message: res.message,
  //       grouping: true,
  //       type: "error",
  //     });
  //   }

  //
  // } else {
  //   ElMessage({
  //     message: "该宿舍人数已满",
  //     grouping: true,
  //     type: "error",
  //   });
  // }
}

//查询
let keyword = ref("");
async function searchStu() {
  let res = await proxy.$http({
    method: "post",
    url: "/users/searchStu",
    data: {
      keyword: keyword.value,
      id: JSON.parse(localStorage.getItem("user")).id,
    },
  });
  if (res.status == 0) {
    ElMessage({
      message: "查询成功",
      grouping: true,
      type: "success",
    });
    tableData.value = res.data;
  } else {
    ElMessage({
      message: res.message,
      grouping: true,
      type: "error",
    });
  }
}

//删除
function deleteStudent(a) {
  let stuInfo = toRaw(a);
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