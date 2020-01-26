import App from "../components/App";
import Link from "next/link";
import {auth,firebase} from '../lib/firebase';

const index = () => {
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
