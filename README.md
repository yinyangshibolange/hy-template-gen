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
- components/input
- components/radio
- components/select
- components/switch
- components/table-column-dict
- components/table-column
- components/textarea
2. 页面模板
- pages/params-add-or-update
- pages/params


## 如何使用
1. 例子1（递归填充内容）
```javascript

const { replaceMatch, getTemplate, writeFile, getTemplates, replaceState } = require("../lib/genorator")

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