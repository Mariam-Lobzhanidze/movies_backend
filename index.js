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

app.get("/health", (req, res) => {
  console.log(`[${new Date().toISOString()}] Ping received at /health`);
  res.status(200).send("OK");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
