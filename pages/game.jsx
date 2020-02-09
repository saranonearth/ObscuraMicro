import { useContext, useEffect } from "react";
import Store from "../Store/Context";
import { useRouter } from "next/router";
import NavBar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';

const game = () => {
  const { state, dispatch } = useContext(Store);
  const router = useRouter();
  useEffect(() => {
    if (!state.isAuth) {
      router.push("/");
    }
  }, [state]);
  const header = (
    <NavBar expand="xs" id="header">
      <NavBar.Brand><h1 style={{color:'#ffffff'}}>ObscurA Micro</h1></NavBar.Brand>
      <Nav>
        <Nav.Item>
          <Button className="play"><h4 style={{fontWeight:'500'}}>Logout</h4></Button>
        </Nav.Item>
      </Nav>
    </NavBar>
  );
  return header
};

export default game;
