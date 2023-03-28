<template>
  <div class="all">
    <div class="useTable">
      <div>
        <el-button type="primary" class="btn" @click="dialogTableVisible = true"
          >新增学生</el-button
        >
      </div>
      <div>
        <el-input placeholder="请输入用户名查询" v-model="keyword"></el-input>
        <el-button type="primary" @click="searchStu" :icon="Search"
          >查询</el-button
        >
        <el-button type="primary" @click="getStudetInfo">展示所有</el-button>
      </div>
    </div>

    <!-- 表格 -->
    <el-table
      ref="multipleTableRef"
      :data="tableData"
      @selection-change="handleSelectionChange"
      class="animate__animated animate__rotateInUpLeft"
      max-height="500px"
    >
      <el-table-column
        type="selection"
        width="100"
        align="center"
        fixed="left"
      />
      <el-table-column
        label="创建时间"
        property="createtime"
        width="250"
        align="center"
      >
      </el-table-column>
      <el-table-column
        property="username"
        label="用户名"
        width="200"
        align="center"
      />
      <el-table-column
        property="sno"
        label="学号"
        width="150"
        align="center"
        sortable
      />
      <el-table-column property="sex" label="性别" width="80" align="center" />
      <el-table-column
        property="dormitoryname"
        label="宿舍号"
        width="130"
        align="center"
      />
      <el-table-column
        property="classname"
        label="班级"
        width="200"
        align="center"
      />
      <el-table-column
        property="tname"
        label="班主任"
        width="150"
        align="center"
      />
      <el-table-column label="操作" width="220" align="center" fixed="right">
        <template #default="scope">
          <el-button
            size="small"
            type="primary"
            @click="updateStu(scope.row)"
            :icon="Edit"
          ></el-button>
          <el-button
            size="small"
            type="danger"
            :icon="Delete"
            @click="deleteStudent(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination background layout="prev, pager, next" :total="100" />
  </div>

  <el-dialog v-model="dialogTableVisible" title="新增学生">
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
            :label="`${item.bedroomname}一${item.type}寝`"
            :value="`${item.bedroomname}一${item.type}寝`"
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

  <!-- 删除确定框 -->
  <el-dialog v-model="centerDialogVisible" title="Warning" width="30%" center>
    <span> 删除后学生信息将全部删除,确定要删除么? </span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="centerDialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="surehandleDelete">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { Delete, Edit, Search } from "@element-plus/icons-vue";
import { reactive, ref, getCurrentInstance, onMounted, toRaw } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { nanoid } from "nanoid";
import date from "../utils/data";
let { proxy } = getCurrentInstance();
const dialogTableVisible = ref(false);
const formLabelWidth = "140px";
const centerDialogVisible = ref(false);
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
  let bedroomname = studentObj.dormitoryname.split("一");
  if (bedroomname[1][0] != studentObj.sex) {
    ElMessage({
      message: "寝室类型与该学生性别不匹配",
      grouping: true,
      type: "error",
    });
  } else {
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
      dormitoryname: bedroomname[0],
      tid: JSON.parse(localStorage.getItem("user")).id,
      tname: JSON.parse(localStorage.getItem("user")).username,
      state: "",
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
      getStudetInfo();
    } else {
      ElMessage({
        message: res.message,
        grouping: true,
        type: "error",
      });
    }
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
let obj = {};
function deleteStudent(a) {
  obj = a;
  centerDialogVisible.value = true;
}
async function surehandleDelete() {
  let stuInfo = toRaw(obj);
  let res = await proxy.$http({
    method: "post",
    url: "/users/deleteStu",
    data: stuInfo,
  });
  if (res.status == 0) {
    getStudetInfo();
    centerDialogVisible.value = false;
    ElMessage({
      message: "删除成功",
      grouping: true,
      type: "success",
    });
  }
}
//修改
function updateStu() {}
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