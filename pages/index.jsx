import Router from "next/router";
import { firebase } from "../lib/firebase";
import { useContext, useEffect, useState } from "react";
import Store from "../Store/Context";
import Link from 'next/link'
import Loading from "./loading";
import Navbar from "../components/Navbar";
import { format, compareAsc } from "date-fns";
import Daily from "../components/Daily";
const index = () => {
  const { state, dispatch } = useContext(Store);
  const [gstate, setState] = useState({
    leaderboard: [],
    loading: true,
    previous: []
  })
  useEffect(() => {
    let isCancelled = false
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
    const day = format(new Date(), "iiii");
    let Leaderboard;
    firebase
      .database()
      .ref(`/users`)
      .once("value")
      .then(data => {
        console.log(data.val())
        console.log("LEADERBOARD", data.val());
        if (data.val()) {
          const obj = data.val()
          const result = Object.keys(obj).map((item, index) => {
            return obj[item]
          })
          const sorted = result.sort((a, b) => {
            if (a.levelsSolved > b.levelsSolved) return -1;
            if (a.levelsSolved < b.levelsSolved) return 1;
            if (a.time > b.time) return 1;
            if (a.time < b.time) return -1;
          })
          Leaderboard = sorted.slice(0, 11)
        } else {
          Leaderboard = []
        }

        firebase.database().ref('/notifications/').once("value").then(data => {

          if (!isCancelled) {
            setState({
              ...gstate,
              leaderboard: Leaderboard,
              loading: false,
              previous: (data.val() === null) ? [] : data.val()
            })
          }
        })
      })
      .catch(res => {
        console.log(res);
      });

    return () => {
      isCancelled = true;
    };
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
    return <Loading />
  } else {
    return (
      <div>
        <div className="bar"></div>
        <Navbar state={state} loginHandler={loginHandler} />
        <div className="banner">
          <div className="text">
            ObscurA Quarantine Special :p<br />
            <p>Wash your hands before you start :)</p>
          </div>
        </div>
        <div className="container">
          <div className="con-1">
            <div className="leaderboard">
              <div className="th tr">
                <div> Rank </div> <div> Player </div>{" "}
                <div className="mt-l"> Solved </div> <div> Time(mins) </div>{" "}
              </div>{" "}
              {
                !gstate.loading ? gstate.leaderboard.length > 0 ? gstate.leaderboard.map((p, index) => {
                  return <div key={index} className="tr">
                    <div className="lb-player rk ">
                      <div> {index + 1}</div>{" "}
                    </div>{" "}
                    <div className="lb-player pl">
                      <div>
                        <img
                          className="lb-img"
                          src={p.image}
                          alt={p.gameName}

                        />
                      </div>{" "}
                      <div className="pl-n"> {p.gameName} </div>{" "}
                    </div>{" "}
                    <div className="lb-player"> {p.levelsSolved}</div>{" "}
                    <div className="lb-player"> {p.time}</div>{" "}
                  </div>

                }) : <div>
                    <br />
                    <center><p>No entries yet</p></center>
                  </div> : <div>
                    <br />
                    <center><p>Loading..</p></center>
                  </div>
              }
            </div>
          </div>
          <div className="con-2">
            <Link href="/teamobscura">
              <div className="item-card">
                <div><p>Team ObscurA</p></div>
              </div>
            </Link>
            <p className="sub-title"> Notifications </p>{" "}
            <div className="daily">
              {
                gstate.loading ? <p>Loading</p> : !gstate.previous.length > 0 ? <p>No entries yet</p> : gstate.previous.map((d, i) => <div key={i} className="tr">
                  <div>
                    {d}
                  </div>

                </div>)
              }
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
