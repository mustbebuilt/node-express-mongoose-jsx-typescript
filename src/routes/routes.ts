import express, { Request, Response, Router } from "express";
import * as dataController from "../controllers/controllers";

const router: Router = express.Router();

// GET /

router.get("/", async (req: Request, res: Response) => {
try {
const data = await dataController.getNewestFilms();
res.render("index", { "title": "Sheffield Streaming", "films": data , "loggedIn": req.session.login});
} catch (err) {
 res.status(404).send("Page not found");
}
  });


  router.get("/films", async (req: Request, res: Response) => {
try {
const data = await dataController.getAllData();
res.render("films", { "title": "All Films", "films": data, "loggedIn": req.session.login });
} catch (err) {
 res.status(404).send("Page not found");
}
  });

  router.get("/film/:id", async (req: Request, res: Response) => {
try {
const data = await dataController.getDataById(req.params.id);
res.render("filmDetails", { "title" : false, "film": data, "loggedIn": req.session.login });
} catch (err) {
 res.status(404).send("Page not found");
}
});

// GET /api
router.get("/api", async (req: Request, res: Response) => {
try {
const data = await dataController.getAllData();
res.json(data);
} catch (err) {
console.error(err);
res.status(500).json({ error: "Internal Server Error" });
}
});

// GET /api/:id
router.get("/api/:id", async (req: Request, res: Response) => {
try {
const data = await dataController.getDataById(req.params.id);
res.json(data);
} catch (err) {
console.error(err);
res.status(500).json({ error: "Internal Server Error" });
}
});

// GET /api/filmTitle/:filmTitle
router.get("/films/:filmTitle", async (req: Request, res: Response) => {
    try {
      const filmTitle = req.params.filmTitle;
      const data = await dataController.getDataByTitle(filmTitle);
res.render("films", { "title": "Search Results", "films": data, "loggedIn": req.session.login});
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // GET /api/filmCertificate/:filmCertificate
router.get("/api/filmCertificate/:filmCertificate", async (req: Request, res: Response) => {
    try {
      const filmCertificate = req.params.filmCertificate;
      const data = await dataController.getDataByCertificate(filmCertificate);
      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // GET /api/dateRange/:startDate/:endDate
  router.get("/api/dateRange/:startDate/:endDate", async (req: Request, res: Response) => {
    try {
        const startDate = new Date(req.params.startDate);
        const endDate = new Date(req.params.endDate);
      const data = await dataController.getDataByDateRange(startDate, endDate);
      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

// POST /api
router.post("/api", async (req: Request, res: Response) => {
try {
console.log(req.body);
const newData = await dataController.createData(req.body);
console.log(newData);
res.json(newData);
} catch (err) {
console.error(err);
res.status(500).json({ error: "Internal Server Error" });
}
});

// PUT /api/:id
router.put("/api/:id", async (req: Request, res: Response) => {
try {
const updatedData = await dataController.updateData(
req.params.id,
req.body
);
res.json(updatedData);
} catch (err) {
console.error(err);
res.status(500).json({ error: "Internal Server Error" });
}
});

// DELETE /api/:id
router.delete("/api/:id", async (req: Request, res: Response) => {
try {
const deletedData = await dataController.deleteData(req.params.id);
res.json(deletedData);
} catch (err) {
console.error(err);
res.status(500).json({ error: "Internal Server Error" });
}
});

export default router;