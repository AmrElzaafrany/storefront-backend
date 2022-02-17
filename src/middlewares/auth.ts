import { Request, Response, NextFunction } from 'express';
import jsonwebtoken from 'jsonwebtoken';
import { UserType } from '../interfaces/user';



export const authToken = (user:UserType) => {
    return jsonwebtoken.sign(user, process.env.TOKEN_SECRET as string)
}

export const checkAuthHeader = (req: Request, res: Response, next: NextFunction) => {
    if(!req.headers.authorization) {
        res.status(401);
        res.json("invalid token");

        return false;
    }
    try {
        const token = req.headers.authorization.split(" ")[1];
        jsonwebtoken.verify(token, process.env.TOKEN_SECRET as string)
        next()
    } catch(err) {
        res.status(401);
        res.json(`Invalid Token: ${err}`)

        return false;
    }
}