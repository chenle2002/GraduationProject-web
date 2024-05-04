<template>
    <div>
        <el-col :span="6">
            <div style="text-align: center;margin-top: 8%">
                <el-upload
                    ref="upload1"
                    :accept="fileType.join(',')"
                    :limit="1"
                    :data="param"
                    :headers="targetUpload.headers"
                    :action="targetUpload.url"
                    :disabled="targetUpload.isUploading"
                    :before-upload="beforeUpload"
                    :on-progress="handleFileProgress"
                    :on-success="handleFileSuccess"
                    :auto-upload="false"
                    drag
                >
                    <i class="el-icon-upload"/>
                    <div class="el-upload__text">将目标文件拖到此处，或<em>点击上传</em></div>
                    <div slot="tip" class="el-upload__tip" style="color: red">
                        提示：仅允许导入“xls”或“xlsx”格式文件！
                    </div>
                </el-upload>
                <el-button type="success" size="mini" style="margin-top: 2%" @click="submitUpload1">点击此处上传到服务器</el-button>
            </div>
            <div style="text-align: center;margin-top: 8%">
                <el-upload
                    ref="upload2"
                    :accept="fileType.join(',')"
                    :limit="1"
                    :data="param"
                    :headers="otherUpload.headers"
                    :action="otherUpload.url"
                    :disabled="otherUpload.isUploading"
                    :before-upload="beforeUpload"
                    :on-progress="handleFileProgress"
                    :on-success="handleFileSuccess"
                    :auto-upload="false"
                    drag
                >
                    <i class="el-icon-upload"/>
                    <div class="el-upload__text">将噪音专利文件拖到此处，或<em>点击上传</em></div>
                    <div slot="tip" class="el-upload__tip" style="color: red">
                        提示：仅允许导入“xls”或“xlsx”格式文件！
                    </div>
                </el-upload>
                <el-button type="success" size="mini" style="margin-top: 2%" @click="submitUpload2">点击此处上传到服务器</el-button>
            </div>
        </el-col>
        <el-col :span="16" >
            <el-button type="success" size="mini" style="margin-top: 2%;margin-left: 40%" @click="search">获取结果</el-button>
            <div v-if="syntax" style="float: right;width: 60%;font-weight: bold;font-size: 18px;">
                <p>检索式生成结果</p>
                <div style="border: solid 2px;" >{{syntax}}</div>
                <div style="border: solid 2px;" >在给定的专利数据中，查全率：{{Fixed(recall)}}，查准率：{{Fixed(precision)}}</div>
            </div>
            <div v-if="notWord" style="width: 60%;float:right;font-weight: bold;font-size: 18px;">
                <p>备选无关词</p>
                <el-col style="border: solid 2px;" :span="4" v-for="(item, index) in notWord" :key="index">{{ item }}</el-col>
            </div>
        </el-col>
    </div>
</template>


<script>
import axios from 'axios'

export default {
    name: 'BuildSyntaxByTarget',
    data() {
        return {
            syntax: null,
            notWord: null,
            file_name: '',
            recall: null,
            precision: null,
            param: {
                user_name: localStorage.getItem('userName'),
            },
            inputRules: [
                {
                    validator: this.validateInput,
                    trigger: 'blur',
                },
            ],
            fileType: ['.xlsx', '.xls'],
            targetUpload: {
                url: 'http://localhost:8000/wei/loadTargetData/',
                isUploading: false,
            },
            otherUpload: {
                url: 'http://localhost:8000/wei/loadOtherData/',
                isUploading: false,
            },
            dataUpload: {
                url: 'http://localhost:8000/wei/loadData/',
                isUploading: false,
            },
        }
    },
    methods: {
        search() {
            axios({
                method: 'GET',
                url: 'http://localhost:8000/wei/buildSyntaxByTarget/',
                params: {
                },
            }).then(res => {
                if (res.status == 200 && res.data) {
                    this.syntax = res.data.data.syntax
                    this.notWord = res.data.data.notWord
                    this.recall = res.data.data.recall
                    this.precision = res.data.data.precision
                } else {
                    this.$message.error('未传入专利数据')
                }
            })
        },
        // 文件上传中处理
        handleFileProgress() {
            this.upload.isUploading = true
        },
        // 文件上传成功处理
        handleFileSuccess() {
            this.upload.isUploading = false
            this.$refs.upload.clearFiles()
        },
        // 提交上传文件
        submitUpload1() {
            this.$refs.upload1.submit()
        },
        submitUpload2() {
            this.$refs.upload2.submit()
        },
        // 上传文件之前的钩子
        beforeUpload(file) {
            this.file_name = file.name
            const isXlsxOrXls = /\.(xlsx|xls)$/.test(file.name.toLowerCase())
            if (!isXlsxOrXls) {
                this.$message.error('上传文件只能是 xlsx 或 xls 格式')
            }
            return isXlsxOrXls
        },
        validateInput(rule, value, callback) {
            const regex = /^\d+(,\d+)*$/ // 正则表达式，用于判断输入内容是否为数字，以逗号分隔
            if (!regex.test(value)) {
                callback(new Error('请输入数字，多个数字之间用逗号分隔'))
            } else {
                callback()
            }
        },
        Fixed(data) {
            let res = (data * 100).toFixed(2) + '%'
            return res
        },
    },
}
</script>

<style scoped>
</style>
