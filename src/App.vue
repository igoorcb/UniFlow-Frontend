<template>
  <AuthForm v-if="!isAuthenticated" @auth-success="onAuthSuccess" />
  <DefaultLayout v-else />
</template>

<script>
import DefaultLayout from './layouts/DefaultLayout.vue';
import AuthForm from './components/AuthForm.vue';

export default {
  name: 'App',
  components: {
    DefaultLayout,
    AuthForm,
  },
  data() {
    return {
      isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
    };
  },
  created() {
    window.addEventListener('auth-success', this.onAuthSuccess);
  },
  beforeUnmount() {
    window.removeEventListener('auth-success', this.onAuthSuccess);
  },
  methods: {
    onAuthSuccess() {
      this.isAuthenticated = true;
      localStorage.setItem('isAuthenticated', 'true');
    },
  },
};
</script>