"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const joi = require("joi");
const postSchema = joi.object({
    title: joi.string().required(),
    published: joi.date().iso().required(),
    blurb: joi.string().required(),
    content: joi.string().base64().required(),
    author: joi.string().required(),
});
exports.default = (req, res, next) => {
    const result = postSchema.validate(req.body);
    if (result.error) {
        res.status(400).json({ error: result.error.message });
    }
    else {
        next();
    }
};
//# sourceMappingURL=post-validator.js.map