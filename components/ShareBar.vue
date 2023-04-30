<script lang="ts" setup>
const props = defineProps<{
  image: string
}>()

const url = encodeURI(location?.href || '')
const title = encodeURI(document?.title || '')
const socialMedia = computed(() => [
  {
    type: 'Twitter',
    icon: 'bxl:twitter',
    url: `https://twitter.com/share?text=${title}&url=${url}`,
  },
  {
    type: 'Facebook',
    icon: 'bxl:facebook',
    url: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
  },
  {
    type: 'Pinterest',
    icon: 'bxl:pinterest',
    url: `http://pinterest.com/pin/create/button/?url=${url}&media=${props.image}&description=${title}`,
  },
  {
    type: 'Linkedin',
    icon: 'bxl:linkedin-square',
    url: `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`,
  },
  {
    type: 'Whatsapp',
    icon: 'bxl:whatsapp',
    url: `whatsapp://send?text=${title}%20${url}`,
  },
  {
    type: 'Mail',
    icon: 'octicon:mail',
    url: `mailto:?subject=${title}&amp;body=${url}`,
  },
])
</script>

<template>
  <div class="flex gap-4 justify-end">
    <a
      v-for="media of socialMedia"
      :key="media.type"
      :href="media.url"
      target="_blank"
      rel="noreferrer noopener"
      class="group flex rounded-full border border-black w-10 h-10 justify-center items-center hover:bg-black dark:bg-stone-800"
    >
      <Icon
        :name="media.icon"
        class="text-black group-hover:text-white dark:text-neutral-400 dark:group-hover:text-white"
      />
    </a>
  </div>
</template>
