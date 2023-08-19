const mongoose = require("mongoose");
const app = require("./app");
const dotenv = require("dotenv");

// Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  // 0 for success 1 for uncaught exception
  process.exit(1);
});

dotenv.config({ path: "./config.env" });
// console.log(process.env);

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    // console.log(con.connections);
    console.log(":: Database  Connector Established ::");
  });

// const testTour = new Tour({
//   name: "The forest hiker",
//   rating: 4.8,
//   price: 497,
// });
// // save testTour to tours collection in database
// testTour
//   .save()
//   .then((doc) => {
//     console.log(doc);
//   })
//   .catch((err) => {
//     console.log("ERROR 💥:", err);
//   });

// Set up server
const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

// Unhandled Rejection
process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("UNHANDLED REJECTION! 💥 Shuting down...");
  // close() give server time to finish pending request at that time
  server.close(() => {
    // 0 for success 1 for uncaught exception
    process.exit(1);
  });
});
