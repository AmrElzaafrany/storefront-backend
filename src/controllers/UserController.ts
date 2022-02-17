import {Router, Response, Request} from "express";
import {UserType} from "../interfaces/user";
import {authToken, checkAuthHeader} from "../middlewares/auth";
import {User} from "../models/user";


export const UserController: Router = Router();

const user: User = new User();

// get all users
UserController.get('/', checkAuthHeader, async (req: Request, res: Response) => {
    try {
        const allUsers: UserType[] = await user.getUsers();
        return res.json(allUsers);
    } catch (err) {
        res.status(400);
        res.json(`${err}`);
    }

});

// create user
UserController.post('/create-user', checkAuthHeader, async (req: Request, res: Response) => {
    try {
        const firstname = req.body.firstname;
        const lastname: string = req.body.lastname;
        const username: string = req.body.username;

        if (firstname === undefined || lastname === undefined || username === undefined) {
            res.status(400)
            res.send("Some required parameters are missing!");
            return false;
        }
        const newUser: UserType = await user.createUser(req.body);
        return res.json(authToken(newUser));
    } catch (err) {

        res.status(400);
        res.send(err);
    }
});

// login user
UserController.post('/login', async (req: Request, res: Response) => {
    try {
        const username = req.body.username;
        const password = req.body.password;

        if (username === undefined || password === undefined) {
            res.status(400)
            res.send("Some required parameters are missing!")
        }
        const loginUser: any = await user.authenticate(req.body.username, req.body.password);
        // const token: string = authToken(loginUser);
        console.log(`user : ${loginUser}`)
        // console.log(`token : ${token}`);
        res.json(authToken(loginUser));
    } catch (err) {
        res.status(400)
        res.json(err);
    }
});

// Get user by ID
UserController.get('/:id', checkAuthHeader, async (req: Request, res: Response) => {
    try {
        const userId: number = parseInt(req.params.id);

        if (!userId) {
            res.status(400)
            res.send("Missing required parameter")
        }
        const selectedUserById: UserType = await user.getUserById(userId);
        console.log(selectedUserById);
        return res.json(selectedUserById);
    } catch (err) {
        res.status(400)
        res.json(err)
    }

});

//Delete User by ID
UserController.delete('/:id', checkAuthHeader, async (req: Request, res: Response) => {
    try {
        const userId: number = parseInt(req.params.id);

        if (!userId) {
            res.status(400)
            res.send("missing required parameter")
        }
        const deletedUser: UserType = await user.deleteUser(userId);
        res.send(`User with id: ${userId} deleted`);
        return res.json(deletedUser);
    } catch (err) {
        res.status(400)
        res.json(err)
    }

});

//Update User by ID
UserController.put('/:id', checkAuthHeader, async (req: Request, res: Response) => {
    try {
        const userId: number = parseInt(req.params.id);
        const firstname: string = req.body.firstname;
        const lastname: string = req.body.lastname;
        const username: string = req.body.username;

        if (!userId || firstname === undefined || lastname === undefined || username === undefined) {
            res.status(400)
            res.send("please Enter all required data")
        }
        const updatedUser: UserType = await user.updateUser(userId, {firstname, lastname, username});
        return res.json(updatedUser);

    } catch (err) {
        res.status(400)
        res.json(err)
    }
})
