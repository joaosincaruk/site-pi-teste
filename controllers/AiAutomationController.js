// Importando Express
import express from "express";

// Iniciando Express
const router = express.Router();

router.get("/aiAutomation", (req,res)=>{
    res.render("aiAutomation")
})

export default router;