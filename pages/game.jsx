import { useContext, useEffect } from "react";
import Store from "../Store/Context";
import { useRouter } from "next/router";
import styles from '../styles/game.module.css';

const game = () => {
  const { state, dispatch } = useContext(Store);
  const router = useRouter();
  useEffect(() => {
    if (!state.isAuth) {
      router.push("/");
    }
  }, [state]);

  return (
    <div className={styles.header}>
      <div className={styles.name}>
        <h1 style={{fontSize:'48px'}}>ObscurA</h1>
      </div>
      <div style={{paddingTop:'36px'}}>
        <button className={styles.game}>Begin Game</button>
      </div>
    </div>
  );
};

export default game;
