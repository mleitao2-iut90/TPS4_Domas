<template>
  <v-card v-if="show">
      <v-card-title>
        Détails de l'équipe {{ team.name }}
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field :value="team._id" label="ID" readonly></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field :value="team.name" label="Nom" readonly></v-text-field>
            </v-col>
          </v-row>
        </v-container>

        <v-card-title>
          Membres
        </v-card-title>
        <v-btn color="primary" @click="showDialogAddMember">Add Members</v-btn>
        <v-data-table
            :headers="personneHeaders"
            :items="this.members"
            item-key="_id"
            hide-default-footer
        >
          <template v-slot:item="{ item }">
            <tr>
              <td v-for="header in personneHeaders" :key="header.value">
                <p v-if="header.text === 'Actions'">
                  <v-btn color="primary">Modifier</v-btn>
                  <v-btn color="red" @click="deleteMemberMaybe(item._id)">Supprimer</v-btn>
                </p>
                <p v-else-if="header.text === 'Power'">
                  <v-btn color="primary" @click="openDetailPower(item)">Voir</v-btn>
                </p>
                <p v-else>
                  {{ item[header.value] }}
                </p>
              </td>
            </tr>
          </template>
        </v-data-table>
        <v-btn @click="$emit('closeDetailTeam')" color="primary">Close</v-btn>
      </v-card-text>

    <v-dialog v-model="dialogAddMember" max-width="500px">
      <v-card>
        <v-card-title>
          Sélectionner un nouveux membres
        </v-card-title>
        <v-card-text>
          <v-select
              v-model="selectedMembers"
              :items="personnePotentiel"
              item-text="publicName"
              item-key="_id"
              item-value="_id"
              label="Membre"
          ></v-select>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="cancel">Annuler</v-btn>
          <v-btn color="green darken-1" text @click="addMember">Valider</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogShowPower" max-width="500px" v-if="dialogShowPower">
      <v-card>
        <v-card-title>
          Pouvoirs de {{ selectedMembersForPower.publicName }}
        </v-card-title>
        <v-card-text v-for="power in selectedMembersForPower.powers" :key="power.name">
          <v-container v-for="detail in detailPower" :key="detail.value">
            <v-card-title>- {{detail.text}}</v-card-title>
            <v-text-field :value="power[detail.value]" :label="power[detail.text]" readonly/>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>

    <EventDialog
        title="Supprimé"
        text="Voulez vous supprimé ce membre de la team ?"
        width="500"
        :show="showDialogDelMember"
        @closeDialog="rmMember"
    />
  </v-card>
</template>

<script>
import {mapActions, mapState} from "vuex";
import EventDialog from "@/components/EventDialog.vue";

export default {
  components: {EventDialog},
  props: {
    team: {type: Object},
    show: Boolean,
    members: Array,
  },
  data() {
    return {
      personneHeaders: [
        { text: 'ID', value: '_id' },
        { text: 'Public Name', value: 'publicName' },
        { text: 'Real Name', value: 'realName' },
        { text: 'Power', value: '' },
        { text: 'Actions', value: '' },
      ],

      selectedMembers: null,
      dialogAddMember: false,
      personnePotentiel: [],

      dialogShowPower: false,
      detailPower: [
        { text: 'Nom', value: 'name'},
        { text: 'Type', value: 'type'},
        { text: 'Niveau', value: 'level'},
      ],
      selectedMembersForPower: null,

      showDialogDelMember: false,
      idMemberDelTmp: null,
    }
  },
  computed: {
    ...mapState('herosStore', ['listAliasHeros']),
    ...mapState('orgaStore', ['currentOrganisation']),
  },
  methods: {
    ...mapActions('herosStore', ['getListAliasFromApi']),
    ...mapActions('teamStore', ['addMemberInTeam', 'removeMemberInTeam']),
    ...mapActions('orgaStore', ['getOrgaByIdApi']),
    async showDialogAddMember() {
      await this.getListAliasFromApi();
      let membersCurrentTeam = this.team.members;
      this.personnePotentiel = this.listAliasHeros.filter(teamMembers => {
        return !membersCurrentTeam.some(members => members._id === teamMembers._id)
      })
      this.dialogAddMember = true;
    },
    async cancel() {
      this.dialogAddMember = false;
      this.selectedMembers = null;
      this.personnePotentiel = null;
      await this.loadMembersOfTeam();
    },
    async addMember() {
      await this.addMemberInTeam({idHeroes: [this.selectedMembers], idTeam: this.team._id})
      this.dialogAddMember = false;
      this.selectedMembers = null;
      await this.getOrgaByIdApi(this.currentOrganisation._id)
      await this.$emit('updateTeam', this.team._id)
    },
    openDetailPower(membre) {
      this.selectedMembersForPower = membre;
      this.dialogShowPower = true;
    },
    async rmMember(event) {
      if(event){
        await this.removeMemberInTeam({idHeroes: [this.idMemberDelTmp], idTeam: this.team._id})
        await this.getOrgaByIdApi(this.currentOrganisation._id)
        await this.$emit('updateTeam', this.team._id)
      }
      this.idMemberDelTmp = null;
      this.showDialogDelMember = false;
    },
    async deleteMemberMaybe(idTeam) {
      this.idMemberDelTmp = idTeam;
      this.showDialogDelMember = true;
    },
  },
}
</script>

<style scoped>

</style>