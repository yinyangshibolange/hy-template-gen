/**
 * @Description: 代码生成器,一键生成模板代码，解放双手
 * @author Hongyu
 * @date $date$
*/
const fs = require("fs")
const path = require("path")

/**
 * 异步读取文件
 * @param {String} path 文件路径
 * @returns
 */
function aReadFile(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, function (err, data) {
            if (err) {
                reject(err)
            } else {
                resolve(data.toString())
            }
        })
    })
}


/**
 * 获取模板内容
 * @param {String} templateName 模板名称
 * @returns
 */
async function getTemplateStr(templateName, _path) {
    const filePath = path.join(_path || __dirname, `templates/${templateName}`)
    return await aReadFile(filePath)
}

const matchRegg = /#\$\{(((?!#\$\{).)*)\}/g
const matchReg = /#\$\{(((?!#\$\{).)*)\}/
/**
 * 将模板文本替换成参数，单个模板替换
 * @param {String} oldStr 模板原文本
 * @param {Object} params 替换参数
 * @returns
 */
function replaceMatch(oldStr, params) {
    let tempStr = oldStr
    const matchResult = tempStr.match(matchRegg)
    matchResult && matchResult.forEach(item => {
        const key = item.match(matchReg)[1]
        const replaceReg = new RegExp(`#\\$\\{${key}\\}`, 'g')
        tempStr = tempStr.replace(replaceReg, params[key] || '')
    })
    return tempStr
}



/**
 * 生成模板列表
 * @param {*} list
 * @param {*} list中模板存在位置
 * @returns
 */
async function replaceList(list, _path) {
    let filterStr
    const filterStrList = []
    for (let i = 0; i < list.length; i++) {
        let item0 = list[i]
        try {
            filterStr = await getTemplateStr(item0.template + '.html',item0.templatePath || _path) // 子模板
            
            filterStrList.push(replaceMatch(filterStr, item0))
        } catch (err) {
            console.log(err)
            filterStr = ''
        }
    }

    return filterStrList.join('\r\n')
}

/**
 * 写入文件
 * @param {String} _path 路径
 * @param {String} name vue名称
 * @param {String} newFileStr 文件内容
 * @returns
 */
function writeVueFile(_path, name, newFileStr) {
    return new Promise((resolve, reject) => {
        const filePath = path.join(_path, `${name}.vue`)
        fs.writeFile(filePath, newFileStr, (err, res) => {
            if (err) {
                reject(err)
            } else {
                resolve(res)
            }
        })
    })
}

module.exports = {
    replaceMatch, replaceList, getTemplateStr, writeVueFile
}
