// Scattered art images — generated and appended to body
const artImages = [
    'img/art/Scribbler.jpg',
    'img/art/pavlov.png',
    'img/art/IMG_3527.jpg',
    'img/art/2DDF2924-084D-46EC-AA6D-A49CBD418710.jpg',
    'img/art/fogo.jpg',
    'img/art/Screenshot 2026-05-16 165736.png',
    'img/art/pistons.jpg'
];

// Fisher-Yates shuffle — randomize on every load
function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}
const shuffledImages = shuffle(artImages);

// Generate scattered images evenly across the full page
const rand = (min, max) => Math.random() * (max - min) + min;
const randInt = (min, max) => Math.floor(rand(min, max + 1));

const COUNT  = 48;
const SPREAD = 165; // stop just before the photo gallery

for (let i = 0; i < COUNT; i++) {
    const img = document.createElement('img');
    img.src = shuffledImages[i % shuffledImages.length];
    img.className = 'scattered-img';
    img.alt = '';

    // Even vertical distribution across the hero
    const slotSize = SPREAD / COUNT;
    const topVh    = i * slotSize + rand(0, slotSize);
    img.style.top  = topVh + 'vh';

    // Alternate sides in pairs
    const side = Math.floor(i / 2) % 2 === 0 ? 'left' : 'right';
    img.style[side]     = rand(-10, 180) + 'px';

    img.style.transform = `rotate(${rand(-16, 16)}deg)`;
    img.style.width     = randInt(80, 170) + 'px';
    img.style.opacity   = rand(0.15, 0.55);

    document.body.appendChild(img);
}

// Background audio — persistent across page navigation via sessionStorage
const bgAudio = document.getElementById('bgAudio');
const bgmBtn  = document.getElementById('bgmBtn');
const bgmIcon = document.getElementById('bgmIcon');

bgAudio.volume = 0.35;

// Restore position and play state from the previous page
const savedTime  = parseFloat(sessionStorage.getItem('bgmTime') || '0');
const wasPlaying = sessionStorage.getItem('bgmPlaying') !== 'false'; // default true on first visit
bgAudio.currentTime = savedTime;

function updateBgmBtn() {
    bgmIcon.textContent = bgAudio.paused ? '▶' : '❚❚';
}
bgAudio.addEventListener('play',  updateBgmBtn);
bgAudio.addEventListener('pause', updateBgmBtn);

// Save state before leaving the page so the next page can resume
window.addEventListener('beforeunload', () => {
    sessionStorage.setItem('bgmTime',    bgAudio.currentTime);
    sessionStorage.setItem('bgmPlaying', String(!bgAudio.paused));
});

// Autoplay fallback — removed once user takes manual control
let autoplayFallback = null;

if (wasPlaying) {
    bgAudio.play().catch(() => {
        autoplayFallback = () => {
            bgAudio.play();
            document.removeEventListener('click',      autoplayFallback);
            document.removeEventListener('touchstart', autoplayFallback);
            autoplayFallback = null;
        };
        document.addEventListener('click',      autoplayFallback);
        document.addEventListener('touchstart', autoplayFallback);
    });
}

// BGM button — hand full control to the user
bgmBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (autoplayFallback) {
        document.removeEventListener('click',      autoplayFallback);
        document.removeEventListener('touchstart', autoplayFallback);
        autoplayFallback = null;
    }
    bgAudio.paused ? bgAudio.play() : bgAudio.pause();
});

// Pause bg audio when user clicks into any embedded player iframe
window.addEventListener('blur', () => {
    if (document.activeElement && document.activeElement.tagName === 'IFRAME') {
        bgAudio.pause();
    }
});

// Click band name easter egg (index.html only)
let clickCount = 0;
const bandName = document.getElementById('bandName');
if (bandName) bandName.addEventListener('click', function () {
    clickCount++;
    if (clickCount >= 3) {
        this.style.transform = 'rotate(360deg)';
        this.style.transition = 'transform 1s';
        setTimeout(() => {
            this.style.transform = 'rotate(0deg)';
        }, 1000);

        document.getElementById('secretMsg').classList.add('show');
        setTimeout(() => {
            document.getElementById('secretMsg').classList.remove('show');
        }, 5000);
        clickCount = 0;
    }
});

// Double-click anywhere for floating emojis
const emojis = ['🎸', '🎵', '🎶', '⭐', '🎤', '🎹', '🥁', '🎺', '✨', '💫'];
document.addEventListener('dblclick', function (e) {
    const emoji = document.createElement('div');
    emoji.className = 'floating-emoji';
    emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    emoji.style.left = e.pageX + 'px';
    emoji.style.top = e.pageY + 'px';
    document.body.appendChild(emoji);
    setTimeout(() => emoji.remove(), 3000);
});

