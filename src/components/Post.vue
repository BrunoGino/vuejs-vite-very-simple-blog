<template>
  <div v-if='post'>
    <PostSingle :post='post' />
  </div>
  <div v-else>
    <v-container>
      <v-row justify='center'>
        <v-col cols='12' md='8'>
          <v-alert class='mt-10' type='error'>
            Post não encontrado.
          </v-alert>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { posts } from '@/data/posts';
import PostSingle from '@/components/PostSingle.vue';

const route = useRoute();
const post = posts.find((p) => p.slug === route.params.slug);
</script>
