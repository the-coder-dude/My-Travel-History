const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

const middlewares = require("./middleware");

const app = express();

app.use(morgan("common"));
app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:3000/",
  })
);

app.get("/", (req, res) => {
  res.json({
    message: "Hello World!",
  });
});

app.use(middlewares.notFound);

app.use(middlewares.errorHandler);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Server running at " + port);
});
