import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/authRoute.js";
import path from "path";
import { fileURLToPath } from "url";
import { connectToDatabase } from "./data/database.js";
import csurf from "csurf";
import csurfTokenMiddleware from "./middlewares/csrfToken.js";
import handleError from "./middlewares/errorsHandler.js";
import session from "express-session";
import sessionConfig from "./config/sessionConfig.js";
import baseRoute from "./routes/baseRoute.js";
import productRoute from "./routes/productRoute.js";
import { authMiddleware } from "./middlewares/authMiddleware.js";
import adminRoute from "./routes/adminRoute.js";

const app = express();

dotenv.config();

//This code will get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 3000;
// create a session store

// Setting view engine to EJS
app.set("view engine", "ejs");

// Setting up the views directory for ejs
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.use(session(sessionConfig(session)));

// this package automatically works with the express-session to
// mangage the token
// app.use(csurf());

// calling the csurfToken middleware to add the token to locals
// the token is available in the views as csrfToken
app.use(csurfTokenMiddleware);

// Set the locals for templates
app.use(authMiddleware);

app.use(baseRoute);
app.use(authRoute);
app.use(productRoute);
app.use("/admin", adminRoute);

app.use(handleError);

// database connection
connectToDatabase(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
