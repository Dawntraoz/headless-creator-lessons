<template>
  <figure class="py-2 mb-4">
    <img :src="body.image.filename" :alt="body.image.alt" />
    <figcaption class="bg-emerald-700 text-gray-100 p-2 flex items-center justify-between font-normal">
      {{ body.image.title }}
      <span class="text-xs italic">{{ body.image.copyright }}</span>
    </figcaption>
  </figure>
</template>

<script>
export default {
  props: {
    body: {
      type: Object,
      required: true,
    }
  }
}
</script>
