export interface Post {
  id?: string;
  title: string;
  published: string;
  blurb: string;
  content: string;
  author: string;
}

export interface PostRepository {
  create(post: Post): Promise<Post>;
}
