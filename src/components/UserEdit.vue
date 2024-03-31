<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-container>

    <v-card>
      <v-card-title>
        My profile
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="2">
            {{userLogged}}
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
  import {mapState} from 'vuex'


  export default {
    name: 'UsersEdit',
    data: () => ({
    }),
    computed: {
      ...mapState('authStore',['userLogged']),
    },
  }

</script>
