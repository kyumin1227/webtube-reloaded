import User from "../models/User";

export const getJoin = (req, res) =>
  res.render("join", { pageTitle: "Create Account" });
export const postJoin = async (req, res) => {
  const { name, username, email, password, password2, location } = req.body;
  if (password !== password2) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: "비밀번호가 서로 일치하지 않습니다.",
    });
  }
  const pageTitle = "Join";
  const usernameExist = await User.exists({ username });
  if (usernameExist) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: "이미 등록된 유저이름 입니다.",
    });
  }
  const emailExist = await User.exists({ email });
  if (emailExist) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: "이미 등록된 이메일 입니다.",
    });
  }
  await User.create({ name, username, email, password, location });
  return res.redirect("/login");
};
export const edit = (req, res) => res.send("Edit");
export const remove = (req, res) => res.send("Remove User");
export const login = (req, res) => res.send("Login");
export const logout = (req, res) => res.send("Logout");
export const see = (req, res) => res.send("See User");
