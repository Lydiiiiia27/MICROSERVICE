const express = require("express");

const bodyParser = require("body-parser");

const { randomBytes } = require("crypto");

const app = express();

app.use(bodyParser.json());

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", (req, res) => {
  const { content } = req.body;
  const commentId = randomBytes(4).toString("hex");

  //commentsByPostId is an object that stores comments for each post ID.
  //If comments for a post ID do not exist, an empty array is assigned.
  const comments = commentsByPostId[req.params.id] || [];

  //The push method is used to add a new comment to the comments array.
  comments.push({ id: commentId, content });

  //the key for the commentsByPostId object is the post ID, and the value is the comments array.
  commentsByPostId[req.params.id] = comments;
  res.status(201).send(comments);
});

app.listen(4001, () => {
  console.log("Listening on 4001");
});
