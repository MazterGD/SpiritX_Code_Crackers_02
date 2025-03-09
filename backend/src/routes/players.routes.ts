import { Router } from "express";
import { playerController } from "../controllers/playerController";

const playerRoutes = Router();

// Prefix: /players
playerRoutes.get("/", playerController.getAllPlayers);
// playerRoutes.get("/:id", playerController.getPlayerById);
playerRoutes.post("/", playerController.createPlayer);
playerRoutes.put("/:id", playerController.updatePlayer);
playerRoutes.delete("/:id", playerController.deletePlayer);

export default playerRoutes;
