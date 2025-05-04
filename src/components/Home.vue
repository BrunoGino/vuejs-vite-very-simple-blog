<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="12">
        <v-img
          class="mx-auto"
          height="300"
          max-width="500"
          src="/img/favicoon.png"
        />
      </v-col>
      <v-col>
        <h1 style="text-align: center">Jaspion Notícias</h1>
      </v-col>
    </v-row>
  </v-container>

  <v-container>
    <v-row>
      <PostCard v-for="post in postStore.posts" :key="post.slug" :post="post" />
    </v-row>
    <v-alert
      v-if="postStore.error"
      type="warning"
      class="mt-6"
      prominent
      border="start"
    >
      {{ postStore.error }}
    </v-alert>
    <v-progress-linear
      v-if="postStore.loading"
      indeterminate
      color="primary"
      class="mt-4"
    />
  </v-container>
</template>

<script setup>
import { onMounted } from "vue";
import { usePostStore } from "@/stores/postStore";
import PostCard from "./PostCard.vue";

const postStore = usePostStore();

onMounted(async () => {
  await postStore.fetchPosts();

  if (postStore.usedFallback && postStore.triedApi) {
    setTimeout(() => {
      postStore.retryApiFetch();
    }, 15000);
  }
});
</script>
