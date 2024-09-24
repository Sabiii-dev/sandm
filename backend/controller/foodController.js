import foodModel from "../models/foodModel.js";
import { cloudinary } from "../config/cloudinary.js";

// Add food item
const addFood = async (req, res) => {
    try {
        // Get the Cloudinary URL from the uploaded file
        let image_url = req.file.path;

        const food = new foodModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            image: image_url, // Store Cloudinary URL
        });

        await food.save();
        res.json({ success: true, message: "Item Added" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error Adding Item" });
    }
};

// Get all food items
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({ success: true, data: foods });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error Fetching Items" });
    }
};

// Remove food item
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);

        // Extract public ID from the Cloudinary URL
        const imagePublicId = food.image.split('/').pop().split('.')[0];

        // Delete image from Cloudinary
        await cloudinary.uploader.destroy(`food-images/${imagePublicId}`);

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Item Removed" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error Removing Item" });
    }
};

export { addFood, listFood, removeFood };
