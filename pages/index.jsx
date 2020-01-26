import App from "../components/App";
import Link from "next/link";
import {auth,firebase} from '../lib/firebase';
import firebaseConfig from '../firebase.config';

const index = () => {
  firebase.initializeApp(firebaseConfig);
  console.log(auth);
  console.log(firebase);
  return (
    <App>
      <div>
        <h1>Index here bruh</h1>
        <Link href="/game">
          <button>Login with Google</button>
        </Link>
      </div>
    </App>
  );
};

export default index;
