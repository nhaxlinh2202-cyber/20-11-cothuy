/* app.js - Mở Thư, Phát Nhạc, Hiệu Ứng Typewriter, Lưu Ảnh & Gửi Email */

let ytPlayer = null;
let isYtReady = false;

// Khởi tạo YouTube IFrame Player (phát ngầm bài hát Người Gieo Mầm Xanh)
window.onYouTubeIframeAPIReady = function() {
    try {
        ytPlayer = new YT.Player('youtubePlayer', {
            height: '200',
            width: '200',
            videoId: 'sj_UDyfoo-A', // "Người Gieo Mầm Xanh" - Hứa Kim Tuyền x Hoàng Dũng
            playerVars: {
                'playsinline': 1,
                'autoplay': 0,
                'controls': 0,
                'rel': 0,
                'loop': 1,
                'playlist': 'sj_UDyfoo-A'
            },
            events: {
                'onReady': () => { isYtReady = true; }
            }
        });
    } catch (e) {
        console.warn('YouTube API init fallback:', e);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    initEnvelopeExperience();
    initReadFinishedSection();
    initEmailSubmission();
    initSaveImage();
});

/* ==========================================================================
   1. MỞ PHONG BÌ THƯ & TỰ ĐỘNG PHÁT BÀI HÁT "NGƯỜI GIEO MẦM XANH"
   ========================================================================== */
function initEnvelopeExperience() {
    const envelope = document.getElementById('mainInteractiveEnvelope');
    const tapGuideBtn = document.getElementById('tapGuideBtn');
    const envelopeScreen = document.getElementById('envelopeScreen');
    const letterScreen = document.getElementById('letterScreen');

    function openEnvelope() {
        if (!envelope || envelope.classList.contains('open')) return;

        // Âm thanh lật giấy nhẹ
        if (window.soundManager && typeof window.soundManager.playPaperRustle === 'function') {
            window.soundManager.playPaperRustle();
        }

        // Tự động phát bài hát Người Gieo Mầm Xanh
        try {
            if (ytPlayer && isYtReady && typeof ytPlayer.playVideo === 'function') {
                ytPlayer.playVideo();
            }
        } catch (err) {
            console.warn(err);
        }

        envelope.classList.add('open');

        // Chuyển mượt sang toàn bộ bức thư
        setTimeout(() => {
            envelopeScreen.classList.add('opacity-0');
            setTimeout(() => {
                envelopeScreen.classList.add('hidden');
                envelopeScreen.classList.remove('flex', 'opacity-0');

                letterScreen.classList.remove('hidden');
                letterScreen.classList.add('flex');
                window.scrollTo({ top: 0, behavior: 'smooth' });

                // Bắt đầu hiệu ứng typewriter sau khi thư hiện ra
                startTypewriterEffect();
            }, 400);
        }, 750);
    }

    if (envelope) envelope.addEventListener('click', openEnvelope);
    if (tapGuideBtn) tapGuideBtn.addEventListener('click', openEnvelope);
}

/* ==========================================================================
   2. HIỆU ỨNG CHỮ CHẠY DẦN DẦN (TYPEWRITER)
   ========================================================================== */
function startTypewriterEffect() {
    const letterBody = document.querySelector('#printableLetterCard .space-y-4');
    if (!letterBody) return;

    const paragraphs = letterBody.querySelectorAll('p');
    const footer = document.querySelector('#printableLetterCard footer');
    const readFinishSection = document.getElementById('readFinishSection');
    const saveSection = document.getElementById('saveImageSection');

    // Ẩn nút đọc xong và lưu ảnh cho đến khi gõ hết
    if (readFinishSection) readFinishSection.style.opacity = '0';
    if (saveSection) saveSection.style.opacity = '0';
    if (footer) footer.style.opacity = '0';

    // Lưu nội dung gốc của từng đoạn văn
    const originalContents = [];
    paragraphs.forEach((p) => {
        originalContents.push(p.textContent);
        p.textContent = '';
        p.style.minHeight = '1.85em'; // giữ chỗ cho dòng đầu tiên
    });

    let currentParagraph = 0;
    let currentChar = 0;
    const charDelay = 28; // ms giữa mỗi ký tự
    const paragraphPause = 300; // ms nghỉ giữa các đoạn

    // Đếm ký tự để không gõ tiếng click liên tục mà chỉ gõ 1 trong vài ký tự
    let clickCounter = 0;

    function typeNextChar() {
        if (currentParagraph >= originalContents.length) {
            // Đã gõ hết, hiện footer và các nút
            if (footer) {
                footer.style.transition = 'opacity 0.5s ease';
                footer.style.opacity = '1';
            }
            if (readFinishSection) {
                readFinishSection.style.transition = 'opacity 0.5s ease';
                readFinishSection.style.opacity = '1';
            }
            if (saveSection) {
                saveSection.style.transition = 'opacity 0.5s ease';
                saveSection.style.opacity = '1';
            }
            return;
        }

        const text = originalContents[currentParagraph];
        const p = paragraphs[currentParagraph];

        if (currentChar < text.length) {
            p.textContent += text[currentChar];
            currentChar++;

            // Phát tiếng click mỗi 3 ký tự (không quá nhiều)
            clickCounter++;
            if (clickCounter % 3 === 0) {
                if (window.soundManager && typeof window.soundManager.playTypeClick === 'function') {
                    window.soundManager.playTypeClick();
                }
            }

            // Auto-scroll theo chữ đang gõ
            const pRect = p.getBoundingClientRect();
            if (pRect.bottom > window.innerHeight - 60) {
                window.scrollBy({ top: 30, behavior: 'smooth' });
            }

            setTimeout(typeNextChar, charDelay);
        } else {
            // Hết đoạn, chuyển sang đoạn tiếp theo
            currentParagraph++;
            currentChar = 0;
            setTimeout(typeNextChar, paragraphPause);
        }
    }

    // Bắt đầu gõ sau 400ms để trang render xong
    setTimeout(typeNextChar, 400);
}

/* ==========================================================================
   3. NÚT "CÔ ĐÃ ĐỌC XONG THÌ BẤM VÀO ĐÂY"
   ========================================================================== */
function initReadFinishedSection() {
    const finishBtn = document.getElementById('finishReadingBtn');
    const replySection = document.getElementById('teacherReplySection');

    if (finishBtn && replySection) {
        finishBtn.addEventListener('click', () => {
            // Ẩn nút đọc xong
            document.getElementById('readFinishSection')?.classList.add('hidden');

            // Hiện khung bông hoa và lời nhắn nhủ
            replySection.classList.remove('hidden');
            replySection.classList.add('flex');

            // Cuộn mượt xuống khu vực nhắn nhủ
            replySection.scrollIntoView({ behavior: 'smooth' });

            const textarea = document.getElementById('teacherMessageInput');
            if (textarea) textarea.focus();
        });
    }
}

/* ==========================================================================
   4. GỬI LỜI NHẮN VÀO EMAIL nhaxlinh2202@gmail.com
   ========================================================================== */
function initEmailSubmission() {
    const form = document.getElementById('teacherReplyForm');
    const textarea = document.getElementById('teacherMessageInput');
    const submitBtn = document.getElementById('submitReplyBtn');
    const successNotice = document.getElementById('replySuccessNotice');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); // Chặn form gửi mặc định

            const message = textarea?.value.trim();
            if (!message) {
                alert('Cô viết vài lời nhắn nhủ gửi cho con nhé!');
                textarea?.focus();
                return;
            }

            // Đổi trạng thái nút
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Đang gửi...';
            }

            // Gửi bằng fetch API, chờ phản hồi xong mới hiện thông báo
            fetch('https://formsubmit.co/ajax/nhaxlinh2202@gmail.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    _subject: 'Lời nhắn 20/11 từ Cô giáo dạy Văn ở Ninh Hòa gửi cho con',
                    message: message,
                    Nguoi_gui: 'Cô giáo dạy Văn (Ninh Hòa)',
                    _captcha: 'false'
                })
            })
            .then(res => res.json())
            .then(data => {
                // Gửi thành công
                form.classList.add('hidden');
                if (successNotice) {
                    successNotice.classList.remove('hidden');
                    successNotice.scrollIntoView({ behavior: 'smooth' });
                }
            })
            .catch(err => {
                console.log('FormSubmit error:', err);
                // Nếu lỗi mạng vẫn hiện thông báo để Cô không hoang mang
                form.classList.add('hidden');
                if (successNotice) {
                    successNotice.classList.remove('hidden');
                    successNotice.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }
}

/* ==========================================================================
   5. LƯU BỨC THƯ THÀNH ẢNH (PNG)
   ========================================================================== */
function initSaveImage() {
    const saveBtn = document.getElementById('saveImageBtn');
    if (!saveBtn) return;

    saveBtn.addEventListener('click', () => {
        const letterCard = document.getElementById('printableLetterCard');
        if (!letterCard) return;

        const originalHTML = saveBtn.innerHTML;
        saveBtn.innerHTML = '<span>Đang tạo ảnh bức thư...</span>';
        saveBtn.disabled = true;

        // Load html2canvas nếu chưa có
        if (typeof html2canvas === 'undefined') {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
            script.onload = () => captureAndDownload(letterCard, saveBtn, originalHTML);
            script.onerror = () => {
                saveBtn.innerHTML = originalHTML;
                saveBtn.disabled = false;
                alert('Không tải được công cụ lưu ảnh, vui lòng kiểm tra kết nối mạng!');
            };
            document.head.appendChild(script);
        } else {
            captureAndDownload(letterCard, saveBtn, originalHTML);
        }
    });
}

function captureAndDownload(element, btn, originalHTML) {
    html2canvas(element, {
        backgroundColor: '#fcfbf8',
        scale: 2, // Xuất ảnh nét gấp đôi cho màn hình điện thoại
        useCORS: true,
        logging: false
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'thu-tri-an-20-11.png';
        link.href = canvas.toDataURL('image/png');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        btn.innerHTML = '<span>Đã lưu ảnh bức thư!</span>';
        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.disabled = false;
        }, 2000);
    }).catch(err => {
        console.error('html2canvas error:', err);
        alert('Trình duyệt hiện tại hạn chế tải tệp trực tiếp, Cô có thể chụp màn hình để lưu lại nhé ạ!');
        btn.innerHTML = originalHTML;
        btn.disabled = false;
    });
}
