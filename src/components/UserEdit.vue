<template>
  <v-container>
    <v-card>
      <v-card-title>
        My Profile
      </v-card-title>
      <v-card-text>
        <v-btn
            color="success"
            class="mr-4"
            @click="this.updateAuthUser">
        </v-btn>
        <v-list>
          <v-list-item v-for="(value, key) in userLogged" :key="key">
            <v-list-item-content>
              <v-list-item-title>➤ {{ key }}</v-list-item-title>
              <v-list-item-subtitle>
                <template v-if="key === 'hero'">
                  <v-list v-for="(subValue, subKey) in value" :key="subKey">
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>➢ {{ subKey }}</v-list-item-title>
                        <v-list-item-subtitle v-if="subKey === 'powers'">
                          <v-list>
                            <v-list-item v-for="(power, index) in subValue" :key="index">
                              <v-list-item-content>
                                <v-list-item-title>Power {{ index + 1 }}</v-list-item-title>
                                <v-list-item-subtitle>
                                  <v-list>
                                    <v-list-item v-for="(powerValue, powerKey) in power" :key="powerKey">
                                      <v-list-item-content>
                                        <v-list-item-title>➣ {{ powerKey }}</v-list-item-title>
                                        <v-list-item-subtitle>{{ powerValue }}</v-list-item-subtitle>
                                      </v-list-item-content>
                                    </v-list-item>
                                  </v-list>
                                </v-list-item-subtitle>
                              </v-list-item-content>
                            </v-list-item>
                          </v-list>
                        </v-list-item-subtitle>
                        <v-list-item-subtitle v-else>
                          {{ subValue }}
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </template>
                <template v-else>
                  {{ value }}
                </template>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import {mapActions, mapState} from 'vuex'

export default {
  name: 'UsersEdit',
  computed: {
    ...mapState('authStore', ['userLogged']),
  },
  methods: {
    ...mapActions('herosStore', ['showModifHero']),
    async updateAuthUser() {
      await this.showModifHero(this.userLogged.hero._id)
    },
  }
}
</script>