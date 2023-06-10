// 로그인 된 경우만 호출

const videoContainer = document.querySelector("#videoContainer");
const form = document.querySelector("#commentForm");
const textarea = form.querySelector("textarea");
const btn = form.querySelector("button");
const videoComments = document.querySelector(".video__comments ul");

// 더미 댓글 생성
const addComment = (text, id) => {
  const videoComments = document.querySelector(".video__comments ul");
  console.log(videoComments);
  const newComment = document.createElement("li");
  newComment.className = "video__comment";
  newComment.dataset.id = id;
  const icon = document.createElement("i");
  const span = document.createElement("span");
  span.innerText = text;
  const span2 = document.createElement("span");
  span2.innerText = "❌";
  span2.className = "deleteBtn";
  icon.className = "fas fa-comment";
  newComment.appendChild(icon);
  newComment.appendChild(span);
  newComment.appendChild(span2);
  videoComments.prepend(newComment); // prepend = 가장 위에 추가
};

// 댓글 작성 시 실행
const handleSubmit = async (event) => {
  event.preventDefault();
  const text = textarea.value;
  console.log(videoContainer.dataset);
  const videoId = videoContainer.dataset.id;
  if (text === "") {
    return;
  }
  const response = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // 해당 post는 json이라고 미들웨어에게 알려주는 역할
    },
    body: JSON.stringify({
      text,
    }),
  });
  if (response.status === 201) {
    const { newCommentId } = await response.json(); // 서버에서 준 json의 값을 저장
    addComment(text, newCommentId);
  }
  textarea.value = "";
};

const handelCommentClick = async (event) => {
  const className = event.target.className;

  // 클릭한 버튼이 삭제 버튼인지 확인
  if (className == "deleteBtn") {
    const commentId = event.target.parentNode.dataset.id;
    const { status } = await fetch(`/api/comment/${commentId}`, {
      method: "DELETE",
    });

    // status 코드로 삭제 여부 확인
    if (status === 200) {
      console.log("삭제완료");
      const deleteComment = event.target.parentElement;
      deleteComment.parentNode.removeChild(deleteComment);
    }
  }
};

form.addEventListener("submit", handleSubmit);
videoComments.addEventListener("click", handelCommentClick);
