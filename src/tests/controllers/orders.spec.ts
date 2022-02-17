import supertest from "supertest";
import app from "../../server";


const request = supertest(app);

describe(" Order Handler", () => {


    it("should add a order", async (done) => {
        const response = await request
            .post('/orders/create-order')
            .send({
                status: "complete",
                user_id: 1,
            });
        expect(response.status).toBe(400);
        done();
    })

    it('should return a list of orders', async (done) => {
        const response = await request
            .get('/orders')
        expect(response.status).toBe(200);
        done();
    });

})