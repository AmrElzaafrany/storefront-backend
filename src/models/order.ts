import {PoolClient, QueryResult} from "pg";
import {pool} from "../database";
import {BaseOrder, order} from "../interfaces/order";


export class Order {

    table: string = 'orders';


    async create (order: BaseOrder): Promise<order> {
        const {products, status, user_id} = order

        try {
            const sql = "INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *"
            const connection = await pool.connect()
            const {rows} = await connection.query(sql, [user_id, status])
            const order = rows[0]

            const orderProductsSql = "INSERT INTO order_products (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING product_id, quantity"
            const orderProducts = []

            for (const product of products) {
                const {product_id, quantity} = product

                const {rows} = await connection.query(orderProductsSql, [order.id, product_id, quantity])

                orderProducts.push(rows[0])
            }

            connection.release()

            return {
                ...order,
                products: orderProducts
            }
        } catch (err) {
            throw new Error(`Could not add new order for user ${user_id}. ${err}`)
        }
    }

    //Get all orders
    async getOrder(): Promise<order[]> {
        try {
            const connection: PoolClient = await pool.connect();
            const sql: string = `SELECT * FROM ${this.table}`;
            const result: QueryResult = await connection.query(sql);

            connection.release();
            return result.rows;
        } catch (err) {
            throw new Error('could not get all products');
        }
    };
    //
    // select all orders for a user
    async getOrdersByUserId(userId: number): Promise<order[]> {
        try {
            const connection: PoolClient = await pool.connect();
            const sql: string = `SELECT * FROM ${this.table} WHERE user_id = $1`;
            const result: QueryResult = await connection.query(sql, [userId]);

            connection.release();
            return result.rows;
        } catch (err) {
            throw new Error(`${err}`)
        }
    }


    // //Get current order by user
    async getCurrentOrderByUserId(userId: number): Promise<order> {
        try {
            const connection: PoolClient = await pool.connect();
            const sql: string = `SELECT * FROM ${this.table} WHERE user_id = $1 LIMIT 1`;
            const result: QueryResult = await connection.query(sql, [userId]);
            connection.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`${err}`);
        }
    };

    // //Get completed orders by user
    async getCompletedOrdersByUSerId(userId: number): Promise<order[]> {
        try {
            const status: string = "complete";
            const connection: PoolClient = await pool.connect();
            const sql: string = `SELECT * FROM ${this.table} WHERE user_id = ${userId} AND status = $1`;
            const result: QueryResult = await connection.query(sql, [status]);

            connection.release();
            return result.rows;
        } catch (err) {
            throw new Error(`${err}`);
        }
    }




}