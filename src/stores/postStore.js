import { defineStore } from 'pinia';
import { posts as fallbackPosts } from '@/data/posts';
import api from '@/services/api';

export const usePostStore = defineStore('postStore', {
  state: () => ({
    posts: [],
    loading: false,
    error: null,
    loaded: false,
    triedApi: false,
    usedFallback: false,
  }),

  actions: {
    loadFromCache () {
      const cached = localStorage.getItem('posts');
      const fromApi = localStorage.getItem('posts_origin') === 'api';

      if (cached) {
        this.posts = JSON.parse(cached);
        this.loaded = true;
        this.usedFallback = !fromApi;
      }
    },

    async fetchPosts () {
      if (this.loaded || this.loading) return;

      this.loadFromCache();
      if (this.loaded) return;

      this.loading = true;
      this.error = null;

      try {
        const { data } = await api.get('/ask');
        this.posts = data;
        this.loaded = true;
        this.usedFallback = false;
        localStorage.setItem('posts', JSON.stringify(data));
        localStorage.setItem('posts_origin', 'api');
        localStorage.setItem('posts_loaded', 'true');
      } catch {
        this.posts = [...fallbackPosts];
        this.usedFallback = true;
        this.loaded = true;
        this.error = 'Erro ao buscar os posts via API. Usando dados locais.';
        localStorage.setItem('posts', JSON.stringify(this.posts));
        localStorage.setItem('posts_origin', 'fallback');
        localStorage.setItem('posts_loaded', 'true');
      } finally {
        this.triedApi = true;
        this.loading = false;
      }
    },

    async retryApiFetch () {
      if (this.loading) return;

      this.loading = true;
      this.error = null;

      try {
        const { data } = await api.get('/ask');
        this.posts = data;
        this.loaded = true;
        this.usedFallback = false;
        localStorage.setItem('posts', JSON.stringify(data));
        localStorage.setItem('posts_origin', 'api');
      } catch {
        this.error = 'Erro ao tentar atualizar as notícias na API.';
      } finally {
        this.loading = false;
      }
    },
  },
});
