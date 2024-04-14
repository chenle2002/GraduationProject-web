import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        isShowLoading: false, // 全局 loading
        // 左侧菜单栏数据
        menuItems: [
            {
                name: 'home', // 要跳转的路由名称 不是路径
                size: 18, // icon大小
                type: 'md-home', // icon类型
                text: '主页', // 文本内容
            },
            {
                name: 'UpdateInfo', // 要跳转的路由名称 不是路径
                size: 18, // icon大小
                type: 'ios-grid', // icon类型
                text: '修改用户信息', // 文本内容
            },
            {
                text: '陈乐',
                type: 'ios-paper',
                children: [
                    {
                        type: 'ios-grid',
                        name: 'PatentData',
                        text: '大模型专利数据',
                    },
                    {
                        type: 'ios-grid',
                        name: 'treeContainer',
                        text: '专利结构图',
                    },
                    {
                        type: 'ios-grid',
                        name: 'PredictClassify',
                        text: '分类预测',
                    },
                ],
            },
            {
                text: '韦江潮',
                type: 'ios-paper',
                children: [
                    {
                        type: 'ios-grid',
                        name: 't1',
                        text: '大模型专利数据',
                    },
                    {
                        size: 18, // icon大小
                        type: 'md-arrow-forward', // icon类型
                        text: '分类预测',
                    },
                ],
            },
        ],
    },
    mutations: {
        setMenus(state, items) {
            state.menuItems = [...items]
        },
        setLoading(state, isShowLoading) {
            state.isShowLoading = isShowLoading
        },
    },
})

export default store
