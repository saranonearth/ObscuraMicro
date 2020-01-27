import App from "../components/App";
import Link from "next/link";
<<<<<<< HEAD
import { auth, firebase } from "../lib/firebase";
=======
import Router from 'next/router';
import {auth,firebase} from '../lib/firebase';
>>>>>>> c954af9... Game page now opens after authentication is complete.

const index = () => {
  console.log(auth);
  console.log(firebase);
<<<<<<< HEAD
  const provider = new firebase.auth.GoogleAuthProvider();
  const loginHandler = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(() => {
        const token = result.credential.accessToken;
        const user = result.user;
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = error.credential;
      });
  };
=======
  const loginHandler = ()=>{
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then((result)=>{
      const token = result.credential.accessToken;
      const user = result.user;
      Router.push('/game');
    });
  }
>>>>>>> c954af9... Game page now opens after authentication is complete.
  return (
    <App>
      <div>
        <h1>Index here bruh</h1>
        <button onClick={loginHandler}>Google Log in</button>
      </div>
    </App>
  );
};

export default index;
