const express = require("express");
const app = express();

const port = 8080;

const path = require("path");

const { v4: uuidv4 } = require("uuid");

const methodOverride = require("method-override");
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let posts = [
   {
      id: uuidv4(),
      username: "Hamro IT Hub",
      content: "Welcome to Hamro IT Hub! We are dedicated to providing the latest updates, tutorials, and resources in the field of Information Technology. Stay connected and empower your IT journey with us!"
   },
   {
      id: uuidv4(),
      username: "Sumit",
      content: "I'm currently diving deep into Backend Development, exploring technologies like Node.js and Express. I'm grateful to platforms like Apna College for offering valuable insights and guiding me toward becoming a skilled developer."
   },
   {
      id: uuidv4(),
      username: "John Doe",
      content: "As a full-stack developer, I thrive on creating seamless user experiences and robust backend systems. My passion for coding drives me to continually learn and experiment with emerging technologies to build innovative solutions."
   }
];

app.get("/posts", (req, res) => {
   // res.("Server is working properly!");
   res.render("index.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
   res.render("new.ejs");
});

app.post("/posts", (req, res) => {
   // console.log(req.body);
   let { username, content } = req.body;
   let id = uuidv4();
   posts.push({ id, username, content });
   res.redirect("/posts"); 
});

app.get("/posts/:id", (req, res) => {
   let { id } = req.params;
   let post = posts.find((p) => id === p.id);
   // console.log(post);
   if (!post) {
      // return res.status(404).send("<h1>Post not found</h1>");
      return res.render("error.ejs");
   }
   res.render("show.ejs", { post });
});

app.get("/posts/:id/edit", (req, res) => {
   let { id } = req.params;
   let post = posts.find((p) => id === p.id);
   if (!post) {
      return res.render("error.ejs");
   }
   res.render("edit.ejs", {post});
});

app.patch("/posts/:id", (req, res) => {
   let { id } = req.params;
   let newContent = req.body.content;
   let post = posts.find((p) => id === p.id);
   post.content = newContent;
   res.redirect("/posts");
});

app.delete("/posts/:id", (req, res) => {
   let { id } = req.params;
   posts = posts.filter((p) => id !== p.id);
   res.redirect("/posts");
});


app.listen(port, () => {
   console.log(`Server is running on port ${port}!`);
});