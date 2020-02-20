import Router from "next/router";
import { firebase } from "../lib/firebase";
import { useContext, useEffect } from "react";
import Store from "../Store/Context";
import Loading from "./loading";
import Navbar from "../components/Navbar";
import Leaderboard from "../components/Leaderboard";
import Daily from "../components/Daily";
const index = () => {
  const { state, dispatch } = useContext(Store);
  useEffect(() => {
    dispatch({
      type: "LOADING_BEGIN"
    });
    firebase.auth().onAuthStateChanged(authUser => {
      if (authUser) {
        const uid = authUser.uid;
        authUtil(authUser, uid);
      } else {
        dispatch({
          type: "LOADING_END"
        });
      }
    });
  }, []);
  const loginHandler = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        let User = result.user;
        const uid = User.uid;
        dispatch({
          type: "LOADING_BEGIN"
        });
        authUtil(User, uid);
      })
      .catch(error => {
        console.log(error);
        dispatch({
          type: "LOADING_END"
        });
      });
  };
  const authUtil = (User, uid) => {
    let rUser = null;
    firebase
      .database()
      .ref("/users/" + uid)
      .once("value")
      .then(res => {
        dispatch({
          type: "LOADING_END"
        });
        console.log("getUser");
        console.log(res.val());
        rUser = res.val();
        if (rUser) {
          console.log("here");
          Router.push("/game");
          dispatch({
            type: "LOGIN",
            payload: {
              user: {
                image: User.photoURL,
                name: User.displayName,
                email: User.email,
                ...rUser
              }
            }
          });
        } else {
          dispatch({
            type: "LOADING_END"
          });
          dispatch({
            type: "USER",
            payload: {
              image: User.photoURL,
              name: User.displayName,
              email: User.email
            }
          });
          Router.push({
            pathname: "/onboard",

            query: {
              w: uid
            }
          });
        }
      })
      .catch(error => {
        dispatch({
          type: "LOADING_END"
        });
        console.log("getUserError");
        console.log(error);
      });
  };
  if (state.loading) {
    return <Loading />;
  } else {
    return (
      <div>
        <div className="bar"></div>
        <Navbar state={state} loginHandler={loginHandler} />
        <div className="banner">
          <div className="text">
            Play ObscurA Micro to win goodies and clue keys for the main game!
          </div>
        </div>
        <div className="container">
          <div className="con-1">
            <div className="leaderboard">
              <div className="th tr">
                <div>Rank</div>
                <div>Player</div>
                <div className="mt-l">Solved</div>
                <div>Time(mins)</div>
              </div>
              <div className="tr">
                <div className="lb-player rk ">
                  <div>1</div>
                </div>
                <div className="lb-player pl">
                  <div>
                    <img
                      className="lb-img"
                      src="https://via.placeholder.com/150"
                      alt="userimg"
                    />
                  </div>
                  <div className="pl-n">Saran</div>
                </div>
                <div className="lb-player">1/2</div>
                <div className="lb-player">23</div>
              </div>
            </div>
          </div>
          <div className="con-2">
            <p className="sub-title">Previous days winners</p>
            <div className="daily">
              <div className="tr th">
                <div>Player</div>
                <div>Day</div>
              </div>
              <div className="tr">
                <div className="lb-player">
                  <div>
                    <img
                      className="lb-img"
                      src="https://via.placeholder.com/150"
                      alt="userimg"
                    />
                  </div>
                  <div>Saran</div>
                </div>
                <div className="center">
                  <div>Monday</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer">
          <div>developed by gawds</div>
        </div>
      </div>
    );
  }
};

export default index;
