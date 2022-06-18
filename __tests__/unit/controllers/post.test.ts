import { Request, Response } from "express";
import { Post } from "../../../src/repository/post";
import repository from "../../../src/repository/knex";
import { create, list } from "../../../src/controllers/post";

// This replaces the imported repository code with a jest mock, it lets us mock the knex code without having to manually perform dependency injection
jest.mock("../../../src/repository/knex");

describe("post", () => {
  describe("create", () => {
    it("returns 201 and creates new post", async () => {
      const post: Post = {
        title: "",
        published: "",
        blurb: "",
        content: "",
        author: "",
      };

      // Here we are defining what our mocked repository.create function will return
      // In this case we are just returning our post object with an added id property
      const repo = repository.create as jest.MockedFunction<
        (data: Post) => Promise<Post>
      >;
      repo.mockImplementation(() => Promise.resolve({ id: "", ...post }));

      // Here we are creating stubbed Request and Response objects
      // We are using the as keyword to type assert that they are the correct express types
      // We need to assert the type as unknown first in order to satisfy the ts-compiler
      const req = ({ body: post } as unknown) as Request;
      const res = ({
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      } as unknown) as Response;

      await create(req, res);

      expect(repo).toHaveBeenCalledWith(post);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ id: "", ...post });

      // Finally, we reset the mock to avoid affecting the behaviour in other tests
      repo.mockReset();
    });
  });

  describe("list", () => {
    it("returns 200 and a list of posts", async () => {
      const req = ({} as unknown) as Request;
      const res = ({
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      } as unknown) as Response;

      const repo = repository.list as jest.MockedFunction<
        () => Promise<Post[]>
      >;
      repo.mockImplementation(() =>
        Promise.resolve([{ title: "post title" } as Post])
      );

      await list(req, res);

      expect(repo).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        posts: [{ title: "post title" }],
      });

      repo.mockReset();
    });

    it("returns 500 if an unexpected error occurs", async () => {
      const req = ({} as unknown) as Request;
      const res = ({
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      } as unknown) as Response;

      const repo = repository.list as jest.MockedFunction<
        () => Promise<Post[]>
      >;
      repo.mockImplementation(() =>
        Promise.reject(new Error("something went wrong"))
      );

      await list(req, res);

      expect(repo).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "something went wrong" });

      repo.mockReset();
    });
  });
});
