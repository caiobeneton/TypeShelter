import { animalSchema } from "../schema/animal.schema.js";
import { NextFunction, Request, Response } from "express";
import { Animal } from "../controller/shelter.controller.js";

export async function animalValidation(req: Request, res: Response, next: NextFunction) {
    const newAnimal = req.body as Animal 

    const {error} = animalSchema.validate(newAnimal, {abortEarly: false})

    if (error) {
        const errors = error.details.map((detail) => detail.message)
        return res.status(422).send(errors)
    }

    next()
}