import { Application, Router } from "express";
import { OrderController } from "./controllers/OrderController";
import { ProductController } from "./controllers/ProductController";
import { UserController } from "./controllers/UserController";


const _routes:[string, Router][] = [
    ['/products', ProductController],
    ['/users', UserController],
    ['/orders', OrderController]    
];

export const routes: Function = (app: Application): void => {
    _routes.forEach((route) => {
        const [url, controller] = route;
        app.use(url, controller);
    })
}