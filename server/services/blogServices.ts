import { blogModel } from "../database/model/blog-Model";
import { IBlog } from "../database/interface/IBlog";

class blogServices {
    async getBlogData() {
        try {
            const blogData = await blogModel.find({});
            return blogData;
        } catch (error) {
            throw error;
        }
    }

    async postBlogData(blog: IBlog) {
        try {
            const BlogModel = blogModel.build(blog);
            await BlogModel.save();
            return BlogModel;
        } catch (error) {
            throw error;
        }
    }

    async updateBlogData(blog: IBlog) {
        try {
            if (!blog.title) {
                throw new Error("Invalid Title");
            }
            const BlogModel = await blogModel.findOneAndUpdate({ title: blog.title }, blog, { new: true });
            if (!BlogModel) {
                throw new Error("Blog Not Found");
            }
            return BlogModel;
        } catch (error) {
            throw error;
        }
    }

    async deleteBlog(title: string) {
        try {
            const deletedCount = await blogModel.deleteOne({ title: title });
            return { deletedCount: deletedCount };
        } catch (error) {
            console.error("Error in deleteBlog service:", error);
            throw error;
        }
    }
}

export const BlogServices = new blogServices();
