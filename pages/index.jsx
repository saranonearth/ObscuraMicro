import App from "../components/App";
import Link from "next/link";
import Router from "next/router";
import { auth, firebase} from "../lib/firebase";
import database from 'firebase';

const index = () => {
  //To add data of a single user to the database.
  const addData = (userId,name) =>{
    const defaultDatabase = firebase.database();
    console.log('Database initialised');
    defaultDatabase
      .ref('/')
      .set({
        Id: userId,
        Name: name,
      });
    console.log('Added Data');
  };
  //To authenticate the user.
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
        addData(userId,'Hardik');
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };
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
