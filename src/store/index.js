import Vue from 'vue'
import Vuex from 'vuex'
import realEstateAgents from './modules/realEstateAgents'
import departments from './modules/departments'
import common from './modules/common'



Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    realEstateAgents,
    departments,
    common
  }
})