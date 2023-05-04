const express = require("express");
const app = express();
const port = 3000;
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const restaurantList = require("./models/restaurantList");
const RestaurantList = require("./models/restaurantList");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

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
  RestaurantList.findById(id)
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

app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id

  RestaurantList.findById(id)
    .lean()
    .then(item => res.render('edit', { item }))
    .catch(err => console.log(err))
})

app.post('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  const modifyItem = req.body

  RestaurantList.findByIdAndUpdate(id, modifyItem)
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(err => console.log(err))
})

app.post('/restaurants/:id/delete', (req, res) => {
  const id = req.params.id
  RestaurantList.findById(id)
    .then(item => item.deleteOne()) //mongoose@7.1.0 remove()棄用
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

app.get("/search", (req, res) => {
  const keyword = req.query.keyword
  RestaurantList.find({$or: [{name: keyword}, {category: keyword}]})
    .lean()
    .then(items => res.render('index', {items, keyword}))
    .catch(err => console.log(err))
});

app.listen(port, () => {
  console.log("running");
});
