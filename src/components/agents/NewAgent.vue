<template>
  <v-container grid-list-xl>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.surname" :rules="nameRules" label="Фамилия"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.name" label="Имя" :rules="nameRules">

                </v-text-field>
              </v-flex>
              <v-flex xs12 sm6 d-flex>

                <v-autocomplete v-model="editedItem.department" :items="departmentItems" label="Департамент"
                  item-text="name" item-value="id" persistent-hint single-line :rules="nameRules">

                </v-autocomplete>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-menu v-model="menu2" :close-on-content-click="false" :nudge-right="40" lazy
                  transition="scale-transition" offset-y full-width min-width="290px">
                  <template v-slot:activator="{ on }">
                    <v-text-field v-model="editedItem.dateOfRegistration" label="Дата регистрации" prepend-icon="event"
                      readonly v-on="on"></v-text-field>
                  </template>
                  <v-date-picker v-model="editedItem.dateOfRegistration" @input="menu2 = false" locale="ru-ru"
                    :first-day-of-week="1">
                  </v-date-picker>
                </v-menu>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="close">Отмена</v-btn>
          <v-btn color="blue darken-1" flat @click="save">Записать</v-btn>
        </v-card-actions>
        </v-card>
        </v-dialog>
      </v-flex>

      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data() {
      return {
        menu2: false,
        editedIndex: -1,
        nameRules: [
          v => !!v || `Нужно ввести значение`,
          v => v.length >= this.nameMin || `Минимальная длина более ${this.nameMin} символов`
        ],
        nameMin: 2,
        editedItem: {
          id: '',
          guid: '',
          surname: '',
          name: '',
          department: '',
          departmentName: '',
          dateOfRegistration: new Date().toISOString().substr(0, 10)
        },
        defaultItem: {
          id: '',
          guid: '',
          surname: '',
          name: '',
          department: '',
          departmentName: '',
          dateOfRegistration: '',
        },
        listAgents: [],
        listAgentsBeforeFilter: [],
      }
    },
    mounted() {
      let listOfAgents = this.$store.getters.allAgents;
      let listOfDepartments = this.$store.getters.getAllDepartments;

      listOfAgents.forEach(agent => {
        agent.departmentName = listOfDepartments.find(department => department.id === agent.department).name
      })

      this.listAgents = listOfAgents
      this.listAgentsBeforeFilter = listOfAgents

    },
    computed: {
      departmentItems() {
        return this.$store.getters.getAllDepartments;
      },



    },

    methods: {
      save() {
        if (this.editedItem.name !== '' &&
          this.editedItem.surname !== '' &&
          this.editedItem.department !== '' &&
          this.editedItem.dateOfRegistration !== '') {

          this.$store.dispatch('addRecord', this.editedItem)
            .then(() => {
              this.$router.push('/')
            })
            .catch(() => {})
        }
      },
      close() {
        this.$router.push('/')
      },
    }

  }
</script>