import * as firebase from 'firebase'

class Agents {
  constructor({
    surname,
    name,
    department,
    dateOfRegistration,
    guid = '',
    id = ''
  }) {
    this.guid = (this.S4() + this.S4() + "-" + this.S4() + "-4" + this.S4().substr(0, 3) + "-" + this.S4() + "-" + this.S4() + this.S4() + this.S4()).toLowerCase();
    this.surname = surname;
    this.name = name;
    this.department = department;
    this.dateOfRegistration = dateOfRegistration;
    this.id = id;
  }

  S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
}




export default {
  state: {
    agents: []
  },
  mutations: {
    addRecord(state, object) {

      state.agents.push(object);

    },
    deleteRecord(state, index) {
      state.agents.splice(index, 1);
    },
    editRecord(state, object) {
      //console.log("object.id: ", object.id);
      let indexOfObject = state.agents.findIndex(agent => {
        //console.log("agent.id: ", agent.id);
        return agent.id == object.id;
      });
      Object.assign(state.agents[indexOfObject], object);
    },
    loadData(state, object) {
      state.agents = [...object];
    }
  },
  actions: {
    async addRecord({
      commit
    }, payload) {
      try {
        const {
          departmentName,
          ...newPayload
        } = payload
        const newAgent = new Agents({
          ...newPayload
        })
        delete newAgent.id;
        const agent = await firebase.database().ref('agents').push(newAgent)
        commit('addRecord', {
          ...newAgent,
          id: agent.key
        })
      } catch (error) {
        alert(error.message)
        throw error
      }

    },
    async editRecord({
      commit
    }, payload) {

      try {
        commit('setLoading', true)
        const {
          id,
          departmentName,
          ...objectToSave
        } = payload

        const agent = await firebase.database().ref('agents').child(payload.id).update(objectToSave)
        commit('editRecord', payload)
        commit('setLoading', true)
      } catch (error) {
        alert(error.message)
        throw error
      }

    },

    async deleteRecord({
      commit
    }, payload) {
      try {
        commit('setLoading', true)
        await firebase.database().ref('agents').child(payload.item.id).remove()
        commit('deleteRecord', payload.index)
        commit('setLoading', false)
      } catch (error) {
        alert(error.message)
        throw error
      }

    },

    async fetchDataAgents({
      commit
    }) {
      const dataFromBase = []
      try {
        commit('setLoading', true)
        const agentsVal = await firebase.database().ref('agents').once('value')
        const agents = agentsVal.val()
        Object.keys(agents).forEach(key => {
          const agent = agents[key]
          agent.id = key;
          dataFromBase.push(
            new Agents({
              ...agent
            })
          )
          commit('loadData', dataFromBase)
          commit('setLoading', false)
        })
      } catch (error) {
        alert(error.message)
        throw error
      }

    }

  },
  getters: {
    allAgents(state) {
      return state.agents;
    }
  }
};