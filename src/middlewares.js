// 각종 middleware을 작성한다.

import multer from "multer";

// res.locals에 값을 넣어주는 라우터이다. (res.locals는 controller에서 res로 보내주지 않아도 pug에서 접근 가능)
export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "Wetube"; // res.locals.siteName에 사이트 이름을 저장한다.
  res.locals.loggedIn = Boolean(req.session.loggedIn); // res.locals.loggedIn 유저의 로그인 여부를 저장한다.
  res.locals.loggedInUser = req.session.user; // res.locals.loggedInUser 유저 이름을 저장한다.
  next();
};

// export const multerMiddleware = multer({ dest: "uploads/" }); // 유저가 업로드한 파일을 저장할 폴더 지정
export const avatarUpload = multer({
  // avatar 업로드를 위한 미들웨어 (용량 제한 3Mb)
  dest: "uploads/avatars/",
  limits: { fileSize: 3000000 },
});
export const videoUpload = multer({
  // video 업로드을 위한 미들웨어 (용량 제한 10Mb)
  dest: "uploads/videos/",
  limits: { fileSize: 10000000 },
});

export const protectorMiddleware = (req, res, next) => {
  // 로그인 한 사람만 들어갈 수 있게 설정
  if (req.session.loggedIn) {
    return next();
  } else {
    req.flash("error", "Not authorized");
    return res.redirect("/");
  }
};

export const publicOnlyMiddleware = (req, res, next) => {
  // 로그인 하지 않은 사람만 들어갈 수 있게 설정
  if (!req.session.loggedIn) {
    return next();
  } else {
    req.flash("error", "Not authorized");
    return res.redirect("/");
  }
};
