const Navbar = ({ onBoard, loginHandler, logouthandler, state }) => {
  return (
    <div>
      <div className="nav">
        <div className="navbar">
          <div className="title">ObscurA Micro</div>
          {onBoard ? (
            <div>
              {" "}
              <button className="btn" onClick={logouthandler}>
                Logout
              </button>
            </div>
          ) : state.isAuth ? (
            <div>
              {" "}
              <button className="btn" onClick={logouthandler}>
                Logout
              </button>
            </div>
          ) : (
            <div>
              <button className="btn" onClick={loginHandler}>
                Play Game
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
