/* sound.js - Tiếng lật giấy + tiếng gõ chữ máy đánh chữ + Nhạc nền */

class SoundManager {
    constructor() {
        this.ctx = null;
        this.bgMusic = null;
        // Sửa lại đường dẫn này trỏ tới file nhạc của bạn
        this.defaultMusicUrl = 'D:\New folder (4)\assets\nguoi-gieo-mam-xanh.mp3';
    }

    init() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioContext();
        }
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    // Tự động phát nhạc nền (lặp vô hạn, không bị phát lại từ đầu nếu đã chạy)
    playBgMusic(url = this.defaultMusicUrl, volume = 0.45) {
        if (!this.bgMusic) {
            this.bgMusic = new Audio(url);
            this.bgMusic.loop = true;
            this.bgMusic.volume = volume;
        }

        if (this.bgMusic.paused) {
            const playPromise = this.bgMusic.play();
            if (playPromise !== undefined) {
                playPromise.catch((error) => {
                    console.warn('Không thể tự động phát nhạc:', error);
                });
            }
        }
    }

    // Bật/tắt nhạc (dùng nếu bạn muốn gắn thêm nút loa trên giao diện)
    toggleBgMusic() {
        if (!this.bgMusic) {
            this.playBgMusic();
            return true;
        }
        if (this.bgMusic.paused) {
            this.bgMusic.play();
            return true;
        } else {
            this.bgMusic.pause();
            return false;
        }
    }

    // Tiếng lật giấy nhẹ khi mở phong bì + kích hoạt nhạc nền
    playPaperRustle() {
        this.init();
        this.playBgMusic(); // Chạy nhạc ngay khi mở thư

        const now = this.ctx.currentTime;
        const bufferSize = this.ctx.sampleRate * 0.2;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }

        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(1000, now);
        filter.frequency.exponentialRampToValueAtTime(400, now + 0.18);
        filter.Q.setValueAtTime(2, now);

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        noise.start(now);
    }

    // Tiếng gõ chữ nhẹ nhàng kiểu máy đánh chữ cũ - rất ngắn, không gây khó chịu
    playTypeClick() {
        this.init();
        const now = this.ctx.currentTime;

        const duration = 0.008;
        const bufferSize = Math.floor(this.ctx.sampleRate * duration);
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
        }

        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(2200 + Math.random() * 600, now);
        filter.Q.setValueAtTime(1.5, now);

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        noise.start(now);
    }
}

window.soundManager = new SoundManager();