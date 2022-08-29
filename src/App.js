import React, { useContext, useEffect, useMemo, useState } from "react";
import { store, connect, appContext } from "./redux";

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

const 小儿子 = connect((state) => {
  return {
    group: state.group || {},
  };
})(({ group }) => {
  console.log("小儿子 执行了", Math.random());

  return (
    <section>
      小儿子<div>Group: {group.name}</div>
    </section>
  );
});

const User = connect((state) => {
  return {
    user: state.user,
  };
})(({ user }) => {
  console.log("User 执行了", Math.random());

  return <div>User: {user.name}</div>;
});

const UserModifier = connect()(({ state, dispatch, children }) => {
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
