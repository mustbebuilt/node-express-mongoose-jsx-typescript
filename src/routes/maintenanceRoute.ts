// GET /
import express, { Request, Response, Router } from "express";
import * as maintenanceController from "../controllers/maintenanceController";

const router: Router = express.Router();

router.get("/maintenance/convertDates", async (req: Request, res: Response) => {
    try {
    const data = await maintenanceController.getAllDataToTidy();
    res.json(data);
    } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
    }
    });

    export default router as "MaintenanceRouter";