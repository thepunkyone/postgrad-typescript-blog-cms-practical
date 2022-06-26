"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.destroy = exports.update = exports.read = exports.list = exports.create = void 0;
const knex_1 = require("../repository/knex");
const repository = knex_1.default;
const handleException = (exception, res) => {
    const error = exception;
    switch (error.name) {
        case "PostNotFoundException": {
            res.status(404).json({ error: "post not found" });
            break;
        }
        default: {
            res.status(500).json({ error: error.message });
        }
    }
};
async function create(req, res) {
    try {
        const post = await repository.create(req.body);
        res.status(201).json(post);
    }
    catch (exception) {
        handleException(exception, res);
    }
}
exports.create = create;
async function list(_, res) {
    try {
        const posts = await repository.list();
        res.status(200).json({ posts });
    }
    catch (exception) {
        handleException(exception, res);
    }
}
exports.list = list;
async function read(req, res) {
    const postId = req.params.id;
    try {
        const post = await repository.read(postId);
        res.status(200).json({ post });
    }
    catch (exception) {
        handleException(exception, res);
    }
}
exports.read = read;
async function update(req, res) {
    const postId = req.params.id;
    const postUpdate = req.body;
    try {
        const post = await repository.update(postId, postUpdate);
        res.status(200).json({ post });
    }
    catch (exception) {
        handleException(exception, res);
    }
}
exports.update = update;
async function destroy(req, res) {
    const postId = req.params.id;
    try {
        await repository.destroy(postId);
        res.sendStatus(204);
    }
    catch (exception) {
        handleException(exception, res);
    }
}
exports.destroy = destroy;
//# sourceMappingURL=post.js.map