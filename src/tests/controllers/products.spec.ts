import supertest from "supertest";
import app from "../../server";

import {User} from "../../models/user";

const request = supertest(app);
const UserInstance = new User();
let token: string;


describe("Products Handler", () => {
    beforeAll(async () => {
        await UserInstance.createUser({
            firstname: "amr",
            lastname: "amr",
            password: "123 ",
            username: "amr"
        });

        const auth = await request.post('/login').send({
            username: "amr",
            password: "123"
        });
        token = auth.body;
    });

    it("should add a product", async (done) => {
        const response = await request
            .post('/products/create-product')
            .set('Authorization', 'Bearer' + token)
            .send({
                name: "spring in action",
                price: 25,
                category: 'book'
            });
        expect(response.status).toBe(401);
        done();
    });

    it("should get all products", async (done) => {
        const response = await request.get('/products');
        expect(response.status).toBe(200);
        done();
    });

    it("should return product by ID", async (done) => {
        const response = await request.get('/products/1');
        expect(response.status).toBe(200);
        done();
    })
})