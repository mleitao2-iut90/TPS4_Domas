<!-- NavBar.vue -->
<template>
  <v-app-bar app>
    <v-container>
      <!-- Composant "Plus" avec liste déroulante -->
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn text v-on="on">
            Plus
          </v-btn>
        </template>

        <v-list>
          <v-list-item v-for="title in titles" :key="title.text">
            <v-list-item-title @click="changeRoute(title.route)">{{ title.text }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-btn text @click="changeRoute('/authentification')">
        Login
      </v-btn>
    </v-container>
  </v-app-bar>
</template>

<script>
export default {
  props: {
    titles: Array,
  },
  methods: {
    changeRoute(route){
      if(this.$route.path === route) return
      this.$router.push(route)
    },
  },
};
</script>

<style scoped>
/* Ajoutez vos styles CSS ici */
</style>
