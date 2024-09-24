import express from "express";
import { addFood, listFood, removeFood } from "../controller/foodController.js";
import multer from "multer";
import { storage } from "../config/cloudinary.js";

const foodRouter = express.Router();

// Use Cloudinary storage for multer
const upload = multer({ storage });

foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list", listFood);
foodRouter.post("/remove", removeFood);

export default foodRouter;
