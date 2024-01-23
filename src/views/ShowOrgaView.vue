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
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  data() {
    return {
      search: '',
      selected: null,
      headers: [
        { text: 'Id', value: '_id' },
        { text: 'Name', value: 'name' },
      ],
      organizations: [
      ],
    };
  },
  computed: {
    ...mapState('orgaStore', ['listOrganisations']),
  },
  methods: {
    ...mapActions('orgaStore', ['getListOrgaFromApi']),
    async loadData(){
      await this.getListOrgaFromApi()
      console.log(this.listOrganisations, 'listOrga')
      this.organizations = this.listOrganisations
    },
    CreateOrgaBtn(){
      this.$router.push('/orga/add')
    }
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
