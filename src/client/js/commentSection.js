// 로그인 된 경우만 호출

const videoContainer = document.querySelector("#videoContainer");
const form = document.querySelector("#commentForm");
const textarea = form.querySelector("textarea");
const btn = form.querySelector("button");

const addComment = (text) => {
  const videoComments = document.querySelector(".video__comments ul");
  console.log(videoComments);
  const newComment = document.createElement("li");
  newComment.className = "video__comment";
  const icon = document.createElement("i");
  const span = document.createElement("span");
  span.innerText = text;
  icon.className = "fas fa-comment";
  newComment.appendChild(icon);
  newComment.appendChild(span);
  videoComments.prepend(newComment); // prepend = 가장 위에 추가
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const text = textarea.value;
  console.log(videoContainer.dataset);
  const videoId = videoContainer.dataset.id;
  if (text === "") {
    return;
  }
  const { status } = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // 해당 post는 json이라고 미들웨어에게 알려주는 역할
    },
    body: JSON.stringify({
      text,
    }),
  });
  console.log(status);
  if (status === 201) {
    addComment(text);
  }
  textarea.value = "";
};

form.addEventListener("submit", handleSubmit);
