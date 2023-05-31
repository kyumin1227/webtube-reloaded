const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const volume = document.getElementById("volume");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const timeline = document.getElementById("timeline");
const fullScreenBtn = document.getElementById("fullScreen");
const videoContainer = document.getElementById("videoContainer");
const videoControls = document.getElementById("videoControls");

video.volume = 0.5;

let controlsTimeout = null;
let controlsMovementTimeout = null;
let volumeValue = volume;

const handlePlayClick = (e) => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  playBtn.innerText = video.paused ? "Play" : "Pause";
};

const handleMute = (e) => {
  if (video.muted) {
    video.muted = false;
  } else {
    video.muted = true;
  }
  muteBtn.innerText = video.muted ? "Unmute" : "Mute";
  volume.value = video.muted ? 0 : volumeValue;
};

const handleVolumeChange = (event) => {
  const {
    target: { value },
  } = event;
  if (video.muted) {
    video.muted = false;
    muteBtn.innerText = "Mute";
  }
  volumeValue = value;
  video.volume = value;
};

const formatTime = (second) =>
  new Date(second * 1000).toISOString().substring(11, 19);

const handleLoadedMetadata = () => {
  // 해당 video의 metadata들을 가져옵니다.
  // video.duration = 해당 video의 길이
  totalTime.innerText = formatTime(Math.floor(video.duration));
  timeline.max = Math.floor(video.duration);
};

const handleTimeUpdate = () => {
  // video의 시간이 변경될 때 마다 호출됩니다.
  currentTime.innerText = formatTime(Math.floor(video.currentTime));
  timeline.value = video.currentTime;
};

const handleVideoTime = (event) => {
  const {
    target: { value },
  } = event;
  video.currentTime = value;
  // video.currentTime = timeline.value;
};

const handleFullScreen = () => {
  const fullScreen = document.fullscreenElement; // Full Screen이면 해당 엘리먼트를 반환하고 Full Screen이 아니면 null을 반환 함
  if (fullScreen) {
    document.exitFullscreen(); // Full Screen을 나갈려면 document에서 불러야 함
    fullScreenBtn.innerText = "Enter Full Screen";
  } else {
    videoContainer.requestFullscreen();
    fullScreenBtn.innerText = "Exit Full Screen";
  }
};

const hideControls = () => {
  videoControls.classList.remove("showing");
};

const handleMouseMove = () => {
  if (controlsTimeout) {
    // video 밖으로 나갔다가 돌아왔을 때 class가 삭제되는걸 취소
    clearTimeout(controlsTimeout);
    controlsTimeout = null;
  }
  if (controlsMovementTimeout) {
    clearTimeout(controlsMovementTimeout);
    controlsMovementTimeout = null;
  }
  videoControls.classList.add("showing");
  controlsMovementTimeout = setTimeout(hideControls, 3000);
};

const handleMouseLeave = () => {
  controlsTimeout = setTimeout(
    // timeout은 실행할 때 마다 달라지는 고유의 id를 반환
    hideControls,
    3000
  );
};

playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMute);
volume.addEventListener("input", handleVolumeChange); // volume range를 움직이면 실행
timeline.addEventListener("input", handleVideoTime); // timeline range를 움직이면 실행
video.addEventListener("loadedmetadata", handleLoadedMetadata); //  브라우저가 video의 메타데이터를 불러왔을 때 실행
video.addEventListener("timeupdate", handleTimeUpdate); // video의 시간 변화를 감지
fullScreenBtn.addEventListener("click", handleFullScreen);
video.addEventListener("mousemove", handleMouseMove); // 마우스가 video 안으로 들어왔을 때 실행
video.addEventListener("mouseleave", handleMouseLeave); // 마우스가 video 밖으로 떠났을 때 실행
video.addEventListener("mouse");
