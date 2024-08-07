import mongoose from "mongoose";
import {IUser} from "../../interface/IUser";

interface userDoc extends mongoose.Document
{
    name: string,
    email: string,
    password: string, 
}

interface IUserModel extends mongoose.Model<userDoc>
{
    build(attr: IUser):userDoc;
}

const userSchema = new mongoose.Schema({

    name:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    },
   
});

userSchema.statics.build = (attr: IUser) =>
{
    return new userModel(attr);
}

const userModel = mongoose.model<any, IUserModel>('users', userSchema);

export {userModel};