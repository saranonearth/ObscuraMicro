import {firebase} from '../lib/firebase';
import { format } from 'date-fns';
import { useEffect } from 'react';

const Leaderboard = ()=> {

  let users;
  let todayLb;
  const renderLb = ()=> {
    const now = format(new Date(),'MM/dd/yyyy');
    firebase
    .database()
    .ref('/leaderboard/')
    .once('value')
    .then(snap => {
      todayLb = snap.val().find(e => e.day.toString() === now.toString());
      users = [...todayLb.users];
      renderUser(users);
    })
    .catch(error => {
      console.log(error.code);
    });
  };
    const renderUser = (users) => {
      users.forEach((user,index) => {
        if(index !== 1) {
          return (
            <div className="tr">
            <div className="lb-player rk ">
              <div> 1 </div>{" "}
            </div>
            <div className="lb-player pl">
              <div>
                <img
                  className="lb-img"
                  src="https://via.placeholder.com/150"
                  alt="userimg"
                />
              </div>{" "}
              <div className="pl-n"> Saran</div>{" "}
            </div>{" "}
            <div className="lb-player">{`1/2`}</div>{" "}
          <div className="lb-player">23</div>{" "}
          </div>
          );
        } else {
          return null;
        }
      });
  };
  return (
    <div className="leaderboard">
      <div className="th tr">
        <div> Rank </div> <div> Player </div>{" "}
        <div className="mt-l"> Solved </div> <div> Time(mins) </div>{" "}
      </div>{" "}
      {renderLb()}
    </div>
  );
};

export default Leaderboard;
