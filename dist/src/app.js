"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const post_1 = require("./routes/post");
const postController = require("./controllers/post");
const post_validator_1 = require("./middleware/post-validator");
const app = express();
app.use(express.json());
app.use(cors());
app.disable("x-powered-by");
// pass the postController to the postRouter function
// then configure the app to route all requests to /posts to the new router
app.use("/posts", (0, post_1.default)(postController, post_validator_1.default));
exports.default = app;
//# sourceMappingURL=app.js.map