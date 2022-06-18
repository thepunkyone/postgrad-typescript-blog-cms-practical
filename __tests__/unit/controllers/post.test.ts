import { Request, Response } from "express";
import { Post, PostNotFoundException } from "../../../src/repository/post";
import repository from "../../../src/repository/knex";
import {
  create,
  list,
  read,
  update,
  destroy,
} from "../../../src/controllers/post";

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

  describe("read", () => {
    it("returns 200 and the requested post", async () => {
      const post: Post = {
        id: "postId",
        title: "",
        published: "",
        blurb: "",
        content: "",
        author: "",
      };
      const repo = repository.read as jest.MockedFunction<
        (id: string) => Promise<Post>
      >;
      repo.mockImplementation(() => Promise.resolve(post));

      const req = ({ params: { id: "postId" } } as unknown) as Request;
      const res = ({
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      } as unknown) as Response;

      await read(req, res);

      expect(repo).toHaveBeenNthCalledWith(1, "postId");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ post });

      repo.mockReset();
    });

    it("returns 404 if post does not exist", async () => {
      const repo = repository.read as jest.MockedFunction<
        (id: string) => Promise<Post>
      >;
      repo.mockImplementation(() =>
        Promise.reject(new PostNotFoundException("post not found"))
      );

      const req = ({ params: { id: "postId" } } as unknown) as Request;
      const res = ({
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      } as unknown) as Response;

      await read(req, res);

      expect(repo).toHaveBeenNthCalledWith(1, "postId");
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "post not found" });

      repo.mockReset();
    });

    it("returns 500 if an unexpected error occurs", async () => {
      const repo = repository.read as jest.MockedFunction<
        (id: string) => Promise<Post>
      >;
      repo.mockImplementation(() =>
        Promise.reject(new Error("something went wrong"))
      );

      const req = ({ params: { id: "postId" } } as unknown) as Request;
      const res = ({
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      } as unknown) as Response;

      await read(req, res);

      expect(repo).toHaveBeenNthCalledWith(1, "postId");
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "something went wrong" });

      repo.mockReset();
    });
  });

  describe("update", () => {
    it("returns 200 and the updated post", async () => {
      const post: Post = {
        id: "postId",
        title: "",
        published: "",
        blurb: "",
        content: "",
        author: "",
      };
      const repo = repository.update as jest.MockedFunction<
        (id: string) => Promise<Post>
      >;
      repo.mockImplementation(() => Promise.resolve(post));

      const req = ({
        params: { id: "postId" },
        body: post,
      } as unknown) as Request;
      const res = ({
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      } as unknown) as Response;

      await update(req, res);

      expect(repo).toHaveBeenNthCalledWith(1, "postId", post);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ post });

      repo.mockReset();
    });

    it("returns 404 if post not found", async () => {
      const post: Post = {
        id: "postId",
        title: "",
        published: "",
        blurb: "",
        content: "",
        author: "",
      };
      const repo = repository.update as jest.MockedFunction<
        (id: string) => Promise<Post>
      >;
      repo.mockImplementation(() =>
        Promise.reject(new PostNotFoundException("post not found"))
      );

      const req = ({
        params: { id: "postId" },
        body: post,
      } as unknown) as Request;
      const res = ({
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      } as unknown) as Response;

      await update(req, res);

      expect(repo).toHaveBeenNthCalledWith(1, "postId", post);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "post not found" });

      repo.mockReset();
    });

    it("returns 500 if an unexpected error occurs", async () => {
      const post: Post = {
        id: "postId",
        title: "",
        published: "",
        blurb: "",
        content: "",
        author: "",
      };
      const repo = repository.update as jest.MockedFunction<
        (id: string) => Promise<Post>
      >;
      repo.mockImplementation(() =>
        Promise.reject(new Error("something went wrong"))
      );

      const req = ({
        params: { id: "postId" },
        body: post,
      } as unknown) as Request;
      const res = ({
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      } as unknown) as Response;

      await update(req, res);

      expect(repo).toHaveBeenNthCalledWith(1, "postId", post);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "something went wrong" });

      repo.mockReset();
    });
  });

  describe("destroy", () => {
    it("returns 204 if post deleted", async () => {
      const repo = repository.destroy as jest.MockedFunction<
        (id: string) => Promise<void>
      >;
      repo.mockImplementation(() => Promise.resolve());

      const req = ({ params: { id: "postId" } } as unknown) as Request;
      const res = ({
        sendStatus: jest.fn().mockReturnThis(),
      } as unknown) as Response;

      await destroy(req, res);

      expect(repo).toHaveBeenNthCalledWith(1, "postId");
      expect(res.sendStatus).toHaveBeenCalledWith(204);

      repo.mockReset();
    });

    it("returns 404 if post not found", async () => {
      const repo = repository.destroy as jest.MockedFunction<
        (id: string) => Promise<void>
      >;
      repo.mockImplementation(() =>
        Promise.reject(new PostNotFoundException("post not found"))
      );

      const req = ({ params: { id: "postId" } } as unknown) as Request;
      const res = ({
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      } as unknown) as Response;

      await destroy(req, res);

      expect(repo).toHaveBeenNthCalledWith(1, "postId");
      expect(res.status).toHaveBeenCalledWith(404);

      repo.mockReset();
    });

    it("returns 500 if unexpected error occurs", async () => {
      const repo = repository.destroy as jest.MockedFunction<
        (id: string) => Promise<void>
      >;
      repo.mockImplementation(() =>
        Promise.reject(new Error("post not found"))
      );

      const req = ({ params: { id: "postId" } } as unknown) as Request;
      const res = ({
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      } as unknown) as Response;

      await destroy(req, res);

      expect(repo).toHaveBeenNthCalledWith(1, "postId");
      expect(res.status).toHaveBeenCalledWith(500);

      repo.mockReset();
    });
  });
});
