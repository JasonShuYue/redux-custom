import React, { useContext, useEffect, useMemo, useState } from "react";

const appContext = React.createContext(null);

const App = () => {
  console.log("App 执行了", Math.random());

  const [appState, setAppState] = useState({
    user: {
      name: "Jason",
      age: 27,
    },
  });

  const contextValue = { appState, setAppState };

  const x = useMemo(() => {
    return <小儿子 />;
  }, []);

  return (
    <appContext.Provider value={contextValue}>
      <大儿子 />
      <二儿子 />
      {x}
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

const User = () => {
  console.log("User 执行了", Math.random());
  const { appState } = useContext(appContext);
  return <div>User: {appState.user.name}</div>;
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
    const { appState, setAppState } = useContext(appContext);

    const dispatch = (action) => {
      setAppState(reducer(appState, action));
    };

    return <Component {...props} dispatch={dispatch} state={appState} />;
  };
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
