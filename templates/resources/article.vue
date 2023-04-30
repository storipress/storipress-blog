<script lang="ts" setup>
type Article = ReturnType<typeof setupArticlePage>['value']

const article = setupPage({
  type: 'article',
})
const recommendArticles: Ref<Article[]> = useRecommendArticle(article.value, { count: 4 })
const { articles: lastArticles } = useFillArticles(4)
</script>

<template>
  <ArticleLayout :article="article" class="m-4" />
  <div class="max-w-[1400px] mx-auto px-8 pb-16">
    <div v-if="recommendArticles?.length" class="mt-16">
      <h2 class="my-2 leading-10 text-[2rem] font-bold font-sans pb-2 mb-6 border-b border-neutral-600 dark:text-white">
        Related
      </h2>
      <div class="grid gap-8 lg:grid-cols-4 sm:grid-cols-2">
        <ArticleCard
          v-for="recommendArticle of recommendArticles"
          :key="recommendArticle.id"
          :article="recommendArticle"
        />
      </div>
    </div>
    <div class="mt-16">
      <h2 class="my-2 leading-10 text-[2rem] font-bold font-sans pb-2 mb-6 border-b border-neutral-600 dark:text-white">
        Latest
      </h2>
      <div class="grid gap-8 lg:grid-cols-4 sm:grid-cols-2">
        <ArticleCard v-for="lastArticle of lastArticles" :key="lastArticle.id" :article="lastArticle" />
      </div>
    </div>
  </div>
</template>
