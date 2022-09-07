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


module.exports = {
    params, addUpdateParams,
}