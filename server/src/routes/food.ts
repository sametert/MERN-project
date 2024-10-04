import express from "express";
import * as FoodsController from "../controllers/foods";
// import { getNotes } from "../controllers/notes";

const router = express.Router();

router.get("/", FoodsController.getFoods);

router.get("/:foodId", FoodsController.getFood);

//aynı route olmasında sakınca yoktur. Çünkü http request'leri farklı. get and post
router.post("/", FoodsController.createFood);

router.patch("/:foodId" , FoodsController.updateFood);

router.delete("/:foodId" , FoodsController.deleteFood);

export default router;