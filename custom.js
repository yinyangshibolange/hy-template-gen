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

function geror() {
    const all_template = getTemplateStr("all.vue", __dirname)
    params.content = replaceList(params.content)

    const all_Str = replaceMatch(all_template, params)
    writeVueFile(path, name, all_Str)
}

geror()
