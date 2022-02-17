import {Router, Response, Request} from "express";
import {ProductType} from "../interfaces/product";
import {checkAuthHeader} from "../middlewares/auth";
import {Product} from "../models/Product";

export const ProductController: Router = Router();

const product: Product = new Product();


ProductController.get('/', async (req: Request, res: Response) => {
    try {
        const allProducts: ProductType[] = await product.getProducts();
        console.log("Get all products")

        return res.json(allProducts);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
})

//Create product
ProductController.post('/create-product', checkAuthHeader, async (req: Request, res: Response) => {
    try {
        const name: string = req.body.name;
        const price: number = parseInt(req.body.price);

        if (name === undefined || price === undefined) {
            res.status(400)
            res.send("Some required parameters are missing! eg. :name, :price")
            return false
        }
        const createdProduct: ProductType = await product.createProduct(req.body);
        console.log(createdProduct);
        res.json("Done")
        return res.json(createdProduct);
    } catch (err) {
        res.status(400);
        res.json(err);
    }

});

//get product by ID
ProductController.get('/:id', async (req: Request, res: Response) => {
    try{
        const productId: number = parseInt(req.params.id);
        const selectedProductById: ProductType = await product.getProductById(productId);
        return res.json(selectedProductById);
    } catch (err) {
        res.status(400)
        res.json("err")
    }

});

//Delete product by id
ProductController.delete('/:id', async (req: Request, res: Response) => {
    try {
        const productId: number = parseInt(req.params.id);
        if (productId === undefined) {
            res.status(400)
            res.send("Missing required product id")
            return false;
        }
        const deletedProduct: ProductType = await product.deleteProduct(productId);
        res.send(`Product with id: ${productId} deleted`);
        return res.send(deletedProduct);
    } catch (err) {
        res.status(400);
        res.send("Missing required product id");
    }

});

//update Product by ID
ProductController.put('/:id', async (req: Request, res: Response) => {
    try {
        const productId: number = parseInt(req.params.id);
        const name: string = req.body.name;
        const price: number = req.body.price;
        const category: string = req.body.category;

        if(productId === undefined || name === undefined || price === undefined || category === undefined) {
            res.status(400)
            res.send("Some required parameters are missing! eg. :name, :price, :id, :category")
            return false
        }
        const updatedProduct: ProductType = await product.updateProduct(productId, {name, price, category});

        res.send(`Product with id: ${productId} updated`)
        return res.json(updatedProduct);
    } catch (err) {
        res.status(400)
        res.json(err)
    }
});

//get product by category name
ProductController.get('/cat/:category', async (req: Request, res: Response) => {
    try{
        const categoryName: string = req.params.category;
        const selectedProductsByCategory: ProductType[] = await product.getProductByCategoryName(categoryName);
        return res.json(selectedProductsByCategory);
    } catch(err) {
        res.status(400)
        res.json("err")
    }

})
