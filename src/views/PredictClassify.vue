<template>
    <el-container style="height: 100vh;">

        <el-header style="text-align: center; background-color: black;">
            <h1 style="color: white;text-align: right;margin-top: 0.8%">基于BERT的大模型相关专利数据分类模型</h1>
        </el-header>

        <el-main style="background-color: #f8f4ff;margin-top: 1%; overflow-y: scroll;">
            <div class="search-container">
                <el-input v-model="text" placeholder="TEXT" style="width: 40%; margin-bottom: 20px;">
                    <el-button slot="append" icon="el-icon-search" @click="search" style="text-align: center">分类结果</el-button>
                </el-input>
                <el-button type="success" style="margin-left: 5%" plain @click="clear">清除当此查询结果</el-button>

                <div class="link-top"></div>
                <p v-if="judge" style="text-align: left">我们会根据你的编号来检索相应的数据</p>
                <div v-if="!judge" style="margin-top: 2%">
                    <!-- float属性 -->
                    <div style="float: left;width: 28%;margin-top: 5%">
                        <img src="../assets/img.png"/>
                    </div>

                    <div style="float: left;width: 40%;">
                        <p style="font-weight: bold;font-size: 18px;">您输入的文本信息：</p>
                        <p style="margin-top: 5%;font-weight: bold">{{ this.text }}</p>
                    </div>

                    <div style="float: left;width: 15%;font-weight: bold;font-size: 18px;">
                        <p>搜索用时：</p>
                        <el-button type="info" style="margin-top: 8%" plain>{{ this.time }}</el-button>
                    </div>
                    <div style="float: left;width: 15%;font-weight: bold;font-size: 18px;">
                        <p>文本分类结果：</p>
                        <el-button type="primary" style="margin-top: 8%">{{ this.classify }}</el-button>
                    </div>
                </div>
            </div>
        </el-main>
    </el-container>
</template>

<script>
import axios from 'axios'

export default {
    name: 'PredictClassify',
    data() {
        return {
            text: '',
            judge: true,
            time: '',
            classify: '无',
        }
    },
    methods: {
        clear() {
            this.text = ''
            this.judge = true
            this.time = ''
            this.classify = '无'
        },
        search() {
            if (this.text == '') {
                this.$message.error('请先输入文本内容！')
            } else {
                axios({
                    method: 'GET',
                    url: 'http://106.54.17.29:8000/chenle/predict/',
                    params: {
                        text: this.text,
                        user_name: localStorage.getItem('userName'),
                    },
                }).then(res => {
                    this.time = res.data.elapsed_time
                    this.classify = res.data.result
                    this.judge = !this.judge
                })
            }
        },
    },
}
</script>

<style scoped>
.search-container {
    text-align: center;
}

/*中间的过度的横线*/
.link-top {
    width: 100%;
    height: 1px;
    border-top: solid #ACC0D8 1px;
}
</style>
