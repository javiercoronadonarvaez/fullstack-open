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
});

after(async () => {
  await mongoose.connection.close();
});
