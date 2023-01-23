import { Router } from "express";
import { deleteAnimal, findAll, findById, insert, update } from "../controller/shelter.controller.js";
import { animalValidation } from "../middlewares/animalValidation.middleware.js";

const router = Router()

router.post("/insert", animalValidation, insert)
router.get("/findAll", findAll)
router.get("/findById", findById)
router.patch("/update/:id", update)
router.delete("/delete/:id", deleteAnimal)


export default router;