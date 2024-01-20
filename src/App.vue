<!-- App.vue ou votre vue principale -->

<template>
  <v-app>
    <NavBar :titles="titles"/>
    <router-view/>
  </v-app>
</template>

<script>
import NavBar from "@/components/NavBar.vue";

export default {
  name: "App",
  data: () => {
    return {
      titles: [
        {text: 'Teams', route: '/teams'},
        {text: 'Organisation', route: '/orga'}
      ]
    }
  },
  components: {
    NavBar,
  },
};
</script>

<style>
/* Ajoutez vos styles CSS ici */
</style>
