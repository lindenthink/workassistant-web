<template>
  <div class="page-wrapper">
    <header>
      <sub-header class="title" :panelArray="panelArray"></sub-header>
      <div class="action">
        <slot name="action"></slot>
      </div>
    </header>
    <slot></slot>
    <footer><p>Copyright @ 2019-{{ new Date().getFullYear() }} LindenThink（<a href="http://47.104.243.84/" target="_blank">菩提思</a>） All Rights Reserved.</p></footer>
  </div>
</template>

<script lang='ts' src='./PageWrapper.ts'/>

<style lang='scss' scoped>
  .page-wrapper {
    overflow: hidden;
    background-color: #F0F2F5;
    display: flex;
    flex: 1;
    flex-direction: column;
    header {
      display: flex;
      align-items: center;
      background-color: #FFF;
      padding: 0 18px;
      height: 54px;
      .title {
        flex: 1
      }
    }
    footer {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.45);
      padding: 32px 0;
      text-align: center;
    }
  }
</style>
