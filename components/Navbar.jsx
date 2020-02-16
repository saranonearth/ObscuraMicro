const Navbar = ({ loginHandler,name }) => {
  return (
    <div>
      <div className="nav">
        <div className="navbar">
          <div className="title">ObscurA Micro</div>
          <div>
            <button className="btn" onClick={loginHandler}>
              {name}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
