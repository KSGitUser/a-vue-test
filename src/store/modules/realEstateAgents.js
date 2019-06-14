class Agents {
  constructor(id, guid, surname, name, department, dateOfRegistration) {
    this.id = id;
    this.guid = guid;
    this.surname = surname;
    this.name = name;
    this.department = department;
    this.dateOfRegistration = dateOfRegistration;
  }
}
let arrayOfAgents = [];
arrayOfAgents.push(
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
);

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
      //  if (object.id > -1) {
      //    let indexOfObject = state.agents.findIndex(
      //       agent => agent.id === object.id
      //     );

      //     Object.assign(state.agents[indexOfObject], object);
      //    } else {
      //     object.id = state.agents[state.agents.length - 1].id++;
      //       console.log(object.id);
      state.agents.push(object);
      //   }
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
      //console.log(state.agents[indexOfObject]);
      Object.assign(state.agents[indexOfObject], object);
      //const newObject = Object.assign({}, object);
      //console.log(newObject);
    }
  },
  actions: {},
  getters: {
    allAgents(state) {
      return state.agents;
    }
  }
};
