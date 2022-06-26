"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const post_1 = require("./post");
const knex_1 = require("knex");
const KnexConfig = require("../../knexfile");
const uuid_1 = require("uuid");
const config_1 = require("../config");
const conf = (0, config_1.default)();
const knexConf = KnexConfig[conf.env];
const database = (0, knex_1.default)(knexConf);
async function create(post) {
    const [newPost] = await database("posts")
        .insert(Object.assign({ id: (0, uuid_1.v4)() }, post))
        .returning("*");
    return newPost;
}
async function list() {
    const posts = await database("posts").select([
        "id",
        "title",
        "published",
        "author",
        "blurb",
    ]);
    return posts;
}
async function read(postId) {
    const [post] = await database("posts").where({ id: postId });
    if (!post) {
        throw new post_1.PostNotFoundException(`post ${postId} not found`);
    }
    else {
        return post;
    }
}
async function update(postId, post) {
    const [newPost] = await database("posts")
        .where({ id: postId })
        .update(post)
        .returning("*");
    return newPost;
}
async function destroy(postId) {
    const deletedRows = await database("posts").where({ id: postId }).del();
    if (!deletedRows) {
        throw new post_1.PostNotFoundException(`post ${postId} not found`);
    }
}
exports.default = {
    create,
    list,
    read,
    update,
    destroy,
};
//# sourceMappingURL=knex.js.map