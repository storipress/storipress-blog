<script setup lang="ts">
import dayjs from 'dayjs'

type Article = ReturnType<typeof setupArticlePage>['value']
defineProps<{ article: Article }>()
</script>

<template>
  <article class="overflow-hidden">
    <NuxtLink
      :to="`/posts/${article.slug}`"
      class="block relative mb-4 aspect-[3/2] bg-neutral-100 rounded-3xl after:content-[''] after:absolute after:inset-0 after:hover:bg-black/10 after:transition-colors after:rounded-3xl duration-500"
    >
      <nuxt-img
        v-if="article.cover?.url"
        :src="article.cover.url"
        :alt="article.cover?.alt"
        class="object-cover w-full h-full rounded-3xl"
        loading="lazy"
      />
      <div v-else class="aspect-[3/2] bg-gray-100 rounded-3xl transition duration-200 ease-in" />
    </NuxtLink>
    <div>
      <NuxtLink
        :to="`/desks/${article.desk.slug}`"
        class="text-sky-800 uppercase font-medium text-xs tracking-[.7px] hover:underline dark:text-orange-300"
      >
        {{ article.desk.name }}
      </NuxtLink>
      <h3 class="my-2 text-2xl font-semibold font-sans hover:underline dark:text-white">
        <NuxtLink :to="`/posts/${article.slug}`">
          {{ article.title }}
        </NuxtLink>
      </h3>
      <p class="flex gap-2 flex-wrap">
        <NuxtLink
          v-for="author of article.authors"
          :key="author.id"
          :to="`/author/${author.id}`"
          class="block text-xs font-medium uppercase text-gray-600 dark:text-neutral-400 tracking-[.7px] hover:underline"
        >
          {{ author.name }}
        </NuxtLink>
      </p>
      <time
        v-if="article.published_at"
        class="text-xs mt-2 text-gray-600 dark:text-neutral-400"
        :datetime="article.published_at"
      >
        {{ dayjs(article.published_at).format('MMMM DD, YYYY') }}
      </time>
    </div>
  </article>
</template>

<style scoped></style>
