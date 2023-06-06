import express from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import { localsMiddleware } from "./middlewares";

const app = express();
const logger = morgan("dev");
app.use(logger);

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
  })
);
app.use(localsMiddleware);
app.use("/uploads", express.static("uploads")); // 주소창에서 uploads 경로로 가면 서버는 uploads 폴더에 접근할 수 있습니다.
app.use("/static", express.static("assets")); // 주소창에서 static 경로로 가면 서버는 assets 폴더에 접근할 수 있습니다.
app.use("/", rootRouter); // 주소창에서 / 경로로 들어오면 rootRouter에 관리
app.use("/videos", videoRouter); // 주소창에서 /videos 경로로 들어오면 videoRouter에서 관리
app.use("/users", userRouter); // 주소창에서 /users 경로로 들어오면 userRouter에서 관리

export default app;
