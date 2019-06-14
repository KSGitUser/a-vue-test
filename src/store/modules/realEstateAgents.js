import * as firebase from 'firebase'

class Agents {
  constructor({
    surname,
    name,
    department,
    dateOfRegistration
  }) {
    this.guid = (this.S4() + this.S4() + "-" + this.S4() + "-4" + this.S4().substr(0, 3) + "-" + this.S4() + "-" + this.S4() + this.S4() + this.S4()).toLowerCase();
    this.surname = surname;
    this.name = name;
    this.department = department;
    this.dateOfRegistration = dateOfRegistration;
  }

  S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
}



let arrayOfAgents = [];
/*arrayOfAgents.push(
  new Agents(
    1,
    "sdfsdffsdf343",
    "Sankin",
    "Alexandr",
    "new constructions",
    "20/02/2019"
  )
);
arrayOfAgents.push(
  new Agents(2, "sdfsfafassadf343", "Risev", "Sergey", "elite", "20/01/2019")
); */

export default {
  state: {
    /* agents: [{
      id: 1,
      guid: 'sdfasfdaewr23423',
      surname: 'Sankin',
      name: 'Alexandr',
      department: 'new constructions',
      dateOfRegistration: '20/02/2019',
    }] */
    agents: arrayOfAgents
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
    }
  },
  actions: {
    async addRecord({
      commit
    }, payload) {
      try {
        const newAgent = new Agents({
          ...payload
        })
        const agent = await firebase.database().ref('agents').push(newAgent)
        commit('addRecord', {
          ...newAgent,
          id: agent.key
        })

        // commit('addRecord', payload)
      } catch (error) {
        alert(error.message)
        throw error
      }

    },
    editRecord({
      commit
    }, payload) {
      commit('editRecord', payload)
    },
    deleteRecord({
      commit
    }, payload) {
      commit('deleteRecord', payload)
    }

  },
  getters: {
    allAgents(state) {
      return state.agents;
    }
  }
};