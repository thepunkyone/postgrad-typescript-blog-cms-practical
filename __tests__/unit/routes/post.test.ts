import * as express from "express";
import * as request from "supertest";
import postRouter, { Controller } from "../../../src/routes/post";

describe("post", () => {
  let testApp: express.Application;
  let controller: Controller;
  let router: express.Router;

  beforeEach(() => {
    // create a new app for each test
    testApp = express();

    // create a stubbed controller object
    controller = {
      create: jest
        .fn()
        .mockImplementation((_: express.Request, res: express.Response) => {
          res.sendStatus(201);
        }),
      list: jest
        .fn()
        .mockImplementation((_: express.Request, res: express.Response) => {
          res.sendStatus(200);
        }),
      read: jest
        .fn()
        .mockImplementation((_: express.Request, res: express.Response) => {
          res.sendStatus(200);
        }),
      update: jest
        .fn()
        .mockImplementation((_: express.Request, res: express.Response) => {
          res.sendStatus(200);
        }),
      destroy: jest
        .fn()
        .mockImplementation((_: express.Request, res: express.Response) => {
          res.sendStatus(204);
        }),
    };

    // create a new router and pass our stubbed controller into it
    router = postRouter(controller);

    // attach our router to our test app
    testApp.use("/posts", router);
  });

  describe("/", () => {
    describe("POST", () => {
      it("directs request to create post controller", async () => {
        // make a POST request to our test app
        await request(testApp).post("/posts").send();

        // expect the create method on our stubbed controller to have been called
        expect(controller.create).toHaveBeenCalledTimes(1);
      });

      describe("GET", () => {
        it("directs request to list post controller", async () => {
          // make a POST request to our test app
          await request(testApp).get("/posts");

          // expect the create method on our stubbed controller to have been called
          expect(controller.list).toHaveBeenCalledTimes(1);
        });
      });
    });

    describe("/:id", () => {
      describe("GET", () => {
        it("directs request to read post controller", async () => {
          // make a POST request to our test app
          await request(testApp).get("/posts/1234");

          // expect the create method on our stubbed controller to have been called
          expect(controller.read).toHaveBeenCalledTimes(1);
        });
      });

      describe("PUT", () => {
        it("directs request to update post controller", async () => {
          // make a POST request to our test app
          await request(testApp).put("/posts/1234").send();

          // expect the create method on our stubbed controller to have been called
          expect(controller.update).toHaveBeenCalledTimes(1);
        });
      });

      describe("DELETE", () => {
        it("directs request to delete post controller", async () => {
          // make a POST request to our test app
          await request(testApp).delete("/posts/1234");

          // expect the create method on our stubbed controller to have been called
          expect(controller.destroy).toHaveBeenCalledTimes(1);
        });
      });
    });
  });
});
