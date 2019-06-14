import Vue from 'vue'
import Vuex from 'vuex'
import realEstateAgents from './modules/realEstateAgents'


Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    realEstateAgents,
  }
})