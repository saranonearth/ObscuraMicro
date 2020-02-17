import { useContext, useEffect } from "react";
import Store from "../Store/Context";
import { useRouter } from "next/router";
import Navbar from '../components/Navbar';
import Leaderboard from '../components/Leaderboard';
import Daily from '../components/Daily';
const game = () => {
  const { state, dispatch } = useContext(Store);
  const router = useRouter();
  useEffect(() => {
    if (!state.isAuth) {
      router.push("/");
    }
  }, [state]);
  const logoutHandler = ()=>{
    console.log('Logout function called');
  }
  return (
    <div>
      <div className="bar"></div>
      <Navbar name="Logout" loginHandler={logoutHandler}/>
      <div className="banner">
        <div className="pl-info">
          <div>
            <img 
              className="pl-img"
              src="https://via.placeholder.com/150" 
              alt="userimg" /> 
          </div>
          <div className="pl-data">
            <div><h1>Name here</h1></div>
            <div><h2>Bio data here</h2></div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="gm-ar">
          <div className="gm">
            <div className="ques">
              <div style={{padding:'15px',textAlign:'left'}}>
                <h2>Timer Text here</h2>
              </div>
              <img src="https://via.placeholder.com/200" />
              <form>
                <input 
                type="text" 
                name="answer" 
                placeholder="Answer"
                className="ans"
                >
                </input>
              </form>
            </div>
            <div className="instruct">
              <div style={{padding:'20px 0px'}}>
                <h2>Instructions</h2>
                <p style={{marginTop:'5px'}}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<br /> 
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.<br /> 
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.<br /> 
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
              </div>
            </div>
          </div>
          <div className="info">
            <div>
              <Leaderboard />
            </div>
            <div className="daily-div">
              <Daily />
            </div>
          </div>
        </div>
      </div>
      <div className="footer">
        <div>
          developed by gawds
        </div>
      </div>
    </div>
  );
};

export default game;
