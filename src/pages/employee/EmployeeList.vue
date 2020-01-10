<template>
    <!--顶层含面包屑wrapper-->
    <page-wrapper :panelArray="panelArray">
        <!--内层含滚动条wrapper-->
        <list-wrapper>
            <!--搜索栏-->
            <template slot="query">
                <el-row>
                    <el-col :span="8">
                        <form-item label="员工名称">
                            <el-input v-model="filter.nameLike" placeholder="员工名称类似于"  clearable></el-input>
                        </form-item>
                    </el-col>
                    <el-col :span="8" style="margin-left: 20px;">
                        <el-button type="primary" icon="el-icon-search"  @click="onSearch(1)">查询</el-button>
                    </el-col>
                </el-row>
            </template>

            <!--操作栏-->
            <template slot="toolbar">
                <el-button size="small" type="success" icon="el-icon-circle-plus-outline" @click="showAddDialog">新增员工</el-button>
            </template>

            <!--列表栏-->
            <template slot="list">
                <el-table
                        :data="tableData"
                        border
                        stripe
                        style="width: 100%">
                    <el-table-column type="index" width="50" label="序号"></el-table-column>
                    <el-table-column prop="name" label="姓名" />
                    <el-table-column prop="phone" label="手机号" />
                    <el-table-column prop="bankCardNo" label="银行卡号"/>
                    <el-table-column label="状态" width="80">
                        <template slot-scope="scope">
                            <el-tag :type="scope.row.state === 0 ? 'danger':'success'" effect="plain">
                                {{ scope.row.state|$state }}
                            </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center" width="180">
                        <template slot-scope="scope">
                            <el-button type="text" @click="showModifyDialog(scope.row)">编辑</el-button>
                            <el-button type="text" @click="doDelete(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>

            <!--分页栏-->
            <template slot="page">
                <el-pagination
                        background
                        @size-change="onHandleSizeChange"
                        @current-change="onHandleCurrentChange"
                        current-page="page.currentPage"
                        :page-sizes="[10, 20, 30, 40]"
                        :page-size="10"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="page.total">
                </el-pagination>
            </template>
        </list-wrapper>

        <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="40%" center>
            <el-form :model="curEmployee" :rules="rules" ref="form" label-width="80px">
                <el-form-item label="员工姓名" prop="name">
                    <el-input v-model="curEmployee.name" placeholder="请输入员工姓名" clearable></el-input>
                </el-form-item>
                <el-form-item label="手机号码" prop="phone">
                    <el-input v-model="curEmployee.phone" placeholder="请输入手机号码" clearable></el-input>
                </el-form-item>
                <el-form-item label="银行卡号" prop="bankCardNo">
                    <el-input v-model="curEmployee.bankCardNo" placeholder="请输入银行卡号" clearable></el-input>
                </el-form-item>
                <el-form-item label="状态" prop="type">
                    <el-select v-model="curEmployee.state">
                        <el-option label="在职" :value.number="1"></el-option>
                        <el-option label="离职" :value.number="0"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="doSave">确 定</el-button>
            </div>
        </el-dialog>
    </page-wrapper>
</template>

<script lang="ts" src="./EmployeeList.ts">
</script>

<style lang="scss">
</style>
