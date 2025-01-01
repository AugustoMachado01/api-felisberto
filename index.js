const bodyParser = require("body-parser");
const express = require("express");

const app = express();
const PORT = 3000;

//Middleware para parsear Json
app.use(bodyParser.json());

// Routes
const UserRoutes = require("./src/routes/UserRoute");

app.use("/users", UserRoutes);

app
  .listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  })
  .once("error", (error) => {
    console.error(error);
    process.exit(1);
  });
