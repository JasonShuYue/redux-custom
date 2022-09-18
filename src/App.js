import React from "react";

import { connect, AppContext } from "./redux";

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
