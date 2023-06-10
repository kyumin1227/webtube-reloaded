import express from "express";
import morgan from "morgan";
import session from "express-session";
import flash from "express-flash";
import MongoStore from "connect-mongo";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import { localsMiddleware } from "./middlewares";
import apiRouter from "./routers/apiRouter";

const app = express();
const logger = morgan("dev");
app.use(logger);

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(express.urlencoded({ extended: true }));
// app.use(express.text()); // post로 보내는 text값을 이해하기 위해서 사용
app.use(express.json()); // json.stringify로 변환된 값은 받아서 다시 js의 object로 변환해주는 역할입니다. 하지만 헤더에 json이라고 명시하지 않으면 text인줄 알아서 변환하지 않습니다.
app.use(
  // logout 오류의 원인으로 추정 해결 要
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
  })
);
app.use(flash()); // req.flash를 통해 사용자에게 메세지를 보낼수 있게 해줌
app.use(localsMiddleware);
app.use("/uploads", express.static("uploads")); // 주소창에서 uploads 경로로 가면 서버는 uploads 폴더에 접근할 수 있습니다.
app.use("/static", express.static("assets")); // 주소창에서 static 경로로 가면 서버는 assets 폴더에 접근할 수 있습니다.
app.use("/", rootRouter); // 주소창에서 / 경로로 들어오면 rootRouter에 관리
app.use("/videos", videoRouter); // 주소창에서 /videos 경로로 들어오면 videoRouter에서 관리
app.use("/users", userRouter); // 주소창에서 /users 경로로 들어오면 userRouter에서 관리
app.use("/api", apiRouter); // 주소창에서 /api 경로로 들어오면 apiRouter에서 관리

export default app;
