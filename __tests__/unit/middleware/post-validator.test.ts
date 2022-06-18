import { Request, Response, NextFunction } from "express";
import postValidator from "../../../src/middleware/post-validator";
import { Post } from "../../../src/repository/post";

describe("postValidator", () => {
  let res: Response;
  let next: NextFunction;

  beforeEach(() => {
    // mock the Response and Request objects
    res = ({
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as unknown) as Response;
    next = jest.fn() as NextFunction;
  });

  it("allows valid posts through", () => {
    // create post data to send to the middleware
    const post: Post = {
      title: "title",
      // create a timestamp
      published: new Date().toISOString(),
      blurb: "blurb",
      // create a base64 string of the word `content`
      content: Buffer.from("content").toString("base64"),
      author: "author",
    };

    // wrap the test data in a Request object
    const req = ({ body: post } as unknown) as Request;

    // invoke the middleware
    postValidator(req, res, next);

    // expect the NextFunction to have been invoked by the middleware
    expect(next).toHaveBeenCalled();
  });

  it("returns a 400 if title is missing", () => {
    const post = {
      published: new Date().toISOString(),
      blurb: "blurb",
      content: Buffer.from("content").toString("base64"),
      author: "author",
    } as Post;

    const req = ({ body: post } as unknown) as Request;

    postValidator(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: '"title" is required' });
    expect(next).not.toHaveBeenCalled();
  });

  it("returns a 400 if title is empty", () => {
    const post = {
      title: "",
      published: new Date().toISOString(),
      blurb: "blurb",
      content: Buffer.from("content").toString("base64"),
      author: "author",
    } as Post;

    const req = ({ body: post } as unknown) as Request;

    postValidator(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: '"title" is not allowed to be empty',
    });
    expect(next).not.toHaveBeenCalled();
  });
});
