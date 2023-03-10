const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const Comment = require("../models/comment");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({})
    .populate("user", { name: 1, username: 1 })
    .populate("comments", { content: 1 });
  response.json(blogs);
});

blogRouter.post("/", async (request, response) => {
  const { title, author, url, likes } = request.body;
  const userToken = request.user;
  const user = await User.findById(userToken.id);

  const blog = new Blog({
    title,
    author,
    url,
    likes,
    user: user._id,
  });

  if (blog.title === undefined || blog.url === undefined) {
    response.status(400).end();
  } else {
    const newBlog = await blog.save();
    user.blogs = user.blogs.concat(newBlog._id);
    await user.save();

    response.status(201).json(newBlog);
  }
});

blogRouter.delete("/:id", async (request, response) => {
  const idToDelete = request.params.id;
  const decodedUser = request.user;

  const blog = await Blog.findById(idToDelete);

  if (blog === null) {
    response.status(404).json({ error: "blog id not found" });
  }

  if (decodedUser.id === blog.user.toString()) {
    await Blog.findByIdAndRemove(idToDelete);
    response.status(204).end();
  } else {
    response.status(400).json({ error: "invalid user" });
  }
});

blogRouter.put("/:id", async (request, response) => {
  const idToUpdate = request.params.id;
  const newBlogContent = request.body;

  const updatedNote = await Blog.findByIdAndUpdate(idToUpdate, newBlogContent, {
    new: true,
  });
  response.status(204).json(updatedNote);
});

blogRouter.post("/:id/comments", async (request, response) => {
  const blogId = request.params.id;
  const commentContent = request.body;

  const blog = await Blog.findById(blogId);

  const comment = new Comment({
    blog: blog._id,
    content: commentContent.content,
  });

  if (commentContent === undefined) {
    return response.status(400).end();
  } else {
    const newComment = await comment.save();
    blog.comments = blog.comments.concat(newComment._id);
    await blog.save();

    response.status(201).json(newComment);
  }
});

module.exports = blogRouter;
