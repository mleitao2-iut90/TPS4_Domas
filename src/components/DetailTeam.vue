<template>
  <v-card v-if="show">
      <v-card-title>
        Détails de l'équipe {{ team.name }}
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-btn color="primary">Add Members</v-btn>
          <v-row>
            <v-col cols="12">
              <v-text-field :value="team._id" label="ID" readonly></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field :value="team.name" label="Nom" readonly></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        {{ team.members }}
        <v-btn @click="$emit('closeDetailTeam')" color="primary">Close</v-btn>
      </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    team: {type: Object},
    show: Boolean,
  },
  data() {
    return {
      personneHeaders: [
        { text: 'ID', value: '_id' },
        { text: 'Actions', value: '' },
      ],
    }
  },
  mounted() {
    console.log('team', this.team)
  }
}
</script>

<style scoped>

</style>