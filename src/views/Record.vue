<template>
    <div>
        <!-- 表格 -->
        <el-table :data="tableData.list" style="width: 100%">
            <el-table-column
                prop="id"
                label="序号"
                width="80">
            </el-table-column>           <!--设置列标-->
            <el-table-column
                :show-overflow-tooltip="true"
                prop="text"
                label="文本信息"
                width="600">
            </el-table-column>

            <el-table-column
                prop="predict"
                label="预测结果"
                width="250">
            </el-table-column>
            <el-table-column
                prop="create_time"
                label="创建时间"
                width="250">
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
    name: 'Record',
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
        // 每页条数改变时触发 选择一页显示多少行
        handleSizeChange(val) {
            this.currentPage = 1
            this.pageSize = val
        },
        // 当前页改变时触发 跳转其他页
        handleCurrentChange(val) {
            this.currentPage = val
            this.getlivestockInfo(val)
        },
        // 请求api，获取信息
        getlivestockInfo(num1) {
            const that = this
            const params = new URLSearchParams()
            params.append('page', num1)
            // console.log("params",params)
            let url = 'http://106.54.17.29:8000/chenle/getrecord/?user_name=' + localStorage.getItem('userName')
            axios.get(url, params).then(response => {
                // console.log('请求成功');
                that.tableData = response.data.data
                that.currentPage = num1
                that.pageSize = that.tableData.pageSize
                that.total = that.tableData.total
            }).catch(error => {
            })
        },
    },
}
</script>

<style scoped>

</style>
