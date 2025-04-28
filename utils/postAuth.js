export function createUserSession(req, user, action) {
  req.session.uid = {
    email: user.email,
  };
  req.session.isLoggedIn = true;
  req.session.isAdmin = user.isAdmin;
  req.session.save(action);
}

export function destroyUserSession(req, res) {
  req.session.isLoggedIn = false;
}
