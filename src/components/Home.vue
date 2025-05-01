<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="12">
        <v-img
          class="mx-auto"
          height="300"
          max-width="500"
          src="/public/img/favicoon.png"
        />
      </v-col>
      <v-col>
        <h1 style="text-align: center;">Jaspion Notícias </h1>
      </v-col>
    </v-row>
  </v-container>
  <v-container>
    <v-row>
      <PostCard v-for="post in posts" :key="post.id" :post="post" />
    </v-row>
  </v-container>
</template>

<script setup>
import { posts } from "../data/posts";
import PostCard from "./PostCard.vue";
</script>
