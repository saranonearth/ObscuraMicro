import Router from "next/router";
import { firebase } from "../lib/firebase";
import { useContext, useEffect } from "react";
import Store from "../Store/Context";
import Loading from "./loading";
import NavBar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import {Container} from 'react-bootstrap';
import Leaderboard from './leaderboard';

const index = () => {
  /*const { state, dispatch } = useContext(Store);
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
  }, []);*/
  const loginHandler = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        let User = result.user;
        const uid = User.uid;
        authUtil(User, uid);
      })
      .catch(error => {
        console.log(error);
      });
  };
  const authUtil = (User, uid) => {
    let rUser = null;
    firebase
      .database()
      .ref("/users/" + uid)
      .once("value")
      .then(res => {
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
        console.log("getUserError");
        console.log(error);
      });
  };
  const header = (  
    <NavBar style={{backgroundColor:'#fafafa'}} expand="xs">
      <NavBar.Brand><h1>ObscurA Micro</h1></NavBar.Brand>
      <Nav>
        <Nav.Item>
          <Button variant="outline-dark" className="pull-right" onClick={loginHandler}><h4>Play Game</h4></Button>
        </Nav.Item>
      </Nav>
    </NavBar>
  );
  return (
    <div>
      {header}
      <hr />
      <Container>
        <Leaderboard />
      </Container>
    </div>
  );
};

export default index;