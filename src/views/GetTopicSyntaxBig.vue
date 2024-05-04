<template>
    <el-container style="height: 100vh;">

        <el-header style="text-align: center; background-color: black;">
            <h1 style="color: white;text-align: right;margin-top: 0.8%;float: left">专利检索式构建</h1>
        </el-header>

        <el-main style="background-color: #f8f4ff;margin-top: 1%; overflow-y: scroll;">
            <div class="search-container">
                <el-button slot="append" icon="el-icon-search" @click="search" style="text-align: center; margin-left: 5%">检索式构建</el-button>

                <div class="link-top"></div>
                <el-row>
                    <el-col :span="6">
                        <div style="text-align: center;margin-top: 8%">
                            <el-upload
                                ref="upload3"
                                :accept="fileType.join(',')"
                                :limit="1"
                                :data="param"
                                :headers="dataUpload.headers"
                                :action="dataUpload.url"
                                :disabled="dataUpload.isUploading"
                                :on-progress="handleFileProgress3"
                                :on-success="handleFileSuccess3"
                                :auto-upload="false"
                                drag
                            >
                                <i class="el-icon-upload"/>
                                <div class="el-upload__text">将目标文件拖到此处，或<em>点击上传</em></div>
                                <div slot="tip" class="el-upload__tip" style="color: red">
                                    提示：仅允许导入“pdf”、“doc”、“docx”、“xls”或“xlsx”格式文件！
                                </div>
                            </el-upload>
                            <el-button type="success" size="mini" style="margin-top: 2%" @click="submitUpload3">点击此处上传到服务器
                            </el-button>
                        </div>
                    </el-col>
                    <el-col :span="18">
                        <p v-if="!topicSyntax" style="text-align: left"></p>
                        <div v-if="topicSyntax" style="margin-top: 2%;margin-left: 5%">
                            <div style="float: left;font-weight: bold;font-size: 18px;">
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
                    <el-col :span="24">
                        <div v-if="keyWords" style="float:right;font-weight: bold;font-size: 18px;">
                            <p>备选相似关键词</p>
                            <el-col style="border: solid 2px;" :span="2" v-for="(item, index) in keyWords" :key="index">{{ item }}</el-col>
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
    name: 'GetTopicSyntaxBig',
    data() {
        return {
            text: '',
            keyWords: null,
            topicSyntax: null,
            dataUpload: {
                url: 'http://localhost:8000/wei/loadData/',
                isUploading: false,
            },
            fileType: ['.xlsx', '.xls', '.pdf', '.doc', '.docx'],
            param: {
                user_name: localStorage.getItem('userName'),
            },
            loading: false,
        }
    },
    methods: {
        search() {
            axios({
                method: 'GET',
                url: 'http://localhost:8000/wei/getTopicSyntaxBig/',
                params: {
                },
            }).then(res => {
                if (res.data.status == 200) {
                    this.keyWords = res.data.data.keywords
                    this.topicSyntax = res.data.data.topicSyntax
                } else {
                    this.$message.error('未上传文件')
                }
            })
        },
        // 文件上传中处理
        handleFileProgress3() {
            this.upload.isUploading = true
            this.loading = false
        },
        // 文件上传成功处理
        handleFileSuccess3() {
            this.upload.isUploading = false
            this.loading = false
            this.$refs.upload3.clearFiles()
        },
        submitUpload3() {
            this.loading = true
            this.$refs.upload3.submit()
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
