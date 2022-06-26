import { Request, Response } from "express";
import postRepository from "../repository/knex";
import PostRepository, { Post } from "../repository/post";

const repository: PostRepository = postRepository;

const handleException = (exception: unknown, res: Response) => {
  const error = <Error>exception;
  switch (error.name) {
    case "PostNotFoundException": {
      res.status(404).json({ error: "post not found" });
      break;
    }

    default: {
      res.status(500).json({ error: error.message });
    }
  }
};

export async function create(req: Request, res: Response): Promise<void> {
  try {
    const post = await repository.create(req.body as Post);
    res.status(201).json(post);
  } catch (exception) {
    handleException(exception, res);
  }
}

export async function list(_: Request, res: Response): Promise<void> {
  try {
    const posts: Post[] = await repository.list();

    res.status(200).json({ posts });
  } catch (exception) {
    handleException(exception, res);
  }
}

export async function read(req: Request, res: Response): Promise<void> {
  const postId: string = req.params.id;

  try {
    const post: Post = await repository.read(postId);

    res.status(200).json({ post });
  } catch (exception) {
    handleException(exception, res);
  }
}

export async function update(req: Request, res: Response): Promise<void> {
  const postId: string = req.params.id;
  const postUpdate: Post = req.body;
  try {
    const post: Post = await repository.update(postId, postUpdate);

    res.status(200).json({ post });
  } catch (exception) {
    handleException(exception, res);
  }
}

export async function destroy(req: Request, res: Response): Promise<void> {
  const postId: string = req.params.id;
  try {
    await repository.destroy(postId);

    res.sendStatus(204);
  } catch (exception) {
    handleException(exception, res);
  }
}
