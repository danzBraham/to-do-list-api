export class CustomAPIError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const createCustomError = (message, statusCode) => {
  return new CustomAPIError(message, statusCode);
};
