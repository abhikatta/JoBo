// import { useState } from "react";
// import { account } from "./appwrite";
// const State = async () => {
//   const [currentAccount, SetCurrentAccount] = useState(null);
//   const returnAccount = async () => {
//     return currentAccount;
//   };
//   const name = async () => {
//     const user = await Promise.resolve(account.get());
//     return user.name;
//   };
//   const signup = async (email, password, name) => {
//     await account.create("unique()", email, password, name);
//     await account.createEmailSession(email, password);
//     const user = await account.get();
//     State.init(user);
//   };
//   const login = async (email, password) => {
//     await account.createEmailSession(email, password);
//     const user = await account.get();
//     State.init(user);
//   };
//   const logout = async () => {
//     await account.deleteSession("current");
//     return SetCurrentAccount(null);
//   };
//   const init = async (account) => {
//     return SetCurrentAccount(account);
//   };
//   return {
//     returnAccount,
//     name,
//     login,
//     signup,
//     logout,
//     init,
//     // subscribe,
//   };
// };
// export default State;

import { useState, useEffect } from "react";
import { account as sdk } from "./appwrite";

const createState = () => {
  const [state, setState] = useState({
    account: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      const user = await sdk.get();
      setState((prevState) => ({ ...prevState, account: user }));
    };
    fetchData();
  }, []);

  const name = async () => {
    if (state.account) {
      return state.account.name;
    }
    return null;
  };

  const signup = async (email, password, name) => {
    await sdk.create("unique()", email, password, name);
    await sdk.createEmailSession(email, password);
    const user = await sdk.get();
    console.log(user);
    setState((prevState) => ({ ...prevState, account: user }));
  };

  const login = async (email, password) => {
    await sdk.createEmailSession(email, password);
    const user = await sdk.get();
    console.log(user);
    setState((prevState) => ({ ...prevState, account: user }));
  };

  const logout = async () => {
    await sdk.deleteSession("current");
    setState((prevState) => ({ ...prevState, account: null }));
  };

  return {
    name,
    signup,
    login,
    logout,
    state,
  };
};

export default createState;
