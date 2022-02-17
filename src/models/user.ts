import bcrypt from 'bcrypt';
import { PoolClient, QueryResult } from "pg";
import { pool } from "../database";
import { UserType } from "../interfaces/user";


export class User {

    table: string = 'users';
    pepper: string = process.env.BCRYPT_PASSWORD as string;
    salt: string = process.env.SALT_ROUNDS as string;

    //get all users
    async getUsers(): Promise<UserType[]> {
        try {
            const connection: PoolClient = await pool.connect();
            const sql: string = `SELECT * FROM ${this.table}`;
            const result: QueryResult = await connection.query(sql);
            connection.release();

            return result.rows;
        } catch (err) {
            throw new Error("could not get all users.")
        }
    }

    //create user
    async createUser(user: UserType): Promise<UserType> {
        try {
            const { firstname, lastname, username, password } = user;


            const hashPassword: string = bcrypt.hashSync(password + this.pepper, parseInt(this.salt));

            const connection: PoolClient = await pool.connect();
            const sql: string = `INSERT INTO ${this.table} (firstName, lastName, userName, password) VALUES($1, $2, $3, $4) RETURNING *`;
            const result: QueryResult = await connection.query(sql, [
                firstname,
                lastname,
                username,
                hashPassword
            ]);
            connection.release();

            return result.rows[0];
        } catch (err) {
            throw new Error('could not create user.');
        }
    }

    //log-in
    async authenticate(username: string, password: string): Promise<UserType | null> {
        try {
            const connection: PoolClient = await pool.connect();
            const sql: string = `SELECT * FROM ${this.table} WHERE username = ($1)`;
            const result: QueryResult = await connection.query(sql, [username]);

            if (result.rows.length) {
                const user = result.rows[0];
            //    const  {id, firstname, lastname, username} = user;


                if (bcrypt.compareSync(password + this.pepper, user.password)) {
                    return user;
                }

            }
            connection.release();

            return null;
        } catch (err) {
            throw new Error(`Could not find user ${username}. ${err}`)

        }
    }

    // Get user by ID
    async getUserById(userId: number): Promise<UserType> {
        try {
            const connection: PoolClient = await pool.connect();
            const sql: string = `SELECT * FROM ${this.table} WHERE id = ($1)`;
            const result: QueryResult = await connection.query(sql, [userId]);
            connection.release();

            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not get user by id :${userId}. Error: ${(err)}`);
        }
    }

    // Delete User by ID
    async deleteUser(userId: number): Promise<UserType> {
        try {
            const connection: PoolClient = await pool.connect();
            const sql: string = `DELETE FROM ${this.table} WHERE id = ($1)`;
            const result: QueryResult = await connection.query(sql, [userId]);
            connection.release();

            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not delete user ${userId}. Error: ${(err)}`)
        }
    }

    //update user
    async updateUser(userId: number, newUserData: UserType): Promise<UserType> {
        const { firstname, lastname, username } = newUserData
        try {
            const connection: PoolClient = await pool.connect();
            const sql: string = `UPDATE ${this.table} SET firstname = $1, lastname = $2, username = $3 WHERE id = $4`;
            const result: QueryResult = await connection.query(sql, [firstname, lastname, username, userId]);
            connection.release();

            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not update user ${firstname} ${lastname} ${username}. ${err}`)
        }
    }

}