<template>
  <v-card title="Dialog">
    <v-card-text>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </v-card-text>
    <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
          text="Close Dialog"
          @click="isActive.value = false"
        ></v-btn>
      </v-card-actions>
  </v-card>
  <div class="mb-6 p-4 border rounded-lg shadow hover:shadow-lg transition">
    <router-link :to="`/post/${post.slug}`">
      <h2 class="text-xl font-semibold text-blue-600 hover:underline">
        {{ post.title }}
      </h2>
    </router-link>
    <p class="text-gray-700">{{ post.description }}</p>
    <hr />
  </div>
</template>

<script setup>
defineProps({ post: Object });
</script>
