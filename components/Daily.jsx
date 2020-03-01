const Daily = () => {
  return (
    <div className="con-2">
    <p className="sub-title">Previous days winners</p>
    <div className="daily">
      <div className="tr th">
        <div>Player</div>
        <div>Day</div>
      </div>
      <div className="tr">
        <div className="lb-player">
          <div>
            <img
              className="lb-img"
              src="https://via.placeholder.com/150"
              alt="userimg"
            />
          </div>
          <div>Saran</div>
        </div>
        <div className="center">
          <div>Monday</div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Daily;
