const createError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  console.log(error);
  throw error;
};

module.exports = createError;
