<template>

  <router-link :to="`/post/${post.slug}`">
    <v-card :title="`${post.title}`">

      <v-card-text>
        {{ post.description }}
      </v-card-text>

    </v-card>
  </router-link>
</template>

<script setup>
defineProps({ post: Object });
</script>
