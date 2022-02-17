import { PoolClient, QueryResult } from "pg";
import {pool} from "../database";
import { ProductType } from "../interfaces/product";

export class Product {

    table: string = 'products';

    //get all products
    async getProducts(): Promise<ProductType[]> {
        try {
            const connection: PoolClient = await pool.connect();
            const sql: string = `SELECT * FROM ${this.table}`;
            const result: QueryResult = await connection.query(sql);
            connection.release();

            return result.rows;
        } catch (err) {
            throw new Error("Could not get all products.");
        }
    };

    //create product
    async createProduct(product: ProductType): Promise<ProductType> {
        try {
            const { name, price, category } = product;
            const connection: PoolClient = await pool.connect();
            const sql: string = `INSERT INTO ${this.table} (name, price, category) VALUES ($1, $2, $3)`;
            const result: QueryResult = await connection.query(sql, [name, price, category]);

            connection.release();
            return result.rows[0];
        } catch (err) {
            throw new Error('could not create product')
        }
    };

    //get product by ID
    async getProductById(productId: number): Promise<ProductType> {
        try {
            const connection: PoolClient = await pool.connect();
            const sql: string = `SELECT * FROM ${this.table} WHERE id = $1`;
            const result: QueryResult = await connection.query(sql, [productId]);
            connection.release();

            return result.rows[0];
        } catch (err) {
            throw new Error(`could not get product by id: ${productId}. ${err}`)
        }
    };

    //delete Product
    async deleteProduct(productId: number): Promise<ProductType> {
        try {
            const connection: PoolClient = await pool.connect();
            const sql: string = `DELETE FROM ${this.table} WHERE id = $1`;
            const result: QueryResult = await connection.query(sql, [productId]);
            connection.release();

            return result.rows[0];
        } catch (err) {
            throw new Error(`couldnot delete product with id : ${productId}. ${err}`);
        }
    }

    //update product by ID
    async updateProduct(productId: number, newProduct: ProductType): Promise<ProductType> {
        try {
            const { name, price, category } = newProduct;
            const connection: PoolClient = await pool.connect();
            const sql: string = `UPDATE ${this.table} SET name = $1, price = $2, category = $3 WHERE id = $4`;
            const result: QueryResult = await connection.query(sql, [name, price, category, productId]);
            connection.release();

            return result.rows[0];
       } catch(err) {
           throw new Error(`could not update product. ${err}`)
       }
   }

    //get products by category name
    async getProductByCategoryName(categoryName: string): Promise<ProductType[]> {
        try{
            const connection: PoolClient = await pool.connect();
            const sql: string = `SELECT * FROM ${this.table} WHERE category = $1`;
            const result: QueryResult = await connection.query(sql, [categoryName]);
            connection.release();

            return result.rows;
        } catch (err) {
            throw new Error(`could not get products with categoryName: ${categoryName}. ${err}`)
        }
    }
} 