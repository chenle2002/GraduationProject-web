<template>
    <el-container style="height: 100vh;">

        <el-header style="text-align: center; background-color: black;">
            <h1 style="color: white; line-height: 100%;text-align: right;">基于BERT的大模型相关专利数据分类模型</h1>
        </el-header>

        <el-main style="background-color: #fff0f4 ">
            <div class="search-container">
                <el-input v-model="text" placeholder="Number" style="width: 40%; margin-bottom: 20px;">
                    <el-button slot="append" icon="el-icon-search" @click="search">分类结果</el-button>
                </el-input>

                <div class="link-top"></div>
                <p style="text-align: left">我们会根据你的编号来检索相应的数据</p>
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
        }
    },
    methods: {
        search() {
            axios({
                method: 'GET',
                url: 'http://127.0.0.1:8000/chenle/predict/',
                params: {
                    text: this.text,
                },
            }).then(res => {
                console.log(res.data)
            })
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
    width: 80%;
    height: 1px;
    border-top: solid #ACC0D8 1px;
}
</style>
