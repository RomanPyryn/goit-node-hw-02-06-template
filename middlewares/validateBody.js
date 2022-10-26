const { requestError } = require("../helpers/index");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema;
    if (error) {
      next(requestError(400, error.message));
    }
    next();
  };

  return func;
};

module.exports = validateBody;
