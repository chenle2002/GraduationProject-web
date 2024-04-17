import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const commonRoutes = [
    {
        path: '/login',
        name: 'login',
        meta: { title: '登录' },
        component: () => import('../components/Login.vue'),
    },
    {
        path: '/404',
        name: '404',
        meta: { title: '404' },
        component: () => import('../components/404.vue'),
    },
    { path: '/', redirect: '/home' },
]

// 本地所有的页面 需要配合后台返回的数据生成页面
export const asyncRoutes = {
    home: {
        path: 'home',
        name: 'home',
        meta: { title: '主页' },
        component: () => import('../views/Home.vue'),
    },
    PatentData: {
        path: 'PatentData',
        name: 'PatentData',
        meta: { title: '表格' },
        component: () => import('../views/PatentData.vue'),
    },
    treeContainer: {
        path: 'treeContainer',
        name: 'treeContainer',
        meta: { title: '表格' },
        component: () => import('../views/treeContainer.vue'),
    },
    FuckExcel: {
        path: 'FuckExcel',
        name: 'FuckExcel',
        meta: { title: '表格' },
        component: () => import('../views/FuckExcel.vue'),
    },
    PredictClassify: {
        path: 'PredictClassify',
        name: 'PredictClassify',
        meta: { title: '模型分类预测' },
        component: () => import('../views/PredictClassify.vue'),
    },
    UpdateInfo: {
        path: 'UpdateInfo',
        name: 'UpdateInfo',
        meta: { title: '修改密码' },
        component: () => import('../views/UpdateInfo.vue'),
    },
}

const createRouter = () => new Router({
    routes: commonRoutes,
})

const router = createRouter()

export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher
}

export default router
