import Video from "../models/video";
import User from "../models/User";

export const home = async (req, res) => {
  try {
    const videos = await Video.find({}).sort({ createdAt: "desc" });
    return res.render("video/home", { pageTitle: "Home", videos });
  } catch {
    return res.status(400).render("server-error");
  }
};
export const getEdit = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found." });
  }
  return res.render("video/edit", { pageTitle: `Edit: ${video.title}`, video });
};
export const postEdit = async (req, res) => {
  const { id } = req.params;
  const video = await Video.exists({ _id: id });
  const { title, description, hashtags } = req.body;
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found" });
  }
  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Video.formatHashtags(hashtags),
  });
  return res.redirect(`/videos/${id}`);
};
export const watch = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id).populate("owner"); // populate를 이용하면 video의 owner 칸에 찾은 유저의 정보가 들어감
  // const owner = await User.findById(video.owner); // video가 가지고 있는 owner로 유저 찾기
  if (!video) {
    return res.render("404", { pageTitle: "Video not found." });
  }
  return res.render("video/watch", {
    pageTitle: `${video.title}`,
    video,
  });
};
export const search = async (req, res) => {
  const { keyword } = req.query;
  let videos = [];
  if (keyword) {
    videos = await Video.find({
      title: {
        $regex: new RegExp(keyword, "i"), // 정규표현식 (i의 위치는 플래그이며 옵션이다. i는 대소문자 구분하지 않고 검색, 플래그가 없으면 1개 이상이여도 하나만 검색 후 종료)
      },
    });
  }
  res.render("video/search", { pageTitle: "Search", videos });
};
export const upload = (req, res) => res.send("Upload");
export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  await Video.findByIdAndDelete(id);
  return res.redirect("/");
};
export const getUpload = (req, res) => {
  return res.render("video/upload", { pageTitle: "Upload Video" });
};
export const postUpload = async (req, res) => {
  const { _id } = req.session.user;
  const { file } = req;
  const { title, description, hashtags } = req.body;
  try {
    const newVideo = await Video.create({
      fileUrl: file.path,
      title,
      description,
      createdAt: Date.now(),
      hashtags: Video.formatHashtags(hashtags),
      owner: _id,
    });
    const user = await User.findById(_id); // 유저를 아이디로 찾습니다.
    user.videos.push(newVideo._id); // 유저의 videos에 새로 생성한 비디오의 아이디를 줍니다.
    user.save(); // 변경된 유저를 저장합니다.
  } catch (error) {
    console.log(error);
    return res.status(400).render("video/upload", {
      pageTitle: "Upload Video",
      errorMessage: error._message,
    });
  }
  return res.redirect("/");
};
