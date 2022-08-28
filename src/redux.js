import React, { useEffect, useContext, useState } from "react";

export const appContext = React.createContext(null);

export const store = {
  state: {
    user: {
      name: "Jason",
      age: 27,
    },
  },
  setState(newState) {
    store.state = newState;

    store.listeners.forEach((fn) => fn(store.state));
  },
  listeners: [],
  subscribe(fn) {
    store.listeners.push(fn);
    return () => {
      const index = store.listeners.indexOf(fn);
      store.listeners.splice(index, 1);
    };
  },
};

export const connect = (Component) => {
  return (props) => {
    const [, update] = useState({});
    const { state, setState } = useContext(appContext);

    useEffect(() => {
      store.subscribe(() => {
        update({});
      });
    }, []);

    const dispatch = (action) => {
      setState(reducer(state, action));
      update({});
    };

    return <Component {...props} dispatch={dispatch} state={state} />;
  };
};

const reducer = (state, { type, payload }) => {
  if (type === "updateUser") {
    return {
      ...state,
      user: {
        ...state.user,
        ...payload,
      },
    };
  } else {
    return state;
  }
};
