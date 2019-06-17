import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import NewAgent from '@/components/agents/NewAgent'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '',
      name: 'home',
      component: Home
    },
    {
      path: '/new-agent',
      name: '/new-agent',
      component: NewAgent
    },
  ],
  mode: 'history'
})