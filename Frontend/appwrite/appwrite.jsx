import { Client, Account } from "appwrite";
import { config } from "../appwrite.config";
console.log("this works");
const SERVER_ENDPOINT = config.SERVER_ENDPOINT;
const PROJECT_ID = config.PROJECT_ID;
const client = new Client();
console.log(client);
console.log(typeof client);

client.setEndpoint(SERVER_ENDPOINT).setProject(PROJECT_ID);

const account = new Account(client);

console.log(account);
export { account };
