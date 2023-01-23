import connectionDB from "../database/database.js";
import { Request, Response } from "express";
import { QueryResult } from "pg";

type AnimalEntity = {
    id: number;
    name: string;
    type: string;
    age: number;
    status: string;
}

export type Animal = Omit<AnimalEntity, "id">

export async function insert(req: Request, res: Response) {
    const newAnimal = req.body as Animal

    try {

        connectionDB.query(`INSERT INTO animals (name, type, age, status) VALUES ($1, $2, $3, $4);`, 
        [newAnimal.name, newAnimal.type, newAnimal.age, newAnimal.status])

        return res.sendStatus(201)
    } catch (error) {
        return res.sendStatus(500)
    }
}

export async function findAll(req: Request, res: Response): Promise<Response<AnimalEntity[]>> {
    try {
        const result: QueryResult<AnimalEntity[]> = await connectionDB.query(`SELECT * FROM animals;`)
        return res.send(result.rows)
    } catch (error) {
        return res.sendStatus(500)
    }
}

export async function update(req: Request, res: Response) {
    const { id } = req.params
    const { status } = req.body

    try {
        await connectionDB.query(`UPDATE animals SET status=$1 WHERE id=$2;`, [status, id])

        return res.sendStatus(200)
    } catch (error) {
        return res.sendStatus(500)
    }
}

export async function deleteAnimal(req: Request, res: Response) {
    const { id } = req.params

    try {
        await connectionDB.query(`DELETE FROM animals WHERE id=$1;`, [id])

        return res.sendStatus(200)
    } catch (error) {
        return res.sendStatus(500)
    }
}

export async function findById(req: Request, res: Response): Promise<Response<AnimalEntity>> {
    const { id } = req.params

    try {
        const { rows } = await connectionDB.query("SELECT * FROM animals WHERE id=$1;", [id])

         return res.send(rows[0])
    } catch (error) {
        return res.sendStatus(500)
    }
}