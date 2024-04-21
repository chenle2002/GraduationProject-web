<template>
    <el-container style="height: 100vh;">

        <el-header style="text-align: center; background-color: black;">
            <h1 style="color: white;text-align: right;margin-top: 0.8%;float: left">专利检索式初步构建</h1>
        </el-header>

        <el-main style="background-color: #f8f4ff;margin-top: 1%; overflow-y: scroll;">
            <div class="search-container">
                <el-input v-model="text" placeholder="TEXT" style="width: 40%; margin-bottom: 20px;">

                </el-input>
                <el-button slot="append" icon="el-icon-search" @click="search" style="text-align: center; margin-left: 5%">检索式构建</el-button>

                <div class="link-top"></div>
                <el-row>
                    <el-col :span="24">
                        <p v-if="!topicSyntax" style="text-align: left"></p>
                        <div v-if="topicSyntax" style="margin-top: 2%">
                            <div style="float: left;width: 40%;">
                                <p style="font-weight: bold;font-size: 18px;">文本信息：</p>
                                <p style="margin-top: 5%;font-weight: bold">{{ this.text }}</p>
                            </div>
                            <div style="float: left;width: 60%;font-weight: bold;font-size: 18px;">
                                <p>检索式生成结果</p>
                                <div style="border: solid 2px;" v-for="(item, index) in topicSyntax" :key="index">{{ index + 1 }}.{{
                                        item
                                    }}
                                </div>
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <div v-if="wenxinyiyanSyntax" style="float: left;margin-top: 5%;border: solid 2px;">
                            <p style="font-weight: bold;font-size: 18px;">智能提示</p>
                            <p style="margin-top: 5%;font-weight: bold">{{ wenxinyiyanSyntax }}</p>
                        </div>
                        <div v-if="!wenxinyiyanSyntax" style="float: left;margin-top: 5%;border: solid 2px;">
                            <p style="font-size: 18px;"></p>
                        </div>
                    </el-col>
                    <el-col :span="14">
                        <div v-if="keyWords" style="float:right;font-weight: bold;font-size: 18px;">
                            <p>备选相似关键词</p>
                            <el-col style="border: solid 2px;" :span="4" v-for="(item, index) in keyWords" :key="index">{{ item }}</el-col>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </el-main>
    </el-container>
</template>

<script>
import axios from 'axios'

export default {
    name: 'GetTopicSyntax',
    data() {
        return {
            text: '',
            keyWords: null,
            topicSyntax: null,
            wenxinyiyanSyntax: null,
        }
    },
    methods: {
        search() {
            if (this.text == '') {
                this.$message.error('请输入文本')
            } else {
                axios({
                    method: 'GET',
                    url: 'http://106.54.17.29:8000/wei/getTopicSyntax/',
                    params: {
                        text: this.text,
                    },
                }).then(res => {
                    if (res.data.status == 200) {
                        this.keyWords = res.data.data.keywords
                        this.topicSyntax = res.data.data.topicSyntax
                        this.wenxinyiyanSyntax = res.data.data.wenxinyiyanSyntax
                    } else {
                        this.$message.error('输入文本为空')
                    }
                })
                this.wenxinyiyanSearch()
            }
        },
        wenxinyiyanSearch() {
            if (this.text == '') {
                this.$message.error('请输入文本')
            } else {
                axios({
                    method: 'GET',
                    url: 'http://106.54.17.29:8000/wei/getSyntaxWenxinyiyan/',
                    params: {
                        text: this.text,
                    },
                }).then(res => {
                    if (res.data.status == 200) {
                        this.wenxinyiyanSyntax = res.data.data
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
