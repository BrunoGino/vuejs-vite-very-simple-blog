<template>
  <v-col cols="12" md="4" sm="6">
    <v-hover v-slot="{ isHovering, props }">
      <v-card
        v-bind="props"
        class="pa-4 rounded-xl transition-fast-in-fast-out"
        :elevation="isHovering ? 10 : 2"
      >
        <v-card-title class="text-h6 font-weight-bold text-primary">
          {{ post.title }}
        </v-card-title>

        <v-card-subtitle class="text-subtitle-2 text-grey-darken-1">
          {{ post.subtitle }}
        </v-card-subtitle>

        <v-card-text class="text-body-2 text-grey-darken-1">
          {{ post.description }}
        </v-card-text>

        <v-divider class="my-2" />

        <v-card-actions>
          <v-btn
            block
            color="primary"
            :to="`/post/${post.slug}`"
            variant="text"
          >
            Ler mais
            <v-icon end>mdi-chevron-right</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-hover>
  </v-col>
</template>

<script setup>
  defineProps({
    post: {
      type: Object,
      required: true,
    },
  });
</script>
