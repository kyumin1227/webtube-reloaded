import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" }, // 해당 오브젝트의 타입은 ObjectId 이며 해당 값은 User로 부터 옵니다.
  video: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Video" },
  createdAt: { type: Date, required: true, default: Date.now },
});

const Comment = mongoose.model("Comment", commentSchema); // Comment 모델은 Comment라는 이름으로 만들며 스케마는 commentSchema 사용
export default Comment; // Comment 모델을 default로 내보내기
