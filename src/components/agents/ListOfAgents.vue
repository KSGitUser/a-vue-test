<template>
  <div v-if="!loading">

    <v-card-title>
    </v-card-title>
    <v-layout row wrap>
      <v-flex sm9>
        <h1>Список риэлторов</h1>
      </v-flex>
      <v-spacer></v-spacer>

      <v-flex sm3>
        <v-dialog v-model="dialog" max-width="600px" :fullscreen="$vuetify.breakpoint.smAndDown">
          <template v-slot:activator="{ on }" max-width="100px">
            <v-btn color="primary" dark class="mb-2" v-on="on">Добавить агента</v-btn>
          </template>


          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.surname" label="Фамилия"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.name" label="Имя">

                    </v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 d-flex>

                    <v-autocomplete v-model="editedItem.department" :items="departmentItems" label="Департамент"
                      item-text="name" item-value="id" persistent-hint single-line>

                    </v-autocomplete>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-menu v-model="menu2" :close-on-content-click="false" :nudge-right="40" lazy
                      transition="scale-transition" offset-y full-width min-width="290px">
                      <template v-slot:activator="{ on }">
                        <v-text-field v-model="editedItem.dateOfRegistration" label="Дата регистрации"
                          prepend-icon="event" readonly v-on="on"></v-text-field>
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
              <v-btn color="blue darken-1" flat @click="close">Отменить</v-btn>
              <v-btn color="blue darken-1" flat @click="save">Записать</v-btn>
              <v-btn color="blue darken-1" v-if="editedIndex > -1" flat @click="deleteItem(editedItem)">
                Удалить</v-btn>

            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-flex>
    </v-layout>
    <v-layout row wrap fluid>
      <v-flex>
        <v-text-field v-model="search" append-icon="search" label="Поиск" single-line hide-details>
        </v-text-field>
      </v-flex>
      <v-spacer></v-spacer>
      <v-layout row wrap>
        <v-flex>
          <v-menu v-model="menuFrom" :close-on-content-click="false" :nudge-right="40" lazy
            transition="scale-transition" offset-y full-width min-width="290px">
            <template v-slot:activator="{ on }">
              <v-text-field label="Начальная дата поиска" v-model="searchDateFrom" prepend-icon="event" v-on=" on"
                @input="dateChange"></v-text-field>
            </template>
            <v-date-picker @input="dateChange" v-model="searchDateFrom" locale="ru-ru" :first-day-of-week="1">
            </v-date-picker>
          </v-menu>
        </v-flex>

        <v-flex>
          <v-menu v-model="menuTo" :close-on-content-click="false" :nudge-right="40" lazy transition="scale-transition"
            offset-y full-width min-width="290px">
            <template v-slot:activator="{ on }">
              <v-text-field v-model="searchDateTo" label="Конечная дата поиска" prepend-icon="event" v-on="on"
                @input="dateChange"></v-text-field>
            </template>
            <v-date-picker v-model="searchDateTo" @input="dateChange" locale="ru-ru" :first-day-of-week="1">
            </v-date-picker>
          </v-menu>

        </v-flex>
      </v-layout>
    </v-layout>

    <v-data-table :headers=" headers" :items="listAgents" class="elevation-1 hidden-sm-and-down" :search="search">
      <template v-slot:items="props">
        <tr @dblclick="editItem(props.item)">
          <!-- <td>{{ props.item.id }}</td>
          <td class="text-xs-center">{{ props.item.guid }}</td> -->
          <td class="text-xs-left">{{ props.item.surname }}</td>
          <td class="text-xs-left">{{ props.item.name }}</td>
          <td class="text-xs-left" hidden>{{ props.item.department }}</td>
          <td class="text-xs-left">{{ props.item.departmentName }}</td>
          <td class="text-xs-left">
            {{ props.item.dateOfRegistration }}</td>
          <td class="justify-center layout px-0">
            <v-icon small class="mr-2" @click="editItem(props.item)">
              edit
            </v-icon>

          </td>
          <td>
            <v-icon small @click="deleteItem(props.item)">
              delete
            </v-icon>
          </td>
        </tr>
      </template>
    </v-data-table>

    <v-layout row justify-center>
      <v-dialog v-model="deleteDialog" persistent max-width="290">
        <v-card>
          <v-card-title class="headline">Удалить запись?</v-card-title>
          <v-card-text>После удаления запись будет невозможно востановить</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" flat @click="deleteDialog = false">Отмена</v-btn>
            <v-btn color="green darken-1" flat @click="deleteConfirm">Удалить</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>


    <v-container fluid grid-list-md class="hidden-md-and-up" text-md-center>
      <v-data-iterator :items=" listAgents" :rows-per-page-items="rowsPerPageItems" :pagination.sync="pagination" row
        wrap class="text-center" offset-sm2 :search="search">
        <template v-slot:item="props">
          <v-layout row wrap fluid>
            <v-flex class="agent-card" xs12 sm6 md4 lg3 @dblclick="editItem(props.item)">
              <v-card>
                <v-card-title>
                  <h4>Агент: {{props.item.name}} {{props.item.surname}}</h4>
                </v-card-title>
                <v-divider></v-divider>
                <v-list dense>
                  <v-list-tile>
                    <v-list-tile-content>Имя:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.name }}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>Фамилия:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.surname }}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>Департамент:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.departmentName }}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>Дата регистрации:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.dateOfRegistration }}</v-list-tile-content>
                  </v-list-tile>
                  <v-divider></v-divider>
                  <v-list-tile>
                    <v-list-tile-content>
                      <v-icon small class="ml-4" @click="editItem(props.item)">
                        edit
                      </v-icon>
                    </v-list-tile-content>
                    <v-list-tile-content class="align-end mr-4">
                      <v-icon small @click="deleteItem(props.item)">
                        delete
                      </v-icon>
                    </v-list-tile-content>
                  </v-list-tile>


                </v-list>
              </v-card>
            </v-flex>
          </v-layout>
        </template>
      </v-data-iterator>
    </v-container>


  </div>
</template>

<script>
  export default {
    data() {
      return {
        rowsPerPageItems: [2, 4, 8],
        pagination: {
          rowsPerPage: 4
        },
        deleteDialog: false,
        deleteAnswer: false,
        deletedItem: {},
        menuFrom: false,
        searchDateFrom: '',
        menuTo: false,
        searchDateTo: '',
        menu2: false,
        dialog: false,
        search: '',
        headers: [{
            text: 'Фамилия',
            value: 'surname',
            align: 'left'
          },
          {
            text: 'Имя',
            value: 'name',
            align: 'left'
          },
          {
            text: 'Департамент',
            value: 'department',
            align: 'left'
          },
          {
            text: 'Дата регистрации',
            value: 'date of registration',
            align: 'left'
          },
          {
            text: '',
            value: 'edit'
          },
          {
            text: '',
            value: 'delete'
          },
        ],
        editedIndex: -1,
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
        listAgentsBeforeFilter: []
      }
    },


    mounted() {

      let listOfAgents = this.agents;
      let listOfDepartments = this.departmentItems;

      listOfAgents.forEach(agent => {
        agent.departmentName = listOfDepartments.find(department => department.id === agent.department).name
      })

      this.listAgents = listOfAgents
      this.listAgentsBeforeFilter = listOfAgents

      const urlSearch = this.$route.query.search

      if (urlSearch !== '') {
        this.searchOfAgents(urlSearch)
      }

      this.$root.$on('keyPressed', (search) => {
        this.searchOfAgents(search)
      })


    },
    computed: {

      agents() {
        return this.$store.getters.allAgents
      },

      formTitle() {
        return this.editedIndex === -1 ? 'Добавить нового агента' : 'Редактировать данные агента'
      },

      departmentItems() {
        return this.$store.getters.getAllDepartments
      },

      departmentName(id) {
        return this.$store.getters['getDepartmentName'](id)
      },


      loading() {
        return this.$store.getters.loading
      }


    },
    watch: {
      dialog(val) {
        val || this.close()
      },

    },
    created() {


    },

    methods: {

      searchOfAgents(search = '') {
        if (search.trim() !== '') {
          this.listAgents = this.listAgentsBeforeFilter.filter(item => {
            search = search.toLowerCase().trim()
            return (~item.name.toLowerCase().indexOf(search) ||
              ~item.surname.toLowerCase().indexOf(search) ||
              ~item.departmentName.toLowerCase().indexOf(search))
          })
        } else {
          this.listAgents = this.listAgentsBeforeFilter
        }
      },

      save() {

        if (this.editedIndex > -1) {
          this.$store.dispatch('editRecord', this.editedItem)
        } else {
          this.$store.dispatch('addRecord', this.editedItem)
        }

        this.close()
      },

      close() {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      editItem(item) {
        this.editedIndex = this.agents.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem(item) {
        this.deletedItem = item
        this.deleteDialog = true
      },

      deleteConfirm() {

        const index = this.agents.indexOf(this.deletedItem)
        const item = this.deletedItem
        this.$store.dispatch('deleteRecord', {
          index,
          item
        })
        this.deletedItem = {}
        this.deleteDialog = false
        this.dialog = false
      },

      dateChange() {

        this.listAgents = this.listAgentsBeforeFilter.filter(item => {
          return item.dateOfRegistration >= this.searchDateFrom
        })
        this.listAgents = this.listAgents.filter(item => {
          return this.searchDateTo === '' ? true : item.dateOfRegistration <= this.searchDateTo
        })


        this.menuFrom = false
        this.menuTo = false
      },

    }
  }
</script>

<style scoped>
  .agent-card {
    margin: auto;
  }
</style>