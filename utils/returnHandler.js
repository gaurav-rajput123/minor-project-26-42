function jsonReturnHandler(data, error) {
  let returnObject = {
    error: false,
  };
  if (!Boolean(error)) {
    returnObject.data = data;
  } else {
    returnObject.error = true;
    returnObject.errorMessage = error;
  }
  return returnObject;
}

module.exports = { jsonReturnHandler };
