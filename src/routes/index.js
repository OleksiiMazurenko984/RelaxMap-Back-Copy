import authRouter from "./authRouter.js";
import categoriesRouter from "./categoriesRouter.js";
import feedbacksRouter from "./feedbacksRouter.js";
import locationsRouter from "./locationsRouter.js";
import usersRouter from "./usersRoutrer.js";

export const routes = (app) => {
  app.use("/auth", authRouter);
  app.use("/categories", categoriesRouter);
  app.use("/feedbacks", feedbacksRouter);
  app.use("/locations", locationsRouter);
  app.use("/users", usersRouter);
};
