<template>
  <v-app class="root">
    <v-container>
      <v-text-field v-model="name" label="Name"></v-text-field>
      <v-text-field v-model="secret" label="Secret" type="password"></v-text-field>
      <v-btn @click="validateInput">Validate</v-btn>
    </v-container>
  </v-app>
</template>

<script>
import {mapActions} from "vuex";

export default {
  data() {
    return {
      name: '',
      secret: ''
    };
  },
  methods: {
    ...mapActions('orgaStore', ['addOrgaFromApi']),
    async validateInput() {
      const body = {
        name: this.name,
        secret: this.secret,
      };
      await this.addOrgaFromApi(body);
      await this.$router.push('/orga')
    }
  }
};
</script>

<style scoped>
.root {
  margin-top: 5%;
}
</style>
