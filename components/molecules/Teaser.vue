<template>
  <h1
    v-editable="blok"
    class="py-10 text-center font-bold text-4xl md:text-6xl leading-light md:leading-light"
  >
    {{ blok.headline }}
  </h1>
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
