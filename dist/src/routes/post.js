"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const postController = require("../controllers/post");
const passThrough = (_, __, next) => next();
exports.default = (controller = postController, validator = passThrough) => {
    const router = (0, express_1.Router)();
    router.route("/").post(validator, controller.create).get(controller.list);
    router
        .route("/:id")
        .get(controller.read)
        .put(controller.update)
        .delete(controller.destroy);
    return router;
};
//# sourceMappingURL=post.js.map