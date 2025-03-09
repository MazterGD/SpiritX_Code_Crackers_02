import { Request, Response } from "express";
import AppDataSource from "../config/connectDB";
import { Player } from "../models/player.model";

export const playerController = {
  // Get all players
  getAllPlayers: async (req: Request, res: Response) => {
    try {
      const result = await AppDataSource.query("SELECT * FROM players");
      res.json(result.rows);
    } catch (error) {
      res.status(500).json({ error: "Error fetching players" });
    }
  },

  // Get a single player by ID
  getPlayerById: async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;
    try {
      const result = await AppDataSource.query("SELECT * FROM players WHERE id = $1", [id]);
      if (result.rows.length === 0) return res.status(404).json({ error: "Player not found" });
      res.json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: "Error fetching player" });
    }
  },

  // Create a new player
  createPlayer: async (req: Request<{}, {}, Player>, res: Response) => {
    const { name, university, category, total_runs, balls_faced, innings_played, wickets, overs_bowled, runs_conceded } = req.body;
    try {
      const newPlayer = await AppDataSource.query(
        "INSERT INTO players (name, university, category, price, points) VALUES ($1, $2, $3, $4, 0) RETURNING *",
        [name, university, category, total_runs, balls_faced, innings_played, wickets, overs_bowled, runs_conceded]
      );
      res.json(newPlayer.rows[0]);
    } catch (error) {
      res.status(500).json({ error: "Error adding player" });
    }
  },

  // Update a player
  updatePlayer: async (req: Request<{ id: string }, {}, Player>, res: Response) => {
    const { id } = req.params;
    const { name, university, category, total_runs, balls_faced, innings_played, wickets, overs_bowled, runs_conceded } = req.body;
    try {
      const updatedPlayer = await AppDataSource.query(
        "UPDATE players SET name=$1, university=$2, category=$3, price=$4, points=$5 WHERE id=$6 RETURNING *",
        [name, university, category, total_runs, balls_faced, innings_played, wickets, overs_bowled, runs_conceded, id]
      );
      res.json(updatedPlayer.rows[0]);
    } catch (error) {
      res.status(500).json({ error: "Error updating player" });
    }
  },

  // Delete a player
  deletePlayer: async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;
    try {
      await AppDataSource.query("DELETE FROM players WHERE id=$1", [id]);
      res.json({ message: "Player deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Error deleting player" });
    }
  },
};
