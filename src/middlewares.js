import multer from "multer";

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "Wetube";
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.loggedInUser = req.session.user;
  next();
};

export const multerMiddleware = multer({ dest: "uploads/" });

export const protectorMiddleware = (req, res, next) => {
  // 로그인 한 사람만 들어갈 수 있게 설정
  if (req.session.loggedIn) {
    return next();
  } else {
    return res.redirect("/");
  }
};

export const publicOnlyMiddleware = (req, res, next) => {
  // 로그인 하지 않은 사람만 들어갈 수 있게 설정
  if (!req.session.loggedIn) {
    return next();
  } else {
    return res.redirect("/");
  }
};
