<script lang="ts" setup>
const desk = setupDeskPage()

useHead(() => {
  return {
    title: `All articles under ${desk.value.name}`,
  }
})
</script>

<template>
  <DeskArticles :desk="desk" infinite-scroll is-desk-page />
</template>
