import * as firebase from 'firebase'
import 'firebase/database'

class Departments {
  constructor({
    id = '',
    name,
    dateOfCreation = new Date()
  }) {
    this.id = id;
    this.name = name,
      this.dateOfCreation = dateOfCreation
  }
}

export default {
  state: {
    departments: [],
  },
  mutations: {
    addDepartment(state, object) {
      state.departments.push(object)
    },
    loadDepartmentData(state, object) {
      state.departments = [...object];
    },


  },
  actions: {
    async addDepartment({
      commit
    }, payload) {
      try {
        commit('setLoading', true)
        const newDepartment = new Departments({
          ...payload
        })
        const {
          id,
          ...departmentToAdd
        } = newDepartment
        const department = await firebase.database().ref('departments').push(departmentToAdd)
        commit('addDepartment', {
          id: department.key,
          ...newDepartment

        })
        commit('setLoading', false)
      } catch (error) {
        alert(error.message)
        throw error
      }

    },



    async fetchDataDepartments({
      commit
    }) {
      const dataFromBase = []
      try {
        commit('setLoading', true)
        const departmentsVal = await firebase.database().ref('departments').once('value')
        const departments = departmentsVal.val()
        Object.keys(departments).forEach(key => {
          const department = departments[key]
          department.id = key;
          dataFromBase.push(
            new Departments({
              ...department
            })
          )

          commit('loadDepartmentData', dataFromBase)
        })

      } catch (error) {
        alert(error.message)
        throw error
      }

    },
  },
  getters: {
    getAllDepartments(state) {
      return state.departments
    },


  },
  created() {

  }
}