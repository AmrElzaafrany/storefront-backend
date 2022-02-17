import {Order} from "../../models/order";

const OrderInstance = new Order();



describe("Order Model", () => {

    it("should have get all orders method", () => {
        expect(OrderInstance.getOrder).toBeDefined();
    })
    it("should have create order method", () => {
        expect(OrderInstance.create).toBeDefined();
    })
    it("should have get current order by user id method", () => {
        expect(OrderInstance.getCurrentOrderByUserId).toBeDefined();
    })
    it("should have get all orders by user id method", () => {
        expect(OrderInstance.getOrdersByUserId).toBeDefined();
    })
    it("should have get completed orders by user id method", () => {
        expect(OrderInstance.getCompletedOrdersByUSerId).toBeDefined();
    })

    it("getAllOrders should return list of orders", async() => {
        const orderList = await OrderInstance.getOrder();
        expect(orderList).toBeTrue;
    })

    it("getCurrentOrderByUserId method should return current order", async () => {
        const result = await OrderInstance.getCurrentOrderByUserId(1);
        expect(result).not.toBeNull;
    })

})