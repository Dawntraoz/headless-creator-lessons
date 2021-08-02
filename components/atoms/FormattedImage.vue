<template>
  <figure class="py-2 mb-4">
    <img
      :src="transformImage(body.image.filename, body.size)"
      :width="body.size.split('x')[0]"
      :height="body.size.split('x')[1]"
      :alt="body.image.alt"
      loading="lazy"
    />
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
  },
  methods: {
    canUseWebP() {
      if (window.canUseWebP) return window.canUseWebP;

      const el = document.createElement('canvas');
      if (el.getContext && el.getContext('2d')) {
        window.canUseWebP = el.toDataURL('image/webp').indexOf('data:image/webp') === 0;
        return window.canUseWebP;
      }

      window.canUseWebP = false;
      return window.canUseWebP;
    },
    transformImage(image, option) {
      if (!image) return '';
      if (!option) return image;
 
      const imageService = '//img2.storyblok.com/';
      let path = image.replace('https://a.storyblok.com', '');
      path = path.replace('//a.storyblok.com', '');
      let format = ''
      if (process.client) {
        format = !this.canUseWebP() ? '' : '/filters:format(webp)'
      }
      return imageService + option + format + path;
    }
  }
}
</script>
