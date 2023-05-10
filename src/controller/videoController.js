const fakeUser = {
    username: "Kyumin",
    loggedIn: false,
}

export const trending = (req, res) => {
    const videos = [
        {
            title: "First Video",
            rating: 5,
            comments: 2,
            createdAt: "2 minutes ago",
            view: 59,
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
    return res.render("home", { pageTitle: "Home", videos})};
export const edit = (req, res) => {
    console.log(req.params);
    return res.send(`Edit Video #${req.params.id}`);
};
export const see = (req, res) => { res.render("watch"); };  
export const search = (req, res) => res.send("Search");
export const upload = (req, res) => res.send("Upload");
export const deleteVideo = (req, res) => {
    console.log(req.params);
    return res.send("Delete Video");
};