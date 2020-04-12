import firebase from 'firebase'

// firebase init goes here
var firebaseConfig = {
    apiKey: "AIzaSyAsvEoh-ybZi-Ul1dR6wqHAy1r2qFtYFiM",
    authDomain: "vue-boiler-realtime.firebaseapp.com",
    databaseURL: "https://vue-boiler-realtime.firebaseio.com",
    projectId: "vue-boiler-realtime",
    storageBucket: "vue-boiler-realtime.appspot.com",
    messagingSenderId: "634866889133",
    appId: "1:634866889133:web:438a078614a76802e1b124"
  };
  firebase.initializeApp(firebaseConfig);

// firebase utils
const db = firebase.database()
const auth = firebase.auth()
console.log('inside config - auth:', auth)
console.log('inside config db:', db)
const currentUser = auth.currentUser

export {
    db,
    auth,
    currentUser,
}