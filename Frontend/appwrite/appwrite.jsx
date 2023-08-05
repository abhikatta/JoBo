import { Client, Account, Storage, ID } from "appwrite";
import { config } from "../appwrite.config";
const SERVER_ENDPOINT = config.SERVER_ENDPOINT; //your server endpoint
const PROJECT_ID = config.PROJECT_ID; //your project id
const client = new Client();
client.setEndpoint(SERVER_ENDPOINT).setProject(PROJECT_ID);
const account = new Account(client);
const storage = new Storage(client);

export { account, storage };
