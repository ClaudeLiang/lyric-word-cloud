import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import WordCloud from '@/components/word-cloud'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: WordCloud
    },
    {
      path: '/helloworld',
      component: HelloWorld
    }
  ]
})
