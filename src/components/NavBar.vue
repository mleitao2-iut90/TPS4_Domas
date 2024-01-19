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
          <v-list-item v-for="(item, index) in plusItems" :key="index" @click="handleItemClick(item)">
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-btn text @click="handleLoginClick">
        Login
      </v-btn>
    </v-container>
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {
      plusItems: [
        { text: 'Option 1' },
        { text: 'Option 2' },
        // Ajoutez d'autres options au besoin
      ],
    };
  },
  methods: {
    handleItemClick(item) {
      // Gérez le clic sur un élément de la liste déroulante "Plus"
      console.log(`Option selected: ${item.text}`);
      // Ajoutez le code de gestion approprié ici
    },
    handleLoginClick() {
      // Gérez le clic sur le bouton "Login"
      console.log('Login clicked');
      // Ajoutez le code de gestion approprié ici
    },
  },
};
</script>

<style scoped>
/* Ajoutez vos styles CSS ici */
</style>
