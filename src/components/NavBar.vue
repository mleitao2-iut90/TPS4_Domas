<template>
  <v-container class="navBarRoot">
    <v-navigation-drawer v-model="drawer" app>
      <v-list>
        <v-list-item v-for="(item, index) in items" :key="index" @click="navigateTo(item.route)">
          <v-list-item-title>{{ item.text }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Mon Application</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="!loggedIn" color="primary" @click="navigateTo('/login')">Login</v-btn>
      <v-btn v-else color="error" @click="navigateTo('/login')">Logout</v-btn>
    </v-app-bar>
  </v-container>
</template>

<script>
import {mapState} from "vuex";

export default {
  props: {
    items: Array,
  },
  data() {
    return {
      drawer: false,
    };
  },
  computed: {
    ...mapState('authStore', ['loggedIn'])
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    }
  }
};
</script>

<style>
.navBarRoot {
  margin-bottom: 2%;
}
</style>
