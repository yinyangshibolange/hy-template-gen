<template>
  <el-dialog
    :visible.sync="visible"
    :title="!dataForm.id ? $t('add') : $t('update')"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <el-form
      :model="dataForm"
      :rules="dataRule"
      ref="dataForm"
      @keyup.enter.native="dataFormSubmitHandle()"
      label-width="120px"
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
    </el-form>
    <template slot="footer">
      <el-button @click="visible = false">{{ $t("cancel") }}</el-button>
      <el-button type="primary" @click="dataFormSubmitHandle()">{{
        $t("confirm")
      }}</el-button>
    </template>
  </el-dialog>
</template>

<script>
import debounce from "lodash/debounce";
export default {
  data() {
    return {
      visible: false,
      dataForm: {},
    };
  },
  computed: {
    dataRule() {
      return {"name":[{"required":true,"message":"姓名不能为空","trigger":["blur","change"]}]}
      
    },
  },
  methods: {
    initForm() {
      this.dataForm = {"name":""}
    },
    init() {
      this.visible = true;
      this.$nextTick(() => {
        this.initForm()
        this.$refs["dataForm"].resetFields();
        if (this.dataForm.id) {
          this.getInfo();
        }
      });
    },
    // 获取信息
    getInfo() {
      this.$http
        .get(`/customer/customer/${this.dataForm.id}`)
        .then(({ data: res }) => {
          if (res.code !== 0) {
            return this.$message.error(res.msg);
          }
          this.dataForm = {
            ...this.dataForm,
            ...res.data,
          };
        })
        .catch(() => {});
    },
    // 表单提交
    dataFormSubmitHandle: debounce(
      function () {
        this.$refs["dataForm"].validate((valid) => {
          if (!valid) {
            return false;
          }
          this.$http[!this.dataForm.id ? "post" : "put"](
            "/customer/customer",
            this.dataForm
          )
            .then(({ data: res }) => {
              if (res.code !== 0) {
                return this.$message.error(res.msg);
              }
              this.$message({
                message: this.$t("prompt.success"),
                type: "success",
                duration: 500,
                onClose: () => {
                  this.visible = false;
                  this.$emit("refreshDataList");
                },
              });
            })
            .catch(() => {});
        });
      },
      1000,
      { leading: true, trailing: false }
    ),
  },
};
</script>
