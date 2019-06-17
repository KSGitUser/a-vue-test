<template>
  <div>
    <v-container v-if="!loading">
      <v-layout row>
        <v-flex xs12>
          <List-of-agents />
          <!-- <New-department /> -->
        </v-flex>
      </v-layout>
    </v-container>
    <v-progress-circular indeterminate color="primary" class="text-xs-center" v-else mt-30></v-progress-circular>
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