import supertest from "supertest";
import app from "../../server";
import {UserType} from "../../interfaces/user";

const request = supertest(app);

describe("User Handler", () => {
    const userData: UserType = {
        username: "amr",
        firstname: "amr",
        lastname: "amr",
        password: "123"
    }

    const token: string = process.env.TOKEN_TEST as string;

    it("should require authorization", (done) => {
        request.get('/users').then((res) => {
            expect(res.status).toBe(401)
            done()
        })
    })

    it("get all users", (done) => {
         request.get('/users')
            .set("Authorization", "bearer" + token)
            .then((res) => {
                expect(res.status).toBe(401);
                done()
            })
    })

    it('should add a user', async (done) => {
        const response = await request
            .post('/users/create-user')
            .set('Authorization', 'Bearer ' + token)
            .send(userData);
        expect(response.status).toBe(401);
        done();
    });

    it("should return the user", async (done) => {
        const response = await request
            .get('/users/1')
            .set('Authorization', 'Bearer ' + token)
        expect(response.status).toBe(401);
        done();

    })

})