<script lang="ts" setup>
const { desks } = useDesks()
const { articles } = useFillArticles(9)

const centerArticle = computed(() => articles.value?.slice(0, 1)[0])
const leftArticle = computed(() => articles.value?.slice(1, 3))
const rightArticle = computed(() => articles.value?.slice(3))
</script>

<template>
  <div class="grid w-full m-auto px-5 max-w-[1400px] lg:px-8">
    <div class="grid lg:gap-x-8 lg:grid-cols-[repeat(12,1fr)] lg:grid-rows-[minmax(2rem,auto)_repeat(2,1fr)]">
      <div
        class="relative order-2 mt-8 lg:col-[1_/_span_3] after:border-r-0 lg:mt-0 lg:after:border-r-[.5px] after:border-neutral-300 after:absolute after:right-[calc(calc(32px/2)*-1)] after:top-0 after:bottom-0 after:left-auto dark:after:border-neutral-600"
      >
        <div
          v-for="(article, index) in leftArticle"
          :key="index"
          class="pb-4 mb-4 border-b-[.5px] border-neutral-300 dark:border-neutral-600 last:border-0"
        >
          <FrontPageCard
            :article="article"
            class-content="mt-4 text-left"
            class-title="decoration-sky-800 text-2xl leading-7 dark:decoration-orange-300"
            class-blurb="hidden"
            class-author="justify-start"
            class-meta="mt-2 flex-col"
          />
        </div>
      </div>
      <div
        class="relative order-0 mt-0 after:border-r-0 lg:col-[4_/_span_6] lg:row-start-1 lg:after:border-r-[.5px] after:border-neutral-300 after:absolute after:right-[calc(calc(32px/2)*-1)] after:top-0 after:bottom-0 after:left-auto dark:after:border-neutral-600"
      >
        <FeaturedCard :article="centerArticle" class-desk="order-1" />
      </div>
      <div class="order-3 mt-8 lg:col-[10_/_span_3] lg:mt-0">
        <div
          v-for="(article, index) in rightArticle"
          :key="index"
          class="pb-4 mb-4 border-b-[.5px] border-neutral-300 dark:border-neutral-600 last:border-0 last:pb-0 last:mb-0"
        >
          <FrontPageCard
            :article="article"
            class-article="flex"
            class-hero-photo="w-24 basis-24 ml-4 order-1"
            class-content="flex-[1] order-0"
            class-title="text-base leading-5 decoration-sky-800 dark:decoration-orange-300"
            class-blurb="hidden"
            class-meta="mt-2 flex-wrap items-center"
          />
        </div>
      </div>
    </div>
  </div>

  <DeskArticles v-for="desk in desks" :key="desk.id" :desk="desk" />
</template>
