const startBtn = document.querySelector("#startBtn");
const video = document.querySelector("#preview");

let stream;

const handleStop = () => {
  startBtn.innerText = "Start Recording";
  startBtn.removeEventListener("click", handleStop);
  startBtn.addEventListener("click", handleStart);
};

const handleStart = () => {
  startBtn.innerText = "Stop Recording";
  startBtn.removeEventListener("click", handleStart);
  startBtn.addEventListener("click", handleStop);

  const recorder = new MediaRecorder(stream); // 녹화를 하기 위해 stream을 받아옴
  recorder.ondataavailable = (event) => {
    // 녹화가 끝나면 자동으로 event를 반환 event에는 상태, 녹화한 파일 등 다양하게 담겨있음
    console.log("recording done");
    console.log(event);
    console.log(event.data); // 녹화한 동영상 다운로드 파일
  };
  recorder.start(); // 실제 녹화 시작
  setTimeout(() => {
    recorder.stop();
  }, 10000);
};

const init = async () => {
  // 카메라와 오디오 권한 받아옴
  stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true,
  });
  video.srcObject = stream; // video 태그에 위에서 만든 stream 소스 추가
  video.play(); // video 태그 재생 (현재 카메라로 촬영중인 영상 재생 가능)
};

init();

startBtn.addEventListener("click", handleStart);
