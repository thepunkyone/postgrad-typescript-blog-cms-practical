import * as express from "express";
import * as cors from "cors";

import postRouter from "./routes/post";
import * as postController from "./controllers/post";
import postValidator from "./middleware/post-validator";

const app: express.Application = express();

app.use(express.json());
app.use(cors());

app.disable("x-powered-by");

// pass the postController to the postRouter function
// then configure the app to route all requests to /posts to the new router
app.use("/posts", postRouter(postController, postValidator));

export default app;
