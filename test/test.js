const { replaceMatch, getTemplate, writeFile, getTemplates, replaceState } = require("../lib/genorator")

let options = {
 path: './test',
 name: 'supplier.vue',
 str: [{
  template: 'pages/params',
  templatePath: "", // 为空时使用项目提供的模板，填写时使用填写的模板文件夹路径
  params: {
   filterList: [{
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

genPage1()