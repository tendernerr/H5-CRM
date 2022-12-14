import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/workbench/quick'
  },
  {
    path: '/workbench',
    name: "workbench",
    redirect: '/workbench/salestrends',
    component: () => import('../views/workbench/index.vue'),
    children: [
      //工作台
      {
        path: '/workbench/quick',
        name: 'quicks',
        component: () => import('../views/workbench/quick.vue')
      },
      //销售动态
      {
        path: '/workbench/salestrends',
        name: 'salestrend',
        component: () => import('../views/workbench/salestrends.vue')
      },
      //我的
      {
        path: '/workbench/mydata',
        name: 'mydatas',
        component: () => import('../views/workbench/mydata.vue')
      },
      //今日待办
      {
        path: '/workbench/todoToday',
        name: 'todoToday',
        component: () => import('../views/workbench/todoToday.vue')
      },
      //员工我的
      {
        path: '/staff/staffme',
        name: 'staffme',
        component: () => import('../views/staff/staffme.vue')
      },
    ]
  },
  //工作台
  {
    path: '/workbench/quick',
    name: 'quick',
    component: () => import('../views/workbench/quick.vue')
  },
  {
    path: '/workbench/deadPage',
    name: 'deadPage',
    component: () => import('../views/workbench/deadPage.vue')
  },
  //销售动态
  {
    path: '/workbench/salestrends',
    name: 'salestrends',
    component: () => import('../views/workbench/salestrends.vue')
  },
  //我的
  {
    path: '/workbench/mydata',
    name: 'mydata',
    component: () => import('../views/workbench/mydata.vue')
  },
  //登录
  {
    path: '/login/account',
    name: 'account',
    component: () => import('../views/login/account.vue')
  },
  //完善公司信息
  {
    path: '/login/perfect',
    name: 'perfect',
    component: () => import('../views/login/perfect.vue')
  },
  //注册
  {
    path: '/login/register',
    name: 'register',
    component: () => import('../views/login/register.vue')
  },
  //待分配客户
  {
    path: '/workbench/Tobeallocated',
    name: 'Tobeallocated',
    component: () => import('../views/workbench/Tobeallocated.vue')
  },
  //新增客户
  {
    path: '/workbench/addUser',
    name: 'addUser',
    component: () => import('../views/workbench/addUser.vue')
  },
  //正在跟进
  {
    path: '/workbench/followup',
    name: 'followup',
    component: () => import('../views/workbench/followup.vue')
  },
  //员工详情
  {
    path: '/workbench/employeedetails',
    name: 'employeedetails',
    component: () => import('../views/workbench/employeedetails.vue')
  },
  //所属客户
  {
    path: '/workbench/belongingCustomer',
    name: 'belongingCustomer',
    component: () => import('../views/workbench/belongingCustomer.vue')
  },
  //今日待办
  {
    path: '/workbench/todoToday',
    name: 'todoToday',
    component: () => import('../views/workbench/todoToday.vue')
  },
  //成交客户
  {
    path: '/workbench/deal',
    name: 'deal',
    component: () => import('../views/workbench/deal.vue')
  },
  //全部日程
  {
    path: '/workbench/allschedules',
    name: 'allschedules',
    component: () => import('../views/workbench/allschedules.vue')
  },
  //今日跟进
  {
    path: '/workbench/todayFollowup',
    name: 'todayFollowup',
    component: () => import('../views/workbench/todayFollowup.vue')
  },
  //本月成交
  {
    path: '/workbench/thismonth',
    name: 'thismonth',
    component: () => import('../views/workbench/thismonth.vue')
  },
  //新增客户
  {
    path: '/workbench/addCustomer',
    name: 'addCustomer',
    component: () => import('../views/workbench/addCustomer.vue')
  },
  //基本资料
  {
    path: '/workbench/basicinformation',
    name: 'basicinformation',
    component: () => import('../views/workbench/basicinformation.vue')
  },
  //全部员工(实验)
  {
    path: '/workbench/allemployees',
    name: 'allemployees',
    component: () => import('../views/workbench/allemployees.vue')
  },
  //编辑员工
  {
    path: '/workbench/editstaff',
    name: 'editstaff',
    component: () => import('../views/workbench/editstaff.vue')
  },
  //创建员工
  {
    path: '/workbench/createEmployee',
    name: 'createEmployee',
    component: () => import('../views/workbench/createEmployee.vue')
  },
  //客户详情
  {
    path: '/workbench/customers',
    name: 'customers',
    component: () => import('../views/workbench/customers.vue')
  },
  //全部员工
  {
    path: '/workbench/allemplo',
    name: 'allemplo',
    component: () => import('../views/workbench/allemplo.vue')
  },
  //客户资源
  {
    path: '/workbench/customerSource',
    name: 'customerSource',
    component: () => import('../views/workbench/customerSource.vue')
  },

  //员工身份
  //所属客户
  {
    path: '/staff/placecustomer',
    name: 'placecustomer',
    component: () => import('../views/staff/placecustomer.vue')
  },
  //我的
  {
    path: '/staff/mystaff',
    name: 'mystaff',
    component: () => import('../views/staff/mystaff.vue')
  },
  //正在跟进员工
  {
    path: '/staff/followupstaff',
    name: 'followupstaff',
    component: () => import('../views/staff/followupstaff.vue')
  },
  //成交客户
  {
    path: '/staff/dealstaff',
    name: 'dealstaff',
    component: () => import('../views/staff/dealstaff.vue')
  },
  //员工我的
  {
    path: '/staff/staffme',
    name: 'staffme',
    component: () => import('../views/staff/staffme.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//在没有token的情况下，如果是跳这些地址可以直接访问(路由跳转判断)
// router.beforeEach((to, from, next) => {
//   const userInfo = JSON.parse(localStorage.getItem('userInfo') )|| '';
//   // const token = localStorage.token;
//   if (userInfo.token) {
//     next()
//   } else {
//     if (to.path == '/login/account') {
//       next()
//     }
//     else {
//       next({
//         path: '/login/account'
//       })
//     } 
//   } 
// })
export default router
