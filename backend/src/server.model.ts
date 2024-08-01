import express, { Application } from "express";

import cors from "cors";
import db from "../db/connection";
import routes from "./routes/routes";

class Server {
    private app: Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || "8000";
        this.db();
        this.middlewares();
        this.routes()
    }
    middlewares() {
        this.app.use(cors({}));
        this.app.use(express.static("public"));
        this.app.use(express.json({ limit: "50mb" }));
    }

    async db() {
        try {
            await db.authenticate();
            console.log(

                "DB connection: " + process.env.DB + "\n" || "No db name\n"

            );
        } catch (error: any) {
            throw new Error(error);
        }
    }

    routes() {

        this.app.use("/api/",routes );
    }


    listen() {
        this.app.listen(this.port, () => {

            console.log(`Server listening on port ${this.port}`);
        });
    }

}

export default Server;
