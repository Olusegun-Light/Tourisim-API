const path = require("path");
const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const tourRouter = require("./routes/tourRoute");
const userRouter = require("./routes/userRoute");
const reviewRouter = require("./routes/reviewRoute");
const viewRouter = require("./routes/viewRoutes");
const bookingRouter = require("./routes/bookingRoutes");

const app = express();

// app.enable("trust proxy");

// Swagger
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");

// Global Middleware
// Set security HTTP headers
app.use(helmet());

// Implement CORS
app.use(cors());
// Access-Control-Allow-Origin *
app.options("*", cors());

// Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(morgan("dev"));

// Limit request from same Ip
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from thus IP, please try again in an hour",
});
app.use("/api", limiter);

//  3rd party middleware
// Body parser (reading data from the body into req.body)
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());

//  Data sanitization against NoSQL query injection
app.use(mongoSanitize());

//  Data sanitization against XSS
app.use(xss());

//  Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      "duration",
      "ratingsAverage",
      "ratingsQuantity",
      "maxGroupSize",
      "difficulty",
      "price",
    ],
  })
);

//  Serving static files
app.use(express.static(`${__dirname}/public`));

// Test middleware
app.use((req, res, next) => {
  // console.log("hello from the middleware");
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);
  next();
});

//  Specifying Middleware
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html")
})

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/", viewRouter);
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/bookings", bookingRouter);

// Handling unhandled routes
// For all http methods
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// Error handling middleware
app.use(globalErrorHandler);

// Server
module.exports = app;
