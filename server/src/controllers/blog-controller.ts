import { Request, Response, NextFunction } from "express";
import { BlogServices } from "../../services/blogServices";
import { IBlog } from "../../database/interface/IBlog";
import { statusCodes } from "../@Types/statusCodes";

class blogController 
{
    async getBlog(req: Request, res: Response, next: NextFunction )
    {
        try {        
            const blogData = await BlogServices.getBlogData();
            res.status(statusCodes.OK).send(blogData);
        } catch (error) {
            return next(error);
        }
    }

    async createBlog(req: Request, res: Response, next: NextFunction )
    {
        try {
            const blog = req.body as IBlog;
            const blogs = await BlogServices.postBlogData(blog);
            res.status(statusCodes.OK).send(blogs);
        } catch (error) {
            return next(error);
        }
    }

    async updateBlog(req: Request, res: Response, next: NextFunction)
    {
        try {
            const blogReq = req.body as IBlog;
            const blog = await BlogServices.updateBlogData(blogReq);
            res.status(statusCodes.OK).send(blog);
        } catch (error) {
            return next(error);
        }
    }

    async deleteBlog(req: Request, res: Response, next: NextFunction)
    {
        try {
            var title = req.params.title;
            const delResp = await BlogServices.deleteBlog(title);
            res.status(statusCodes.OK).send(delResp);
        } catch (error) {
            return next(error);
        }
    }
}

export const BlogController = new blogController();