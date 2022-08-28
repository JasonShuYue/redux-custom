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
    二儿子<UserModifier></UserModifier>
  </section>
);
const 小儿子 = () => <section>小儿子</section>;

const User = () => {
  const { appState } = useContext(appContext);
  return <div>User: {appState.user.name}</div>;
};

const UserModifier = () => {
  const { appState, setAppState } = useContext(appContext);
  const onChange = (e) => {
    const newState = Object.assign({}, appState);
    newState.user.name = e.target.value;
    setAppState(newState);
  };

  return (
    <div>
      <input value={appState.user.name} onChange={onChange}></input>
    </div>
  );
};

export default App;
