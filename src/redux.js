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
    group: {
      name: "前端组",
    },
  },
  listeners: [],
  subscribe(fn) {
    store.listeners.push(fn);
    console.log("???/", store.listeners);

    return () => {
      console.log(232323);
      const index = store.listeners.indexOf(fn);
      store.listeners.splice(index, 1);
    };
  },
  setState: (newState) => {
    store.state = newState;

    store.listeners.forEach((fn) => fn(store.state));
  },
};

const changed = (oldData, newData) => {
  let flag = false;
  for (let key in oldData) {
    if (oldData[key] !== newData[key]) {
      flag = true;
    }
  }
  return flag;
};

export const connect = (selector) => (Component) => {
  return (props) => {
    const { state, setState } = useContext(AppContext);
    const [, update] = useState({});

    const data = selector ? selector(state) : { state };

    useEffect(
      () =>
        store.subscribe(() => {
          const newData = selector
            ? selector(store.state)
            : { state: store.state };

          if (changed(data, newData)) {
            update({});
          }
        }),
      []
    );

    const dispatch = (action) => {
      setState(reducer(state, action));
    };

    return <Component {...props} {...data} dispatch={dispatch} />;
  };
};
