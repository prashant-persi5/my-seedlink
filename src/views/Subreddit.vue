<template>
  <section>
    <h1 class="pg-title title">{{subreddit.name}}</h1>
    <button
      v-if="isLoggedIn"
      @click="showForm = !showForm"
      class="button is-primary"
    >Toggle Post Form</button>
    <form v-if="showForm && isLoggedIn" @submit.prevent="onCreatePost()">
      <b-field label="Title">
        <b-input v-model="post.title" required></b-input>
      </b-field>
      <b-field label="Description">
        <b-input type="textarea" v-model="post.description"></b-input>
      </b-field>
      <b-field label="URL">
        <b-input v-model="post.URL" type="url"></b-input>
      </b-field>
      <button class="button is-success">Add Post</button>
    </form>

    <div class="posts">
      <article class="media" v-for="(post, index) in posts" :key="post.id">
        <figure class="media-left">
          <p class="image is-64x64 user-avatar">
            <img :src="loadedUsersById[post.user_id].image">
          </p>
        </figure>
        <div class="media-content">
          <div class="content">
            <p>
              <strong>{{post.title}}</strong> &nbsp;
              <small>@{{loadedUsersById[post.user_id].name}}</small> &nbsp;
              <small>{{getCreated(index)}}</small>
              <br>
              {{post.description}}
            </p>
          </div>
          <nav class="level is-mobile">
            <div class="level-left">
              <a class="level-item">
                <span class="icon is-small"><i class="fas fa-reply"></i></span>
              </a>
              <a class="level-item">
                <span class="icon is-small"><i class="fas fa-retweet"></i></span>
              </a>
              <a class="level-item">
                <span class="icon is-small"><i class="fas fa-heart"></i></span>
              </a>
            </div>
          </nav>
        </div>
      </article>
    </div>

  </section>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  data: () => ({
    showForm: false,
    post: {
      title: '',
      description: '',
      URL: '',
    },
  }),
  mounted() {
    this.initSubreddit(this.$route.params.name);
    this.initUsers();
  },
  watch: {
    '$route.params.name'() {
      this.initSubreddit(this.$route.params.name);
    },
    subreddit() {
      if (this.subreddit.id) {
        this.initPosts(this.subreddit.id);
      }
    },
  },
  computed: {
    ...mapState('subreddit', ['posts']),
    ...mapState('auth', ['isLoggedIn', 'user']),
    ...mapGetters({
      subreddit: 'subreddit/subreddit',
      usersById: 'users/usersById',
    }),
    loadedUsersById() {
      return this.posts.reduce((byId, post) => {
        byId[post.user_id] = this.usersById[post.user_id] || {
          name: 'Loading...',
          image: 'https://bulma.io/images/placeholders/128x128.png',
        };
        return byId;
      }, {});
    },
  },
  methods: {
    isImage(url) {
      return url.match(/(png|jpg|jpeg|gif)$/);
    },
    ...mapActions('subreddit', ['createPost', 'initSubreddit', 'initPosts']),
    ...mapActions('users', { initUsers: 'init' }),
    async onCreatePost() {
      if (this.post.title && (this.post.description || this.post.URL)) {
        this.createPost(this.post);
        this.post = {
          title: '',
          description: '',
          URL: '',
        };
        this.showForm = false;
      }
    },
    getCreated(index) {
      function timeSince(date) {
        const seconds = Math.floor((new Date() - date) / 1000);
        let interval = Math.floor(seconds / 31536000);
        if (interval > 1) {
          return interval + ' years';
        }
        interval = Math.floor(seconds / 2592000);
        if (interval > 1) {
          return interval + ' months';
        }
        interval = Math.floor(seconds / 86400);
        if (interval > 1) {
          return interval + ' days';
        }
        interval = Math.floor(seconds / 3600);
        if (interval > 1) {
          return interval + ' hours';
        }
        interval = Math.floor(seconds / 60);
        if (interval > 1) {
          return interval + ' minutes';
        }
        return Math.floor(seconds) + ' seconds';
      }
      const getSince = timeSince(this.posts[index].created_at.seconds * 1000);
      return getSince < 0 ? '0 seconds' : getSince;
    },
  },
};
</script>

<style>
.pg-title {
  text-transform: capitalize;
}
.posts {
  margin-top: 2em;
}
article.media {
  border: 1px solid #f1f1f1;
  padding: 10px;
}
</style>
