import React, { useContext, useEffect, useState } from "react";

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

export const AppContext = React.createContext(null);

export const store = {
  state: {
    user: {
      name: "Jason",
      age: 18,
    },
  },
  listeners: [],
  subscribe: (fn) => {
    store.listeners.push(fn);
    return () => {
      const index = store.listeners.indexOf(fn);
      store.listeners.splice(index, 1);
    };
  },
  setState: (newState) => {
    store.state = newState;

    store.listeners.forEach((fn) => fn(store.state));
  },
};

export const connect = (selector) => (Component) => {
  return (props) => {
    const { state, setState, listeners } = useContext(AppContext);
    const [, update] = useState({});

    const data = selector ? selector(state) : { state };

    useEffect(() => {
      listeners.push(() => update({}));
    }, []);

    const dispatch = (action) => {
      setState(reducer(state, action));
    };

    return <Component {...props} {...data} dispatch={dispatch} />;
  };
};
