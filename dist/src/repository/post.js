"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostNotFoundException = void 0;
class PostNotFoundException extends Error {
    constructor(message) {
        super(message);
        this.name = "PostNotFoundException";
    }
}
exports.PostNotFoundException = PostNotFoundException;
//# sourceMappingURL=post.js.map