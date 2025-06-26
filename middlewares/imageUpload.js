import multer from "multer";
import { v4 as uuidv4 } from "uuid";

// This middleware is used to handle image uploads for product images.
// It uses multer to handle file uploads and stores them in a specific directory with a unique filename
// generated using uuid. The uploaded files are stored in the 'productsData/images' directory.
// The filename is prefixed with a unique identifier to avoid conflicts with existing files.

const upload = multer({
  storage: multer.diskStorage({
    destination: "productsData/images",
    filename: (req, file, cb) => {
      cb(null, uuidv4() + "-" + file.originalname);
    },
  }),
});

const configMulterMiddleware = upload.single("image");

export default configMulterMiddleware;
