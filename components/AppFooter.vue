<script lang="ts" setup>
import type { SocialsTypes } from '~~/utils/types'

const site = useSite()

const currentYear = new Date().getFullYear()

const socials = computed(() => Object.entries(site.value?.socialLinks || {}) as [SocialsTypes, string][])
</script>

<template>
  <footer class="py-16 bg-stone-100 dark:bg-stone-800 mt-16">
    <section v-if="site.logo?.url" class="mx-auto">
      <NuxtLink to="/">
        <picture class="text-center">
          <nuxt-img
            :alt="site.publicationName"
            :src="site.logo.url"
            :height="site.logo.height"
            :width="site.logo.width"
            class="max-h-20 object-contain mx-auto w-full h-auto"
            loading="lazy"
          />
        </picture>
      </NuxtLink>
    </section>

    <ul class="flex gap-4 mx-auto justify-center my-8 flex-wrap">
      <li v-for="social of socials" :key="social[0]">
        <SocialsButton :type="social[0]" :url="`//${social[1]}`" />
      </li>
    </ul>

    <section class="text-center text-sm text-stone-800 dark:text-white">
      © {{ currentYear }} {{ site.publicationName }}
      <div>
        Published with
        <a
          href="https://storipress.com/"
          target="_blank"
          rel="noreferrer noopener"
          class="underline hover:no-underline"
        >
          Storipress
        </a>
        &
        <a
          href="https://developers.storipress.com/karbon/2gLtVFS6QEkdvKF7fkRng1"
          target="_blank"
          rel="noreferrer noopener"
          class="underline hover:no-underline"
        >
          Karbon
        </a>
      </div>
    </section>
  </footer>
</template>
