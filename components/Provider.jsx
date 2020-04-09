import React, { useContext, useReducer, useEffect } from "react";
import Store from "../Store/Context";
import Reducer from "../Store/Reducer";

const Provider = (props) => {
  const initialState = useContext(Store);
  const [state, dispatch] = useReducer(Reducer, initialState);

  // console.log(state);
  return (
    <div>
      <Store.Provider value={{ state, dispatch }}>
        {props.children}
      </Store.Provider>
    </div>
  );
};

export default Provider;
