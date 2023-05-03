<script lang="ts" setup>
const { $paywall } = useNuxtApp()

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | Storipress Blog` : 'Storipress Blog'
  },
})

onMounted(() => {
  setTimeout(() => {
    $paywall.mount()
    $paywall.checkQuery()
  }, 1000)
})

useAdvertisingHandler((segments) => {
  return segments
    .map((segment) => {
      if (segment.type !== 'embed') return segment
      return [
        segment,
        {
          type: 'ad' as const,
          id: 'banner-ad',
          props: {},
        },
      ]
    })
    .flat()
})
</script>

<template>
  <div :class="$colorMode.preference">
    <AppHeader />

    <AppNavigator />

    <main>
      <NuxtPage />
    </main>

    <AppFooter />

    <div id="paywall" />
  </div>
</template>

<style lang="scss">
.dark-mode body {
  @apply bg-zinc-900 text-white;
}
</style>
