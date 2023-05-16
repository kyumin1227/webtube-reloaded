import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    title: {type: String, required: true, trim: true},
    description: {type: String, required: true, trim: true},
    createdAt: Date,
    hashtags: [{ type: String, default: Date.now, trim: true }],
    meta: {
        views: { type: Number, default: 0, required: true },
        rating: { type: Number, default: 0, required: true },
    },
});

videoSchema.pre("save", async function () {
    console.log("We are about to save: ", this);
    this.hashtags = this.hashtags[0]
        .split(",")
        .map((word) => word.startsWith("#") ? word : `#${word}`);
});

const movieModel = mongoose.model("Video", videoSchema);
export default movieModel;