// 루트 라우터: "/" 주소를 관리하는 라우터들을 작성한다.

import express from "express";
import { home, search } from "../controller/videoController";
import {
  getJoin,
  postJoin,
  getLogin,
  postLogin,
} from "../controller/userController";
import { publicOnlyMiddleware } from "../middlewares";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.route("/join").all(publicOnlyMiddleware).get(getJoin).post(postJoin);
rootRouter
  .route("/login")
  .all(publicOnlyMiddleware)
  .get(getLogin)
  .post(postLogin);
rootRouter.get("/search", search);

export default rootRouter;
