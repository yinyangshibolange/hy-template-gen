<template>
  <el-card shadow="never" class="aui-card--fill">
    <div class="mod-sys__params">
      <el-form
        :inline="true"
        :model="dataForm"
        @keyup.enter.native="getDataList()"
      >
        <el-form-item prop="name" label="姓名">
<el-input
  v-model="dataForm.name"
  placeholder="请输入姓名"
  clearable
></el-input>
</el-form-item>
<el-form-item prop="name" label="类型">
<el-select
  v-model="dataForm.name"
  placeholder="请选择类型"
  clearable
>
<el-option v-for="(item, index) in $getDictDataList('type')" :key="index" :label="item.dictLabel" :value="item.dictValue"></el-option>
</el-select>
</el-form-item>
        <el-form-item>
          <el-button @click="getDataList()">{{ $t("query") }}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button
            v-if="$hasPermission('customers:custome-list:save')"
            type="primary"
            @click="addOrUpdateHandle()"
            >{{ $t("add") }}</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-button
            v-if="$hasPermission('customers:custome-list:delete')"
            type="danger"
            @click="deleteHandle()"
            >{{ $t("deleteBatch") }}</el-button
          >
        </el-form-item>
      </el-form>
      <el-table
        v-loading="dataListLoading"
        :data="dataList"
        border
        @selection-change="dataListSelectionChangeHandle"
        style="width: 100%"
      >
        <el-table-column
          type="selection"
          header-align="center"
          align="center"
          width="50"
        ></el-table-column>
        <el-table-column type="" prop="name" label="姓名" header-align="center" align="center">

</el-table-column>
<el-table-column type="" prop="type" label="类型" header-align="center" align="center">

</el-table-column>

        <el-table-column
          :label="$t('handle')"
          fixed="right"
          header-align="center"
          align="center"
          width="150"
        >
          <template slot-scope="scope">
            <el-button
              v-if="$hasPermission('customers:custome-list:update')"
              type="text"
              size="small"
              @click="addOrUpdateHandle(scope.row.id)"
              >{{ $t("update") }}</el-button
            >
            <el-button
              v-if="$hasPermission('customers:custome-list:delete')"
              type="text"
              size="small"
              @click="deleteHandle(scope.row.id)"
              >{{ $t("delete") }}</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="page"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="limit"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="pageSizeChangeHandle"
        @current-change="pageCurrentChangeHandle"
      >
      </el-pagination>
      <!-- 弹窗, 新增 / 修改 -->
      <add-or-update
        v-if="addOrUpdateVisible"
        ref="addOrUpdate"
        @refreshDataList="getDataList"
      ></add-or-update>
    </div>
  </el-card>
</template>

<script>
import mixinViewModule from "@/mixins/view-module";
import AddOrUpdate from "./test-list-add-or-update";
export default {
  mixins: [mixinViewModule],
  data() {
    return {
      mixinViewModuleOptions: {
        getDataListURL:  "/customer/customer/page",
        getDataListIsPage: true,
        deleteURL: "/customer/customer",
        deleteIsBatch: true,
      },
      dataForm: {"name":""}
    };
  },
  components: {
    AddOrUpdate,
  },
};
</script>
