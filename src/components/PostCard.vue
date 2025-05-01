<template>
  <v-col cols="12" sm="6" md="4">
    <v-hover v-slot="{ isHovering, props }">
      <v-card
        v-bind="props"
        class="pa-4 rounded-xl transition-fast-in-fast-out"
        :elevation="isHovering ? 10 : 2"
      >
        <router-link
          class="text-decoration-none"
          :to="`/post/${post.slug}`"
        >
          <v-card-title class="text-h6 font-weight-bold text-primary">
            {{ post.title }}
          </v-card-title>

          <v-card-text class="text-body-2 text-grey-darken-1">
            {{ post.description }}
          </v-card-text>
        </router-link>

        <v-divider class="my-2" />
        <v-card-actions>
          <v-btn color="primary" :to="`/post/${post.slug}`" variant="text">
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
      required: true
    }
});
</script>
