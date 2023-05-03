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
  for (let ele of restaurantList) {
    RestaurantList.create({
      name: ele.name,
      name_en: ele.name_en,
      category: ele.category,
      image: ele.image,
      location: ele.location,
      phone: ele.phone,
      google_map: ele.google_map,
      rating: ele.rating,
      description: ele.description,
    });
  }
  console.log("done.");
});
