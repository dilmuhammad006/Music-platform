import { config } from "dotenv";
import app from "./app.js";
import { APP_PORT } from "./config/app.config.js";
import connectDb from "./config/mongo.config.js";
config();

await connectDb()
  .then((data) => console.log(data))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });

const server = app.listen(APP_PORT, () => {
  console.log(`https:localhost:${APP_PORT}`);
});

process.on("unhandledRejection", (reason, _) => {
  console.log(reason);
  server.closeAllConnections();
  server.close(() => {
    process.exit(1);
  });
});

process.on("uncaughtException", (error) => {
  console.log(error);
  process.exit(1);
});
