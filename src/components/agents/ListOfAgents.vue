<template>
  <div>
    <v-card-title>
      Список агентов
      <v-spacer></v-spacer>
      <v-text-field v-model="search" append-icon="search" label="Поиск" single-line hide-details></v-text-field>
    </v-card-title>
    <v-dialog v-model="dialog" max-width="500px">

      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>

        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.surname" label="Surname"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.name" label="Name"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.department" label="Department"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-menu v-model="menu2" :close-on-content-click="false" :nudge-right="40" lazy
                  transition="scale-transition" offset-y full-width min-width="290px">
                  <template v-slot:activator="{ on }">
                    <v-text-field v-model="editedItem.dateOfRegistration" label="Date of Registration"
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
          <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
          <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-data-table :headers="headers" :items="agents" class="elevation-1" :search="search">
      <template v-slot:items="props">
        <td>{{ props.item.id }}</td>
        <td class="text-xs-center">{{ props.item.guid }}</td>
        <td class="text-xs-center">{{ props.item.surname }}</td>
        <td class="text-xs-center">{{ props.item.name }}</td>
        <td class="text-xs-center">{{ props.item.department }}</td>
        <td class="text-xs-center">{{ props.item.dateOfRegistration }}</td>
        <td class="justify-center layout px-0">
          <v-icon small class="mr-2" @click="editItem(props.item)">
            edit
          </v-icon>
          <v-icon small @click="deleteItem(props.item)">
            delete
          </v-icon>
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        dialog: false,
        search: '',
        headers: [{
            text: 'id',
            align: 'left',
            sortable: false,
            value: 'id'
          },
          {
            text: 'guid',
            value: 'guid'
          },
          {
            text: 'surname',
            value: 'surname'
          },
          {
            text: 'name',
            value: 'name'
          },
          {
            text: 'department',
            value: 'department'
          },
          {
            text: 'Date Of Registration',
            value: 'Date Of Registration'
          }
        ],
        editedIndex: -1,
        editedItem: {
          id: '',
          guid: '',
          surname: '',
          name: '',
          department: '',
          dateOfRegistration: new Date().toISOString().substr(0, 10)
        },
        defaultItem: {
          id: '',
          guid: '',
          surname: '',
          name: '',
          department: '',
          dateOfRegistration: '',
        }
      }
    },
    computed: {
      agents() {
        return this.$store.getters.allAgents
      },

      formTitle() {
        return this.editedIndex === -1 ? 'Добавить нового агента' : 'Редактировать данные агента'
      }

    },
    watch: {
      dialog(val) {
        val || this.close()
      }
    },
    created() {

    },
    methods: {
      save() {
        //console.log(this.editedItem);
        //this.$store.commit('addRecord', this.editedItem)
        //this.close()
        if (this.editedIndex > -1) {

          this.$store.dispatch('editRecord', this.editedItem)
          // this.$store.commit('editRecord', this.editedItem)
        } else {
          this.$store.dispatch('addRecord', this.editedItem)
          //this.$store.commit('addRecord', this.editedItem)
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
        const index = this.agents.indexOf(item)
        confirm('Are you sure you want to delete this item?') &&
          this.$store.dispatch('deleteRecord', index)
      },
    }
  }
</script>