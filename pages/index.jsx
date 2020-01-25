import App from "../components/App";
import Link from "next/link";
import { auth, firebase } from "../lib/firebase";

const index = () => {
  return (
    <App>
      <div>
        <h1>Index here bruh</h1>
        <Link href="/game">
          <a>Game</a>
        </Link>
      </div>
    </App>
  );
};

export default index;
