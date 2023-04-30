<script lang="ts" setup>
const emit = defineEmits<{
  (e: 'close'): void
}>()

const $dialog = ref(null)

const { searchClient, indexName } = useSearchClient({ queryBy: 'title,author_names,tag_names' })

const { _resolveFromMetaSync } = useResourceResolver()

const searchInput = ref('')

const onClose = () => {
  emit('close')
  searchInput.value = ''
}

onClickOutside($dialog, onClose)

useIntersectionObserver($dialog, ([{ isIntersecting }]) => {
  if (isIntersecting) {
    ;($dialog?.value as HTMLElement | null)?.querySelector('input')?.focus()
  }
})
</script>

<template>
  <section class="relative z-50">
    <ClientOnly>
      <div
        class="fixed inset-0 h-screen w-screen backdrop-blur-[2px] antialiased to-black/10 from-black/20 bg-gradient-to-br animate-[fadein_.15s]"
      />
      <AisInstantSearch
        class="fixed inset-0 h-screen w-screen pt-20"
        :index-name="indexName"
        :search-client="searchClient"
      >
        <div
          ref="$dialog"
          class="w-full max-w-[95vw] md:max-w-lg m-auto rounded-lg shadow-xl bg-white animate-[popup_.2s_ease]"
        >
          <AisSearchBox
            v-model="searchInput"
            autofocus
            :class-names="{
              'ais-SearchBox': 'shadow py-5 px-7',
              'ais-SearchBox-form': 'flex items-center',
              'ais-SearchBox-input':
                'grow font-light text-base focus-visible:outline-none placeholder:text-gray-400 outline-none truncate order-2',
              'ais-SearchBox-submit': `mr-4 ${searchInput ? 'hidden' : 'block'}`,
              'ais-SearchBox-submitIcon': 'w-4 h-4',
              'ais-SearchBox-reset': 'mr-4 order-1',
              'ais-SearchBox-resetIcon': 'w-4 h-4',
            }"
            placeholder="Search posts, tags and authors"
          />

          <AisHits v-slot="{ items }" class="overflow-y-auto max-h-[calc(100vh-172px)] py-4 px-7">
            <template v-if="items?.length === 0">
              <p class="no-result text-neutral-400">No matches found</p>
            </template>

            <template v-else>
              <h1 class="uppercase text-xs text-neutral-400 font-semibold mb-1">Posts</h1>
              <NuxtLink
                v-for="item in items"
                :key="item.id"
                :to="_resolveFromMetaSync('article', item)?.url"
                class="block py-3 px-7 -mx-7 text-neutral-800 font-medium hover:bg-neutral-100"
                @click="onClose"
              >
                {{ item.title }}
              </NuxtLink>
            </template>
          </AisHits>
        </div>
      </AisInstantSearch>
    </ClientOnly>
  </section>
</template>

<style lang="scss">
input[type='search']::-webkit-search-cancel-button {
  @apply hidden;
}

@keyframes popup {
  0% {
    -webkit-transform: translateY(-20px);
    transform: translateY(-20px);
    opacity: 0;
  }
  1% {
    -webkit-transform: translateY(20px);
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes fadein {
  0% {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
