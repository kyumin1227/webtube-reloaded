import express from "express";
import { home, search } from "../controller/videoController";
import {
  getJoin,
  postJoin,
  getLogin,
  postLogin,
} from "../controller/userController";
import { publicOnlyMiddleware } from "../middlewares";
import { getTest, postTest } from "../controller/testController";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.route("/test").get(getTest).post(postTest);
rootRouter.route("/join").all(publicOnlyMiddleware).get(getJoin).post(postJoin);
rootRouter
  .route("/login")
  .all(publicOnlyMiddleware)
  .get(getLogin)
  .post(postLogin);
rootRouter.get("/search", search);

export default rootRouter;
