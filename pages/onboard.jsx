import { useState, useEffect, useContext } from "react";
import { firebase, auth } from "../lib/firebase";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import Store from "../Store/Context";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";
const onboard = () => {
  const { state, dispatch } = useContext(Store);
  const [istate, setState] = useState({
    gameName: "",
    bio: "",
  });
  const router = useRouter();
  useEffect(() => {
    if (state.isAuth) {
      router.push("/game");
    }
  }, [state]);

  const handleChange = (e) => {
    setState({
      ...istate,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    const now = format(new Date(), "MM/dd/yyyy");
    e.preventDefault();
    const { gameName, bio } = istate;
    await firebase
      .database()
      .ref("users/" + router.query.w)
      .set({
        id: router.query.w,
        gameName,
        bio,
        image: state.user.image,
        levelsSolved: 0,
      })
      .then(() => {
        dispatch({
          type: "ONBOARD",
          payload: {
            id: router.query.w,
            gameName,
            bio,
          },
        });
      });
  };

  const logouthandler = () => {
    auth
      .signOut()
      .then(() => {
        // console.log("Done");
        router.push("/");
        dispatch({
          type: "LOGOUT",
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <div className="bar"> </div>
      <Navbar state={state} onBoard={true} logouthandler={logouthandler} />{" "}
      <div className="container">
        <div className=" card ob-center">
          <form onSubmit={handleSubmit}>
            <div>
              <h1>Onboard</h1>
              <br />
              <p htmlFor="gameName"> Game Name </p>
              <input
                className="mt-0"
                type="text"
                name="gameName"
                onChange={handleChange}
                maxLength={12}
                required
              />
            </div>{" "}
            <br />
            <div>
              <p htmlFor="bio"> Bio </p>
              <input
                className="mt-0"
                type="text"
                name="bio"
                maxLength={20}
                onChange={handleChange}
                required
              />
            </div>{" "}
            <div>
              <button className="btn" type="submit">
                {" "}
                Submit{" "}
              </button>{" "}
            </div>{" "}
          </form>{" "}
        </div>
      </div>
      <div className="footer">
        <div>
          {" "}
          developed by{" "}
          <a target="_blank" className="wb" href="http://gawds.in/">
            gawds{" "}
          </a>{" "}
        </div>{" "}
      </div>
    </div>
  );
};

export default onboard;
