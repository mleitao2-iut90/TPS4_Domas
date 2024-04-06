<template>
  <v-dialog :value="show">
    <v-card v-if="currentHeros !== null">
      <v-card-title class="headline">Éditer un héros</v-card-title>
      <v-card-text>
        <v-text-field v-model="currentHeros.publicName" label="Nom public"></v-text-field>
        <v-text-field v-model="currentHeros.realName" label="Nom réel"></v-text-field>
        <v-container>
          <v-row v-for="(power, index) in currentHeros.powers" :key="index">
            <v-col cols="6">
              <v-text-field v-model="power.name" label="Nom du pouvoir"></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field v-model="power.type" label="Type"></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field v-model="power.level" label="Niveau"></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="saveChanges">Enregistrer</v-btn>
        <v-btn color="error" @click="cancel">Annuler</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "EditUser",
  computed: {
    ...mapState('herosStore', ['currentHeros']),
  },
  props: {
    show: Boolean,
  },
  methods: {
    saveChanges() {
      // Implémentez ici la logique pour enregistrer les modifications
      // par exemple, en appelant une action Vuex
      // this.$store.dispatch('herosStore/saveModifiedHero', this.currentHeros);
    },
    cancel() {
      // Annuler les modifications et fermer le dialogue
    }
  },
  mounted() {
    console.log(this.show)
  }
};
</script>