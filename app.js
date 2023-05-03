const express = require("express");
const app = express();
const port = 3000;
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const RestaurantList = require("./models/restaurantList");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

// const restaurantList = require('./restaurant.json')

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }))

db.on("error", () => {
  console.log("mongodb error.");
});

db.once("open", () => {
  console.log("mongodb connected.");
});

app.get("/", (req, res) => {
  RestaurantList.find()
    .lean()
    .then((items) => res.render("index", { items }))
    .catch((err) => console.log(err));
});

app.get("/restaurants/:id", (req, res) => {
  const id = req.params.id;
  const restaurant = RestaurantList.findById(id)
    .lean()
    .then((item) => res.render("show", { item }))
    .catch((err) => console.log(err));
});

app.get('/new', (req, res) => {
  res.render('new')
})

app.post('/restaurants', (req, res) => {
  const addItem = req.body
  
  RestaurantList.create(addItem)
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

app.get("/search", (req, res) => {
  const queryItems = restaurantList.results.filter(
    (item) =>
      req.query.keyword === item.name || req.query.keyword === item.category
  );

  res.render("index", { items: queryItems, keyword: req.query.keyword });
});

app.listen(port, () => {
  console.log("running");
});
