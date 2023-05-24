import express from "express";
import {
  getEdit,
  postEdit,
  logout,
  see,
  startGithubLogin,
  finishGithubLogin,
} from "../controller/userController";

const userRouter = express.Router();

// userRouter
//   .route("/edit")
//   .all(protectorMiddleware)
//   .get(getEdit)
//   .post(uploadFiles.single("avatar"), postEdit);
userRouter.get("/github/start", startGithubLogin);
userRouter.get("/github/finish", finishGithubLogin);
userRouter.get(":id", see);
userRouter.get("/logout", logout);
export default userRouter;
