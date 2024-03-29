import { Request, Response, NextFunction } from "express";
import * as joi from "joi";

const postSchema = joi.object({
  title: joi.string().required(),
  published: joi.date().iso().required(),
  blurb: joi.string().required(),
  content: joi.string().base64().required(),
  author: joi.string().required(),
});

export default (req: Request, res: Response, next: NextFunction): void => {
  const result: joi.ValidationResult = postSchema.validate(req.body);

  if (result.error) {
    res.status(400).json({ error: result.error.message });
  } else {
    next();
  }
};
