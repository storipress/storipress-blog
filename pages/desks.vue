<script lang="ts" setup>
useHead({
  title: 'All desks',
})
const { desks } = useDesks()
</script>

<template>
  <ul>
    <li v-for="desk of desks" :key="desk.id">
      <NuxtLink :to="desk.url">
        {{ desk.name }}
      </NuxtLink>
    </li>
  </ul>
</template>
