import express from 'express';
import { BlogController } from '../controllers/blog-controller';
import { CatchAsyncError } from "../utils/catch-async-error";
import validateRequest from "../Middleware/validation-error-handler";
const login =  require( "../controllers/identity-controllers/log-in");
const createUser = require ("../controllers/identity-controllers/sign-up");



const BlogRoutes = express.Router();

// Student routes
BlogRoutes.get("/blog", CatchAsyncError(BlogController.getBlog) );
BlogRoutes.post("/blog", validateRequest("/blog-validator"), CatchAsyncError(BlogController.createBlog));
BlogRoutes.put("/blog", validateRequest("/blog-validator"), CatchAsyncError(BlogController.updateBlog));
BlogRoutes.delete("/blog/:title",CatchAsyncError(BlogController.deleteBlog));



BlogRoutes.post("/signup", createUser);
BlogRoutes.post("/login", login);
BlogRoutes.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
});

export { BlogRoutes };


