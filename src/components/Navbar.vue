<template>
  <div>
    <v-navigation-drawer app temporary v-model="sideNav">
      <v-list>
        <v-list-tile v-for="(link, i) in links" :key="i" :to="link.url">
          <v-list-tile-action>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title v-text="link.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

    </v-navigation-drawer>
    <v-toolbar app dark color="teal lighten-3">
      <v-toolbar-side-icon @click="sideNav = !sideNav" class="hidden-md-and-up"></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" class="pointer">
          Ajax-test-Vue
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field v-model="search" append-icon="search" label="Поиск" single-line hide-details @input="searchInput"
        class="hidden-xs-and-down">
      </v-text-field>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn v-for="(link, i) in links" :key="i" :to="link.url" flat>
          <v-icon left>{{ link.icon}}</v-icon>
          {{link.title}}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>

      <router-view></router-view>

    </v-content>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        sideNav: false,
        search: ''
      }
    },
    methods: {
      searchInput() {
        this.$root.$emit('searchInput', this.search)
      }

    },
    computed: {
      links() {
        return [{
            title: 'Новый риэлтор',
            icon: 'person_add',
            url: '/new-agent'
          },
          {
            title: 'Список риэлторов',
            icon: 'list',
            url: '/'
          }
        ]
      }
    }
  }
</script>

<style scoped>
  .pointer {
    cursor: pointer;
  }
</style>