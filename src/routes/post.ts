import { Request, Response, Router } from "express";

export interface Controller {
  create(req: Request, res: Response): void;
  list(req: Request, res: Response): void;
}

export default (controller: Controller): Router => {
  const router: Router = Router();

  router.route("/").post(controller.create).get(controller.list);

  return router;
};
