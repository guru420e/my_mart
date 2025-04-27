import mongoSession from "connect-mongodb-session";
import dotenv from "dotenv";
dotenv.config();

if (!process.env.SESSION_SECRET) {
  throw new Error(
    "SESSION_SECRET is not defined in the environment variables."
  );
}

if (!process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined in the environment variables.");
}

export function createSessionStore(session) {
  const MongoStore = mongoSession(session);

  const store = new MongoStore({
    uri: process.env.MONGODB_URI,
    collection: process.env.SESSION_COLLECTION || "sessions", // Default to "sessions"
  });

  store.on("error", (error) => {
    console.error("Session store error:", error);
  });

  return store;
}

function sessionConfig(session, cookieOptions = {}) {
  return {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: createSessionStore(session),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use secure cookies only in production
      sameSite: "strict",
      ...cookieOptions, // Override default cookie options
    },
  };
}

export default sessionConfig;
