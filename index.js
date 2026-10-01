function openImage() {
    const img = document.getElementById("profileImage");
    document.getElementById("largeImage").src = img.src;
    document.getElementById("imageModal").classList.add("show");
    document.body.style.overflow = "hidden";
}
function closeImage() {
    document.getElementById("imageModal").classList.remove("show");
    document.body.style.overflow = "";
}
function closeBackground(event) {
    if (event.target.id === "imageModal") closeImage();
}
document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") closeImage();
});


const audio = document.getElementById("audioPlayer");
const playButton = document.getElementById("playButton");
const progressBar = document.getElementById("progressBar");
const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");

function toggleMusic() {
    if (audio.paused) {
        audio.play();
        playButton.textContent = "⏸";
    } else {
        audio.pause();
        playButton.textContent = "▶";
    }
}

function skipMusic(seconds) {
    audio.currentTime = Math.max(0, Math.min(audio.duration || 0, audio.currentTime + seconds));
}

function formatTime(seconds) {
    if (!Number.isFinite(seconds)) return "0:00";
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60).toString().padStart(2, "0");
    return `${min}:${sec}`;
}

audio.addEventListener("loadedmetadata", () => {
    duration.textContent = formatTime(audio.duration);
});

audio.addEventListener("timeupdate", () => {
    currentTime.textContent = formatTime(audio.currentTime);
    progressBar.value = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
});

progressBar.addEventListener("input", () => {
    if (audio.duration) audio.currentTime = (progressBar.value / 100) * audio.duration;
});

audio.addEventListener("ended", () => {
    playButton.textContent = "▶";
});