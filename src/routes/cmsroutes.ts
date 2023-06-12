import express, { Request, Response, Router } from "express";
import * as dataController from "../controllers/controllers";
import * as cmsController from "../controllers/cmscontrollers";

const router: Router = express.Router();

// add POST, PUT AND DELETE ROUTES
router.get("/cms/", async (req: Request, res: Response) => {
  try {
    const data = await dataController.getAllData();
    res.render("cms", { title: "All Films", films: data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/cms/insert", (req: Request, res: Response) => {
  res.render("insert", { title: "Insert Film" });
});

router.post("/cms/insert", async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const newData = await cmsController.createData(req.body);
    console.log(newData);
    res.redirect("/cms/");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/cms/edit/:id", async (req: Request, res: Response) => {
  try {
    const data = await dataController.getDataById(req.params.id);
    res.render("edit", { title: "Edit Film", film: data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/cms/edit", async (req: Request, res: Response) => {
  try {
    const deletedData = await cmsController.updateData(req.body.id, req.body);
    res.redirect("/cms/");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE

router.get("/cms/delete/:id", async (req: Request, res: Response) => {
  try {
    const data = await dataController.getDataById(req.params.id);
    res.render("delete", { title: "Delete Film", film: data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/cms/delete", async (req: Request, res: Response) => {
  try {
    const deletedData = await cmsController.deleteData(req.body.filmID);
    res.redirect("/cms/");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
