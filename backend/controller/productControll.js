
import asyncHandler from "../middleware/asyncHandle.js"
import Product from "../model/productsModel.js"

//@desc : fetch all products
//@route: /api/products/
//@acces: public
const getProduct = asyncHandler(async (req, res) => {

    const pageSize = process.env.PAGINATION_LIMIT;
    //  process.env.PAGINATION_LIMIT
    const page = Number(req.query.pageNumber) || 1;

    const keyword = req.query.keyword ? { name: { $regex: req.query.keyword, $options: 'i' } } : {};

    const count = await Product.countDocuments({ ...keyword });


    const products = await Product.find({ ...keyword }).limit(pageSize).skip(pageSize * (page - 1));

    res.json({
        products, page,
        pages: Math.ceil(count / pageSize)
    });


});


//@desc : get product use by Id 
//@route: /api/products/:id 
//@acces: public
const getProductById = asyncHandler(async (req, res) => {

    const product = await Product.findById(req.params.id);

    if (product) {
        return res.json(product)
    } else {
        res.status(404);
        throw new Error('resouce  not found')
    }

});

//@desc : create product
//@route: POST /api/products/
//@access: privet/admin
const createProduct = asyncHandler(async (req, res) => {

    const products = new Product({
        name: "sample",
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: "sample brand",
        category: "sample category",
        countInStock: 0,
        numReviews: 0,
        description: 'sample description'
    })
    const createdProduct = await products.save()
    res.status(201).json(createdProduct)
});

//@desc : Update a product
//@route:PUT /api/products/:id/
//@acces: Privet/Admin
const updateProduct = asyncHandler(async (req, res) => {
    const { name, price, description, image, brand, category,
        countInStock } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {

        product.name = name;
        product.price = price;
        product.description = description;
        product.image = image;
        product.brand = brand;
        product.category = category;
        product.countInStock = countInStock;
        const updatedProduct = await product.save();


        res.json(updatedProduct)
    } else {
        res.status(404);
        throw new Error('Resource not found');

    }
});

//@desc : delete a product
//@route:delete product /api/products/:id/
//@acces: Privet/Admin
const deleteProduct = asyncHandler(async (req, res) => {

    const product = await Product.findById(req.params.id);

    if (product) {

        await Product.deleteOne({ _id: product._id });
        res.status(200).json({ message: "Product deleted" })


        const updatedProduct = await product.save();


        res.json(updatedProduct)
    } else {
        res.status(404);
        throw new Error('Resource not found');

    }
});

//@desc : Create a new Review
//@route:Create product /api/products/:id/reviews   
//@acces: Privet/Admin
const createProductReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;

    const product = await Product.findById(req.params.id);
    if (product) {
        const alreadyReviewed = product.reviews.find((review) =>
            review.user.toString() === req.user._id.toString());
        if (alreadyReviewed) {
            res.status(400);
            throw new Error("Product already reviewed");

        }
        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id,
        }
        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        
        product.rating =
            // product.reviews.reduce((acc,review) => acc + review.rating,0)/
            // product.reviews/length;
            product.rating = product.reviews.reduce((acc, review) => acc + review.rating, 0)
            / product.reviews.length;

        await product.save();
        res.status(200).json({ message: 'Review a dded' })

    } else {
        res.status(404);
        throw new Error('Resource not found');

    }
});


//@desc : Get Top Rated Products  
//@route: /api/products/top 
//@acces: public
const getTopRatedProduct = asyncHandler(async (req, res) => {

    const products = await Product.find(req.params.id).limit(4);

    res.status(200).json(products)

    // } else {
    //     res.status(404);
    //     throw new Error('resouce  not found')
    // }

});

export {
    getProduct,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    createProductReview,
    getTopRatedProduct
}