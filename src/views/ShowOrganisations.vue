<template>
  <v-container>
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
    <v-btn @click="getInfo" color="primary">Informations</v-btn>
    <v-btn @click="CreateOrgaBtn" color="primary">Créer un organisation</v-btn>
    <v-row>
      <v-col>
        <v-data-table
            v-model="selected"
            :headers="headers"
            :items="this.listOrganisations"
            :items-per-page="10"
            class="elevation-1"
            :search="search"
            show-select
            item-key="_id"
            single-select
        >
        </v-data-table>
      </v-col>
    </v-row>

    <v-dialog v-model="showDialogAdd" max-width="600" ref="addDialogOrga">
      <v-card>
        <v-card-title>{{ content.title }}</v-card-title>
        <v-card-text v-for="content in content.contents" :key="content.text">
          <input :type="content.type" :placeholder="content.text" v-model="content.value">
        </v-card-text>
        <v-btn @click="addOrga">Validate</v-btn>
        <v-btn @click="closeDialog">Retour</v-btn>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          Entrez votre mot de passe
        </v-card-title>
        <v-card-text>
          <v-text-field
              v-model="password"
              label="Mot de passe"
              type="password"
              outlined
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="cancel">Annuler</v-btn>
          <v-btn color="green darken-1" text @click="validate">Valider</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-container>
</template>

<script>
import {mapActions, mapMutations, mapState} from "vuex";
export default {
  data() {
    return {
      search: '',
      selected: [],
      headers: [
        { text: 'ID', value: '_id' },
        { text: 'Nom', value: 'name' }
      ],
      content: {
        title: 'salut',
        contents: [
          {text: 'nomOrganisation', type: 'String', value: ''},
          {text: 'codeSecret', type: 'password', value: ''},
        ],
      },

      orga: {
        title: 'Organisation ',
        subtitle: '',
        content:[]
      },

      dialog: false,
      password: ''
    };
  },
  computed: {
    ...mapState('orgaStore', ['listOrganisations', 'showDialogAdd', 'mdpOrganisation', 'currentOrganisation'])
  },
  methods: {
    ...mapActions('orgaStore', ['getListOrgaFromApi', 'addOrgaFromApi', 'getOrgaByIdApi']),
    ...mapMutations('errors', ['pushError']),
    ...mapMutations('orgaStore', ['setShowDialogAddState', 'setMdpOrganisationState']),
    async getInfo() {
      if (this.selected.length === 0) {
        await this.pushError("Aucune organisation sélectionnée")
        return
      }
      this.dialog = true
    },
    CreateOrgaBtn(){
      this.setShowDialogAddState(true)
    },
    async addOrga() {
      if(this.content.contents[0].value === '' || this.content.contents[1].value === ''){
        this.pushError("Veuillez remplir tous les champs")
        return
      }
      const body = {
        name: this.content.contents[0].value,
        secret: this.content.contents[1].value,
      };
      await this.addOrgaFromApi(body);
      this.setShowDialogAddState(false)
      await this.getListOrgaFromApi();
    },
    closeDialog() {
      this.setShowDialogAddState(false)
    },
    cancel() {
      this.dialog = false;
      this.password = '';
    },
    async validate() {
      this.setMdpOrganisationState(this.password)
      await this.getOrgaByIdApi(this.selected[0]._id)
      if(this.currentOrganisation === null){
        this.pushError("Mot de passe incorrect ou ereur de connexion au serveur")
        return
      }
      this.dialog = false;
      await this.$router.push('/orga/detail')
    },
  },
  mounted() {
    this.getListOrgaFromApi();
  }
};
</script>

<style>
</style>
