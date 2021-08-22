<template>
  <div
    :class="[
      'border-2 border-emerald-500 px-6 rounded-lg prose',
      body.prose_classes
    ]"
  >
    <rich-text-renderer v-if="!!richTextContent" :document="richTextContent" />
  </div>
</template>

<script>
export default {
  props: {
    body: {
      type: Object,
      required: true
    }
  },
  computed: {
    richTextContent() {
      return this.body ? this.body.rich_text : false
    }
  }
}
</script>
