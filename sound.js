class SoundManager {
    constructor() {
        this.ctx = null;
        this.musicUrl = './assets/nguoi-gieo-mam-xanh.mp3';
        this.bgMusic = document.getElementById('bgMusic') || new Audio(this.musicUrl);
        this.bgMusic.loop = true;
        this.bgMusic.volume = 0.7;
    }

    init() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) {
                this.ctx = new AudioContext();
            }
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    playBgMusic() {
        if (!this.bgMusic) return;
        if (this.bgMusic.paused) {
            this.bgMusic.play().catch((err) => {
                console.warn('Audio play error:', err);
            });
        }
    }

    playPaperRustle() {
        this.playBgMusic();

        try {
            this.init();
            if (!this.ctx) return;

            const now = this.ctx.currentTime;
            const bufferSize = this.ctx.sampleRate * 0.25;
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
            filter.frequency.exponentialRampToValueAtTime(400, now + 0.22);
            filter.Q.setValueAtTime(2, now);

            const gain = this.ctx.createGain();
            gain.gain.setValueAtTime(0.45, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);

            noise.connect(filter);
            filter.connect(gain);
            gain.connect(this.ctx.destination);

            noise.start(now);
        } catch (e) {
            console.warn(e);
        }
    }

    playTypeClick() {
        try {
            this.init();
            if (!this.ctx) return;

            const now = this.ctx.currentTime;
            const duration = 0.012;
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
            filter.frequency.setValueAtTime(2000 + Math.random() * 500, now);
            filter.Q.setValueAtTime(1.5, now);

            const gain = this.ctx.createGain();
            gain.gain.setValueAtTime(0.18, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

            noise.connect(filter);
            filter.connect(gain);
            gain.connect(this.ctx.destination);

            noise.start(now);
        } catch (e) {
            console.warn(e);
        }
    }
}

window.soundManager = new SoundManager();