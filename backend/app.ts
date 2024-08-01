require("dotenv").config();
import Server from "./src/server.model";
const server = new Server();
server.listen();
