<!-- ArticleDetails.vue -->
<template>
  <v-dialog v-model="dialogData" max-width="600">
    <v-card>
      <v-card-title>{{ content.title }}</v-card-title>
      <v-card-subtitle>{{ content.subtitle }}</v-card-subtitle>
      <v-card-text v-for="{text, id} in content.content" :key="id">
        {{ text }}
      </v-card-text>
      <v-card-actions>
        <v-btn @click="$emit('closeDialog')">Fermer</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>

export default {
  props: {
    content: Object,
    dialog: Boolean,
  },
  data: () => {
    return {
      dialogData : false,
    }
  },
  mounted() {
    this.dialogData = this.dialog
  }
};
</script>

<style scoped>
/* Ajoutez vos styles CSS ici */
</style>
