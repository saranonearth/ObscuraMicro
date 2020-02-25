import { useContext, useEffect, useState } from "react";
import Store from "../Store/Context";
import { useRouter } from "next/router";
import { auth } from "../lib/firebase.js";
import Navbar from "../components/Navbar";
import axios from "axios";
const game = () => {
  const { state, dispatch } = useContext(Store);
  const router = useRouter();
  useEffect(() => {
    if (!state.isAuth) {
      router.push("/");
    }
  }, [state]);
  const [gstate, setState] = useState({
    answer: "",
    message: ""
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
          answer: gstate.answer
        };
        const config = {
          headers: {
            "content-type": "application/json"
          }
        };
        console.log("INPUT", { answer: gstate.answer, time: new Date() });

        const res = await axios.post(
          "http://localhost:5050/check",
          body,
          config
        );

        console.log(res);
      } catch (error) {
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
            <p className="mt"> 20 mins remaining</p>

            {gstate.message ? <p className="alert">{gstate.message}</p> : null}

            <img
              src="https://via.placeholder.com/150"
              className="game-img"
              alt="game-image"
            />
            <br />
            <form onSubmit={handleSubmit}>
              <div>
                <input
                  type="text"
                  onChange={handleChange}
                  value={gstate.answer}
                  name="answer"
                />
                <div>
                  <button className="btn">Submit</button>
                </div>
              </div>
            </form>
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
