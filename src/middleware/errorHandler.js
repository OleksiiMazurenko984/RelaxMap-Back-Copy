import { isHttpError } from "http-errors";

const errorHandler = (err, req, res, next) => {
  console.error(err);
  if (isHttpError(err)) {
    res.status(err.status).json({ message: err.message });
    return;
  }

  res.status(500).json({
    status: 500,
    message: "Something went wrong",
    data: err.message,
  });
};

export { errorHandler };
