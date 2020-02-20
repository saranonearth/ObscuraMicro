const Navbar = ({ loginHandler, logouthandler, state }) => {
  return (
    <div>
      <div className="nav">
        <div className="navbar">
          <div className="title">ObscurA Micro</div>
          {state.isAuth ? (
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
