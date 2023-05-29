const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const volume = document.getElementById("volume");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const timeline = document.getElementById("timeline");

video.volume = 0.5;

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

playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMute);
volume.addEventListener("input", handleVolumeChange); // volume range를 움직이면 실행
timeline.addEventListener("input", handleVideoTime); // timeline range를 움직이면 실행
video.addEventListener("loadedmetadata", handleLoadedMetadata); // video의 메타데이터를 불러옴
video.addEventListener("timeupdate", handleTimeUpdate); // video의 시간 변화를 감지
