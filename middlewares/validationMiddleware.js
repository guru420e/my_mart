import User from "../modals/userModal.js";
import { flashErrorToSession, isEmpty } from "../utils/helper.js";

// Validte the user for original email through OTP or some text
// for future

export async function signupValidationMiddleWare(req, res, next) {
  const { email, confirmEmail, password, fullName, street, postalCode, city } =
    req.body;

  // need to validate the data
  // make some function int utils file

  if (
    isEmpty(email) ||
    isEmpty(confirmEmail) ||
    isEmpty(password) ||
    isEmpty(fullName) ||
    isEmpty(street) ||
    isEmpty(postalCode) ||
    isEmpty(city) ||
    !userCredAreValid(email, confirmEmail, password)
  ) {
    // Change this to populate the data to view
    flashErrorToSession(
      req,
      {
        error: "Check out all the fields",
        email,
        confirmEmail,
        password,
        fullName,
        street,
        postalCode,
        city,
      },
      () => {
        res.status(422).redirect("/signup");
      }
    );

    return;
  }

  const userExists = await new User(email).alreadyExists();
  if (userExists) {
    flashErrorToSession(
      req,
      {
        error: "User already exists",
        email,
        confirmEmail,
        password,
        fullName,
        street,
        postalCode,
        city,
      },
      () => {
        res.status(422).redirect("/signup");
      }
    );

    return;
  }

  next();
}

export async function loginValidationMiddleWare(req, res, next) {
  const { email, password } = req.body;

  if (isEmpty(email) || isEmpty(password)) {
    flashErrorToSession(
      req,
      {
        error: "Check out all the fields",
        email,
        password,
      },
      () => {
        res.status(422).redirect("/login");
      }
    );
    return;
  }

  const user = new User(req.body.email, req.body.password);
  let existingUser;
  try {
    existingUser = await user.getUserWithEmail();
  } catch {
    return next(err);
  }

  let match;
  if (existingUser) match = await user.comparePassword(existingUser.password);

  if (!existingUser || !match) {
    flashErrorToSession(
      req,
      {
        error: "Invalid credentials",
        email,
        password,
      },
      () => {
        res.status(422).redirect("/login");
      }
    );

    return;
  }

  // Set the user for next middleware
  req.existingUser = existingUser;
  next();
}

function userCredAreValid(email, confirmEmail, password) {
  return (
    email.includes("@") && email === confirmEmail && password.trim().length >= 6
  );
}
