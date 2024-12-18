import express from "express";
const router = express.Router();
import * as UserController from "../app/controllers/UserControllers.js";
import AuthMiddleware from "../app/middleware/AuthMiddleware.js";
import {deleteSingleUsers, getAllUsers, getSingleUsers} from "../app/controllers/UserControllers.js";
 



// Users
router.post("/Registration",UserController.Registration)
router.post("/Login",UserController.Login)
router.get("/ProfileDetails",AuthMiddleware,UserController.ProfileDetails)
router.post("/ProfileUpdate",AuthMiddleware,UserController.ProfileUpdate)
router.get('/All-Users', getAllUsers);
router.get('/Single-Users/:id', getSingleUsers);
router.get('/Delete-Single-Users/:id', deleteSingleUsers);




export default router;