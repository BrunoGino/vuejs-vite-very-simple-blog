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

  <v-alert
    v-if="showErrorAlert"
    type="warning"
    class="mt-6"
    prominent
    border="start"
  >
    {{ postStore.error }}
  </v-alert>

  <v-container>
    <v-row>
      <PostCard v-for="post in postStore.posts" :key="post.slug" :post="post" />
    </v-row>

    <v-container class="mt-4">
      <v-row align="center" justify="start" class="gap-4">
        <v-btn color="primary" @click="handleRetry" class="mr-2">
          {{
            postStore.usedFallback
              ? "Buscar notícias atualizadas"
              : "Atualizar notícias"
          }}
        </v-btn>

        <v-tooltip v-if="postStore.usedFallback" location="top">
          <template #activator="{ props }">
            <v-icon v-bind="props" color="blue" class="cursor-pointer">
              mdi-information
            </v-icon>
          </template>
          <span>
            Os dados exibidos são locais. Tente buscar novamente para
            atualizá-los da API.
          </span>
        </v-tooltip>
      </v-row>
    </v-container>

    <v-progress-linear
      v-if="postStore.loading"
      indeterminate
      color="primary"
      class="mt-4"
    />
  </v-container>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { usePostStore } from "@/stores/postStore";
import PostCard from "./PostCard.vue";

const postStore = usePostStore();
const showErrorAlert = ref(false);

onMounted(async () => {
  await postStore.fetchPosts();

  if (postStore.error && postStore.posts.length === 0) {
    showErrorAlert.value = true;
    setTimeout(() => (showErrorAlert.value = false), 5000);
  }
});

const handleRetry = async () => {
  await postStore.retryApiFetch();

  if (postStore.error && postStore.usedFallback) {
    showErrorAlert.value = true;
    setTimeout(() => (showErrorAlert.value = false), 5000);
  } else {
    showErrorAlert.value = false;
  }
};
</script>
