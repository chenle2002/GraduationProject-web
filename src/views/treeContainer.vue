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
                    label: 'XXX科技有限公司',
                    children: [
                        {
                            id: 2,
                            label: '产品研发部',
                            children: [
                                {
                                    id: 5,
                                    label: '研发-前端',
                                    children: [
                                        {
                                            id: 55,
                                            label: '前端1',
                                        },
                                        {
                                            id: 56,
                                            label: '前端2',
                                        },
                                        {
                                            id: 57,
                                            label: '前端3',
                                        },
                                        {
                                            id: 58,
                                            label: '前端4',
                                        },
                                    ],
                                },
                                {
                                    id: 6,
                                    label: '研发-后端',
                                },
                                {
                                    id: 9,
                                    label: 'UI设计',
                                },
                                {
                                    id: 10,
                                    label: '产品经理',
                                },
                            ],
                        },
                        {
                            id: 3,
                            label: '销售部',
                            children: [
                                {
                                    id: 7,
                                    label: '销售一部',
                                },
                                {
                                    id: 8,
                                    label: '销售二部',
                                },
                            ],
                        },
                        {
                            id: 4,
                            label: '财务部',
                        },
                        {
                            id: 9,
                            label: 'HR人事',
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
                        <i class="el-icon-user-solid"></i>
                        <span>{data.label}</span>
                        <span>男</span>
                    </div>
                    <div style="font-size:12px;line-height:20px;">测试人员</div>
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
