<!-- Login.vue -->
<template>
  <v-container class="root">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card>
          <v-card-title class="headline">Connexion</v-card-title>
          <v-card-text>
            <v-text-field
                v-model="password"
                label="Mot de passe"
                type="password"
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="connect">Connecter</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  data() {
    return {
      password: '',
    };
  },
  computed: {
    ...mapState('orgaStore', ['mdpOrganisation']),
  },
  methods: {
    ...mapActions('orgaStore', ['setMdpOrganisation']),
    async connect() {
      const result = await this.setMdpOrganisation(this.password);
      if(!result){
        console.log('Mot de passe incorrect ou une erreur est survenue');
        return;
      }
      //todo: redirect to organisation page
      console.log(this.mdpOrganisation, ' = Mot de passe correct');
    },
  },
};
</script>

<style scoped>
.root {
  margin-top: 5%;
}
</style>
