//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent =
  "Welcome to The Journal, a sanctuary for scholars, thinkers, and creators alike. Our platform is a haven for those who seek to delve into the depths of knowledge and share their insights with the world. Explore a rich tapestry of academic research, literary musings, and artistic expression as we celebrate the diversity of human thought and creativity. Join us on a journey of discovery, where each page holds the promise of new perspectives and profound discoveries. Whether you're an academic, a writer, an artist, or simply a curious soul, you'll find a home here at [Your Journal Name]. Start your exploration today and embark on a voyage of intellectual and artistic exploration.";
const aboutContent =
  "Whether you're a seasoned expert or a curious newcomer, there's a place for you in our community. We invite you to explore, engage, and contribute to the rich tapestry of ideas and perspectives that make The Journal truly special. Together, let's embark on a journey of discovery and inspiration.";
const contactContent =
  "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

let posts = [];

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));

app.get("/", function (req, res) {
  res.render("home", { startingContent: homeStartingContent, posts: posts });
});
app.get("/about", function (req, res) {
  res.render("about", { aboutContent: aboutContent });
});
app.get("/contact", function (req, res) {
  res.render("contact", { contactContent: contactContent });
});
app.get("/compose", function (req, res) {
  res.render("compose");
});
app.post("/compose", function (req, res) {
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody,
  };
  posts.push(post);
  res.redirect("/");
});
app.get("/posts/:postName", function (req, res) {
  const requestedTitle = _.lowerCase(req.params.postName);
  posts.forEach(function (post) {
    const storedTitle = _.lowerCase(post.title);
    if (storedTitle === requestedTitle) {
      res.render("post", {
        title: post.title,
        content: post.content,
      });
    }
  });
});

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
