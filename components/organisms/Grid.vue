<template>
  <ul v-editable="blok" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <li v-for="blok in blok.columns" :key="blok._uid">
      <component :blok="blok" :is="blok.component" class="h-full" />
    </li>
  </ul>
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
