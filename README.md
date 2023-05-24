## 使用函数生成增删改查页面

### elementUi子模版类型
#### datepicker-template (日期选择器)
#### input-template (输入框)
#### radio-template (单选框)
#### select-template (下拉框)
#### table-column (表格列)

### 子模版参数
#### datepicker-template
- prop
- label
#### input-template
- prop
- label
#### radio-template
- prop
- label
- dict
#### select-template
- prop
- label
- dict
#### table-column
- prop
- label
- type

### 使用方法如下
> yarn add hy-template-gen 或者npm i hy-template-gen


#### 项目根目录新建文件gen.js
```
const servicePath = '/page/page'

// 参数
const params = {
  filterList: [{
    prop: 'catId',
    template: 'select-template',
    label: '品牌类型',
    dict: 'catId',
  }, {
    prop: 'name',
    template: 'input-template',
    label: '名称',
  }],
  permissionPath: 'cake-uncle:brand',
  tableColumns: [{
    prop: 'id',
    label: '品牌类型',
    template: 'table-column',
  },{
    prop: 'imagePath',
    label: '图片',
    template: 'table-column',
  },{
    prop: 'name',
    label: '名称',
    template: 'table-column',
  },{
    prop: 'catId',
    label: '品牌类型',
    template: 'table-column',
  },{
    prop: 'albumImagePath',
    label: '图片列表',
    template: 'table-column',
  }, {
    prop: 'description',
    label: '描述',
    template: 'table-column',
  },{
    prop: 'dgssId',
    label: '品牌类型',
    template: 'table-column',
  },{
    prop: 'shortDescription',
    label: '短描述',
    template: 'table-column',
  },],
  dataForm: ``,
  servicePath,
}

const addUpdateParams = {
  formList: [{
    prop: 'name',
    template: 'input-template',
    label: '姓名',
    required: true,
  }, {
    prop: 'name',
    template: 'select-template',
    label: '类型',
    dict: 'type',
  }],
  dataForm: '',
  dataRule: '',
  servicePath,
}

const path = './src/views/modules/cake-uncle'
const name = 'brand'

const { genorTable, genorAddUpdate } = require("hy-template-gen")

genorTable(path, name, params)
genorAddUpdate(path, name, addUpdateParams)
```

#### ps: 模板为人人框架的增删改查，而genorTable, genorAddUpdate 是生成人人框架的增删改查页面的, 如需自定义可通过replaceMatch, replaceList, getTemplateStr, writeVueFile这四个函数自行修改入口文件与模板，模板参数以#${keyName}的形式定义

#### 例如：
#### 在根目录创建gen.js，和templates目录
gen.js内容如下
```
const path = './test'
const name = 'test-list'

const { replaceMatch, replaceList, getTemplateStr, writeVueFile,  } = require("hy-template-gen")

const params = {
    content: [{
        aa: 'a组件，我是aa的值prop: name',
        bb: 'a组件，我是bb的值label: 名称',
        cc: 'a组件，我是cc的值',
        template: 'a',
    },{
        aa: 'a组件，我是aa的值',
        bb: 'a组件，我是bb的值',
        cc: 'a组件，我是cc的值',
        template: 'a',
    },{
        aa: 'b组件，我是aa的值',
        bb: 'b组件，我是bb的值',
        cc: 'b组件，我是cc的值',
        template: 'b',
    },],
    app: JSON.stringify({
        name: 'test',
    })
}

async function geror() {
    const all_template = await getTemplateStr("all.vue", __dirname)
    params.content = await replaceList(params.content, __dirname)

    const all_Str = replaceMatch(all_template, params)
    writeVueFile(path, name, all_Str)
}

geror()
```
#### 在目录中创建模板文件，例如
a.html
```
我是a,我是a的参数#${aa},我是a的参数#${bb},我是a的参数#${cc}
```
b.html
```
我是b,我是b的参数#${aa},我是b的参数#${bb},我是b的参数#${cc}
```
all.vue
```
<template>
    <div>
        <h1>{{app.name}}</h1>
        <p>#${content}</p>
    </div>
</template>

<script>
export default {
 data() {
    return {
        app: #${app}
    }
 }
}
</script>

<style>

</style>
```
运行gen.js，会在test目录下生成test-list.vue文件，内容入下
```
<template>
    <div>
        <h1>{{app.name}}</h1>
        <p></p>
    </div>
</template>

<script>
export default {
 data() {
    return {
        app: {"name":"test"}
    }
 }
}
</script>

<style>

</style>
```