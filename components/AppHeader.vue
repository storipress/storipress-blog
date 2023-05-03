<script lang="ts" setup>
const site = useSite()
const { $paywall } = useNuxtApp()

const isSearchDialogOpened = ref(false)
watch(isSearchDialogOpened, (val) => {
  val ? document.body.classList.add('overflow-hidden') : document.body.classList.remove('overflow-hidden')
})

const isLoggedIn = computed(() => $paywall?.authInfo.value)
</script>

<template>
  <header class="py-5 border-b-[.5px] border-stone-200">
    <div
      class="grid gap-x-4 items-center grid-cols-[auto_2fr_auto] w-full m-auto px-5 max-w-[1400px] md:grid-cols-[1fr_2fr_1fr] lg:px-8"
    >
      <div class="uppercase flex gap-x-2 order-2 items-center ml-auto md:order-1 md:ml-0">
        <template v-if="false">
          <!-- light/dark mode toggle button -->
          <div
            v-if="$colorMode.value === 'light'"
            role="button"
            class="flex items-center gap-1"
            @click="$colorMode.preference = 'dark'"
          >
            <Icon name="material-symbols:dark-mode" />
            <span class="leading-4 tracking-[.044rem] font-medium text-xs hidden lg:block hover:underline">Dark</span>
          </div>

          <div v-else role="button" class="flex items-center gap-1" @click="$colorMode.preference = 'light'">
            <Icon name="material-symbols:light-mode-outline" />
            <span class="leading-4 tracking-[.044rem] font-medium text-xs hidden lg:block hover:underline">Light</span>
          </div>
        </template>

        <!-- search button -->
        <div role="button" class="flex items-center gap-1" @click="isSearchDialogOpened = true">
          <Icon name="material-symbols:search" />
          <span class="leading-4 tracking-[.044rem] font-medium text-xs hidden lg:block hover:underline">Search</span>
        </div>
      </div>

      <!-- site logo -->
      <div class="grow order-1 md:order-2">
        <NuxtLink to="/" class="link-hover mx-auto block w-fit">
          <nuxt-img :alt="site.publicationName" class="max-h-12 max-w-full w-full h-auto" :src="site.logo?.url" />
        </NuxtLink>
      </div>

      <div class="order-3 justify-self-end lg:flex lg:gap-x-4">
        <a class="link-hover text-xs" href="https://storipress.com"> Back to Storipress </a>
      </div>
    </div>

    <SearchDialog v-show="isSearchDialogOpened" @close="isSearchDialogOpened = false" />
  </header>
</template>

<style lang="scss" scoped>
.dark-mode {
  header {
    @apply border-white;
  }
}
</style>
