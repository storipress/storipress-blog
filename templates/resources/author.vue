<script lang="ts" setup>
const author = setupAuthorPage()

const { preload, loadMore: loadMoreArticle } = useArticleLoader({
  preload: 16,
  chunk: 16,
  condition: [{ type: 'author', key: 'id', value: author.value.id }],
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
  <section class="px-5 lg:px-8">
    <div class="mb-8">
      <div class="grid w-full m-auto max-w-[1400px] gap-8 md:grid-cols-2">
        <div>
          <picture>
            <img :alt="author.full_name" :src="author.avatar" class="w-24 h-24 rounded-full mb-4" />
          </picture>

          <h1 class="text-[1.75rem] leading-8 font-medium">{{ author.full_name }}</h1>

          <p class="mt-2 text-2xl leading-7 font-normal">{{ author.bio }}</p>

          <div class="mt-4 text-gray-600 dark:text-neutral-400">
            <a v-for="(link, social) in author.socials" :key="social" :href="`https://${link}`" target="_blank" rel="noopener" class="underline mr-2">{{ social }}</a>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-[1400px] mx-auto pb-16">
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
  </section>
</template>
