import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyAI2sYOT43eVEQ-hF1iBQw0v727-B3CWd8',
  authDomain: 'my-reddit-f3a80.firebaseapp.com',
  databaseURL: 'https://my-reddit-f3a80.firebaseio.com',
  projectId: 'my-reddit-f3a80',
  storageBucket: 'my-reddit-f3a80.appspot.com',
  messagingSenderId: '144125486566',
  appId: '1:144125486566:web:7ef1e9105d55ca4b132227',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
