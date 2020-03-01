import { useContext, useEffect, useState } from "react";
import Store from "../Store/Context";
import { useRouter } from "next/router";
import { auth } from "../lib/firebase.js";
import Navbar from "../components/Navbar";
import Countdown from "react-countdown";
import axios from "axios";
const game = () => {
  const { state, dispatch } = useContext(Store);
  const router = useRouter();
  useEffect(() => {
    if (!state.isAuth) {
      router.push("/");
    }

    const getLevel = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5050/getlevel/${state.user && state.user.id}`
        );

        console.log("RESP", res);
      } catch (error) {
        console.log(error);
      }
    };

    getLevel();
  }, [state]);
  const [gstate, setState] = useState({
    answer: "",
    message: "",
    loading: false,
    level: null
  });
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
          id: state.user.id,
        };
        const config = {
          headers: {
            "content-type": "application/json"
          }
        };
        console.log("INPUT", { answer: gstate.answer, id:state.user.id, time: new Date() });
        setState({
          ...gstate,
          loading: true
        });
        const res = await axios.post(
          "http://localhost:5050/check",
          body,
          config
        );
        setState({
          ...gstate,
          loading: false
        });
        console.log(res);
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
            <p className="c-1">Level 1</p>
            {gstate.message ? <p className="alert">{gstate.message}</p> : null}
            <p className="mt">
              <Countdown
                date={
                  new Date(
                    "Wed Feb 26 2020 12:30:29 GMT+0530 (India Standard Time)"
                  )
                }
                renderer={renderer}
              />
            </p>

            <img
              src="https://via.placeholder.com/150"
              className="game-img"
              alt="game-image"
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
          </div>{" "}
          <br />
          <br />
          <br />
          <br />
          <div className="leaderboard">
            <div className="th tr">
              <div> Rank </div> <div> Player </div>{" "}
              <div className="mt-l"> Solved </div> <div> Time(mins) </div>{" "}
            </div>{" "}
            <div className="tr">
              <div className="lb-player rk ">
                <div> 1 </div>{" "}
              </div>{" "}
              <div className="lb-player pl">
                <div>
                  <img
                    className="lb-img"
                    src="https://via.placeholder.com/150"
                    alt="userimg"
                  />
                </div>{" "}
                <div className="pl-n"> Saran </div>{" "}
              </div>{" "}
              <div className="lb-player"> 1 / 2 </div>{" "}
              <div className="lb-player"> 23 </div>{" "}
            </div>{" "}
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
          <p className="sub-title"> Previous days winners </p>{" "}
          <div className="daily">
            <div className="tr th">
              <div> Player </div> <div> Day </div>{" "}
            </div>{" "}
            <div className="tr">
              <div className="lb-player">
                <div>
                  <img
                    className="lb-img"
                    src="https://via.placeholder.com/150"
                    alt="userimg"
                  />
                </div>{" "}
                <div> Saran </div>{" "}
              </div>{" "}
              <div className="center">
                <div> Monday </div>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
      <div className="footer">
        <div> developed by gawds </div>{" "}
      </div>
    </div>
  );
};

export default game;
