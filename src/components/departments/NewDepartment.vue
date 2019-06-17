<template>
  <form>
    <v-flex xs12 sm6 md4 clas="text-xs-center" ml-4>
      <v-text-field v-model="department.name" label="Name" required>
      </v-text-field>
    </v-flex>
    <v-flex xs12 sm6 md4>
      <v-menu v-model="menu2" :close-on-content-click="false" :nudge-right="40" lazy transition="scale-transition"
        offset-y full-width min-width="290px">
        <template v-slot:activator="{ on }">
          <v-text-field v-model="department.dateOfCreation" label="Дата создания" prepend-icon="event" readonly
            v-on="on">
          </v-text-field>

        </template>
        <v-date-picker v-model="department.dateOfCreation" @input="menu2 = false" locale="ru-ru" :first-day-of-week="1">
        </v-date-picker>
      </v-menu>
    </v-flex>

    <v-btn @click="submit">submit </v-btn>
    <v-btn>clear</v-btn>
  </form>

</template>

<script>
  export default {
    data() {
      return {
        menu2: false,
        dialog: false,
        department: {
          name: '',
          dateOfCreation: ''
        }
      }
    },
    methods: {
      submit() {
        this.$store.dispatch('addDepartment', this.department)
      }
    }
  }
</script>