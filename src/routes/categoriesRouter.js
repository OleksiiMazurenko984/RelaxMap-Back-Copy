import { Router } from "express";
import { categories } from "../controllers/index.js";

const categoriesRouter = Router();

categoriesRouter.get("/regions", categories.getRegions);
categoriesRouter.get("/location-types", categories.getLocationTypes);

export default categoriesRouter;
