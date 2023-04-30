<script lang="ts" setup>
const desk = setupDeskPage()
</script>

<template>
  <DeskArticles :desk="desk" infinite-scroll is-desk-page />
</template>
