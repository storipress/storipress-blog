<script lang="ts" setup>
const { desks } = useDesks()
</script>

<template>
  <div class="nav mb-8 border-b-[.5px] shadow-md">
    <div class="w-full m-auto grid px-5 max-w-[1400px] lg:px-8">
      <nav class="uppercase min-w-0 flex justify-center">
        <ul class="flex gap-x-5 py-4 overflow-x-scroll">
          <li class="relative text-xs font-semibold whitespace-nowrap">
            <NuxtLink to="/" class="link-hover">Home</NuxtLink>
          </li>
          <li class="relative text-xs whitespace-nowrap font-semibold">
            <NuxtLink to="/latest" aria-hidden="true" aria-label="Latest articles" class="link-hover">
              <span>Latest</span>
            </NuxtLink>
          </li>
          <li v-for="desk in desks" :key="desk.id" class="relative text-xs whitespace-nowrap font-semibold">
            <NuxtLink :to="desk.url" aria-hidden="true" :aria-label="desk.name" class="link-hover">
              <span>{{ desk.name }}</span>
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.link-hover {
  @apply hover:after:absolute hover:after:block hover:after:w-full hover:after:h-1.5 hover:after:bg-sky-800 hover:after:mix-blend-multiply hover:after:top-[0.7rem];
}

.dark-mode {
  .nav {
    @apply border-b-[.5px] border-white;
  }
  .link-hover {
    @apply hover:after:bg-orange-300 hover:after:mix-blend-lighten;
  }
}
</style>
