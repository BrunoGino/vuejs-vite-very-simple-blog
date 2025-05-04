<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" lg="8" md="10">
        <h1 class="text-h4 font-weight-bold mb-2">
          {{ post.title }}
        </h1>

        <p class="text-subtitle-1 text-grey-darken-1 mb-4">
          {{ post.subtitle }}
        </p>
        <v-sheet class="pa-6 rounded-lg" elevation="1">
          <div class="text-body-1" v-html="post.content" />
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
defineProps({
  post: Object,
});
</script>
