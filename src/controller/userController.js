import User from "../models/User";
import Video from "../models/video";
import bcrypt from "bcrypt";

export const getJoin = (req, res) =>
  res.render("user/join", { pageTitle: "Create Account" });
export const postJoin = async (req, res) => {
  const { name, username, email, password, password2, location } = req.body;
  const pageTitle = "Join";
  if (password !== password2) {
    return res.status(400).render("user/join", {
      pageTitle,
      errorMessage: "비밀번호가 서로 일치하지 않습니다.",
    });
  }
  const usernameExist = await User.exists({ username });
  if (usernameExist) {
    return res.status(400).render("user/join", {
      pageTitle,
      errorMessage: "이미 등록된 유저이름 입니다.",
    });
  }
  const emailExist = await User.exists({ email });
  if (emailExist) {
    return res.status(400).render("user/join", {
      pageTitle,
      errorMessage: "이미 등록된 이메일 입니다.",
    });
  }
  try {
    await User.create({ name, username, email, password, location });
    return res.redirect("/login");
  } catch (error) {
    return res.status(400).render("user/join", {
      pageTitle,
      errorMessage: error._message,
    });
  }
};
export const getLogin = (req, res) =>
  res.render("user/login", { pageTitle: "Login" });
export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  const pageTitle = "Login";
  const user = await User.findOne({ username, socialOnly: false });
  if (!user) {
    return res.status(400).render("user/login", {
      pageTitle,
      errorMessage: "존재하지 않는 유저 이름입니다.",
    });
  }
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.status(400).render("user/login", {
      pageTitle,
      errorMessage: "비밀번호가 일치하지 않습니다.",
    });
  }
  req.session.loggedIn = true;
  req.session.user = user;
  return res.redirect("/");
};
export const startGithubLogin = (req, res) => {
  // github 로그인 주소 분할해서 정리
  const baseUrl = "https://github.com/login/oauth/authorize";
  const config = {
    client_id: process.env.GH_CLIENT,
    allow_signup: false,
    scope: "read:user user:email",
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  return res.redirect(finalUrl);
};
export const finishGithubLogin = async (req, res) => {
  const baseUrl = "https://github.com/login/oauth/access_token";
  const config = {
    client_id: process.env.GH_CLIENT,
    client_secret: process.env.GH_SECRET,
    code: req.query.code,
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  const tokenRequest = await (
    await fetch(finalUrl, {
      // Access 토큰 받아오기
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    })
  ).json();
  if ("access_token" in tokenRequest) {
    // Access 토큰을 성공적으로 받아 왔을 경우 해당 토큰을 이용해 github api에 접근하여 정보를 받아옴
    const { access_token } = tokenRequest;
    const apiUrl = "https://api.github.com";
    // userData = 깃허브에서 받아오는 유저의 정보에 대한 오브젝트
    const userData = await (
      await fetch(`${apiUrl}/user`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();
    console.log(userData);
    // emailData = 깃허브에서 받아오는 유저의 이메일에 대한 오브젝트
    const emailData = await (
      await fetch(`${apiUrl}/user/emails`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();
    console.log(emailData);
    const emailObj = emailData.find(
      (email) => email.primary === true && email.verified === true
    );
    if (!emailObj) {
      return res.redirect("/login");
    }
    const userEmailObj = await User.findOne({ email: emailObj.email });
    // userEmailObj = 깃허브에서 받아온 이메일과 같은 이메일이 데이터베이스에 있는지 확인 하고 만약 있다면 해당 오브젝트를 가져온다.
    const usernameObj = await User.findOne({
      username: userData.login,
    });
    // usernameObj = 깃허브에서 받아온 유저명과 같은 유저명이 데이터베이스에 있는지 확인 하고 만약 있다면 해당 오브젝트를 가져온다.
    if (userEmailObj) {
      // 데이터베이스에 이메일이 있다면 로그인 시키고 해당 유저의 이름을 userEmailObj에서 받아온다.
      req.session.loggedIn = true;
      req.session.user = userEmailObj;
      return res.redirect("/");
    } else if (usernameObj) {
      // 데이터베이스에 같은 유저명이 있다면 /login 주소로 돌려보낸다.
      return res.redirect("/login");
    } else {
      // create an account
      let user = null;
      if (userData.name === null) {
        // 깃허브에서 받아온 이름이 null일 경우 이름을 login 아이디로 지정하여 가입시킨 후 로그인 시킨다.
        console.log("username is null");
        user = await User.create({
          name: userData.login,
          avatarUrl: userData.avatar_url,
          socialOnly: true,
          username: userData.login,
          email: emailObj.email,
          password: "",
          location: userData.location,
        });
        req.session.loggedIn = true;
        req.session.user = user;
        return res.redirect("/");
      } else {
        // 깃허브에서 받아온 이름이 null이 아닌 경우 정상적으로 가입 시킨 후 로그인 시킨다.
        console.log("user name is not null");
        user = await User.create({
          name: userData.name,
          avatarUrl: userData.avatar_url,
          socialOnly: true,
          username: userData.login,
          email: emailObj.email,
          password: "",
          location: userData.location,
        });
        req.session.loggedIn = true;
        req.session.user = user;
        return res.redirect("/");
      }
    }
  } else {
    // Access 토큰을 받아오지 못하였을 경우
    console.log("fail");
    return res.redirect("/login");
  }
};
export const getEdit = async (req, res) => {
  return res.render("user/edit-profile", { pageTitle: "Edit Profile" });
};
export const postEdit = async (req, res) => {
  const {
    session: {
      user: { _id, avatarUrl },
    },
    body: { name, email, username, location },
    file,
  } = req; // ES6 문법 (아래 두 줄과 동일)
  // const _id = req.session.user._id;
  // const {name, email. username, location} = req.body;

  console.log(file);

  const sessionUsername = req.session.user.username;
  if (sessionUsername !== username) {
    const exists = await User.findOne({ username });
    if (exists) {
      return res.status(400).render("user/edit-profile", {
        errorMessage: "이미 존재하는 유저이름 입니다.",
      });
    }
  }
  const sessionEmail = req.session.user.email;
  if (sessionEmail !== email) {
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).render("user/edit-profile", {
        errorMessage: "이미 존재하는 이메일 입니다.",
      });
    }
  }

  const updatedUser = await User.findByIdAndUpdate(
    _id,
    {
      name,
      email,
      username,
      location,
      avatarUrl: file ? file.path : avatarUrl, // 아바타를 바꾸지 않을때를 대비해서 file이 있으면 바꾼 file로 없으면 기존 avatarUrl 사용
    },
    { new: true } // 아래의 req.session.user에 값을 넘길 때 최신 값을 가져오도록 설정
  );
  req.session.user = updatedUser; // session의 값을 최신화
  // req.session.user = {
  //   ...req.session.user, // 기존의 값을 불러옴
  //   name,
  //   email,
  //   username,
  //   location,
  // };
  return res.redirect("/users/edit");
};
export const logout = (req, res) => {
  req.session.destroy();
  return res.redirect("/");
};

export const getChangePassword = (req, res) => {
  if (req.session.user.socialOnly === true) {
    // 소셜 로그인 유저일 경우
    return res.redirect("/");
  }
  return res.render("user/change-password", { pageTitle: "Change Password" });
};

export const postChangePassword = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
    body: { oldPassword, newPassword, newPasswordConfirm },
  } = req;
  const user = await User.findById(_id);
  const ok = await bcrypt.compare(oldPassword, user.password);
  if (!ok) {
    return res.status(400).render("user/change-password", {
      pageTitle: "Change Password",
      errorMessage: "이전 비밀번호가 틀립니다.",
    });
  }
  if (newPassword !== newPasswordConfirm) {
    return res.status(400).render("user/change-password", {
      pageTitle: "Change Password",
      errorMessage: "새로 입력한 비밀번호가 다릅니다.",
    });
  }
  user.password = newPassword;
  await user.save(); // 비밀번호를 해싱
  // send notification
  return res.redirect("/users/logout"); // 비밀번호를 바꾸면 로그아웃 시키기
};

export const see = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).render("404", { pageTitle: "NOT FOUND USER" });
  }
  const videos = await Video.find({ owner: user._id });
  console.log(videos);
  return res.render("user/profile", {
    pageTitle: user.name,
    user,
    videos,
  });
};
