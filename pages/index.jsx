import App from "../components/App";
import Link from "next/link";
import { useRouter } from "next/router";

const index = () => {
  const router = useRouter();
  console.log(router);
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
