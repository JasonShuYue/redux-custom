import React from "react";

import { connect, AppContext, store } from "./redux";

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
  console.log("大儿子！！！！");
  return (
    <section>
      大儿子
      <User />
    </section>
  );
};

const 二儿子 = () => {
  console.log("二儿子！！！！");
  return (
    <section>
      二儿子
      <UserModifier />
    </section>
  );
};

const 小儿子 = connect((state) => {
  return {
    group: state.group,
  };
})(({ group }) => {
  console.log("小儿子！！！！");
  return <section>小儿子: {group.name}</section>;
});

const User = connect((state) => {
  return {
    user: state.user,
  };
})(({ user }) => {
  console.log("USER！！！---------");

  return <div>User: {user.name}</div>;
});

const UserModifier = connect()(({ state, dispatch }) => {
  console.log("UserModifier！！！！");
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
