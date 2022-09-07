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
const servicePath = '/customer/customer'

// 参数
const params = {
    filterList: [{
        prop: 'name',
        template: 'input-template',
        label: '姓名'
    }, {
        prop: 'name',
        template: 'select-template',
        label: '类型',
        dict: 'type',
    }],
    permissionPath: 'customers:custome-list',
    tableColumns: [{
        prop: 'name',
        label: '姓名',
        template: 'table-column',
    }, {
        prop: 'type',
        label: '类型',
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

const path = './test'
const name = 'test-list'

const { genorTable, genorAddUpdate } =require("./index")
const {params, addUpdateParams,}  = require("./genorator-config")

genorTable(path, name, params)
genorAddUpdate(path, name, addUpdateParams)
```

#### ps: 模板为人人框架的增删改查，而genorTable, genorAddUpdate 是生成人人框架的增删改查页面的, 如需自定义可通过replaceMatch, replaceList, getTemplateStr, writeVueFile这四个函数自行修改入口文件与模板，模板参数以#{keyName}的形式定义

#### 例如：
