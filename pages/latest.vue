<script lang="ts" setup>
const { preload, loadMore: loadMoreArticle } = useArticleLoader({
  preload: 16,
  chunk: 16,
})

type Articles = typeof preload.value

const list = reactive<Articles>([])
const articles = computed<Articles>(() => [...preload.value, ...list])
const loading = ref(false)
const allDone = ref(false)
const loadMore = async () => {
  if (loading.value) return
  loading.value = true

  const { done, value } = await loadMoreArticle()
  if (done) {
    allDone.value = done
    return
  }
  list.push(...value)
  loading.value = false
}
</script>

<template>
  <div class="max-w-[1400px] mx-auto px-8 pb-16">
    <h1 class="mb-8 text-[40px] leading-[3rem] tracking-[-.5px] font-semibold dark:text-white">Latest</h1>
    <div class="grid gap-8 lg:grid-cols-4 sm:grid-cols-2">
      <ArticleCard v-for="article of articles" :key="article.id" :article="article" />
    </div>
    <button
      v-if="!allDone"
      type="button"
      class="block mx-auto mt-16 bg-sky-800 rounded-[4px] py-4 px-6 text-white text-xs tracking-[.7px] font-medium hover:bg-black dark:text-black dark:bg-orange-300 dark:hover:bg-white"
      @click="loadMore"
    >
      {{ loading ? 'LOADING' : 'LOAD MORE' }}
    </button>
  </div>
</template>
