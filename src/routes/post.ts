import { Request, Response, Router } from "express";

export interface Controller {
  create(req: Request, res: Response): void;
  list(req: Request, res: Response): void;
  read(req: Request, res: Response): void;
  update(req: Request, res: Response): void;
  destroy(req: Request, res: Response): void;
}

export default (controller: Controller): Router => {
  const router: Router = Router();

  router.route("/").post(controller.create).get(controller.list);

  router
    .route("/:id")
    .get(controller.read)
    .put(controller.update)
    .delete(controller.destroy);

  return router;
};
