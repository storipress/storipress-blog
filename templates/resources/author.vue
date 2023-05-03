<script lang="ts" setup>
const author = setupAuthorPage()

useHead(() => {
  return {
    title: `All articles by ${author.value.full_name}`,
  }
})
</script>

<template>
  <section class="m-4">
    <picture>
      <img :alt="author.full_name" :src="author.avatar" />
    </picture>

    <h1>{{ author.full_name }}</h1>

    <p>{{ author.bio }}</p>
  </section>
</template>
