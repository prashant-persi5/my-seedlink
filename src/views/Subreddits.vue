<template>
  <aside class="menu">
    <p class="menu-label">Subreddits</p>
    <ul class="menu-list">
      <li v-for="subreddit in subreddits" :key="subreddit.id">
        <router-link
          :to="{ name: 'subreddit', params: {name: subreddit.name} }">
          {{subreddit.name}}
        </router-link>
      </li>
   </ul>
  </aside>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  mounted() {
    this.init();
  },
  name: 'subreddits',
  computed: mapState('subreddits', ['subreddits']),
  methods: mapActions('subreddits', ['init']),
};
</script>

<style>
.menu-list a {
  text-transform: capitalize;
}
</style>
