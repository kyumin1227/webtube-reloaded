const startBtn = document.querySelector("#startBtn");
const video = document.querySelector("#preview");

let stream;
let recorder;
let videoFile;

const handleDownload = () => {
  const a = document.createElement("a");
  a.href = videoFile;
  a.download = "MyRecording.webm"; // a태그에 download 속성을 추가하면 주소 이동이 아니라 다운로드를 해줌!!!!!! (제한되지만 확장자도 지정 가능)
  // mp4 파일로 저장하기 위해서는 mp4로 녹화해야 함으로 recorder를 생성할 때 recorder = new MediaRecorder(stream { mimeType: "video/mp4" }); 처럼 작성해주어야 함
  document.body.appendChild(a); // 형태가 없어서 화면에 나오지는 않지만 코드에는 추가
  a.click(); // 사용자가 누른것 처럼 동작 (body에 존재하지 않는 링크는 클릭 불가능)
};

const handleStop = () => {
  startBtn.innerText = "Download Recording";
  startBtn.removeEventListener("click", handleStop);
  startBtn.addEventListener("click", handleDownload);
  recorder.stop();
};

const handleStart = () => {
  startBtn.innerText = "Stop Recording";
  startBtn.removeEventListener("click", handleStart);
  startBtn.addEventListener("click", handleStop);

  recorder = new MediaRecorder(stream); // 녹화를 하기 위해 stream을 받아옴
  recorder.ondataavailable = (event) => {
    // 녹화가 끝나면 자동으로 event를 반환 event에는 상태, 녹화한 파일 등 다양하게 담겨있음
    console.log("recording done");
    console.log(event);
    // console.log(event.data); // 녹화한 동영상 다운로드 파일
    videoFile = URL.createObjectURL(event.data); // 메모리에 있는 파일에 접근할 수 있도록 브라우저가 생성하는 URL (blob:http://localhost:4000/facccd17-b035-4a5f-8f7c-51c8ee741ab6)
    video.srcObject = null;
    video.src = videoFile;
    video.loop = true;
    video.play();
  };
  recorder.start(); // 실제 녹화 시작
  // setTimeout(() => {  중지 버튼 생성해서 10초가 지나면 자동으로 멈추게 할 필요 없음
  //   recorder.stop();
  // }, 10000);
};

const init = async () => {
  // 카메라와 오디오 권한 받아옴
  stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true,
  });
  video.srcObject = stream; // video 태그에 위에서 만든 stream 소스 추가
  video.play(); // video 태그 재생 (현재 카메라로 촬영중인 영상 실시간 재생 가능)
};

init();

startBtn.addEventListener("click", handleStart);
