<template>
  <div v-if="!loading">
    <v-container>
      <v-layout row>
        <v-flex xs12>
          <List-of-agents />
          <!-- <New-department /> -->
        </v-flex>
      </v-layout>
    </v-container>
  </div>
  <div v-else>
    <v-container>
      <v-layout row>
        <v-flex xs12 class="text-xs-center pt-5">
          <v-progress-circular :size="100" :width="4" color="teal lighten-3" indeterminate>
          </v-progress-circular>
        </v-flex>
      </v-layout>
    </v-container>
  </div>

</template>

<script>
  import ListOfAgents from '@/components/agents/ListOfAgents'
  //import NewDepartment from '@/components/departments/NewDepartment'

  export default {
    data() {
      return {}
    },
    components: {
      ListOfAgents,
      //  NewDepartment,
    },
    computed: {
      loading() {
        return this.$store.getters.loading
      }
    }

  }
</script>