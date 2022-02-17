import {Product} from "../../models/Product";

const ProductInstance = new Product();

describe("Product Model", () => {
    it("should have getAllProducts method", () => {
        expect(ProductInstance.getProducts).toBeDefined();
    })

    it("should have getProductById method", () => {
        expect(ProductInstance.getProductById).toBeDefined();
    })

    it("should have getProductByCategoryName method", () => {
        expect(ProductInstance.getProductByCategoryName).toBeDefined();
    })

    it("should have delete method", () => {
        expect(ProductInstance.deleteProduct).toBeDefined();
    });



})