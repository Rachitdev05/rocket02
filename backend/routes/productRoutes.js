const express = require("express");
const Product = require("../models/Product");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

//@route POST /api/products
//@access Create a new Product
//@access Private/Admin
router.post("/", protect, admin, async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            discountPrice,
            countInStock,
            category,
            brand,
            sizes,
            colors,
            collections,
            material,
            gender,
            images,
            isFeatured,
            isPublished,
            tags,
            dimensions,
            weight,
            sku
        } = req.body;

        const product = new Product({
            name,
            description,
            price,
            discountPrice,
            countInStock,
            category,
            brand,
            sizes,
            colors,
            collections,
            material,
            gender,
            images,
            isFeatured,
            isPublished,
            tags,
            dimensions,
            weight,
            sku,
            user: req.user._id, // Reference to the admin user who created it 
        });

        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        console.error(error)
        res.status(500).send("Server Error")

    }
})

//@route PUT /api/products/:id
//@access Update an esxisting product ID
//@access Private/Admin

router.put("/:id", protect, admin, async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            discountPrice,
            countInStock,
            category,
            brand,
            sizes,
            colors,
            collections,
            material,
            gender,
            images,
            isFeatured,
            isPublished,
            tags,
            dimensions,
            weight,
            sku
        } = req.body;

        //Find product by Id
        const product = await Product.findById(req.params.id);
        if (product) {
            //Update Product fields
            product.name = name || product.name;
            product.description = description || product.description;
            product.price = price || product.price;
            product.discountPrice = discountPrice || product.discountPrice;
            product.countInStock = countInStock || product.countInStock;
            product.category = category || product.category;
            product.brand = brand || product.brand;
            product.sizes = sizes || product.sizes;
            product.collections = collections || product.collections;
            product.material = material || product.material;
            product.gender = gender || product.gender;
            product.images = images || product.images;
            product.isFeatured =
                isFeatured !== undefined ? isFeatured : product.isFeatured
            product.isPublished =
                isPublished !== undefined ? isPublished : product.isPublished;
            product.tags = tags || product.tags;
            product.dimensions = dimensions || product.dimensions;
            product.weight = weight || product.weight;
            product.sku = sku || product.sku;

            //Save Updated Product
            const updatedProduct = await product.save();
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: "Product not found" })
        }

    } catch (error) {
        console.error(error);
        res.status(500).send("Server error")
    }
})

//@route DELETE /api/products/:id
//@access Delete a product by ID
//@access Private/Admin
router.delete("/:id", protect, admin, async (req, res) => {
    try {
        //Find The product by id
        const product = await Product.findById(req.params.id);
        if (product) {
            //Remove the product by Id
            await product.deleteOne();
            res.json({ message: "Product removed" });
        } else {
            res.status(404).json({ message: "Product not found" })
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error")
    }
})

//@route GET /api/products
//@access Get all products with Optional query filters
//@access Public

router.get("/", async (req, res) => {
    try {
        const {
            collection,
            size,
            color,
            gender,
            minPrice,
            maxPrice,
            sortBy,
            search,
            category,
            material,
            brand,
            limit,
        } = req.query;

        let query = {};

        //Filter logic
        if (collection && collection.toLocaleLowerCase() !== "all") {
            query.collections = collection;
        }

        if (category && category.toLocaleLowerCase() !== "all") {
            query.category = category;
        }

        if (material) {
            query.material = { $in: material.split(",") };
        }

        if (brand) {
            query.brand = { $in: brand.split(",") };
        }

        if (size) {
            query.sizes = { $in: size.split(",") };
        }

        if (color) {
            query.colors = { $in: [color] };
        }

        if (gender) {
            query.gender = gender;
        }

        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }

        if (search) {
            query.$or = [
                   { name: { $regex: search, $options: "i" } },
                   {description: { $regex: search, $options: "i" } },
            ];
        }

        //Sort LOgic
        let sort = {};
        if(sortBy) {
            switch (sortBy) {
                case "priceAsc":
                    sort = {price: 1};
                    break;
                case "priceDesc":
                    sort = {price: -1};
                    break;
                case "popularity":
                    sort = {rating: -1};
                    break;
                 default:
                    break;          
            }
        }
        //Fetch Products and apply Sorting and limit 
        let products = await Product.find(query)
        .sort(sort)
        .limit(Number(limit) || 0);
        res.json(products);
    } catch (error) {
        console.log(error);
        res.status(500).send("server Error");
    }
})
//Summary
//Yeh code ek product filter aur search functionality implement karta hai. User ko category, collection, size,
//  color, gender, material, brand, price range, aur search term ke basis par products ko filter karne ka option
//  milta hai. Uske baad, products ko sorting aur pagination ke saath return kiya jata hai.


//@route GET /api/products/best-seller
//@desc Retrieve the Product with Highest rating
//@access Public
router.get("/best-seller", async (req,res) => {
    try {
       const bestSeller = await Product.findOne().sort({ rating: -1});
       if(bestSeller){
        res.json(bestSeller);
       } else {
        res.status(404).json({message : "NO Best seller found"})
       }
    } catch (error) {
        console.log(error);
        re.status(500).send("Server error");
    } 
 })

 
//@route GET /api/products/new-arrivals
//@desc Retrieve latest 8 Products - Creation date
//@access Public
router.get("/new-arrivals" , async (req , res) => {
    try {
        //Fetch latest 8 products
        const newArrivals = await Product.find().sort({ createdAt: -1}).limit(8);
        res.json(newArrivals);
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
        
    }
})


//@route GET /api/products/:id
//@access Get  a single Product by ID
//@access Public
router.get("/:id", async (req , res) => {
    try {
        const product = await Product.findById(req.params.id);
        if(product){
            res.json(product);
        } else {
            res.status(404).json({ message : "Product Not found"});
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
        
    }
})

//@route GET /api/products/similar/:id
//@desc Retrieve similar  products based on the current product's gender and category
//@access Public
router.get("/similar/:id" , async (req,res) => {
    const {id} = req.params;
    try {
        const product = await Product.findById(id);
        if(!product) {
            return res.status(404).json({ message :"Product not found"});
        }

        const similarProducts = await Product.find({
            _id : {$ne: id}, //Exclude the Current Product ID
            gender :product.gender,
            category: product.category,
        }).limit(4); 
        res.json(similarProducts);

    } catch (error) { 
        console.log(error); 
        res.status(500).send("Server Server");
       }
})



module.exports = router;    