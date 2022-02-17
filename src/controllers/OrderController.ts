import { Router, Response, Request } from "express";
import {OrderProduct, order} from "../interfaces/order";
import {Order} from "../models/order";

export const OrderController: Router = Router();
const order: Order = new Order();

OrderController.post('/create-order', async (req: Request, res: Response) => {
    try {
        let products = req.body.products as unknown as OrderProduct[];
        const status = req.body.status as unknown as string;
        const user_id = req.body.user_id as unknown as number;

        const createdOrder: order = await order.create({products, status, user_id})

        return res.json(createdOrder);
    } catch (err) {
        res.status(400);
        res.json(err);
    }


})

//Get all orders
OrderController.get('/', async(req: Request, res: Response) => {
    try{
        const allOrders:order[] = await order.getOrder();

        return res.json(allOrders);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
});

// //Get all orders by user ID
OrderController.get('/:user_id', async (req: Request, res: Response) => {
    const userId: number = parseInt(req.params.user_id);

    try {
        const currentOrder: order[] = await order.getOrdersByUserId(userId);
        console.log(currentOrder);
        return res.json(currentOrder)
    } catch (err) {
        res.status(400);
        res.json(`could not get user by id: ${userId} `);
    }


})

// //Get current order by user
OrderController.get('/current/:user_id',async (req: Request, res: Response) => {
    try{
        const userId: number = parseInt(req.params.user_id);
        const allOrdersByUserId: order = await order.getCurrentOrderByUserId(userId);
        console.log(allOrdersByUserId);
        return res.json(allOrdersByUserId);
    } catch (err) {
        res.status(400);
        res.json(err);
    }


})

// //Get completed orders by user
OrderController.get('/completed/:user_id',async (req:Request, res: Response) => {
    try{
        const userId: number = parseInt(req.params.user_id);
        const currentData: order[] = await order.getCompletedOrdersByUSerId(userId);
        console.log(currentData);
        return res.json(currentData);
    } catch (err) {
        res.status(400);
        res.json(err)
    }
})

