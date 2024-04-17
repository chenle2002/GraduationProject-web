<template>
    <div>
        <!-- 表格 -->
        <el-table :data="tableData.list"  style="width: 100%">
            <el-table-column
                prop="序号"
                label="序号"
                width="80">
            </el-table-column>           <!--设置列标-->
            <el-table-column
                prop="标题_中文_field"
                label="标题 (中文)"
                width="120">
            </el-table-column>
            <el-table-column
                :show-overflow-tooltip="true"
                prop="摘要_中文_field"
                label="摘要 (中文)"
                width="120">
            </el-table-column>
            <el-table-column
                prop="申请人"
                label="申请人"
                width="200">
            </el-table-column>
            <el-table-column
                prop="公开_公告_号"
                label="公开（公告）号"
                width="120">
            </el-table-column>
            <el-table-column
                prop="申请号"
                label="申请号"
                width="120">
            </el-table-column>
            <el-table-column
                prop="专利类型"
                label="专利类型"
                width="90">
            </el-table-column>           <!--设置列标-->
            <el-table-column
                :show-overflow-tooltip="true"
                prop="摘要_技术摘要"
                label="中文摘要+技术摘要"
                width="200">
            </el-table-column>
            <el-table-column
                prop="预测结果"
                label="预测结果"
                width="150">
            </el-table-column>
            <el-table-column label="操作" align="center" min-width="80">
                <template slot-scope="scope">
                    <el-button type="info" @click="deleter(scope.row.序号)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <div class="block" style="margin-top:15px;">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[5, 10, 15, 20, 25]"
                :page-size="pageSize"
                layout="total,sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'PatentData',
    data() {
        return {
            tableData: {},
            currentPage: 1, // 当前页码
            total: 20, // 总条数
            pageSize: 5, // 每页的数据条数
        }
    },
    mounted() {
        this.getlivestockInfo(1)
    },
    methods: {
        deleter(val) {
            console.log(val)
            this.$confirm('此操作将永久删除该专利数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                axios({
                    method: 'GET',
                    url: 'http://127.0.0.1:8000/chenle/delete/',
                    params: {
                        id: val,
                    },
                }).then(res => {
                    if (res.data === '删除成功') {
                        this.$message({
                            type: 'success',
                            message: '删除成功!',
                        })
                    } else {
                        this.$message.error(res.data)
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除',
                })
            })
        },
        // 每页条数改变时触发 选择一页显示多少行
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`)
            this.currentPage = 1
            this.pageSize = val
        },
        // 当前页改变时触发 跳转其他页
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`)
            this.currentPage = val
            this.getlivestockInfo(val)
        },
        // 请求api，获取信息
        getlivestockInfo(num1) {
            const that = this
            const params = new URLSearchParams()
            params.append('page', num1)
            // console.log("params",params)
            let url = 'http://127.0.0.1:8000/api/patent/list/?page=' + that.currentPage
            axios.get(url, params)
            .then(response => {
                // console.log('请求成功');
                that.tableData = response.data.data
                that.currentPage = num1
                that.pageSize = that.tableData.pageSize
                that.total = that.tableData.total
                console.log('请求成功, 获取' + that.tableData.list.length + '条数据')
                console.log(that.tableData)
            }).catch(error => {
                console.log('请求失败')
                console.log(error)
            })
        },
    },
}
</script>

<style scoped>

</style>
