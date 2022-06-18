import { Request, Response, NextFunction } from "express";
import * as joi from "joi";

const postSchema = joi.object({
  title: joi.string().required(),
});

export default (req: Request, res: Response, next: NextFunction): void => {
  const result: joi.ValidationResult = postSchema.validate(req.body, {
    allowUnknown: true,
  });

  if (result.error) {
    res.status(400).json({ error: result.error.message });
  } else {
    next();
  }
};
