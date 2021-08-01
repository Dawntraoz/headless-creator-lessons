<template>
  <article
    v-editable="blok"
    class="border-2 border-gray-100 p-6 flex flex-col"
  >
    <p class="font-oswald font-light text-gray-500 text-3xl pb-4">{{ blok.name }}</p>
    <h2 class="font-bold text-2xl text-emerald-700">
      <nuxt-link :to="`/${blok.link.cached_url}`">
        {{ blok.title }}
      </nuxt-link>
    </h2>
    <p class="mt-auto flex items-center text-xs pt-4 text-gray-500">
      {{
        new Date(blok.date).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      }}
      <span class="block w-2 h-2 rounded-full bg-emerald-500 mx-2"></span>
      <a
        :href="blok.external_link.url"
        target="_blank"
        rel="noopener noreferrer"
        class="text-emerald-700"
        >Link to lesson</a
      >
    </p>
  </article>
</template>

<script>
export default {
  props: {
    blok: {
      type: Object,
      required: true
    }
  }
}
</script>
