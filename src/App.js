import React, { useContext, useEffect, useState } from "react";

const appContext = React.createContext(null);

const App = () => {
  const [appState, setAppState] = useState({
    user: {
      name: "Jason",
      age: 27,
    },
  });

  const contextValue = { appState, setAppState };

  return (
    <appContext.Provider value={contextValue}>
      <大儿子 />
      <二儿子 />
      <小儿子 />
    </appContext.Provider>
  );
};

const 大儿子 = () => (
  <section>
    大儿子<User></User>
  </section>
);
const 二儿子 = () => (
  <section>
    二儿子<Wrapper></Wrapper>
  </section>
);
const 小儿子 = () => <section>小儿子</section>;

const User = () => {
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

const createWrapper = (Component) => {
  return (props) => {
    const { appState, setAppState } = useContext(appContext);

    const dispatch = (action) => {
      setAppState(reducer(appState, action));
    };

    return <Component {...props} dispatch={dispatch} state={appState} />;
  };
};

const UserModifier = ({ state, dispatch, children }) => {
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
};

const Wrapper = createWrapper(UserModifier);

export default App;
