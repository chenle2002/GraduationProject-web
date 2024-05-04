<template>
    <div>
        <!-- 表格 -->

        <el-input v-model="text" placeholder="检索式" style="width: 30%; margin-bottom: 20px;">

        </el-input>
        <el-input v-model="des" placeholder="描述" style="width: 30%; margin-bottom: 20px;">

        </el-input>
        <el-button slot="append" icon="el-icon-search" @click="add" style="text-align: center; margin-left: 5%">保存</el-button>
        <el-table :data="tableData.list" style="width: 100%">

<!--            <el-table-column property="sid" show-overflow-tooltip="true" label="" min-width="1">-->
<!--                <template slot-scope="scope">-->
<!--                    {{ scope.$index + 1 }}-->
<!--                </template>-->
<!--            </el-table-column>-->
            <el-table-column
                prop="syntax"
                label="检索式"
                width="1200">
            </el-table-column>
            <el-table-column
                prop="time"
                label="时间"
                width="120">
            </el-table-column>
            <el-table-column
                prop="des"
                label="备注"
                width="120">
            </el-table-column>
            <el-table-column label="操作" align="center" min-width="80">
                <template slot-scope="scope">
                    <el-button type="info" @click="deleter(scope.row.id)">删除</el-button>
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
    name: 'SyntaxData',
    data() {
        return {
            tableData: {},
            currentPage: 1, // 当前页码
            total: 20, // 总条数
            pageSize: 5, // 每页的数据条数
            text: '',
            des: '',
        }
    },
    mounted() {
        this.getlivestockInfo(1)
    },
    methods: {
        deleter(val) {
            this.$confirm('此操作将永久删除该检索式, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                axios({
                    method: 'GET',
                    url: 'http://localhost:8000/wei/delete/',
                    params: {
                        id: val,
                    },
                }).then(res => {
                    if (res.data === '删除成功') {
                        this.$message({
                            type: 'success',
                            message: '删除检索式成功!',
                        })
                        this.getlivestockInfo(1)
                    } else {
                        this.$message.error(res.data)
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除检索式',
                })
            })
        },
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
        getlivestockInfo(num1) {
            axios({
                method: 'GET',
                url: 'http://localhost:8000/wei/get/',
                params: {
                    user_name: localStorage.getItem('userName'),
                    page: this.currentPage,
                },
            }).then(res => {
                if (res.data.status == 200) {
                    this.tableData = res.data.data
                } else {
                    this.$message.error(res.data)
                }
            })
        },
        add() {
            axios({
                method: 'GET',
                url: 'http://localhost:8000/wei/insert/',
                params: {
                    user_name: localStorage.getItem('userName'),
                    syntax: this.text,
                    des: this.des,
                },
            }).then(res => {
                if (res.data === '保存成功') {
                    this.$message({
                        type: 'success',
                        message: '保存检索式成功!',
                    })
                    this.getlivestockInfo(1)
                } else {
                    this.$message.error(res.data)
                }
            })
        },
    },
}
</script>

<style scoped>

</style>
