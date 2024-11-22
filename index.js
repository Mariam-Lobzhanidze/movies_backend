require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./routes/routes");
require("./associations");

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use("/api", routes);

app.get("/api/health", (req, res) => {
  res.status(200).send("Healthy");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
