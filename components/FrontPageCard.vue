<script setup lang="ts">
import dayjs from 'dayjs'

defineProps<{
  // FIXME: import type from @storipress/karbon/helper
  article: any
  classHeroPhoto?: string
  classHeroPhotoImg?: string
  classArticle?: string
  classContent?: string
  classMeta?: string
  classDesk?: string
  classTitle?: string
  classBlurb?: string
  classAuthor?: string
}>()

const { _resolveFromMetaSync } = useResourceResolver()
</script>

<template>
  <article class="group" :class="classArticle">
    <NuxtLink :to="article.url" class="block" :class="classHeroPhoto">
      <nuxt-img
        v-if="article.cover?.url"
        width="600"
        height="200"
        :src="article.cover.url"
        :alt="article.cover?.alt"
        class="rounded-xl object-cover aspect-[3/2] w-full h-auto group-hover:brightness-75 transition duration-200 ease-in"
        :class="classHeroPhotoImg"
        loading="lazy"
        sizes="sm:100vw md:50vw lg:400px"
      />
      <div
        v-else
        class="rounded-xl aspect-[3/2] bg-gray-100 transition duration-200 ease-in group-hover:brightness-90"
        :class="classHeroPhotoImg"
      />
      <slot name="image" />
    </NuxtLink>

    <div :class="classContent">
      <div class="uppercase text-xs tracking-[.044rem] text-sky-800 leading-4 dark:text-orange-300" :class="classDesk">
        <NuxtLink
          v-if="article.desk?.name"
          :to="_resolveFromMetaSync('desk', article.desk)?.url"
          aria-hidden="true"
          :aria-label="article.desk.name"
          class="hover:underline"
        >
          {{ article.desk.name }}
        </NuxtLink>
      </div>

      <NuxtLink :to="article.url" aria-hidden="true" :aria-label="article.title">
        <ArticleTitle
          :value="article.title"
          class="font-medium mt-2 break-words font-serif line-clamp-3 group-hover:underline"
          :class="classTitle"
        />
      </NuxtLink>
      <ArticleBlurb :value="article.blurb" class="leading-6 text-lg mt-2" :class="classBlurb" />

      <div class="flex gap-2 text-xs text-gray-600 dark:text-neutral-400" :class="classMeta">
        <div class="uppercase line-clamp-2" :class="classAuthor">
          <NuxtLink
            v-for="author in article.authors"
            :key="author.id"
            :to="_resolveFromMetaSync('author', author)?.url"
            aria-hidden="true"
            aria-label="author page"
            class="mr-1 hover:underline last:mr-0"
          >
            {{ author.full_name }}
          </NuxtLink>
        </div>

        <time>{{ dayjs(article.published_at).format('MMMM D, YYYY') }}</time>
      </div>
    </div>
  </article>
</template>
