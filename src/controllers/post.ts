import { Request, Response } from "express";
import repository from "../repository/knex";
import { Post } from "../repository/post";

export async function create(req: Request, res: Response): Promise<void> {
  const post = await repository.create(req.body as Post);
  res.status(201).json(post);
}
