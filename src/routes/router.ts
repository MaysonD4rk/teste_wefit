import express from "express";
import MainController from "../controllers/mainController";

const router = express.Router();

router.post('/cadastrar', MainController.Cadastrar);

export default router;