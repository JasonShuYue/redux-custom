import React, { useState, useContext, useEffect } from "react";

const AppContext = React.createContext(null);

const store = {
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

const App = () => {
  return (
    <AppContext.Provider value={store}>
      <大儿子 />
      <二儿子 />
      <小儿子 />
    </AppContext.Provider>
  );
};

const 大儿子 = () => {
  console.log("大儿子执行了!!!", Math.random());
  return (
    <section>
      大儿子
      <User />
    </section>
  );
};

const 二儿子 = () => {
  console.log("二儿子执行了!!!", Math.random());
  return (
    <section>
      二儿子
      <UserModifier />
    </section>
  );
};

const 小儿子 = () => {
  console.log("小儿子执行了!!!", Math.random());
  return <section>小儿子</section>;
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

const connect = (Component) => {
  return (props) => {
    const { state, setState, listeners } = useContext(AppContext);
    const [, update] = useState({});

    useEffect(() => {
      listeners.push(() => update({}));
    }, []);

    const dispatch = (action) => {
      setState(reducer(state, action));
    };

    return <Component {...props} state={state} dispatch={dispatch} />;
  };
};

const User = connect(({ state }) => {
  console.log("User 执行了", Math.random());
  return <div>User: {state.user.name}</div>;
});

const UserModifier = connect(({ state, dispatch }) => {
  console.log("UserModifier 执行了", Math.random());
  const onChange = (e) => {
    dispatch({
      type: "updateUser",
      payload: {
        name: e.target.value,
      },
    });
  };

  return (
    <div>
      <input value={state.user.name} onChange={onChange} />
    </div>
  );
});

export default App;
