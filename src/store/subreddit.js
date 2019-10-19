import { firestoreAction } from 'vuexfire';
import firebase from '@/firebase';
import db from '@/db';

const posts = db.collection('posts');

const state = {
  subreddits: [],
  posts: [],
};

const getters = {
  subreddit: state => state.subreddits[0] ? state.subreddits[0] : {},
};

const actions = {
  createPost({ getters }, post) {
    const result = posts.doc();
    post.id = result.id;
    post.subreddit_id = getters.subreddit.id;
    post.user_id = firebase.auth().currentUser.uid;
    post.created_at = firebase.firestore.FieldValue.serverTimestamp();
    post.updated_at = firebase.firestore.FieldValue.serverTimestamp();
    posts.doc(post.id).set(post);
  },
  initSubreddit: firestoreAction(({ bindFirestoreRef }, name) => {
    bindFirestoreRef('subreddits', db.collection('subreddits').where('name', '==', name));
  }),
  initPosts: firestoreAction(({ bindFirestoreRef }, subreddit_id) => {
    bindFirestoreRef('posts', posts.where('subreddit_id', '==', subreddit_id));
  }),
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
};
