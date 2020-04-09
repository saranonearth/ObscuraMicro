import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database'

var firebaseConfig = {
    apiKey: "AIzaSyCV-3N44KZiC3j475uTBh0ZGK6Cqi3MfqI",
    authDomain: "obscuramini-967ea.firebaseapp.com",
    databaseURL: "https://obscuramini-967ea.firebaseio.com",
    projectId: "obscuramini-967ea",
    storageBucket: "obscuramini-967ea.appspot.com",
    messagingSenderId: "619577793160"
};
let Firebase;
if (!firebase.apps.length) {
    Firebase = firebase.initializeApp(firebaseConfig);
}
const auth = firebase.auth();

export {
    auth,
    firebase,
    Firebase
};