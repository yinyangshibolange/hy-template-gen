## 使用函数生成增删改查页面

本项目提供5个函数
- replaceMatch （填充模板）
参数：模板字符串，参数Object
- getTemplate, （获取模板字符串）
参数：模板名称，模板文件夹位置path
- writeFile, （写入文件）
参数：文件夹路径，文件名，保存内容
- getTemplates, （获取文件夹下所有模板文件）
参数：路径，第二层必须是文件夹列表，第三层才是模板文件列表
- replaceState（递归填充模板内容）
参数：options.str，options参考下面的写法



提供多个element模板
1. 组件模板
- components/datepicker
```vue
<el-form-item prop="#${prop}" label="#${label}">
      <el-date-picker
       v-model="dataForm.#${prop}"
      type="date"
      placeholder="请选择#${label}"
      value-format="yyyy-MM-dd">
    </el-date-picker>
</el-form-item>
```
- components/input
```vue
<el-form-item prop="#${prop}" label="#${label}">
<el-input
  v-model="dataForm.#${prop}"
  placeholder="请输入#${label}"
  clearable
></el-input>
</el-form-item>
```
- components/radio
```vue
<el-form-item prop="#${prop}" label="#${label}">
  <el-radio-group v-model="dataForm.#${prop}">
    <el-radio v-for="(item, index) in $getDictDataList('#${dict}')" :key="index" :label="item.dictValue">{{item.dictLabel}}</el-radio>
  </el-radio-group>
</el-form-item>
```
- components/select
```vue
<el-form-item prop="#${prop}" label="#${label}">
<el-select
  v-model="dataForm.#${prop}"
  placeholder="请选择#${label}"
  clearable
>
<el-option v-for="(item, index) in $getDictDataList('#${dict}')" :key="index" :label="item.dictLabel" :value="item.dictValue"></el-option>
</el-select>
</el-form-item>
```
- components/switch
```vue
<el-form-item prop="#${prop}" label="#${label}">
 <el-switch v-model="dataForm.#${prop}" :active-value="#${activeValue}" :inactive-value="#${inactiveValue}">
  </el-select>
</el-form-item>
```
- components/table-column-dict
```vue
<el-table-column type="#${type}" prop="#${prop}" label="#${label}" header-align="center" align="center">
 <template slot-scope="scope">
  {{ $getDictLabel(scope.row.#${prop}, '#${dict}') }}
 </template>
</el-table-column>
```
- components/table-column
```vue
<el-table-column type="#${type}" prop="#${prop}" label="#${label}" header-align="center" align="center">
</el-table-column>
```
- components/textarea
```vue
<el-form-item prop="#${prop}" label="#${label}">
 <el-input v-model="dataForm.#${prop}" placeholder="请输入#${label}" type="textarea" :rows="#${rows}" clearable></el-input>
</el-form-item>
```
2. 页面模板
- pages/params-add-or-update
- pages/params


## 如何使用
1. 例子1（递归填充内容）
```javascript

const { replaceMatch, getTemplate, writeFile, getTemplates, replaceState } = require("hy-template-gen")

let options = {
 path: './test',
 name: 'supplier.vue',
 str: [{
  template: 'pages/params',
  templatePath: "", // 为空时使用项目提供的模板，填写时使用填写的模板文件夹路径
  params: {
   filterList: [{ // params[key]为数组时表明这个填充的内容也是由模板生成的，这样就实现了模板递归填充
    template: 'components/input',
    params: {
     label: 'aX',
     prop: 'ab',
    }
   }, {
    template: 'components/input',
    params: {
     label: 'aw',
     prop: 'awafa',
    }
   },],
   permissionPath: 'supplier:supplier',
   tableColumns: [{
    template: 'components/table-column',
    params: {
     type: '',
     label: '',
     prop: '',
    }
   }],
   filename: 'supplier',
   servicePath: 'supplier/supplier',
   dataForm: JSON.stringify({
    id: "",
    type: "",
    name: "",
   })
  }

 }]
}

async function genPage1 () {
 options.str = await replaceState(options.str)
 writeFile(options.path, options.name, options.str)
}


```