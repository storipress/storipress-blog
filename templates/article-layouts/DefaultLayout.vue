<script setup lang="ts">
import dayjs from 'dayjs'

const article = useArticle()

const { resolveFromResource } = useResourceResolver()
</script>

<template>
  <article class="max-w-[708px] mx-auto px-5">
    <NuxtLink
      :to="`/desks/${article.desk.slug}`"
      class="text-sky-800 uppercase font-medium text-xs tracking-[.7px] hover:underline dark:text-orange-300"
    >
      {{ article.desk.name }}
    </NuxtLink>

    <ArticleTitle
      class="my-2 font-semibold font-sans dark:text-white text-[1.75rem] leading-8 lg:text-[2.5rem] lg:leading-[3rem]"
    />
    <ArticleBlurb class="text-xl font-sans dark:text-white lg:text-2xl" />

    <div class="flex gap-2 flex-wrap mt-4">
      <NuxtLink
        v-for="author in article.authors"
        :key="author.id"
        :to="resolveFromResource('author', author)?.url || `/author/${author.id}`"
        aria-hidden="true"
        :aria-label="author.full_name"
        class="block text-xs font-medium uppercase text-gray-600 dark:text-neutral-400 tracking-[.7px] hover:underline"
      >
        <span>{{ author.full_name }}</span>
      </NuxtLink>
    </div>
    <time class="block text-xs mt-2 text-gray-600 dark:text-neutral-400" :datetime="article.published_at">
      {{ dayjs(article.published_at).format('MMMM DD, YYYY') }}
    </time>

    <ClientOnly>
      <ShareBar :image="article.cover?.url" class="mt-4 sm:mt-0" />
    </ClientOnly>

    <hr class="my-8 border-neutral-300" />

    <figure>
      <ArticleHeroPhoto v-if="article.cover?.url" :src="article.cover.url" width="668" height="445" class="w-full" />
      <figcaption v-if="article.cover?.alt" class="text-xs pt-2 text-gray-600 dark:text-neutral-400">
        {{ article.cover?.alt }}
      </figcaption>
    </figure>

    <div class="mt-8 font-sans">
      <ArticleBody class="prose lg:prose-lg dark:prose-invert" />
    </div>
  </article>
</template>
