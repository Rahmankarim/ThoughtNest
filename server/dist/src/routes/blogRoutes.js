"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blog_1 = __importDefault(require("../../database/blog"));
const blogRoutes = express_1.default.Router();
const blogObj = new blog_1.default();
blogRoutes.post("/blog", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, gender, title, body } = req.body;
        let blogData = {
            name: name,
            email: email,
            gender: gender,
            title: title,
            body: body,
        };
        const result = yield blogObj.postData(blogData);
        res.status(201).send(result);
    }
    catch (err) {
        console.error("Error posting blog data:", err);
        res.status(500).send("Error processing request");
    }
}));
exports.default = blogRoutes;
