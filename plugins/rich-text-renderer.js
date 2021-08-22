import Vue from 'vue'
import VueRichTextRenderer from '@marvr/storyblok-rich-text-vue-renderer'

/* Components - Lesson 1 */
import UploadedImage from '~/components/atoms/lesson-1/UploadedImage.vue'
import FormattedImage from '~/components/atoms/lesson-1/FormattedImage.vue'

/* Components - Lesson 2 */
import RichTextStyled from '~/components/atoms/lesson-2/RichTextStyled.vue'
 
Vue.use(VueRichTextRenderer, {
  resolvers: {
    components: {
      'uploaded-image': UploadedImage,
      'formatted-image': FormattedImage,
      'rich-text-styled': RichTextStyled,
    }
  }
})
