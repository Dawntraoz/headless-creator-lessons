import Vue from 'vue'
import VueRichTextRenderer from '@marvr/storyblok-rich-text-vue-renderer'
import UploadedImage from '~/components/atoms/UploadedImage.vue'
import FormattedImage from '~/components/atoms/FormattedImage.vue'
 
Vue.use(VueRichTextRenderer, {
  resolvers: {
    components: {
      'uploaded-image': UploadedImage,
      'formatted-image': FormattedImage,
    }
  }
})
