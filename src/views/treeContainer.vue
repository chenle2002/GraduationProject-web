<template>
    <div ref="appContainer" class="app-container">
        <div style="margin-left:30px;">
            <el-row :gutter="20">
                <el-col :span="5">
<!--                    <el-switch v-model="horizontal" :width="50" active-text="横排" inactive-text="竖排" style="margin-top:8px;"/>-->
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
        <div style="background-color: #cccccc;height: 100%;width: 50%;text-align: center">
            <!-- 消息弹窗 -->
            <div v-if="showPopup" style="background-color: #cccccc;position: fixed;z-index: 9999;
            width: 60%;height: 55%;margin-top:5%;margin-left: 15%">
                <div class="popup-content">
                    <span class="close" style="float: right;" @click="showPopup = false">&times;</span>
                    <h1>{{ node.name }}</h1>
                    <h2 style="text-align: left;margin-left: 2%">分类介绍：{{ node.info }}</h2>
                    <img style="width: 40%;" :src="imgPath" alt="Node Image"/>
                </div>
            </div>
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
import axios from 'axios'

export default {
    name: 'treeContainer',
    data() {
        return {
            showPopup: false,
            imgPath: '',
            node: {},
            treeData: {
                labelClassName: 'bg-color-orange',
                basicInfo: { id: null, label: '---null' },
                basicSwitch: false,
                data: {
                    id: 100,
                    label: '大模型',
                    children: [
                        {
                            id: 21,
                            label: '计算机视觉与图像处理',
                            children: [
                                {
                                    id: 1,
                                    label: '三维图像识别与点云生成',
                                },
                                {
                                    id: 25,
                                    label: '自动驾驶汽车的相关技术与应用',
                                    children: [
                                        {
                                            id: 12,
                                            label: '轨道交通车辆的位置预测与监控',
                                        },
                                        {
                                            id: 13,
                                            label: '车辆图像识别与自动驾驶',
                                        },
                                    ],
                                },
                                {
                                    id: 2,
                                    label: '火灾烟雾图像识别与监测',
                                },
                                {
                                    id: 3,
                                    label: '人脸识别技术与应用',
                                },
                                {
                                    id: 4,
                                    label: '船舶图像识别与监测',
                                },
                                {
                                    id: 26,
                                    label: '图像识别与分类',
                                    children: [
                                        {
                                            id: 14,
                                            label: '知识蒸馏',
                                        },
                                        {
                                            id: 15,
                                            label: '电力系统中设备监测与故障识别',
                                        },
                                        {
                                            id: 16,
                                            label: '基于图像识别的农作物病虫害识别与分类',
                                        },
                                        {
                                            id: 17,
                                            label: '目标检测与识别',
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            id: 22,
                            label: '自然语言处理与语音技术',
                            children: [
                                {
                                    id: 5,
                                    label: '车载语音交互',
                                },
                                {
                                    id: 27,
                                    label: '语音和文本处理技术及应用',
                                    children: [
                                        {
                                            id: 18,
                                            label: '对话系统（人机对话）',
                                        },
                                        {
                                            id: 19,
                                            label: '语音指令识别和语音合成',
                                        },
                                        {
                                            id: 20,
                                            label: '模型训练和优化',
                                        },
                                        {
                                            id: 0,
                                            label: '语音识别模型和声学特征',
                                        },
                                    ],
                                },
                                {
                                    id: 6,
                                    label: '文本纠错与校正',
                                },
                            ],
                        },
                        {
                            id: 23,
                            label: '计算机硬件与虚拟现实',
                            children: [
                                {
                                    id: 7,
                                    label: '计算机硬件和图形处理',
                                },
                                {
                                    id: 8,
                                    label: '虚拟现实和游戏',
                                },
                            ],
                        },
                        {
                            id: 24,
                            label: '医疗与生命科学',
                            children: [
                                {
                                    id: 9,
                                    label: '细胞治疗与疾病研究',
                                },
                                {
                                    id: 10,
                                    label: '医疗信息处理',
                                },
                                {
                                    id: 11,
                                    label: '医学图像处理和疾病诊断',
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
            axios({
                method: 'GET',
                url: 'http://106.54.17.29:8000/chenle/getinfobyid/',
                params: {
                    id: data.id,
                },
            }).then(res => {
                this.showPopup = true
                this.node = res.data
                this.imgPath = '/umap_img/wordcloud' + data.id + '.png'
            })
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
    height: 120%;
    .el-scrollbar__wrap {
        overflow-x: hidden;
    }

    .org-tree-node-label {
        white-space: nowrap;
    }

    .el-tree-node__content {
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

//******
</style>
