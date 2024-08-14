const express = require("express");
const app = express();
const cors = require("cors");
const { info, error } = require("./utils/logger");
const { MONGODB_URI, PORT } = require("./utils/config");
const mongoose = require("mongoose");
const blogsRouter = require("./controllers/blogs");

const mongoUrl = MONGODB_URI;
mongoose
  .connect(mongoUrl)
  .then((result) => info(`Successful connection to MongoDB`))
  .catch((connectionError) =>
    error(`Failed to connect with error: ${connectionError.message}`)
  );

app.use(cors());
app.use(express.json());
app.use("/api/blogs", blogsRouter);

// app.get("/api/blogs", (request, response) => {
//   Blog.find({}).then((blogs) => {
//     response.json(blogs);
//   });
// });

// app.post("/api/blogs", (request, response) => {
//   const blog = new Blog(request.body);

//   blog.save().then((result) => {
//     response.status(201).json(result);
//   });
// });

app.listen(PORT, () => {
  info(`Server running on port ${PORT}`);
});
