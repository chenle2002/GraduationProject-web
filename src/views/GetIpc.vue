<template>
    <el-container style="height: 100vh;">

        <el-header style="text-align: center; background-color: black;">
            <h1 style="color: white;text-align: right;margin-top: 0.8%;float: left">专利文本摘要IPC分类号预测</h1>
        </el-header>

        <el-main style="background-color: #f8f4ff;margin-top: 1%; overflow-y: scroll;">
            <div class="search-container">
                <el-input v-model="text" placeholder="TEXT" style="width: 40%; margin-bottom: 20px;">

                </el-input>
                <el-button slot="append" icon="el-icon-search" @click="search" style="text-align: center; margin-left: 5%">ipc预测</el-button>
                <div class="link-top"></div>
                <p v-if="!res" style="text-align: left"></p>
                <div v-if="res" style="margin-top: 2%">
                    <div style="float: left;width: 40%;">
                        <p style="font-weight: bold;font-size: 18px;">文本信息：</p>
                        <p style="margin-top: 5%;font-weight: bold">{{ this.text }}</p>
                    </div>
                    <div style="float: left;width: 45%;font-weight: bold;font-size: 18px;">
                        <p>ipc预测结果：</p>
                        <div v-for="(item, index) in res" :key="index">
                            <el-col :span="6" style="border: solid 2px;">
                                <div>{{ item.ipc }}</div>
                            </el-col>
                            <el-col :span="18" style="border: solid 2px;">
                                <div>{{ item.text }}</div>
                            </el-col>
                        </div>
                    </div>
                </div>
            </div>
        </el-main>
    </el-container>
</template>

<script>
import axios from 'axios'

export default {
    name: 'GetIpc',
    data() {
        return {
            text: '',
            res: null,
        }
    },
    methods: {
        search() {
            if (this.text == '') {
                this.$message.error('请输入文本')
            } else {
                axios({
                    method: 'GET',
                    url: 'http://106.54.17.29:8000/wei/getIpc/',
                    params: {
                        text: this.text,
                    },
                }).then(res => {
                    if (res.status == 200) {
                        this.res = res.data.data
                        const list = []
                        for (let i = 0; i < this.res.length; i++) {
                            if (this.res[i] === '0') {
                                if (this.res.length == 1) {
                                    this.res = ['未预测到ipc分类号']
                                    return
                                }
                            } else { list.push(this.res[i]) }
                        }
                        this.res = list
                    } else {
                        this.$message.error('输入文本为空')
                    }
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

.link-top {
    width: 100%;
    height: 3px;
    border-top: solid 2px;
}
</style>
