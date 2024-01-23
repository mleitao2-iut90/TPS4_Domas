<!-- Organizations.vue -->
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
          <v-icon
              @click="search=''"
          >
            mdi-close
          </v-icon>
        </template>
      </v-text-field>
    </v-card-title>
    <v-row>
      <v-col>
        <v-data-table
            v-model="selected"
            :headers="headers"
            :items="organizations"
            :items-per-page="10"
            class="elevation-1"
            :search="search"
            show-select
            item-key="_id"
            single-select
        >
        </v-data-table>
        <v-btn @click="CreateOrgaBtn" color="primary">Create Organization</v-btn>
        <v-btn @click="getInfo" color="primary">Info</v-btn>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" max-width="600">
      <v-card>
        <v-card-title>{{ orga.title }}</v-card-title>
        <v-card-subtitle>{{ orga.subtitle }}</v-card-subtitle>
        <v-card-text>{{ orga.content }}</v-card-text>
        <v-card-actions>
          <v-btn @click="closeDialog">Fermer</v-btn>
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
      search: '',
      selected: [],
      headers: [
        { text: 'Id', value: '_id' },
        { text: 'Name', value: 'name' },
      ],
      organizations: [
      ],

      dialog: false,
      orga: {
        title: 'Organisation ',
        subtitle: '',
        content: '',
      },
    };
  },
  computed: {
    ...mapState('orgaStore', ['listOrganisations', 'mdpOrganisation']),
  },
  methods: {
    ...mapActions('orgaStore', ['getListOrgaFromApi', 'getOrgaByIdApi']),
    async loadData(){
      await this.getListOrgaFromApi()
      console.log(this.listOrganisations, 'listOrga')
      this.organizations = this.listOrganisations
    },
    CreateOrgaBtn(){
      this.$router.push('/orga/add')
    },
    async getInfo(){
      if(this.selected.length === 0){
        alert('Aucune organisation est selectionner')
        return;
      }
      if(this.mdpOrganisation === ''){
        alert('Aucun code secret est donnée, connecter vous')
        await this.$router.push('/authentification')
      }
      //console.log(this.selected[0]._id)
      const result = await this.getOrgaByIdApi(this.selected[0]._id)
      console.log(result, 'resultGetById')
      this.orga.title+= result.name
      this.orga.subtitle = result._id
      this.orga.content = {teams: result.teams}
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
    },
  },
  async mounted() {
    await this.loadData()
  },
  /*watch: {
    selected: function (val) {
      console.log(val)
    }
  }*/
};
</script>

<style scoped>
.root {
  margin-top: 5%;
}
</style>
