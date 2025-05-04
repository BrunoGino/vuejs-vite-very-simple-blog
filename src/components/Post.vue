<template>
  <div v-if="post">
    <v-container class="mb-4">
      <v-btn icon @click="$router.back()">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
    </v-container>

    <PostSingle :post="post" />
  </div>

  <div v-else>
    <v-container>
      <v-row align="center" justify="center" style="height: 60vh">
        <v-col class="text-center" cols="12" md="8">
          <v-btn class="mb-4" icon @click="$router.back()">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>

          <v-alert border="start" class="mt-2" prominent type="error">
            Post não encontrado.
          </v-alert>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
  import { useRoute } from 'vue-router';
  import { computed, onMounted } from 'vue';
  import { usePostStore } from '@/stores/postStore';
  import PostSingle from '@/components/PostSingle.vue';

  const route = useRoute();
  const postStore = usePostStore();

  onMounted(() => {
    if (!postStore.loaded && !postStore.loading) {
      postStore.loadFromCache();
    }
  });

  const post = computed(() =>
    postStore.posts.find(p => p.slug === route.params.slug)
  );
</script>
