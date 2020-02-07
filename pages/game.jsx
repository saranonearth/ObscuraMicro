import { useContext, useEffect } from "react";
import Store from "../Store/Context";
import { useRouter } from "next/router";

const game = () => {
  const { state, dispatch } = useContext(Store);
  const router = useRouter();
  useEffect(() => {
    if (!state.isAuth) {
      router.push("/");
    }
  }, [state]);

  return (
    <div>
      <h1>Game here bro</h1>
    </div>
  );
};

export default game;
