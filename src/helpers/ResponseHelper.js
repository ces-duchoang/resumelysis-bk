const httpStatus = require("http-status");
const httpMessage = require("http-errors");

const ResponeMessage = {
  BadRequest: (res, message = httpStatus.BAD_REQUEST) =>
    res.status(httpStatus.BAD_REQUEST).json(httpMessage(message)),
  Unauthorized: (res, message = httpStatus.UNAUTHORIZED) =>
    res.status(httpStatus.UNAUTHORIZED).json(httpMessage(message)),
  Forbidden: (res, message = httpStatus.FORBIDDEN) =>
    res.status(httpStatus.FORBIDDEN).json(httpMessage(message)),
  NotFound: (res, message = httpStatus.NOT_FOUND) =>
    res.status(httpStatus.NOT_FOUND).json(httpMessage(message)),
  MethodNotAllowed: (res, message = httpStatus.METHOD_NOT_ALLOWED) =>
    res.status(httpStatus.METHOD_NOT_ALLOWED).json(httpMessage(message)),
  InternalServerError: (res, message = httpStatus.INTERNAL_SERVER_ERROR) =>
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json(httpMessage(message)),
  Conflict: (res, message = httpStatus.CONFLICT) =>
    res.status(httpStatus.CONFLICT).json(httpMessage(message)),
  Created: (res, resource) => res.status(httpStatus.CREATED).json(resource),
  InError: (res, code = httpStatus.BAD_REQUEST, message) => {
    message = message || httpMessage(code).message;
    return res.status(code).json({ message });
  },
  Success: (res, data) => res.status(httpStatus.OK).json(data)
};

module.exports = ResponeMessage;
