<template>
  <v-container>
    <!-- Affichage des détails de l'organisation -->
    <v-card class="mb-4">
      <v-card-title>
        Détails de l'organisation
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="this.currentOrganisation._id" label="ID" readonly></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="this.currentOrganisation.name" label="Nom" readonly></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>

    <!-- Tableau des équipes -->
    <v-card>
      <v-card-title>
        Équipes de l'organisation
      </v-card-title>
      <v-btn color="primary" @click="showDialogAddTeams">Ajouter une Team</v-btn>
      <v-data-table
          :headers="teamHeaders"
          :items="this.currentOrganisation.teams"
          item-key="_id"
          hide-default-footer
      >
        <template v-slot:item="{ item }">
          <tr>
            <td>{{ item._id }}</td>
            <td>{{ item.name }}</td>
            <td>
              <v-btn color="primary">Modifier</v-btn>
              <v-btn @click="rmTeam(item._id)" color="red">Supprimer</v-btn>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          Sélectionner une équipe
        </v-card-title>
        <v-card-text>
          <v-select
              v-model="selectedTeam"
              :items="teamsPotentiel"
              item-text="name"
              item-value="_id"
              label="Équipe"
          ></v-select>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="cancel">Annuler</v-btn>
          <v-btn color="green darken-1" text @click="addTeam">Valider</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-container>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  data() {
    return {
      dialog: false,
      selectedTeam: null,
      teamsPotentiel: [],

      teamHeaders: [
        { text: 'ID', value: '_id' },
        { text: 'Nom', value: 'name' },
        { text: 'Actions', value: '' },
      ]
    };
  },
  computed: {
    ...mapState('orgaStore', ['currentOrganisation']),
    ...mapState('teamStore', ['listTeams']),
  },
  methods: {
    ...mapActions('teamStore', ['getListTeamsFromAPi']),
    ...mapActions('orgaStore', ['addTeamsInOrga', 'removeTeamInOrga', 'getOrgaByIdApi']),
    showDialogAddTeams() {
      this.teamsPotentiel = this.listTeams.filter(team => team.nbAffiliations === 0);
      this.dialog = true;
    },
    cancel() {
      this.dialog = false;
      this.selectedTeam = null;
    },
    async addTeam() {
      console.log('Équipe sélectionnée:', this.selectedTeam);
      await this.addTeamsInOrga({idTeam: this.selectedTeam})
      this.dialog = false;
      this.selectedTeam = null;
      this.getOrgaByIdApi(this.currentOrganisation._id)
    },
    async rmTeam(idTeam){
      const body = {idTeam: idTeam}
      console.log(body)
      await this.removeTeamInOrga(body)
      this.getOrgaByIdApi(this.currentOrganisation._id)
    },
  },
  mounted() {
    this.getListTeamsFromAPi();
  }
};
</script>

<style>
/* Ajoutez vos styles CSS personnalisés ici */
</style>
