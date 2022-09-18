import React, { useState, useContext } from "react";

const AppContext = React.createContext(null);

const App = () => {
  const [appState, setAppState] = useState({
    user: {
      name: "Jason",
      age: 18,
    },
  });

  const contextValue = { appState, setAppState };

  return (
    <AppContext.Provider value={contextValue}>
      <大儿子 />
      <二儿子 />
      <小儿子 />
    </AppContext.Provider>
  );
};

const 大儿子 = () => (
  <section>
    大儿子
    <User />
  </section>
);

const 二儿子 = () => (
  <section>
    二儿子
    <UserModifier />
  </section>
);

const 小儿子 = () => <section>小儿子</section>;

const User = () => {
  const contextValue = useContext(AppContext);
  return <div>User: {contextValue.appState.user.name}</div>;
};

const UserModifier = () => {
  const contextValue = useContext(AppContext);

  const onChange = (e) => {
    const { appState, setAppState } = contextValue;

    appState.user.name = e.target.value;

    setAppState({ ...appState });
  };

  return (
    <div>
      <input value={contextValue.appState.user.name} onChange={onChange} />
    </div>
  );
};

export default App;
