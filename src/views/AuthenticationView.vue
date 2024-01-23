<!-- Login.vue -->
<template>
  <div>
    <v-container class="root">
      <v-row justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card v-if="this.mdpOrganisation === ''">
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
          <v-card v-else>
            <v-card-title class="headline">Vous êtes connecté</v-card-title>
            <v-card-text>
            </v-card-text>
            <v-card-actions>
              <v-btn @click="deconnect">Déconnection</v-btn>
              <v-btn @click="modifMdp">Modifier mdp</v-btn>
            </v-card-actions>

          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import {mapActions, mapMutations, mapState} from "vuex";

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
    ...mapMutations('orgaStore', ['setMdpOrganisationState']),
    async connect() {
      try{
        if(this.password === '') {
          alert("pas de mdp, (modifier cet alerte avec celle du cours)")
          return
        }
        await this.setMdpOrganisation(this.password);
        console.log(this.mdpOrganisation, ' = Mot de passe correct');
        await this.$router.push('/orga')
      }catch (e) {
        console.error(e, "erreur connect")
      }
    },
    async deconnect() {
      try{
        alert("vous etes sur ? (modifier cet alerte avec celle du cours)")
        await this.setMdpOrganisationState('');
      }catch (e) {
        console.error(e, "erreur deconnect")
      }
    },
    async modifMdp(){
      alert("Je ne fonctionne pas")
    }
  },
};
</script>

<style scoped>
.root {
  margin-top: 5%;
}
</style>
