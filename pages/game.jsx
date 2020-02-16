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
            <h1 
            style={{marginBottom:'15px'}}
            >Timer Text here</h1>

            <img src="https://via.placeholder.com/250"></img>
            <form>
              <input 
              type="text" 
              name="ans"
              placeholder="Type your answer here"
              style={{margin:'15px 0px'}}
              ></input>
            </form>
          </div>
          <div>
            <Leaderboard />
          </div>
        </div>
        <div className="gm-ar">
          <div className="instruct">
            <h1>Instructions here</h1>
          </div>
          <div>
            <Daily />
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
