const fakeUser = {
    username: "Kyumin",
    loggedIn: false,
}

export const trending = (req, res) => {
    return res.render("home", { pageTitle: "Home", videos})};
export const getEdit = (req, res) => {
    const id = req.params.id;
    const video = videos[id - 1];
    return res.render("edit", {pageTitle: `Editing: ${video.title}`, video});
};
export const postEdit = (req, res) => {
    const id = req.params.id;
    const title = req.body.title;
    videos[id - 1].title = title;
    return res.redirect(`/videos/${id}`);
}
export const watch = (req, res) => {
    const id = req.params.id;
    const video = videos[id - 1];
    return res.render("Watch", { pageTitle: `Watching ${video.title}`, video });
};  
export const search = (req, res) => res.send("Search");
export const upload = (req, res) => res.send("Upload");
export const deleteVideo = (req, res) => {
    console.log(req.params);
    return res.send("Delete Video");
};
export const getUpload = (req, res) => {
    return res.render("upload", {pageTitle: "Upload Video"});
};
export const postUpload = (req, res) => {
    console.log(req.body);
    const newVideo = {
        title: req.body.title,
        rating: 0,
        comments: 0,
        createdAt: "Just now",
        view: 0,
        id: videos.length+1,
    };
    videos.push(newVideo);
    return res.redirect("/");
};