import { Request, Response, NextFunction } from "express";
import { BlogServices } from "../../services/blogServices";
import { IBlog } from "../../database/interface/IBlog";
import { statusCodes } from "../@Types/statusCodes";

class blogController {
    async getBlog(req: Request, res: Response, next: NextFunction) {
        try {
            const blogData = await BlogServices.getBlogData();

            res.status(statusCodes.OK).send(blogData);
        } catch (error) {
            return next(error);
        }
    }

    async createBlog(req: Request, res: Response, next: NextFunction) {
        try {
            const coverImagePath = req.file ? `uploads/${req.file.filename}` : '';
            
            const blog: IBlog = {
                name: req.body.name,
                email: req.body.email,
                gender: req.body.gender,
                title: req.body.title,
                body: req.body.body,
                coverImagePath: coverImagePath 
            };
    console.log(coverImagePath);
            const blogs = await BlogServices.postBlogData(blog);
            res.status(statusCodes.OK).send(blogs);
        } catch (error) {
            console.error("Error in createBlog:", error); // Log the error for debugging
            return next(error);
        }
    }
    

    async updateBlog(req: Request, res: Response, next: NextFunction) {
        try {
            const blog = req.body as IBlog;
            const updatedBlog = await BlogServices.updateBlogData(blog);
            res.status(statusCodes.OK).send(updatedBlog);
        } catch (error) {
            return next(error);
        }
    }

    async deleteBlog(req: Request, res: Response, next: NextFunction) {
        try {
            const title = req.params.title;
            const delResp = await BlogServices.deleteBlog(title);
            res.status(statusCodes.OK).send(delResp);
        } catch (error) {
            return next(error);
        }
    }
}

export const BlogController = new blogController();
