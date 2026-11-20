document.addEventListener('DOMContentLoaded', () => {
    initEnvelopeExperience();
    initReadFinishedSection();
    initEmailSubmission();
    initSaveImage();
});

function initEnvelopeExperience() {
    const envelope = document.getElementById('mainInteractiveEnvelope');
    const tapGuideBtn = document.getElementById('tapGuideBtn');
    const envelopeScreen = document.getElementById('envelopeScreen');
    const letterScreen = document.getElementById('letterScreen');

    function openEnvelope() {
        if (!envelope || envelope.classList.contains('open')) return;

        if (window.soundManager && typeof window.soundManager.playPaperRustle === 'function') {
            window.soundManager.playPaperRustle();
        }

        envelope.classList.add('open');

        setTimeout(() => {
            envelopeScreen.classList.add('opacity-0');
            setTimeout(() => {
                envelopeScreen.classList.add('hidden');
                envelopeScreen.classList.remove('flex', 'opacity-0');

                letterScreen.classList.remove('hidden');
                letterScreen.classList.add('flex');
                window.scrollTo({ top: 0, behavior: 'smooth' });

                startTypewriterEffect();
            }, 400);
        }, 750);
    }

    if (envelope) envelope.addEventListener('click', openEnvelope);
    if (tapGuideBtn) tapGuideBtn.addEventListener('click', openEnvelope);
}

function startTypewriterEffect() {
    const letterBody = document.querySelector('#printableLetterCard .space-y-4');
    if (!letterBody) return;

    const paragraphs = letterBody.querySelectorAll('p');
    const footer = document.querySelector('#printableLetterCard footer');
    const readFinishSection = document.getElementById('readFinishSection');
    const saveSection = document.getElementById('saveImageSection');

    if (readFinishSection) readFinishSection.style.opacity = '0';
    if (saveSection) saveSection.style.opacity = '0';
    if (footer) footer.style.opacity = '0';

    const originalContents = [];
    paragraphs.forEach((p) => {
        originalContents.push(p.textContent);
        p.textContent = '';
        p.style.minHeight = '1.85em';
    });

    let currentParagraph = 0;
    let currentChar = 0;
    const charDelay = 28;
    const paragraphPause = 300;
    let clickCounter = 0;

    function typeNextChar() {
        if (currentParagraph >= originalContents.length) {
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

            clickCounter++;
            if (clickCounter % 3 === 0) {
                if (window.soundManager && typeof window.soundManager.playTypeClick === 'function') {
                    window.soundManager.playTypeClick();
                }
            }

            const pRect = p.getBoundingClientRect();
            if (pRect.bottom > window.innerHeight - 60) {
                window.scrollBy({ top: 30, behavior: 'smooth' });
            }

            setTimeout(typeNextChar, charDelay);
        } else {
            currentParagraph++;
            currentChar = 0;
            setTimeout(typeNextChar, paragraphPause);
        }
    }

    setTimeout(typeNextChar, 400);
}

function initReadFinishedSection() {
    const finishBtn = document.getElementById('finishReadingBtn');
    const bouquetModal = document.getElementById('bouquetModal');
    const receiveBtn = document.getElementById('receiveBouquetBtn');
    const replySection = document.getElementById('teacherReplySection');

    if (finishBtn && bouquetModal) {
        finishBtn.addEventListener('click', () => {
            if (window.soundManager && typeof window.soundManager.playPaperRustle === 'function') {
                window.soundManager.playPaperRustle();
            }
            bouquetModal.classList.remove('hidden');
            bouquetModal.classList.add('flex');
        });
    }

    if (receiveBtn && bouquetModal && replySection) {
        receiveBtn.addEventListener('click', () => {
            bouquetModal.classList.add('hidden');
            bouquetModal.classList.remove('flex');

            document.getElementById('readFinishSection')?.classList.add('hidden');

            replySection.classList.remove('hidden');
            replySection.classList.add('flex');
            replySection.scrollIntoView({ behavior: 'smooth' });

            const textarea = document.getElementById('teacherMessageInput');
            if (textarea) textarea.focus();
        });
    }
}

function initEmailSubmission() {
    const form = document.getElementById('teacherReplyForm');
    const textarea = document.getElementById('teacherMessageInput');
    const submitBtn = document.getElementById('submitReplyBtn');
    const successNotice = document.getElementById('replySuccessNotice');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const message = textarea?.value.trim();
            if (!message) {
                alert('Cô viết vài lời nhắn nhủ gửi cho con nhé!');
                textarea?.focus();
                return;
            }

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Đang gửi...';
            }

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
                if (data.success === 'true' || data.success === true) {
                    form.classList.add('hidden');
                    if (successNotice) {
                        successNotice.classList.remove('hidden');
                        successNotice.scrollIntoView({ behavior: 'smooth' });
                    }
                } else {
                    alert('Thông báo: ' + (data.message || 'Chưa thể gửi thư, vui lòng thử lại!'));
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.textContent = 'Gửi cho con';
                    }
                }
            })
            .catch(() => {
                alert('Lỗi kết nối mạng, Cô vui lòng thử bấm gửi lại nhé ạ!');
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Gửi cho con';
                }
            });
        });
    }
}

function initSaveImage() {
    const saveBtn = document.getElementById('saveImageBtn');
    if (!saveBtn) return;

    saveBtn.addEventListener('click', () => {
        const letterCard = document.getElementById('printableLetterCard');
        if (!letterCard) return;

        const originalHTML = saveBtn.innerHTML;
        saveBtn.innerHTML = '<span>Đang tạo ảnh bức thư...</span>';
        saveBtn.disabled = true;

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
        scale: 2,
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
    }).catch(() => {
        alert('Trình duyệt hiện tại hạn chế tải tệp trực tiếp, Cô có thể chụp màn hình để lưu lại nhé ạ!');
        btn.innerHTML = originalHTML;
        btn.disabled = false;
    });
}