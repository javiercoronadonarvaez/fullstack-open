const { test, after, describe, beforeEach } = require("node:test");
const assert = require("node:assert");
const supertest = require("supertest");
const mongoose = require("mongoose");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);

const Blog = require("../models/blog");

beforeEach(async () => {
  await Blog.deleteMany({});

  for (let blog of helper.initialBlogs) {
    let newBlog = new Blog(blog);
    await newBlog.save();
  }
});

describe("Blog HTTP Testing", () => {
  test.only("GET call retrieves the correct amount of blogs in JSON format", async () => {
    const blogs = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    assert.strictEqual(blogs.body.length, helper.initialBlogs.length);
  });

  test.only("Verify the unique identifier is named id", async () => {
    const blogs = await api.get("/api/blogs");
    blogs.body.forEach((blog) =>
      assert.strictEqual(Object.keys(blog)[4], "id")
    );
  });

  test.only("Verify HTTP POST successfully creates a new blog post", async () => {
    const newBlogBody = {
      title: "TEST",
      author: "Unkown Author",
      url: "https://test.com/",
      likes: 190,
    };

    await api
      .post("/api/blogs")
      .send(newBlogBody)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const newBlogs = await helper.blogsInDb();

    assert.strictEqual(newBlogs.length, helper.initialBlogs.length + 1);
  });

  test.only("Verify that if likes property is missing, it will default to 0", async () => {
    const newBlogBody = {
      title: "TEST",
      author: "Unkown Author",
      url: "https://test.com/",
    };

    await api
      .post("/api/blogs")
      .send(newBlogBody)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const newBlogs = await helper.blogsInDb();
    const lastBlog = newBlogs.find((blog) => blog.title === newBlogBody.title);

    assert.strictEqual(lastBlog.likes, 0);
  });

  test.only("Verify that if title or url properties are missing, backend respons with status 400", async () => {
    let faultyBlogBody = {
      author: "Unkown Author",
      url: "https://test.com/",
      likes: 190,
    };

    await api
      .post("/api/blogs")
      .send(faultyBlogBody)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    faultyBlogBody = {
      title: "TEST",
      author: "Unkown Author",
      likes: 190,
    };

    await api
      .post("/api/blogs")
      .send(faultyBlogBody)
      .expect(400)
      .expect("Content-Type", /application\/json/);
  });

  test.only("Verify that if post is deleted, the current number of Blogs is less than the original by 1", async () => {
    const currentBlogs = await helper.blogsInDb();
    const firstBlog = currentBlogs[0];

    await api.delete(`/api/blogs/${firstBlog.id}`).expect(204);

    const blogsWithoutDeletedOne = await helper.blogsInDb();

    assert.strictEqual(blogsWithoutDeletedOne.length, currentBlogs.length - 1);
  });

  test.only("Verify that PUT request actually modifies the number of likes in Blog", async () => {
    const currentBlogs = await helper.blogsInDb();
    const firstBlog = currentBlogs[0];
    const updatedBody = {
      title: "Modified title",
      author: "Another Author",
      url: "https://test.com/",
      likes: 100000,
    };

    await api
      .put(`/api/blogs/${firstBlog.id}`)
      .send(updatedBody)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const blogsWithUpdatedOne = await helper.blogsInDb();
    const firstUpdatedBlog = blogsWithUpdatedOne[0];

    assert.notStrictEqual(firstUpdatedBlog.title, firstBlog.title);
    assert.notStrictEqual(firstUpdatedBlog.author, firstBlog.author);
    assert.notStrictEqual(firstUpdatedBlog.url, firstBlog.url);
    assert.notStrictEqual(firstUpdatedBlog.likes, firstBlog.likes);
  });
});

after(async () => {
  await mongoose.connection.close();
});
