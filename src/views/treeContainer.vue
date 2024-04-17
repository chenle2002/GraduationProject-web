<template>
    <div ref="appContainer" class="app-container">
        <div style="margin-left:30px;">
            <el-row :gutter="20">
                <el-col :span="5">
                    <el-switch v-model="horizontal" :width="50" active-text="横排" inactive-text="竖排" style="margin-top:8px;"/>
                </el-col>
                <el-col :span="5">
                    <el-switch v-model="expandAll" :width="50" active-text="全部展开"
                               inactive-text="全部折叠" style="margin:8px;" @change="expandChange"/>
                </el-col>
                <el-col :span="14">
                    <span style="font-size:14px;font-weight:500;">选择背景色:</span>
                    <el-select v-model="labelClassName" @change="selectChange">
                        <el-option value="bg-white" label="白色">白色</el-option>
                        <el-option value="bg-orange" label="橘黄色">橘黄色</el-option>
                        <el-option value="bg-gold" label="金色">金色</el-option>
                        <el-option value="bg-gray" label="灰色">灰色</el-option>
                        <el-option value="bg-lightpink" label="浅粉色">浅粉色</el-option>
                        <el-option value="bg-chocolate" label="巧克力色">巧克力色</el-option>
                        <el-option value="bg-tomato" label="番茄色">番茄色</el-option>
                    </el-select>
                </el-col>
            </el-row>
        </div>
        <div style="font-size:12px;margin-top:30px;">
            <el-scrollbar :style="scrollTreeStyle" class="el-org-tree">
                <vue2-org-tree
                    :data="treeData.data"
                    :horizontal="!horizontal"
                    :collapsable="collapsable"
                    :label-class-name="labelClassName"
                    :render-content="renderContent"
                    name="organ"
                    @on-expand="onExpand"
                    @on-node-click="onNodeClick"/>
            </el-scrollbar>
        </div>
        <br/><br/>
    </div>
</template>


<script>
export default {
    name: 'treeContainer',
    data() {
        return {
            treeData: {
                labelClassName: 'bg-color-orange',
                basicInfo: { id: null, label: '---null' },
                basicSwitch: false,
                data: {
                    id: 0,
                    label: '大模型',
                    children: [
                        {
                            id: 1,
                            label: '图像与视频处理领域',
                            children: [
                                {
                                    id: 4,
                                    label: '人脸识别与表情分析',
                                },
                                {
                                    id: 5,
                                    label: '图像分割与数据处理',
                                    children: [
                                        {
                                            id: 11,
                                            label: '卷积神经网络',
                                        },
                                        {
                                            id: 12,
                                            label: 'Transformer',
                                        },
                                        {
                                            id: 13,
                                            label: 'U-net模型',
                                        },
                                        {
                                            id: 14,
                                            label: '医学图像分割',
                                        },
                                    ],
                                },
                                {
                                    id: 6,
                                    label: '视频分析与行为识别',
                                },
                                {
                                    id: 7,
                                    label: '图像识别与神经网络',
                                },
                            ],
                        },
                        {
                            id: 2,
                            label: '自然语言处理与语音领域',
                            children: [
                                {
                                    id: 8,
                                    label: '语音识别与情感分析',
                                },
                                {
                                    id: 9,
                                    label: '对话系统与语义理解',
                                },
                                {
                                    id: 10,
                                    label: '文本处理与语言模型',
                                    children: [
                                        {
                                            id: 15,
                                            label: '医学领域的文本处理',
                                        },
                                        {
                                            id: 16,
                                            label: '通用文本处理与语言模型',
                                        },
                                        {
                                            id: 17,
                                            label: '文本分类与语义分析',
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            id: 3,
                            label: '智能系统与感知领域',
                            children: [
                                {
                                    id: 5,
                                    label: '人工智能应用和平台',
                                },
                                {
                                    id: 6,
                                    label: '电力系统故障识别与预测',
                                },
                                {
                                    id: 9,
                                    label: '车辆识别与自动驾驶',
                                },
                            ],
                        },
                    ],
                },
            },
            horizontal: true, // 横版 竖版
            collapsable: false,
            expandAll: true, // 是否全部展开
            labelClassName: '白色', // 默认颜色
            scrollTreeStyle: 'width:100%;',
        }
    },
    methods: {
        // 渲染节点
        renderContent(h, data) {
            return (
                <div>
                    <div>
                        <span>{data.label}</span>
                    </div>
                </div>
            )
        },

        // 鼠标移出
        onMouseout(e, data) {
            this.treeData.basicSwitch = false
        },
        // 鼠标移入
        onMouseover(e, data) {
            this.treeData.basicInfo = data
            this.treeData.basicSwitch = true
            let floating = document.getElementsByClassName('floating')[0]
            floating.style.left = e.clientX + 'px'
            floating.style.top = e.clientY + 'px'
        },
        // 点击节点
        NodeClick(e, data) {
            console.log(e, data)
        },
        // 默认展开
        toggleExpand(data, val) {
            if (Array.isArray(data)) {
                data.forEach(item => {
                    this.$set(item, 'expand', val)
                    if (item.children) {
                        this.toggleExpand(item.children, val)
                    }
                })
            } else {
                this.$set(data, 'expand', val)
                if (data.children) {
                    this.toggleExpand(data.children, val)
                }
            }
        },
        collapse(list) {
            list.forEach(child => {
                if (child.expand) {
                    child.expand = false
                }
                // eslint-disable-next-line no-unused-expressions
                child.children && this.collapse(child.children)
            })
        },
        // 展开
        onExpand(e, data) {
            if ('expand' in data) {
                data.expand = !data.expand
                if (!data.expand && data.children) {
                    this.collapse(data.children)
                }
            } else {
                this.$set(data, 'expand', true)
            }
        },
        getList() {
            // 后台回去的数据 赋值给data即可
        },

        // 自定义您的点击事件
        onNodeClick(e, data) {
            alert('点击')
        },

        expandChange() {
            this.collapsable = true
            this.toggleExpand(this.treeData.data, this.expandAll)
        },
        selectChange() {

        },

    },


}
</script>

<!--<style scoped>-->
<!--</style>-->
<style lang="less">
@import '../assets/org-tree.less';

.bg-white {
    background-color: white;
}
.bg-orange {
    background-color: orange;
}
.bg-gold {
    background-color: gold;
}
.bg-gray {
    background-color: gray;
}
.bg-lightpink {
    background-color: lightpink;
}
.bg-chocolate {
    background-color: chocolate;
}
.bg-tomato {
    background-color: tomato;
}
//.org-tree-node-label-inner {
//  color: #fff;
//  background-color: orange;
//}

.el-org-tree {
    .el-scrollbar__wrap {
        overflow-x: hidden;
    }
    .org-tree-node-label {
        white-space: nowrap;
    }
    .el-tree-node__content{
        background: white;
    }
    .org-tree-node-label .org-tree-node-label-inner {
        padding-top: 8px;
        padding-right: 10px;
        padding-bottom: 5px;
        padding-left: 10px;
        cursor: pointer;
    }
    .horizontal .org-tree-node.is-leaf {
        padding-top: 5px;
        padding-bottom: 5px;
    }
}
</style>
