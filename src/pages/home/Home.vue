<template>
    <!--顶层含面包屑wrapper-->
    <page-wrapper :panelArray="panelArray">
        <!--内层含滚动条wrapper-->
        <dtl-wrapper>
            <el-card >
                <el-alert :title="item" type="success" :closable="false" v-for="item,index in notes" :key="index" style="margin-bottom:30px;">
                </el-alert>
            </el-card>
        </dtl-wrapper>
    </page-wrapper>
</template>

<script lang="ts" src="./Home.ts">
</script>

<style lang="scss">

</style>
