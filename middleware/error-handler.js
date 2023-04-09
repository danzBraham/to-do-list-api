import { CustomAPIError } from "../errors/custom-error.js";

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  return res.status(500).json({ msg: err.name });
};

export default errorHandler;
