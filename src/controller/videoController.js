import Video from "../models/video";

export const home = async (req, res) => {
    try {
        const videos = await Video.find({});
        return res.render("home", { pageTitle: "Home", videos });
    } catch {
        return res.render("server-error");
    }
};
export const getEdit = async (req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id);
    if (!video) {
        return res.render("404", { pageTitle: "Video not found." });
    }
    return res.render("edit", { pageTitle: `Edit: ${video.title}`, video });
};
export const postEdit = async (req, res) => {
    const { id } = req.params;
    const video = await Video.exists({ _id: id });
    const { title, description, hashtags } = req.body;
    if (!video) {
        return res.render("404", { pageTitle: "Video not found" })
    }
    await Video.findByIdAndUpdate(id, {
        title,
        description,
        hashtags
    })
    return res.redirect(`/videos/${id}`);
}
export const watch = async (req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id);
    if (!video) {
        return res.render("404", { pageTitle: "Video not found." });
    }
    return res.render("Watch", { pageTitle: `${video.title}`, video });
    
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
export const postUpload = async (req, res) => {
    const { title, description, hashtags } = req.body;
    try {
        await Video.create({
            title,
            description,
            createdAt: Date.now(),
            hashtags: hashtags.split(",").map(word => `#${word}`),
        });
    } catch(error) {
        console.log(error);
        return res.render("upload", {
            pageTitle: "Upload Video",
            errorMessage: error._message,
        });
    }
    return res.redirect("/");
};