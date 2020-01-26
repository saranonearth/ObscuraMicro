import App from "../components/App";
import Link from "next/link";
import {auth,firebase} from '../lib/firebase';

const index = () => {
  console.log(auth);
  console.log(firebase);
  const provider = new firebase.auth.GoogleAuthProvider();
  const loginHandler = ()=>{
    firebase.auth().signInWithPopup(provider)
    .then(()=>{
      const token = result.credential.accessToken;
      const user = result.user;
    }).catch((error)=>{
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = error.credential;
      });
  }
  return (
    <App>
      <div>
        <h1>Index here bruh</h1>
        <Link href="/game">
          <button onClick={loginHandler}>Login with Google</button>
        </Link>
      </div>
    </App>
  );
};

export default index;
