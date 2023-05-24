const { replaceMatch, replaceList, getTemplateStr, writeVueFile } = require('./lib/genorator.js')


/**
 * 生成人人框架的增删改查页面
 * @param {*} path 文件路径，调用位置为基
 * @param {*} name 文件名称
 * @param {*} params 参数
 * @returns
 */
async function genorTable(path, name, params, dir) {
    // 生成筛选dom
    const filterListResult = await replaceList(params.filterList, dir)
    const filterList = params.filterList
    params.filterList = filterListResult

    // 生成el-table-column dom
    const tableColumns = await replaceList(params.tableColumns, dir)
    params.tableColumns = tableColumns


    // 生成dataForm对象
    const dataForm = {}
    filterList.forEach(item => {
        dataForm[item.prop] = ''
    })
    params.dataForm = JSON.stringify(dataForm)
    params.filename = name
    // 生成params.vue页面
    const paramsTemplateStr = await getTemplateStr("params.vue", dir)
    const result = replaceMatch(paramsTemplateStr, params)

    await writeVueFile(path, name, result)
    return result
}

/**
 *
 * @param {*} path 文件路径，调用位置为基
 * @param {*} name 文件名称
 * @param {*} addUpdateParams 参数
 * @returns
 */
async function genorAddUpdate(path, name, addUpdateParams, dir) {
    // 生成表单dom
    const filterListResult = await replaceList(addUpdateParams.formList, dir)
    const filterList = addUpdateParams.formList
    addUpdateParams.formList = filterListResult

    const dataForm = {}
    const dataRule = {}
    filterList.forEach(item => {
        dataForm[item.prop] = ''

        if (item.required) {
            dataRule[item.prop] = [
                { required: true, message: `${item.label}不能为空`, trigger: ['blur', 'change'] }
            ]
        }
    })
    addUpdateParams.dataForm = JSON.stringify(dataForm)
    addUpdateParams.dataRule = JSON.stringify(dataRule)

    const paramsTemplateStr = await getTemplateStr("params-add-or-update.vue", dir)
    const result = replaceMatch(paramsTemplateStr, addUpdateParams)
    await writeVueFile(path, `${name}-add-or-update`, result)
    return result
}

const defaultConfig = require("./genorator-config")

module.exports = { replaceMatch, replaceList, getTemplateStr, writeVueFile, genorTable, genorAddUpdate, defaultConfig }
