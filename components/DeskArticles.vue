<script lang="ts" setup>
const props = defineProps<{
  // FIXME: import type from @storipress/karbon/helper
  desk: any
  infiniteScroll?: boolean
  isDeskPage?: boolean
}>()

const { preload, createLoadMore } = useArticleLoader({
  preload: 4,
  chunk: props.infiniteScroll ? 16 : 0,
  condition: [{ type: 'desk', key: 'id', value: props.desk.id }],
})
</script>

<template>
  <section v-if="preload.length || isDeskPage" class="mt-16 grid gap-y-8">
    <div>
      <div class="w-full m-auto grid px-5 max-w-[1400px] lg:px-8">
        <h2 v-if="isDeskPage" class="text-[2rem] font-bold max-w-[85%] font-sans">Desk Name：{{ desk.name }}</h2>
        <div
          v-else
          class="flex items-baseline justify-between pb-2"
          :class="{ 'border-b-[.5px] border-black dark:border-neutral-600': !isDeskPage }"
        >
          <h2 class="text-[2rem] font-bold max-w-[85%] font-serif hover:underline">
            <NuxtLink :to="desk.url">Desk Name：{{ desk.name }}</NuxtLink>
          </h2>
          <div class="relative">
            <NuxtLink :to="desk.url" class="uppercase text-xs tracking-[.044rem] more-hover">See all</NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <div class="w-full m-auto grid px-5 max-w-[1400px] gap-8 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
      <FrontPageCard
        v-for="article in preload"
        :key="article.id"
        :article="article"
        class-content="mt-4 text-left"
        class-title="text-2xl leading-7"
        class-blurb="hidden"
        class-author="justify-start"
        class-meta="mt-2 flex-col"
      />
    </div>

    <InfiniteScroll
      v-if="props.infiniteScroll"
      v-slot="articles"
      :source="createLoadMore"
      class="w-full m-auto grid px-5 max-w-[1400px] gap-8 md:grid-cols-2 lg:grid-cols-4 lg:px-8"
    >
      <template v-for="article in articles.items" :key="article.id">
        <FrontPageCard
          :article="article"
          class-content="mt-4 text-left"
          class-title="text-2xl leading-7"
          class-blurb="hidden"
          class-author="justify-start"
          class-meta="mt-2 flex-col"
        />
      </template>
    </InfiniteScroll>
  </section>
</template>

<style lang="scss" scoped>
.more-hover {
  @apply hover:after:absolute hover:after:block hover:after:w-full hover:after:h-1.5 hover:after:bg-sky-800 hover:after:mix-blend-multiply hover:after:top-[1.1rem];
  @apply dark:hover:after:bg-orange-300 dark:hover:after:mix-blend-lighten;
}
</style>
