const fakeUser = {
    username: "Kyumin",
    loggedIn: false,
}

const videos = [
        {
            title: "First Video",
            rating: 5,
            comments: 2,
            createdAt: "2 minutes ago",
            view: 1,
            id: 1
        },
        {
            title: "Second Video",
            rating: 5,
            comments: 2,
            createdAt: "2 minutes ago",
            view: 59,
            id: 2
        },
        {
            title: "Third Video",
            rating: 5,
            comments: 2,
            createdAt: "2 minutes ago",
            view: 59,
            id: 3
        },
    ]

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