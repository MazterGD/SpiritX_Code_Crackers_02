import {Router} from "express";
import {authController} from "../controllers/authController";

const authRoutes = Router();

//prefix:auth
authRoutes.post("/signup", authController.signUp);
authRoutes.post("/login", authController.login);
authRoutes.post("/logout", authController.logout);

export default authRoutes;
