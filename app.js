import dotenv from "dotenv";
dotenv.config();

import express from "express";
const app = express();
const port = process.env.PORT || 3000;
import connectDB from "./db/connect.js";
import todos from "./routes/todos.js";
import notFound from "./middleware/not-found.js";
import errorHandler from "./middleware/error-handler.js";

// middleware
app.use(express.static("./public"));
app.use(express.json());

// router
app.use("/api/v1/todos", todos);

// middleware
app.use(notFound);
app.use(errorHandler);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server Listening on Port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
