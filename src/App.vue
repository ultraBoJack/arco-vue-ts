<script setup lang="ts">
  import zhCN from '@arco-design/web-vue/es/locale/lang/zh-cn'
</script>

<script lang="ts">
  export default {
    name: 'App',
  }
  // document.body.setAttribute('arco-theme', 'dark')
</script>

<template>
  <a-config-provider :locale="zhCN" :global="true">
    <router-view />
  </a-config-provider>
</template>
