require("./models/User");
require("./models/Products");
require("./models/Favorite");
require("./models/Address");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");
const addressRoutes = require("./routes/addressRoutes");
const requireAuth = require("./middlewares/requireAuth");

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);
app.use(productRoutes);
app.use(favoriteRoutes);
app.use('/address',addressRoutes);

const mongoUri = "mongodb+srv://vikrantashitole:Shivani1!@cluster0.b02uy.mongodb.net/mobile-mart";
if (!mongoUri) {
  throw new Error(
    `MongoURI was not supplied.  Make sure you watch the video on setting up Mongo DB!`
  );
}

mongoose.set("strictQuery", true);
// resolves future deprecation issue with Mongoose v7

mongoose.connect(mongoUri);
mongoose.connection.on("connected", () => {
  console.log("Connected to mongo instance");
});
mongoose.connection.on("error", (err) => {
  console.error("Error connecting to mongo", err);
});

app.get("/", requireAuth, (req, res) => {
  res.send(`Your email: ${req.user.email}`);
});

app.get("/info", (req, res) => {
  res.send(`app is running`);
});
app.listen(3000, () => {
  console.log("Listening on port 3000");
});
