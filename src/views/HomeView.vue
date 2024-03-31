<template>
  <v-container>
    <p v-if="!loggedIn">
      Welcome to authentication demonstration app.
      You must login.
    </p>
    <p v-else>
      You are logged. You can list users by opening left drawer
      <UserEdit/>
      <v-btn
          color="success"
          class="mr-4"
          @click="this.getUser">
      </v-btn>
    </p>

  </v-container>
</template>

<script>

import {mapActions, mapState} from 'vuex'
import UserEdit from "@/components/UserEdit.vue";
export default {
  name: 'HomeView',
  components: {UserEdit},
  computed: {
    ...mapState('authStore',['loggedIn']),
  },
  methods: {
    ...mapActions('authStore', ['getUser']),
  }
}
</script>

<style scoped>

</style>