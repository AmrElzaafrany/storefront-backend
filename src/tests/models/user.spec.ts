import {UserType} from "../../interfaces/user";
import {User} from "../../models/user";

const UserInstance = new User();

describe("User Model", () => {
    const user: UserType = {
        username: "amr",
        firstname: "amr",
        lastname: "amr",
        password: "123"
    }


    it("should have getAllUsers method", () => {
        expect(UserInstance.getUsers).toBeDefined();
    })

    it("should have getUserById method", () => {
        expect(UserInstance.getUserById).toBeDefined();
    })

    it("should have deleteUser method", () => {
        expect(UserInstance.deleteUser).toBeDefined();
    })

    it("should have createUser method", () => {
        expect(UserInstance.createUser).toBeDefined();
    })

    it("should have updateUser method", () => {
        expect(UserInstance.updateUser).toBeDefined();
    })

    it("create method should create a user", async () => {
        const createdUser: UserType = await UserInstance.createUser(user)
        expect(createdUser.username)
    })

    it("getUserById method should return the user", async () => {
        const result = await UserInstance.getUserById(1)
        expect(result).not.toBeNull();
    })

    it("Delete should delete the user", async () => {
        const result = await UserInstance.deleteUser(1)
        expect(result);
    })

    it("authenticate user with password", async () => {
        const result = await UserInstance.authenticate('amr', '123');
        expect(result).not.toBeNull;
    })

})