import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDb from "./lib/connection.js";

// routes
import userRoute from "./routes/userRoute.js";
import postRoute from "./routes/postRoute.js";

// initialize dotenv
dotenv.config();

// initialize express
const app = express();

// db connection
connectDb();

// define middlwares
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// test route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// define routes
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
