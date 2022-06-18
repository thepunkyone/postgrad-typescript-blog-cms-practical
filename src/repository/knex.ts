import { Post, PostNotFoundException } from "./post";
import knex, { Knex } from "knex";
import * as KnexConfig from "../../knexfile";
import { v4 as uuidv4 } from "uuid";
import getConfig, { Config } from "../config";

const conf: Config = getConfig();
const knexConf: Knex.Config = KnexConfig[conf.env];

const database: Knex = knex(knexConf);

async function create(post: Post): Promise<Post> {
  const [newPost] = await database("posts")
    .insert({ id: uuidv4(), ...post })
    .returning("*");
  return newPost as Post;
}

async function list(): Promise<Post[]> {
  const posts = await database("posts").select([
    "id",
    "title",
    "published",
    "author",
    "blurb",
  ]);
  return posts as Post[];
}

async function read(postId: string): Promise<Post> {
  const [post] = await database("posts").where({ id: postId });
  if (!post) {
    throw new PostNotFoundException(`post ${postId} not found`);
  } else {
    return post as Post;
  }
}

export default {
  create,
  list,
  read,
};
