<!-- ShowTeamsView.vue -->

<template>
  <v-container class="root">
    <v-card-title>
      <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Chercher"
          single-line
          hide-details
      >
        <template v-slot:append-outer>
          <v-icon @click="search=''">mdi-close</v-icon>
        </template>
      </v-text-field>
    </v-card-title>
    <v-row>
      <v-col>
        <v-data-table
            v-model="selected"
            :headers="headers"
            :items="listTeams"
            :items-per-page="10"
            class="elevation-1"
            :search="search"
            show-select
            item-key="_id"
            single-select
        >
        </v-data-table>
        <v-btn @click="CreateTeamBtn" color="primary">Create Team</v-btn>
        <v-btn @click="getTeamInfo" color="primary">Info</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      search: '',
      selected: [],
      headers: [
        { text: 'Id', value: '_id' },
        { text: 'Name', value: 'name' },
        { text: 'Affiliations', value: 'nbAffiliations' },
      ],
    };
  },
  computed: {
    ...mapState('teamStore', ['listTeams']),
  },
  methods: {
    ...mapActions('teamStore', ['getListTeamsFromAPi']),

    async loadData() {
      await this.getListTeamsFromAPi();
    },

    async getTeamInfo() {
      if (this.selected.length === 0) {
        alert('Aucune équipe sélectionnée');
        return;
      }
      console.log('ugndfbjvbyufheyubgeryu')
    },
  },
  async mounted() {
    await this.loadData();
  },
};
</script>

<style scoped>
.root {
  margin-top: 5%;
}
</style>
