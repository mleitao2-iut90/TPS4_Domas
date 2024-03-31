<!-- App.vue ou votre vue principale -->

<template>
  <v-app>
    <ErrorDialog
        title="ERROR"
        width="600"
    >
    </ErrorDialog>

    <PromiseDialog
        ref="dialog2"
        :title="titleDialog"
        text="confirmation"
        width="600">
    </PromiseDialog>

    <EventDialog
        :show="show"
        :title="titleDialog"
        text="confirmation"
        width="600"
        @closeDialog="getAnswerAndClose"
    >
    </EventDialog>

    <NavBar :items="titles"/>
    <router-view/>
  </v-app>
</template>

<script>
import NavBar from './components/NavBar.vue';
import ErrorDialog from './components/ErrorDialog.vue';
import PromiseDialog from './components/PromiseDialog.vue';
import EventDialog from './components/EventDialog.vue';
export default {
  name: "App",
  data: () => {
    return {
      show: false,
      titleDialog:'',
      titles: [
        {text: 'Accueil', route: '/'},
        {text: 'Teams', route: '/teams'},
        {text: 'Organisation', route: '/orga'}
      ]
    }
  },
  components: {
    NavBar,
    ErrorDialog,
    PromiseDialog,
    EventDialog,
  },
  methods: {
    logtest(event) {
      console.log("event in testcomp: "+event)
    },
    closeForCheck1(answer) {
      if (answer) {
        console.log("confirmation OK pour check1")
        this.checked1 = true
      }
      else {
        console.log("confirmation annulée pour check1")
      }
      this.show = false
    },
    closeForButton1(answer) {
      if (answer) {
        console.log("confirmation OK pour button1")
        this.checked1 = false
      }
      else {
        console.log("confirmation annulée pour button1")
      }
    },
    getAnswerAndClose(answer) {
      if (this.idInteraction === 0) {
        this.closeForCheck1(answer)
      }
      else {
        this.closeForButton1(answer)
      }
      this.show = false
    },
    async manageCheck1() {
      // change l'état du composant v-check-box => rafraichissement dans le DOM
      this.checked1 = true
      // attend le rafraichissement dans le DOM du composant v-check-box
      await this.$nextTick()
      // remet à false, afin que la case soit décochée, en attenant la réponse du dialogue
      this.checked1 = false
      this.titleDialog = "gérer interaction check 1 via event"
      // on précise le type d'interaction : 0= click checkbox
      this.idInteraction = 0
      this.show = true
    },
    manageButton1() {
      this.titleDialog = "gérer interaction dialogue 1 via event"
      // on précise le type d'interaction : 1= click bouton
      this.idInteraction = 1
      this.show = true
    },
    async manageCheck2() {
      // change l'état du composant v-check-box => rafraichissement dans le DOM
      this.checked2 = true
      // attend le rafraichissement dans le DOM du composant v-check-box
      await this.$nextTick()
      // remet à false, afin que la case soit décochée, en attenant la réponse du dialogue
      this.checked2 = false
      this.titleDialog = "gérer interaction check 2 via await sur promesse"
      let answer = await this.$refs.dialog2.open()
      if (answer) {
        console.log("confirmation OK pour check 2")
        this.checked2 = true
      }
      else {
        console.log("confirmation annulée pour check 2")
      }
    },
    async manageButton2() {
      this.titleDialog = "gérer interaction button 2 via await sur promesse"
      let answer = await this.$refs.dialog2.open()
      if (answer) {
        console.log("confirmation OK pour button 2")
        this.checked2 = false
      }
      else {
        console.log("confirmation annulée pour button 2")
      }
    }
  }
};
</script>

<style>
/* Ajoutez vos styles CSS ici */
</style>
