// 로그인 된 경우만 호출

const videoContainer = document.querySelector("#videoContainer");
const form = document.querySelector("#commentForm");
const textarea = form.querySelector("textarea");
const btn = form.querySelector("button");

const handleSubmit = (event) => {
  event.preventDefault();
  const text = textarea.value;
  console.log(videoContainer.dataset);
  const videoId = videoContainer.dataset.id;
  if (text === "") {
    return;
  }
  fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // 해당 post는 json이라고 미들웨어에게 알려주는 역할
    },
    body: JSON.stringify({
      text,
      rating: "5",
    }),
  });
  textarea.value = "";
};

form.addEventListener("submit", handleSubmit);
