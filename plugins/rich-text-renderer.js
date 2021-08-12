import Vue from 'vue'
import VueRichTextRenderer from '@marvr/storyblok-rich-text-vue-renderer'
import UploadedImage from '~/components/atoms/lesson-1/UploadedImage.vue'
import FormattedImage from '~/components/atoms/lesson-1/FormattedImage.vue'
 
Vue.use(VueRichTextRenderer, {
  resolvers: {
    components: {
      'uploaded-image': UploadedImage,
      'formatted-image': FormattedImage,
    }
  }
})
