import { useState, useEffect, useContext } from "react";
import { firebase } from "../lib/firebase";
import { useRouter } from "next/router";
import Store from "../Store/Context";
const onboard = () => {
  const { state, dispatch } = useContext(Store);
  const [istate, setState] = useState({
    gameName: "",
    bio: ""
  });
  const router = useRouter();
  useEffect(() => {
    if (state.isAuth) {
      router.push("/game");
    }
  }, [state]);

  const handleChange = e => {
    setState({
      ...istate,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = async e => {
    e.preventDefault();
    const { gameName, bio } = istate;
    await firebase
      .database()
      .ref("users/" + router.query.w)
      .set({
        gameName,
        bio,
        levelsSolved: [
          {
            king: true
          }
        ]
      })
      .then(() => {
        dispatch({
          type: "ONBOARD",
          payload: {
            gameName,
            bio
          }
        });
      });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="gameName">Game Name</label>
          <br />
          <input type="text" name="gameName" onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="bio">Bio</label>
          <br />
          <input
            type="text"
            name="bio"
            maxLength={30}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default onboard;
