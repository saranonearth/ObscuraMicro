import Link from "next/link";
import Router from "next/router";
import { auth, firebase } from "../lib/firebase";
import { useContext } from "react";
import Store from "../Store/Context";
import firestore from 'firebase';

const index = () => {
  const { state, dispatch } = useContext(Store);
  console.log("STATE", state);
  console.log("DISPATCH", dispatch);
  const addUser = (userId)=>{
    const db = firebase.firestore();
    db
      .collection('user')
      .doc(userId)
      .set({
        Name:'fusionmaster7',
        Bio:'Nothing',
        Ques: 0
      });
  };
  const loginHandler = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        const token = result.credential.accessToken;
        const user = result.user;
        const userId = user.uid;
        console.log(token, user);
        addUser(userId);
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };
  return (
    <div>
      <h1>Index here bruh</h1>
      <button onClick={loginHandler}>Google Log in</button>
    </div>
  );
};

export default index;
