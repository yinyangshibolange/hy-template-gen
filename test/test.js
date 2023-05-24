const {replaceMatch,   writeFile, getTemplates } = require("../lib/genorator")


async function genPage1() {
 const templates = await getTemplates()
 const filterList = []
 const rdata = replaceMatch(templates.components.input, {
  prop: 'prop',
  label: '拉贝'
 })
 console.log(rdata)
}

genPage1()