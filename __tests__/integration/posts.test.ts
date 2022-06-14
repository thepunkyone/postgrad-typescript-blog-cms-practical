import * as request from "supertest";
import * as pg from "pg";
import { Post } from "../../src/repository/post";
import app from "../../src/app";

describe("app", () => {
  let db: pg.Client;

  beforeAll(async () => {
    // Connect to database before tests start
    db = new pg.Client({
      connectionString: `${process.env.DATABASE_URL}/blog_test`,
    });
    await db.connect();
  });
  afterEach(async () => {
    // delete all posts in db after each test
    await db.query("DELETE FROM posts");
  });
  afterAll(async () => {
    // disconnect from db after tests finish
    await db.end();
  });
  describe("/post", () => {
    describe("POST", () => {
      it("creates a new post in the database", async () => {
        const postData: Post = {
          title: "title",
          // generate am iso timestamp
          published: new Date().toISOString(),
          blurb: "blurb",
          // generate a b64 encoded string
          content: Buffer.from("content").toString("base64"),
          author: "author",
        };
        const response = await request(app).post("/posts").send(postData);

        expect(response.statusCode).toBe(201);
        expect(response.body.id).toBeTruthy();
        expect(response.body.title).toBe(postData.title);
        expect(response.body.published).toBe(postData.published);
        expect(response.body.blurb).toBe(postData.blurb);
        expect(response.body.content).toBe(postData.content);
        expect(response.body.author).toBe(postData.author);

        const { rows } = await db.query("select * from posts");

        expect(rows[0].id).toBe(response.body.id);
        expect(rows[0].title).toBe(postData.title);
        expect(rows[0].published.toISOString()).toBe(postData.published);
        expect(rows[0].blurb).toBe(postData.blurb);
        expect(rows[0].content).toBe(postData.content);
        expect(rows[0].author).toBe(postData.author);
      });
    });
  });
});
