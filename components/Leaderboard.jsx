const Leaderboard = () => {
  return (
    <div>
      <div className="leaderboard">
        <div className="th tr">
          <div>Rank</div>
          <div>Player</div>
          <div className="mt-l">Solved</div>
          <div>Time(mins)</div>
        </div>
        <div className="tr">
          <div className="lb-player rk ">
            <div>1</div>
          </div>
          <div className="lb-player pl">
            <div>
              <img
                className="lb-img"
                src="https://via.placeholder.com/150"
                alt="userimg"
              />
            </div>
            <div className="pl-n">Saran</div>
          </div>
          <div className="lb-player">1/2</div>
          <div className="lb-player">23</div>
        </div>
      </div>      
    </div>
  );
};

export default Leaderboard;
