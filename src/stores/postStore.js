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
        loadFromCache() {
            const cached = localStorage.getItem('posts');
            if (cached) {
                this.posts = JSON.parse(cached);
                this.loaded = true;
            }
        },

        async fetchPosts() {
            if (this.loaded || this.loading) return;

            this.loadFromCache();
            if (this.loaded) return;

            this.loading = true;
            this.error = null;

            try {
                const { data } = await api.get('/ask');
                this.posts = data;
                this.loaded = true;
                localStorage.setItem('posts', JSON.stringify(data));
            } catch (err) {
                this.posts = [...fallbackPosts];
                this.usedFallback = true;
                this.error = 'Erro ao buscar os posts via API. Usando dados locais.';
            } finally {
                this.triedApi = true;
                this.loading = false;
            }
        },

        async retryApiFetch() {
            if (this.loaded || this.loading) return;

            this.loading = true;
            this.error = null;

            try {
                const { data } = await api.get('/ask');
                this.posts = data;
                this.loaded = true;
                localStorage.setItem('posts', JSON.stringify(data));
            } catch (err) {
                this.error = 'Ainda não foi possível conectar à API.';
            } finally {
                this.loading = false;
            }
        },
    },
});
