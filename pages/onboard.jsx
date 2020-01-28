import Router from 'next/router';
import {auth,firebase} from '../lib/firebase';
import firestore from 'firebase';
const onboard = ()=>{
    const addUser = (newUser,userId) =>{
        const db = firebase.firestore();
        db
            .collection('users')
            .doc(userId)
            .set({
                Name: newUser.Name,
                Bio: newUser.Bio,
                Ques: 0
            });
        Router.push('/game');
    }
    const clickHandler = ()=>{
        const newUser = {
            Name: document.getElementById('gamename').value,
            Bio: document.getElementById('bio').value
        };
        const user = firebase.auth().currentUser;
        const userId = user.uid;
        addUser(newUser,userId);
    };
    return(
        <div>
            <h1>Welcome to ObscurA!</h1>
            <h2>Please enter your details!</h2>
            <form>
                <input 
                type="text" 
                name="username" 
                placeholder="ObscurA Game Name"
                id="gamename">
                </input>
                <br />
                <textarea id="bio"></textarea>
            </form>
            <button onClick={clickHandler}>Play ObscurA</button>
        </div>
    );
};
export default onboard;