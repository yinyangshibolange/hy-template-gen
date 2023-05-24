/**
 * @Description: 代码生成器,一键生成模板代码，解放双手
 * @author Hongyu
 * @date $date$
*/
const fs = require("fs/promises")
const path = require("path")
const readline = require("readline")


async function is_file (_path) {
    try {
        const stats = await fs.stat(_path)
        return stats.isFile()
    } catch (err) {
        return false
    }
}


async function is_dir (_path) {
    try {
        const stats = await fs.stat(_path)
        return stats.isDirectory()
    } catch (err) {
        return false
    }
}

function yesOrNo (text) {
    const rq = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })
    rq.on("close", function () {
        process.exit(0);
    })
    return new Promise((resolve, reject) => {
        rq.question(`${text}(y/n)`, function (answer) {
            if (answer.toLocaleLowerCase() === 'y') {
                resolve('yes')
            } else {
                reject('no')
            }
            // rq.close();
        })

    })
}


/**
 * 1.获取模板内容
 * @param {String} templateName 模板名称
 * @param {String} _path 模板文件夹位置，为空时读取项目自带模板
 * @returns
 */
async function getTemplate (templateName, _path) {
    const filePath = _path ? path.resolve(process.cwd(), _path, templateName) : path.resolve(__dirname, `../templates/${templateName}`)
    let isFile = await is_file(filePath)
    if (isFile) {
        try {
            return (await fs.readFile(filePath)).toString()
        } catch (err) {
            return Promise.reject(err)
        }
    } else {
        return Promise.reject("模板文件不存在，请检查文件路径")
    }

}

const matchRegg = /#\$\{(((?!#\$\{).)*)\}/g
const matchReg = /#\$\{(((?!#\$\{).)*)\}/
/**
 * 2.将模板文本替换成参数，单个模板替换
 * @param {String} oldStr 模板原文本
 * @param {Object} params 替换参数
 * @returns
 */
function replaceMatch (oldStr, params) {
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
 * 3.写入文件
 * @param {String} _path 路径
 * @param {String} name vue名称
 * @param {String} newFileStr 文件内容
 * @returns
 */
async function writeFile (_path, name, newFileStr) {
    let targetPath = path.resolve(process.cwd(), _path)
    const path_isdir = await is_dir(targetPath)
    if (!path_isdir) {
        try {
            await yesOrNo("是否写入到当前目录")
            targetPath = path.resolve(process.cwd())
        } catch (err) {
            rq.close()
        }
    }
    try {
        await fs.writeFile(path.resolve(targetPath, name), newFileStr)
        return "文件写入成功"
    } catch (err) {
        return Promise.reject(err)
    }
}

/**
 * 获取模板列表，两层模式，第一层为文件夹，第二层为模板文件
 * @param {*} _path 
 * @returns 
 */
async function getTemplates (_path) { 
    let templates = {}
    const template_path = _path ? path.resolve(process.cwd(), _path) : path.resolve(__dirname, `../templates`)
    const template_dirs = await fs.readdir(template_path)
    for (let dir of template_dirs) {
        const dir_path = path.resolve(template_path, dir)
        try {
            const _isdir = await is_dir(dir_path)
            if (_isdir) {
                templates[dir] = {}
                try {
                    const files = await fs.readdir(dir_path)
                    for (let file of files) {
                        try {
                            const isfile = await is_file(path.resolve(dir_path, file))
                            if (isfile) {
                                const filedata = await fs.readFile(path.resolve(dir_path, file))
                                templates[dir][file.replace("-template.html", "")] = filedata.toString()
                            }
                        } catch (err) {
                            console.log(err)
                        }

                    }
                } catch (err) {
                    console.log(err)
                }
            }
        } catch (err) {
            console.log(err)
        }
    }
    return templates
}

module.exports = {
    getTemplate,
    getTemplates,
    replaceMatch,
    writeFile,
}
