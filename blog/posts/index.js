//imports the Express module.
//Express is a minimal and flexible Node.js web application framework
const express = require("express");

//body-parser is a middleware that parses incoming request bodies before your handlers,
//available under the req.body property.
const bodyParser = require("body-parser");

// use the randomBytes function from the crypto module to generate a random ID for each post.
const { randomBytes } = require("crypto");

//an instance of an Express application is created
const app = express();

// parse JSON-formatted request bodies.
//This is crucial for handling POST requests where data is typically sent in the request body.
app.use(bodyParser.json());

const posts = {};

/*
app.get is a method provided by Express to handle GET requests.
The first argument ("/posts") specifies the URL path.
The second argument is a callback function that will be executed when a GET request to /posts is received. 
The callback function takes two arguments:
    req: The request object, containing information about the HTTP request.
    res: The response object, used to send back a response to the client.
*/
app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts", (req, res) => {
  console.log(req.body);
  const id = randomBytes(4).toString("hex");

  //The req.body property contains key-value pairs of data submitted in the request body.
  const { title } = req.body;

  if (!title) {
    return res.status(400).send({ error: "Title is required" });
  }

  posts[id] = {
    id,
    title,
  };

  //The res.status method is used to set the HTTP status code of the response.
  res.status(201).send(posts[id]);
});

// Echo endpoint for debugging
app.post("/echo", (req, res) => {
  res.send(req.body);
});

/*
app.listen is a method provided by Express to start the server.
*/
app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
