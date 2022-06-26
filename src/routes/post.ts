import { Request, Response, Router, NextFunction } from "express";
import * as postController from "../controllers/post";

export interface Controller {
  create(req: Request, res: Response): void;
  list(req: Request, res: Response): void;
  read(req: Request, res: Response): void;
  update(req: Request, res: Response): void;
  destroy(req: Request, res: Response): void;
}

export type Middleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;

const passThrough = (_: Request, __: Response, next: NextFunction) => next();

export default (
  controller: Controller = postController,
  validator: Middleware = passThrough
): Router => {
  const router: Router = Router();

  router.route("/").post(validator, controller.create).get(controller.list);

  router
    .route("/:id")
    .get(controller.read)
    .put(controller.update)
    .delete(controller.destroy);

  return router;
};
