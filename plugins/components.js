import Vue from 'vue'

import Teaser from '~/components/molecules/Teaser.vue'
import Feature from '~/components/molecules/Feature.vue'

import Grid from '~/components/organisms/Grid.vue'

import Page from '~/components/templates/Page.vue'
import Lesson from '~/components/templates/Lesson.vue'

Vue.component('teaser', Teaser)
Vue.component('feature', Feature)
Vue.component('grid', Grid)
Vue.component('page', Page)
Vue.component('lesson', Lesson)
