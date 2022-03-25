import Vue from 'vue'
import VueGtag from 'vue-gtag'

export default function ({ $config }) {
  Vue.use(VueGtag, {
    config: { id: $config.googleAnalyticsId }
  })
}
