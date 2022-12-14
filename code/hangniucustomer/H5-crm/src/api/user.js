import {post,get,request} from '@/config/index';

// 微信登录
// export async function wxLogin(data){
//     return await get('/xxx/login',data)
// }
// export async function wxLogin(data){
//     return await request('post','/xxx/login',data)
// }
   
// 登录发送验证码
export async function sendAuthSms(data){
    return await post('/v1_0/crm/member/sendAuthSms',data)
}

//验证码登录
export async function login(data){
    return await post('v1_0/crm/member/login',data)
}
//密码登录
export async function passwordLogin(data){
    return await post('v1_0/crm/member/passwordLogin',data)
}
//获取岗位，企业规模  //获得新增客户下拉数据(公司地址)
export async function classifyIndex(data){
    return await get('v1_0/crm/classify/index',data)
}
//基本资料提交
export async function staffEdit(data){
    return await post('v1_0/crm/staff/edit',data)
}
//未分配客户列表
export async function noDistributionCustomer(data){
    return await get('v1_0/crm/sale/noDistributionCustomer',data)
}

//获得销售下拉数据
export async function getAllSale(data){
    return await get('v1_0/crm/sale/getAllSale',data)
}

//今日跟进
export async function todayFollow(data){
    return await get('v1_0/crm/sale/todayFollow',data)
}
//本月成交
export async function monthDeal(data){
    return await get('v1_0/crm/sale/monthDeal',data)
}
//新增客户
export async function customerAdd(data){
    return await post('v1_0/crm/customer/add',data)
}

//销售动态
export async function SalesTrend(data){
    return await get('v1_0/crm/sale/SalesTrend',data)
}
//正在跟进(所有)
export async function followCustomer(data){
    return await get('v1_0/crm/sale/followCustomer',data)
}

//成交客户
export async function dealCustomer(data){
    return await get('v1_0/crm/sale/dealCustomer',data)
}
//全部日程
export async function getAllSchedules(data){
    return await get('v1_0/crm/sale/getAllSchedules',data)
}
//分配销售
export async function distributionCustomer(data){
    return await post('v1_0/crm/sale/distributionCustomer',data)
}
//客户资源列表
export async function getBlindseaoutCustomerList(data){
    return await post('v1_0/crm/customer/getBlindseaoutCustomerList',data)
}
//获取客户详情
export async function customerShow(data){
    return await get('v1_0/crm/customer/show',data)
}
//添加沟通记录
export async function addCrmRecord(data){
    return await post('v1_0/crm/customer/addCrmRecord',data)
}
//下拉数据值(添加沟通记录)
export async function addClassifyindex(data){
    return await get('v1_0/crm/classify/index',data)
}
//所属客户
export async function getAllCustomer(data){
    return await get('v1_0/crm/sale/getAllCustomer',data)
}
//员工详情
export async function staffShow(data){
    return await get('v1_0/crm/staff/show',data)
}
//今日待办
export async function todayNoFollow(data){
    return await get('v1_0/crm/sale/todayNoFollow',data)
}
//编辑(基本资料获取)
export async function staffUpdata(data){
    return await get('v1_0/crm/staff/edit',data)
}
//获取我的基本信息
export async function getUser(data){
    return await get('v1_0/crm/member/getUser',data)
}
//获取我的基本信息
export async function staffList(data){
    return await get('v1_0/crm/staff/index',data)
}
//创建员工
export async function addStaff(data){
    return await post('v1_0/crm/staff/add',data)
}
//编辑员工
export async function basicStaff(data){
    return await get('v1_0/crm/staff/basic',data)
}
//编辑员工提交
export async function editstaff(data){
    return await post('v1_0/crm/staff/basic',data)
}
//删除员工提交
export async function deletestaff(data){
    return await post('v1_0/crm/staff/delete',data)
}
//工作台
export async function memberIndex(data){
    return await get('/v1_0/crm/member/index',data)
}
//工作台(新增客户)
export async function getAddCustomer(data){
    return await get('/v1_0/crm/sale/getAddCustomer',data)
}


//员工接口
//删除所属客户接口
export async function deleteCustomer(data){
    return await get('/v1_0/crm/customer/delete',data)
}
// 正在跟进(员工)
export async function saleFollowCustomer(data){
    return await get('/v1_0/crm/sale/saleFollowCustomer',data)
}

//注册
export async function register(data){
    return await post('/v1_0/crm/member/register',data)
}

//支付
export async function payr(data){
    return await post('/v1_0/company/service/payr',data)
}

// 文件上传
export async function customerimport(data){
    return await post('/v1_0/crm/customer/import',data)
}
