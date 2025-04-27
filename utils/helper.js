export function isEmpty(value) {
  return (
    !value ||
    value.trim().length == 0 ||
    (typeof value === "object" && Object.keys(value).length === 0)
  );
}

export function flashErrorToSession(req, data, action) {
  req.session.hasError = true;
  req.session.userData = data;
  req.session.save(action);
}

export function clearErrorFromSession(req) {
  req.session.hasError = false;
  req.session.userData = {};
}

export function getSessionData(req) {
  return {
    hasError: req.session.hasError,
    userData: req.session.userData,
  };
}
