import { useContext, useEffect, useState } from "react";
import Store from "../Store/Context";
import { useRouter } from "next/router";
import { auth } from "../lib/firebase.js";
import Link from 'next/link'
import Navbar from "../components/Navbar";
import Countdown from "react-countdown";
import axios from "axios";
import { format, compareAsc } from "date-fns";
import { firebase } from "../lib/firebase";
const game = () => {
  const { state, dispatch } = useContext(Store);
  const router = useRouter();
  const [gstate, setState] = useState({
    answer: "",
    message: "",
    loading: false,
    level: null,
    leaderboard: [],
    ploading: true,
    previous: []
  });
  useEffect(() => {
    if (!state.isAuth) {
      router.push("/");
    }
    let Level;
    let Leaderboard;
    const getLevel = async () => {
      const url = `https://obscura-microserver.herokuapp.com/getlevel/${state.user && state.user.id}`
      const purl = `http://localhost:5000/getlevel/${state.user && state.user.id}`
      try {
        const res = await axios.get(
          purl
        );

        console.log("RESP", res);

        Level = res.data


        const day = format(new Date(), "iiii");
        console.log("DAY", day)
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

              setState({
                ...gstate,
                leaderboard: Leaderboard,
                level: Level,
                ploading: false,
                previous: (data.val() === null) ? [] : data.val()
              })
            })
          })
          .catch(res => {
            console.log(res);
          });
      } catch (error) {
        console.log(error);
      }
    };

    console.log("CALLING GET FUNCTION");
    getLevel();

  }, []);

  const handleChange = e => {
    console.log(gstate);
    setState({
      ...gstate,
      answer: e.target.value
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!gstate.answer) {
      setState({
        ...gstate,
        message: "Answer field is empty"
      });

      setTimeout(() => {
        setState({
          ...gstate,
          message: ""
        });
      }, 3000);
    } else {
      try {
        const body = {
          answer: gstate.answer,
          id: state.user.id
        };
        const config = {
          headers: {
            "content-type": "application/json"
          }
        };
        console.log("INPUT", {
          answer: gstate.answer,
          id: state.user.id,
          time: new Date()
        });
        setState({
          ...gstate,
          loading: true
        });

        const levelName = gstate.level.data.name
        const url = `https://obscura-microserver.herokuapp.com/check/${levelName}`
        const purl = `http://localhost:5000/check/${levelName}`
        const res = await axios.post(
          purl,
          body,
          config
        );
        console.log("LEVEL ANSWER", res);
        if (res.data.message === "CORRECT") {
          setTimeout(() => {
            location.reload();
          }, 2500);
          if (res.data.data === "NO_MORE_LEVELS") {
            setState({
              ...gstate,
              loading: false,
              message: "CORRECT",
              level: {
                message: "NO_MORE_LEVELS"
              }
            });
          } else {
            setState({
              ...gstate,
              loading: false,
              message: "CORRECT",
              level: res.data
            });
          }
        }
        if (res.data.message === "LATE") {
          setState({
            ...gstate,
            loading: false,
            message: "LATE"
          });
        }
        if (res.data.message === "WRONG") {
          setState({
            ...gstate,
            loading: false,
            message: "WRONG"
          });
        }

        setTimeout(() => {
          setState({
            ...gstate,
            message: ""
          });
        }, 3000);
      } catch (error) {
        setState({
          ...gstate,
          message: "Server Error"
        });

        setTimeout(() => {
          setState({
            ...gstate,
            message: ""
          });
        }, 3000);
        console.log(error);
      }
    }
  };
  const logouthandler = () => {
    auth
      .signOut()
      .then(() => {
        console.log("Done");
        router.push("/");
        dispatch({
          type: "LOGOUT"
        });
      })
      .catch(e => {
        console.log(e);
      });
  };

  const Completionist = () => <span>Time up</span>;
  // const isStart = () => {
  //   return compareAsc(new Date(), new Date(gstate.level.data.startTime))
  // }


  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <Completionist />;
    } else {
      // Render a countdown
      return (
        <span>
          {hours}:{minutes}:{seconds}
        </span>
      );
    }
  };
  console.log("GSTATE", gstate);
  return (
    <div>
      <div className="bar"> </div>{" "}
      <Navbar state={state} logouthandler={logouthandler} />{" "}
      <div className="banner2">
        <div className="ld">
          <div>
            <img
              src={state.user && state.user.image}
              className="profile-image"
              alt="img"
            />
          </div>
          <div className="center-v">
            <p className="name">{state.user && state.user.gameName}</p>
            <p className="bio">{state.user && state.user.bio}</p>
          </div>
        </div>{" "}
      </div>{" "}
      <div className="container">
        <div className="con-1">
          <div className="leaderboard wd game-img">
            {gstate.ploading ? <p>Loading...</p> : gstate.level && gstate.level.message === "NO_MORE_LEVELS" ? (
              <>

                <p>Game Over</p> <p>See you tomorrow</p>
              </>
            ) : gstate.level.message === "WAIT" ? <>
              <p>Next Level will be available soon</p>
            </> : <>
                  <p className="c-1">{gstate.level && gstate.level.data.name}</p>

                  {/* <p className="mt">
                <Countdown
                  date={
                    new Date(`${gstate.level && gstate.level.data.endTime}`)
                  }
                  renderer={renderer}
                />
              </p> */}
                  <img
                    src={gstate.level && gstate.level.data.data}
                    className="game-img"
                    alt="game-image"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/150"
                    }}
                  />
                  <br />
                  <div>
                    <form onSubmit={handleSubmit}>
                      <input
                        type="text"
                        onChange={handleChange}
                        value={gstate.answer}
                        name="answer"
                      />
                      <div>
                        {gstate.loading ? (
                          <p className="mt-1">Checking..</p>
                        ) : (
                            <button className="btn">Submit</button>
                          )}
                      </div>
                    </form>
                  </div>
                </>}
          </div>
          {gstate.message ? <p className="alert">{gstate.message}</p> : null}
          <br />
          <br />
          <br />
          <br />
          <div className="leaderboard">
            <div className="th tr">
              <div> Rank </div> <div> Player </div>{" "}
              <div className="mt-l"> Solved </div> <div> Time(mins) </div>{" "}
            </div>{" "}
            {
              !gstate.ploading ? gstate.leaderboard.length > 0 ? gstate.leaderboard.map((p, index) => {
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
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/150"
                        }}
                      />
                    </div>{" "}
                    <div className="pl-n"> {p.name} </div>{" "}
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
          </div>{" "}
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>{" "}
        <div className="con-2">
          <Link href="/teamobscura">
            <div className="item-card">
              <div><p>Team ObscurA</p></div>
            </div>
          </Link>
          <p className="sub-title"> Notifications </p>{" "}
          <div className="daily">

            {
              gstate.ploading ? <p>Loading</p> : !gstate.previous.length > 0 ? <p>No entries yet</p> : gstate.previous.map((d, i) => <div key={i} className="tr">
                <div>
                  {d}
                </div>

              </div>)
            }
          </div>
        </div>
      </div>
      <div className="footer">
        <div> developed by gawds </div>{" "}
      </div>
    </div>
  );
};

export default game;
