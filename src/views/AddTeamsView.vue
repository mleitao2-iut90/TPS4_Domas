<template>
  <v-container class="root">
    <v-card>
      <v-card-title>Information de l'équipe</v-card-title>
      <v-card-text>
        <v-text-field
            v-model="nomEquipe"
            label="Nom de l'équipe"
            outlined
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="creerEquipe">Créer</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import {mapActions, mapMutations} from "vuex";

export default {
  data() {
    return {
      nomEquipe: '' // Le nom de l'équipe sera stocké ici
    };
  },
  methods: {
    ...mapActions('teamStore', ['addTeamsFromApi']),
    ...mapMutations('errors', ['pushError']),
    async creerEquipe() {
      try{
        if(this.nomEquipe === ''){
          this.pushError("Le nom de l'équipe ne peut pas être vide")
          return;
        }
        await this.addTeamsFromApi({name: this.nomEquipe});
        await this.$router.push('/teams');
      }catch (e) {
        console.log(e, 'erreur22334S')
      }

    }
  }
};
</script>

<style>
</style>
