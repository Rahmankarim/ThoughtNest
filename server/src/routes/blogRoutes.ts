import  express  from 'express';
import { BlogController } from '../controllers/blog-controller';
import { CatchAsyncError } from "../utils/catch-async-error";
import validateRequest from "../Middleware/validation-error-handler";
import { login } from "../controllers/identity-controllers/log-in";
import { createUser } from "../controllers/identity-controllers/sign-up";
import { upload } from '../Middleware/multerUpload';

const router = express.Router();


// Define routes
router.get("/blog", CatchAsyncError(BlogController.getBlog));
router.post("/blog", upload.single('coverImagename'), validateRequest("/blog-validator"), CatchAsyncError(BlogController.createBlog));
router.put("/blog", validateRequest("/blog-validator"), CatchAsyncError(BlogController.updateBlog));
router.delete("/blog/:title", CatchAsyncError(BlogController.deleteBlog));

// Other routes
router.post("/signup", CatchAsyncError(createUser));
router.post("/login", CatchAsyncError(login));
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
});

export { router };
