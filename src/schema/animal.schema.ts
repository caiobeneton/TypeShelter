import joi from "joi";

export const animalSchema = joi.object({
    name: joi.string().required(),
    type: joi.string().required(),
    age: joi.number().required(),
    status: joi.string().required(),
})