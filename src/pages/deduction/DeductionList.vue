<template>
    <!--顶层含面包屑wrapper-->
    <page-wrapper :panelArray="panelArray" class="deduction-list">
        <!--内层含滚动条wrapper-->
        <list-wrapper>
            <!--操作栏-->
            <template slot="toolbar">
                <el-button size="small" type="success" icon="el-icon-circle-plus-outline" @click="showAddDialog">新增条目</el-button>
            </template>
            <!--列表栏-->
            <template slot="list">
                <el-table :data="tableData" border stripe style="width: 100%">
                    <el-table-column type="index" width="50" label="序号"></el-table-column>
                    <el-table-column label="名称" prop="caption">
                    </el-table-column>
                    <el-table-column label="类型">
                        <template slot-scope="scope">
                            <el-tag :type="scope.row.type === -1 ? 'danger':'success'" effect="plain">
                                {{ scope.row.type|$type }}
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
        </list-wrapper>

        <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="40%" center>
            <el-form :model="curDeduction" :rules="rules" ref="form" label-width="80px">
                <el-form-item label="名称" prop="caption">
                    <el-input v-model="curDeduction.caption" placeholder="请输入条目名称" clearable></el-input>
                </el-form-item>
                <el-form-item label="类型" prop="type">
                    <el-select v-model="curDeduction.type" placeholder="请选择收支类型">
                        <el-option label="支出" :value.number="-1"></el-option>
                        <el-option label="收入" :value.number="1"></el-option>
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

<script lang="ts" src="./DeductionList.ts">
</script>

<style lang="scss">
    .deduction-list {
    }
</style>
