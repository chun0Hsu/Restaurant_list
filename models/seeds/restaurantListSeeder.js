const db = require('../../config/mongoose')
const RestaurantList = require("../restaurantList");
const restaurantJson = require("../../restaurant.json");

db.once("open", () => {
  const restaurantList = restaurantJson.results;
  RestaurantList.create(restaurantList)
    .then(() => console.log("create seeder done."))
    .catch(() => console.log("create seeder error."));
});
