import { SignUp } from "../Screens/ProfileScreen";
import { account } from "./appwrite";
const State = () => {
  return {
    name: async () => {
      const user = await Promise.resolve(account.get());
      return user.name;
    },
    signup: async (email, password, name) => {
      await account.create("unique()", email, password, name);
      await account.createEmailSession(email, password);
      const user = await account.get();
      State.init(user);
    },
    login: async (email, password) => {
      await account.createEmailSession(email, password);
      const user = await account.get();
      State.init(user);
    },
    logout: async () => {
      await account.deleteSession("current");
      return set({ account: null });
    },
    init: async (account) => {
      return set({ account });
    },
  };
};
export default State;
