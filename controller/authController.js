import User from "../modals/userModal.js";
import { createUserSession, destroyUserSession } from "../utils/postAuth.js";

// render the signup page
function signupConroller(req, res) {
  res.render("customer/auth/signup");
}

// handles the post request for signup
async function postSignupConroller(req, res, next) {
  // need to add the validation for the email and password
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
  res.render("customer/auth/login");
}

async function postLoginContoller(req, res, next) {
  const user = new User(req.body.email, req.body.password);
  let existingUser;
  try {
    existingUser = await user.getUserWithEmail();
  } catch {
    return next(err);
  }
  if (!existingUser) {
    // Refine this data in the future
    console.log("User not found");

    return res.redirect("/login");
  }
  const match = await user.comparePassword(existingUser.password);
  if (!match) {
    console.log("Password not matched");
    return res.redirect("/login");
  }

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
