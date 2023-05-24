const path = './test'
const name = 'test-list'

const { genorTable, genorAddUpdate } =require("./app")
const {params, addUpdateParams,}  = require("./genorator-config")

genorTable(path, name, params)
genorAddUpdate(path, name, addUpdateParams)