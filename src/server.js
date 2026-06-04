import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectMongoDB } from "./db/connectToMongoDB.js";
import { notFoundHandler } from "./middleware/notFoundHandler.js";
import { errorHandler } from "./middleware/errorHandler.js";
import authRoutes from "./routes/authRouter.js";
import userRouter from "./routes/usersRoutrer.js";
import feedbacksRouter from "./routes/feedbacksRouter.js";
import locationsRouter from "./routes/locationsRouter.js";
import categoriesRouter from "./routes/categoriesRouter.js";
import { errors } from "celebrate";
import dns from "node:dns/promises";

dns.setServers(["8.8.8.8"]);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/users", userRouter);
app.use("/feedbacks", feedbacksRouter);
app.use("/locations", locationsRouter);
app.use("/categories", categoriesRouter);

app.use(notFoundHandler);
app.use(errors());
app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
