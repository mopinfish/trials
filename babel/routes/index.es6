import { Router } from "express";
import path from "path";

let router;
export default router = Router();

router.get('/', (req, res, next) => {
  res.render("index", { title: 'Express' });
});
