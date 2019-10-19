<template>
  <div class="home">
    <router-link class="button is-primary"
      :to="{ name: 'subreddits'}">
      View subreddits
    </router-link>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'home',
  methods: mapActions('auth', ['login']),
};
</script>
