import path from 'path';
import multer, { FileFilterCallback } from 'multer';
import{ Request, Response, NextFunction } from 'express';


const storage = multer.diskStorage({
    destination: function (req: Request, _file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) {
        cb(null, path.join(__dirname, '../../uploads')); // Corrected path to use absolute directory
    },
    filename: function (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

export {upload};