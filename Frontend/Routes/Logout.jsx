import { account } from "../appwrite/appwrite";
const Logout = async () => {
  await account.deleteSession();
  return;
};
