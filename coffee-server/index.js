const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 1000;
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();
// This is your test secret API key.
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

//middleware
app.use(cors());
app.use(express.json());

//mongodb configuration
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@coffee-client.ewcfzgj.mongodb.net/coffee-client?retryWrites=true&w=majority&appName=coffee-client`
  )
  .then(console.log("Mongodb connected Successfully!"))
  .catch((error) => console.log("Error connecting to mongodb", error));

//   import routes here
const menuRoutes = require("./api/routes/menuRoutes");
const cartRoutes = require("./api/routes/cartRoutes");
const userRoutes = require("./api/routes/userRoutes");
const paymentRoutes = require("./api/routes/paymentRoutes");
app.use("/menu", menuRoutes);
app.use("/carts", cartRoutes);
app.use("/users", userRoutes);
app.use("/payments", paymentRoutes);

//stripe payment routes
app.post("/create-payment-intent", async (req, res) => {
  const { price } = req.body;
  const amount = price * 100;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "eur",

    payment_method_types: ["card"],
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

// jwt authentication
app.post("/jwt", async (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1hr",
  });
  res.send({ token });
});

app.get("/", (req, res) => {
  res.send("This is coffee Serverr");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
