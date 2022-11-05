// const express = require("express");
// require("dotenv").config();
// const routes = require("./routes");
// const mysql = require("mysql2");
// const sequelize = require("./config/connection");
// console.log(process.env.DB_USER);

// // sequelize
// //   .authenticate()
// //   .then(() => {
// //     console.log("database is connected");
// //   })
// //   .catch((error) => {
// //     console.log(error);
// //   });

// const app = express();
// const PORT = process.env.PORT || 3001;

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use(routes);

// // sync sequelize models to the database, then turn on the server
// sequelize.sync({ force: true }).then(() => {
//   app.listen(PORT, () => {
//     console.log(`App listening on port ${PORT}!`);
//   });
// });
const express = require("express");
const routes = require("./routes");
const sequelize = require("./config/connection");
// import sequelize connection

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
});
