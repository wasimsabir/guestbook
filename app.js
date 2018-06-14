const express = require("express");
const path = require("path");
const app = express();
const logger = require("morgan");
const bodyParser = require("body-parser");
const publicPath = path.resolve(__dirname, "public");
var entries = [];
app.locals = entries;

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "templates"));
app.set("port", process.env.PORT || 3000);

app.use(express.static(publicPath));
app.use(logger("dev"));
app.use(bodyParser.urlencoded({"extended": true}));

app.get("/", function(req, res){
  res.render("index", {"entries": entries});
});

app.get("/new", function(req, res){
  res.render("guestbook/new");
});

app.post("/", function(req, res){
  var formData = {"title": req.body.guestbook.title.trim(), "content": req.body.guestbook.content.trim(), "createdon": new Date().toDateString()};
  entries.push(formData);
  res.redirect("/");
  console.log(formData);
});

app.use(function(req, res){
  res.status(404).render("notfound");
});
app.listen(app.get("port"), function(){
  console.log("Server started on http://localhost/%s", app.get("port"));
});