import User from "../modals/userModal.js";
import { clearErrorFromSession, getSessionData } from "../utils/helper.js";
import { createUserSession, destroyUserSession } from "../utils/postAuth.js";

// render the signup page
function signupConroller(req, res) {
  let { hasError, userData } = getSessionData(req);

  if (!hasError) {
    userData = {
      error: "",
      email: "",
      confirmEmail: "",
      password: "",
      fullName: "",
      street: "",
      postalCode: "",
      city: "",
    };
  }

  clearErrorFromSession(req);

  res.render("customer/auth/signup", userData);
}

// handles the post request for signup
async function postSignupConroller(req, res, next) {
  // Validation is done in the middleware
  // check the authRoutes
  const {
    email,
    confirmEmail,
    password,
    fullName: name,
    street,
    postalCode,
    city,
  } = req.body;

  const newUser = new User(email, password, name, street, postalCode, city);

  try {
    await newUser.save();
  } catch (err) {
    return next(err);
  }

  res.redirect("/login");
}

function getLoginController(req, res) {
  let { hasError, userData } = getSessionData(req);
  if (!hasError) {
    userData = {
      error: "",
      email: "",
      password: "",
    };
  }
  clearErrorFromSession(req);
  res.render("customer/auth/login", userData);
}

async function postLoginContoller(req, res, next) {
  // data is already validated in the middleware
  const existingUser = req.existingUser;

  createUserSession(req, existingUser, () => {
    res.redirect("/");
  });
}

function logoutController(req, res) {
  destroyUserSession(req, res);
  res.redirect("/login");
}

export {
  signupConroller,
  postSignupConroller,
  getLoginController,
  postLoginContoller,
  logoutController,
};
