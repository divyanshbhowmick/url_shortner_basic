const express = require("express");
const { db } = require("./models/db");
const linkRoutes = require("./routes/links");
const redirectionRoutes = require("./routes/redirection");
const app = express();

app.use(express.json());

app.use("/api/links", linkRoutes);
app.use("/", redirectionRoutes);

db.sync()
  .then(() => {
    console.log("works");
    app.listen(7000, () => {
      console.log("🚀Healthy server running on port 7000");
    });
  })
  .catch((err) => {
    console.log(err);
    console.log("Failed to start the server");
  });
