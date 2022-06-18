export interface Post {
  id?: string;
  title: string;
  published: string;
  blurb: string;
  content: string;
  author: string;
}

export class PostNotFoundException extends Error {
  constructor(message: string) {
    super(message);

    this.name = "PostNotFoundException";
  }
}

export default interface PostRepository {
  create(post: Post): Promise<Post>;
  list(): Promise<Post[]>;
}
