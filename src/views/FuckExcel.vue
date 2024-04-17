<template>
    <div>
        <div style="margin-top: 5%">
            <div>
                <p style="margin-bottom: 1%">请输入需要进行预测的列，我们将会把所有列进行拼接完成预测：</p>
                <el-input v-model="this.param.columns" placeholder="格式例如：1,5,14" :rules="inputRules"></el-input>
            </div>
        </div>

        <div style="text-align: center;margin-top: 10%">
            <el-upload
                ref="upload"
                :accept="fileType.join(',')"
                :limit="1"
                :data="param"
                :headers="upload.headers"
                :action="upload.url"
                :disabled="upload.isUploading"
                :before-upload="beforeUpload"
                :on-progress="handleFileProgress"
                :on-success="handleFileSuccess"
                :auto-upload="false"
                drag
            >
                <i class="el-icon-upload"/>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div slot="tip" class="el-upload__tip" style="color: red">
                    提示：仅允许导入“xls”或“xlsx”格式文件！
                </div>
            </el-upload>
            <el-button type="success" size="mini" @click="submitUpload">上传到服务器</el-button>
        </div>
        <div>
            <el-button type="primary" @click="checkFileStatus">检查文件处理状态</el-button>
        </div>
        <div>
            <el-button type="primary" @click="downloadExcel">下载Excel文件</el-button>
        </div>
    </div>
</template>


<script>
import axios from '_axios@0.19.2@axios'

export default {
    name: 'FuckExcel',
    data() {
        return {
            file_name: '',
            param: {
                user_name: localStorage.getItem('userName'),
                columns: '3,14,15,16,17',
            },

            inputRules: [
                {
                    validator: this.validateInput,
                    trigger: 'blur',
                },
            ],
            fileType: ['.xlsx', '.xls'],
            upload: {
                // 设置上传的请求头部
                // 上传地址
                url: 'http://127.0.0.1:8000/chenle/process_excel/',
                // 是否更新已经存在的用户数据
                isUploading: false,
            },
        }
    },
    methods: {
        checkFileStatus() {
            axios({
                method: 'GET',
                url: 'http://127.0.0.1:8000/chenle/judge_exist/',
                params: {
                    user_name: localStorage.getItem('userName'),
                    file_name: this.file_name,
                },
            }).then(res => {
                if (res.data === 'yes') {
                    this.$message.success('您的Excel文件已经处理完成！')
                } else {
                    this.$message.warning('您的文件暂未处理完成！')
                }
            })
        },
        downloadExcel() {
            // 向后端发送请求下载文件
            // eslint-disable-next-line max-len
            axios({
                method: 'GET',
                url: 'http://127.0.0.1:8000/chenle/download/',
                params: {
                    user_name: localStorage.getItem('userName'),
                    file_name: this.file_name,
                },
                responseType: 'blob',
            }).then(response => {
                // 创建一个URL对象，用于生成文件下载链接
                const url = window.URL.createObjectURL(new Blob([response.data]))
                // 创建一个a标签，设置下载链接，并模拟点击
                const link = document.createElement('a')
                link.href = url
                link.setAttribute('download', 'data.xlsx')
                document.body.appendChild(link)
                link.click()
                // 释放URL对象
                window.URL.revokeObjectURL(url)
            }).catch(error => {
                console.error('下载失败：', error)
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
        submitUpload() {
            this.$refs.upload.submit()
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
    },
}
</script>

<style scoped>
</style>
