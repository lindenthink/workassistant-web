<template>
    <!--顶层含面包屑wrapper-->
    <page-wrapper :panelArray="panelArray" class="account-list">
        <!--内层含滚动条wrapper-->
        <list-wrapper>
            <!--搜索栏-->
            <template slot="query">
                <el-row>
                    <el-col :span="6">
                        <form-item label="员工">
                            <el-select v-model="filter.employeeUuidEq" filterable placeholder="请选择" clearable>
                                <el-option v-for="item in employees"
                                           :key="item.uuid"
                                           :label="item.name"
                                           :value="item.uuid">
                                    <span style="float: left">{{ item.name }}</span>
                                    <el-tag size="small" style="float: right; font-size: 10px;" :type="item.state ===1 ? 'success' : 'danger'">{{ item.state|$state }}</el-tag>
                                </el-option>
                            </el-select>
                        </form-item>
                    </el-col>
                    <el-col :span="12">
                        <form-item label="账期">
                            <el-date-picker
                                    v-model="accountDateRange"
                                    type="daterange"
                                    align="right"
                                    range-separator="-"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    value-format="yyyy-MM-dd"
                                    :clearable="false"
                                    :picker-options="pickerOptions">
                            </el-date-picker>
                        </form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-button type="primary" icon="el-icon-search"  @click="onSearch(1)">查询</el-button>
                        <el-button type="info" icon="el-icon-download"  @click="onExport()">导出</el-button>
                    </el-col>
                </el-row>
            </template>

            <!--操作栏-->
            <template slot="toolbar">
                <el-button size="small" type="success" icon="el-icon-circle-plus-outline" @click="showAddDialog">新增账务</el-button>
            </template>

            <!--列表栏-->
            <template slot="list">
                <el-table
                        :data="tableData"
                        border
                        stripe
                        :summary-method="getSummaries"
                        show-summary
                        style="width: 100%">
                    <el-table-column type="index" width="50" label="序号"></el-table-column>
                    <el-table-column prop="employeeName" label="姓名" />
                    <el-table-column prop="deductionItemCaption" label="条目" />
                    <el-table-column prop="accountDate" label="账期"/>
                    <el-table-column prop="amount" label="金额"/>
                    <el-table-column prop="remarks" label="备注"/>
                    <el-table-column label="操作" align="center" width="180">
                        <template slot-scope="scope">
                            <el-button @click="showModifyDialog(scope.row)" size="small">编辑</el-button>
                            <el-button type="danger" @click="doDelete(scope.row)" size="small">删除</el-button>
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
                        :page-sizes="[10, 20, 50, 100]"
                        :page-size="10"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="page.total">
                </el-pagination>
            </template>
        </list-wrapper>

        <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="40%" center>
            <el-form :model="curAccount" :rules="rules" ref="form" label-width="80px">
                <el-form-item label="员工" prop="employeeId">
                    <el-select v-model="curAccount.employeeId" filterable placeholder="请选择">
                        <el-option v-for="item in employees"
                                   :key="item.uuid"
                                   :label="item.name"
                                   :value="item.uuid">
                            <span style="float: left">{{ item.name }}</span>
                            <el-tag size="small" style="float: right; font-size: 10px;" :type="item.state ===1 ? 'success' : 'danger'">{{ item.state|$state }}</el-tag>
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="条目" prop="deductionItemId">
                    <el-select v-model="curAccount.deductionItemId" filterable placeholder="请选择">
                        <el-option v-for="item in deductions"
                                   :key="item.uuid"
                                   :label="item.caption"
                                   :value="item.uuid">
                            <span style="float: left">{{ item.caption }}</span>
                            <el-tag size="small" style="float: right; font-size: 10px;" :type="item.type ===1 ? 'success' : 'danger'">{{ item.type|$type }}</el-tag>
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="账期" prop="accountDate">
                    <el-date-picker
                            v-model="curAccount.accountDate"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="选择账期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="金额" prop="amount">
                    <el-input v-model="curAccount.amount" placeholder="请输入金额" clearable></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="remarks">
                    <el-input v-model="curAccount.remarks" placeholder="请输入备注" clearable></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="doSave">确 定</el-button>
            </div>
        </el-dialog>
    </page-wrapper>
</template>

<script lang="ts" src="./AccountList.ts">
</script>

<style lang="scss">
</style>
