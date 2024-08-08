import mongoose from "mongoose";
import {IBlog} from "../interface/IBlog";

interface blogDoc extends mongoose.Document
{
    name: string,
    email: string,
    gender: string,
    title: string,
    body: string,
    coverImagePath: string,
}

interface IBlogModel extends mongoose.Model<blogDoc>
{
    build(attr: IBlog):blogDoc;
}

const blogSchema = new mongoose.Schema({

    name:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true
    },
    gender:{
        type: String,
        require: true
    },
    title:{
        type: String,
        require: true
    },
    body:{
        type: String,
        require: true
    },
    coverImagePath:
    {
        type: String,
        require: false
    },
    
});

blogSchema.statics.build = (attr: IBlog) =>
{
    return new blogModel(attr);
}

const blogModel = mongoose.model<any, IBlogModel>('Blog', blogSchema);

export {blogModel};