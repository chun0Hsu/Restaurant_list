const mongoose = require("mongoose");
const RestaurantList = require("../restaurantList");
const restaurantJson = require("../../restaurant.json");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", () => {
  console.log("mongodb error.");
});

db.once("open", () => {
  console.log("mongodb connected.");
  const restaurantList = restaurantJson.results;
  RestaurantList.create(restaurantList)
    .then(() => console.log("create seeder done."))
    .catch(() => console.log("create seeder error."));
});
