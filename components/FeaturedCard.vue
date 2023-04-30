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
    <NuxtLink :to="article.url" class="block relative" :class="classHeroPhoto">
      <ArticleHeroPhoto
        v-if="article.cover?.url"
        width="405"
        height="270"
        :src="article.cover.url"
        :alt="article.cover?.alt"
        class="object-cover w-full transition duration-200 ease-in rounded-3xl aspect-[5/3]"
        :class="classHeroPhotoImg"
      />
      <div
        v-else
        class="rounded-3xl aspect-[3/2] bg-gray-100 transition duration-200 ease-in"
        :class="classHeroPhotoImg"
      />
      <slot name="image">
        <div
          class="rounded-3xl pointer-events-none absolute top-auto bottom-0 h-full w-full translate-y-0 bg-gradient-to-t from-white/10 to-transparent dark:from-black/20"
        />
        <div
          class="rounded-3xl pointer-events-none absolute top-auto bottom-0 h-1/3 w-full translate-y-0 bg-gradient-to-t from-white/20 to-transparent dark:from-black/30"
        />
      </slot>
    </NuxtLink>

    <div class="relative -mt-24 flex flex-col lg:ml-[9rem]" :class="classContent">
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
          class="font-medium mt-2 break-words font-serif inline text-[4.375rem] leading-[3.375rem] group-hover:shadow-[0_0_#000,0_0_#000,0_0_#000,0_0_#000,inset_0_-2.5rem_0_0_#000] group-hover:shadow-sky-800 dark:group-hover:shadow-[0_0_#000,0_0_#000,0_0_#000,0_0_#000,inset_0_-2.5rem_0_0_#000] dark:group-hover:shadow-orange-300"
          :class="classTitle"
        />
      </NuxtLink>
      <ArticleBlurb :value="article.blurb" class="leading-6 text-lg mt-2" :class="classBlurb" />

      <div class="flex gap-2 text-xs text-gray-600 dark:text-neutral-400 mt-2 flex-col" :class="classMeta">
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
