new Vue({
  el: "#app",
  data() {
    return {
      audio: null,
      circleLeft: null,
      barWidth: null,
      duration: null,
      currentTime: null,
      isTimerPlaying: false,
      tracks: [
        {
          name: "40 km/hr - Terracotta",
          cover: "./img1/14.jpg",
          source: "./mp3/1.mp4",
          favorited: false
        },
        {
          name: "น้ำหอม - COCKTAIL",
          cover: "./img1/15.jpg",
          source: "./mp3/2.mp4",
          favorited: false
        },
        {
          name: "เพลงประจำวัน (PiXXeL)",
          cover: "./img1/16.png",
          source: "./mp3/3.mp4",
          favorited: false
        }
      ],
      currentTrack: null,
      currentTrackIndex: 0,
      transitionName: null
    };
  },
  methods: {
    play() {
      if (this.audio.paused) {
        this.audio.play();
        this.isTimerPlaying = true;
      } else {
        this.audio.pause();
        this.isTimerPlaying = false;
      }
    },
    generateTime() {
      let width = (100 / this.audio.duration) * this.audio.currentTime;
      this.barWidth = width + "%";
      this.circleLeft = width + "%";
      let durmin = Math.floor(this.audio.duration / 60);
      let dursec = Math.floor(this.audio.duration - durmin * 60);
      let curmin = Math.floor(this.audio.currentTime / 60);
      let cursec = Math.floor(this.audio.currentTime - curmin * 60);
      durmin = durmin < 10 ? "0" + durmin : durmin;
      dursec = dursec < 10 ? "0" + dursec : dursec;
      curmin = curmin < 10 ? "0" + curmin : curmin;
      cursec = cursec < 10 ? "0" + cursec : cursec;
      this.duration = durmin + ":" + dursec;
      this.currentTime = curmin + ":" + cursec;
    },
    updateBar(x) {
      let progress = this.$refs.progress;
      let maxduration = this.audio.duration;
      let position = x - progress.offsetLeft;
      let percentage = (100 * position) / progress.offsetWidth;
      percentage = Math.max(0, Math.min(percentage, 100));
      this.barWidth = percentage + "%";
      this.circleLeft = percentage + "%";
      this.audio.currentTime = (maxduration * percentage) / 100;
      this.audio.play();
    },
    clickProgress(e) {
      this.isTimerPlaying = true;
      this.audio.pause();
      this.updateBar(e.pageX);
    },
    prevTrack() {
      this.transitionName = "scale-in";
      this.isShowCover = false;
      this.currentTrackIndex = 
        this.currentTrackIndex > 0 
        ? this.currentTrackIndex - 1 
        : this.tracks.length - 1;
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    nextTrack() {
      this.transitionName = "scale-out";
      this.isShowCover = false;
      this.currentTrackIndex = 
        this.currentTrackIndex < this.tracks.length - 1 
        ? this.currentTrackIndex + 1 
        : 0;
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    resetPlayer() {
      this.barWidth = 0;
      this.circleLeft = 0;
      this.audio.currentTime = 0;
      this.audio.src = this.currentTrack.source;
      this.audio.load();
      setTimeout(() => {
        if (this.isTimerPlaying) {
          this.audio.play();
        }
      }, 300);
    },
    favorite() {
      this.tracks[this.currentTrackIndex].favorited = 
        !this.tracks[this.currentTrackIndex].favorited;
    }
  },
  created() {
    let vm = this;
    this.currentTrack = this.tracks[0];
    this.audio = new Audio();
    this.audio.src = this.currentTrack.source;

    this.audio.ontimeupdate = function () {
      vm.generateTime();
    };
    this.audio.onloadedmetadata = function () {
      vm.generateTime();
    };
    this.audio.onended = function () {
      vm.nextTrack();
      vm.isTimerPlaying = true;
    };

    this.audio.onerror = function () {
      console.error("Failed to load audio source:", vm.audio.src);
    };

    // Prefetch cover images
    for (let track of this.tracks) {
      let link = document.createElement('link');
      link.rel = "prefetch";
      link.href = track.cover;
      link.as = "image";
      document.head.appendChild(link);
    }
  },
  mounted() {
    // เริ่มเล่นเพลงเมื่อเปิดหน้า (หากเบราว์เซอร์อนุญาต)
    this.audio.play().then(() => {
      console.log("Audio started successfully");
      this.isTimerPlaying = true;
    }).catch((error) => {
      console.warn("Autoplay was prevented:", error);
    });
  }
});