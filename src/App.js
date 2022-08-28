import React, { useContext, useEffect, useMemo, useState } from "react";

const appContext = React.createContext(null);

const store = {
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

const connect = (Component) => {
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

const App = () => {
  console.log("App 执行了", Math.random());

  return (
    <appContext.Provider value={store}>
      <大儿子 />
      <二儿子 />
      <小儿子 />
    </appContext.Provider>
  );
};

const 大儿子 = () => {
  console.log("大儿子 执行了", Math.random());

  return (
    <section>
      大儿子<User></User>
    </section>
  );
};

const 二儿子 = () => {
  console.log("二儿子 执行了", Math.random());

  return (
    <section>
      二儿子<UserModifier></UserModifier>
    </section>
  );
};

const 小儿子 = () => {
  console.log("小儿子 执行了", Math.random());

  return <section>小儿子</section>;
};

const User = connect(() => {
  console.log("User 执行了", Math.random());
  const { state } = useContext(appContext);
  return <div>User: {state.user.name}</div>;
});

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

const UserModifier = connect(({ state, dispatch, children }) => {
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
      {children}
      <input value={state.user.name} onChange={onChange}></input>
    </div>
  );
});

export default App;
