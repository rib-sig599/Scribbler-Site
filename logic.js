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

// Fill scrolling text tracks with enough repetitions to loop seamlessly forever
function fillScrollTrack(el, phrase, reps) {
    if (!el) return;
    const unit = phrase + ' ·  ';
    el.textContent = unit.repeat(reps);
}
fillScrollTrack(document.querySelector('.ticker-track'),
    '♪   you are listening to scribbler website jams', 30);
document.querySelectorAll('.scroll-track').forEach(el =>
    fillScrollTrack(el, 'play chess. smoke weed. make music · Scribbler is sunshine and rainbows.', 24)
);

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

// Fun photo gallery — shuffled on every load
const funPhotos = [
    'img/fun-photos/459B447E-6E8B-44FC-8F63-FBB6ACE65EC0.jpg',
    'img/fun-photos/3BC86E77-8AD2-4643-B062-CD3B82910A88.jpg',
    'img/fun-photos/499F25D6-5E9C-438B-BD0E-ABC6AC8CBD68.jpg',
    'img/fun-photos/5590287F-26E9-4419-839C-507CBFC00190.jpg',
    'img/fun-photos/58D72BED-4C94-40E7-B8DF-AC094259B94D.jpg',
    'img/fun-photos/IMG_1199.JPG',
    'img/fun-photos/IMG_3402.JPG',
    'img/fun-photos/IMG_3486.jpg',
    'img/fun-photos/Untitled design (4).jpg',
    'img/fun-photos/dabandStand.jpg',
    'img/fun-photos/dabandSit.jpg',
];
const ratios = ['r-wide', 'r-square', 'r-tall'];
const gallery = document.getElementById('gallery');
shuffle(funPhotos).forEach((src, i) => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = 'Scribbler live';
    img.className = ratios[i % ratios.length];
    gallery.appendChild(img);
});

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

// Show flyer modal on click
const flyerModal    = document.getElementById('flyerModal');
const flyerModalImg = document.getElementById('flyerModalImg');
if (flyerModal) {
    document.querySelectorAll('.show-flyer').forEach(img => {
        img.addEventListener('click', () => {
            flyerModalImg.src = img.src;
            flyerModalImg.alt = img.alt;
            flyerModal.classList.add('open');
        });
    });
    flyerModal.addEventListener('click', () => flyerModal.classList.remove('open'));
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') flyerModal.classList.remove('open');
    });
}

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

