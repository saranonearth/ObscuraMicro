import { useContext, useEffect } from "react";
import Store from "../Store/Context";
import { useRouter } from "next/router";
import { auth } from "../lib/firebase.js";
import Navbar from "../components/Navbar";
import Timer from "../components/Timer";
const game = () => {
  const { state, dispatch } = useContext(Store);
  const router = useRouter();
  useEffect(() => {
    if (!state.isAuth) {
      router.push("/");
    }
  }, [state]);

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
            <p className="mt"><Timer endTime = {new Date(2020,2,25,3,0,0)} /></p>

            <img
              src="https://via.placeholder.com/150"
              className="game-img"
              alt="game-image"
            />
            <br />
            <div>
              <input type="text" />
              <div>
                <button className="btn">Submit</button>
              </div>
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
