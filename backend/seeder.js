const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");
const User = require("./models/User");
const Cart  = require("./models/Cart");
const products = require("./data/products");

dotenv.config();

//connect to Mongodb
mongoose.connect(process.env.MONGO_URI);

//Function to seed Data
const seedData = async () => {
    try {
        //clear existing Data
        await Product.deleteMany();
        await User.deleteMany();
        await Cart.deleteMany();

        //Create a default Admin User
        const createdUser = await User.create({
            name:"Admin User",
            email: "admin@example.com",
            password: "123456",
            role: "admin",
        });
        //Assign the default user Id  to each Product
        const userID = createdUser._id;

        const sampleProducts = products.map((product) => {
            return {...product, user: userID};
        });
        //Insert The Prodcuts into the Database
        await Product.insertMany(sampleProducts);

        console.log("Product data seeded Successfully");
        process.exit(1);
    } catch (error) {
        console.log("Error seeding  the data:", error);
        process.exit(1);
        
    }
}
seedData();