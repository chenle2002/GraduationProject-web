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
                    {
                        type: 'ios-grid',
                        name: 'PredictExcel',
                        text: '批量处理Excel',
                    },
                    {
                        type: 'ios-grid',
                        name: 'Collection',
                        text: '个人收藏查看',
                    },
                    {
                        type: 'ios-grid',
                        name: 'Record',
                        text: '文本预测记录',
                    },
                ],
            },
            {
                text: '检索式辅助构建',
                type: 'ios-paper',
                children: [
                    {
                        type: 'ios-grid',
                        name: 'GetTopicSyntax',
                        text: '专利检索式初步构建',
                    },
                    {
                        type: 'ios-grid',
                        name: 'BuildSyntaxByTarget',
                        text: '专利检索式优化',
                    },
                    {
                        type: 'ios-grid',
                        name: 'GetIpc',
                        text: '专利IPC分类号预测',
                    },
                    {
                        type: 'ios-grid',
                        name: 'GetTopicSyntaxBig',
                        text: '检索式构建',
                    },
                    {
                        type: 'ios-grid',
                        name: 'SyntaxData',
                        text: '检索式展示',
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
