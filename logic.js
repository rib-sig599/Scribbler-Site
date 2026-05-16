// Scattered art images — generated and appended to body
const artImages = [
    'img/art/Scribbler.jpg',
    'img/art/pavlov.png',
    'img/art/IMG_3527.jpg'
];

const scatterData = [
    { top: '2vh',   side: 'left',  pos: '-10px', rotate: -9,  width: 150, opacity: 0.55 },
    { top: '4vh',   side: 'right', pos: '-8px',  rotate:  8,  width: 160, opacity: 0.50 },
    { top: '11vh',  side: 'left',  pos: '13%',   rotate: -5,  width: 95,  opacity: 0.22 },
    { top: '14vh',  side: 'right', pos: '13%',   rotate: 11,  width: 90,  opacity: 0.20 },
    { top: '22vh',  side: 'left',  pos: '-5px',  rotate:  4,  width: 138, opacity: 0.52 },
    { top: '26vh',  side: 'right', pos: '-5px',  rotate: -6,  width: 142, opacity: 0.48 },
    { top: '34vh',  side: 'left',  pos: '9%',    rotate:-12,  width: 88,  opacity: 0.20 },
    { top: '37vh',  side: 'right', pos: '9%',    rotate:  7,  width: 92,  opacity: 0.20 },
    { top: '45vh',  side: 'left',  pos: '-12px', rotate:  3,  width: 148, opacity: 0.52 },
    { top: '49vh',  side: 'right', pos: '-8px',  rotate: -8,  width: 155, opacity: 0.46 },
    { top: '58vh',  side: 'left',  pos: '16%',   rotate:  9,  width: 82,  opacity: 0.18 },
    { top: '62vh',  side: 'right', pos: '16%',   rotate: -5,  width: 87,  opacity: 0.18 },
    { top: '70vh',  side: 'left',  pos: '-5px',  rotate: -7,  width: 132, opacity: 0.50 },
    { top: '74vh',  side: 'right', pos: '-5px',  rotate:  6,  width: 140, opacity: 0.46 },
    { top: '83vh',  side: 'left',  pos: '11%',   rotate:  4,  width: 98,  opacity: 0.22 },
    { top: '87vh',  side: 'right', pos: '11%',   rotate:-10,  width: 93,  opacity: 0.22 },
    { top: '97vh',  side: 'left',  pos: '-15px', rotate: -6,  width: 152, opacity: 0.52 },
    { top: '101vh', side: 'right', pos: '-10px', rotate:  5,  width: 146, opacity: 0.46 },
    { top: '112vh', side: 'left',  pos: '6%',    rotate:  8,  width: 112, opacity: 0.28 },
    { top: '116vh', side: 'right', pos: '6%',    rotate: -7,  width: 118, opacity: 0.26 },
    { top: '128vh', side: 'left',  pos: '-8px',  rotate: -4,  width: 142, opacity: 0.50 },
    { top: '132vh', side: 'right', pos: '-5px',  rotate:  9,  width: 136, opacity: 0.46 },
    { top: '145vh', side: 'left',  pos: '13%',   rotate:  6,  width: 92,  opacity: 0.20 },
    { top: '150vh', side: 'right', pos: '13%',   rotate: -8,  width: 98,  opacity: 0.20 },
    { top: '162vh', side: 'left',  pos: '-5px',  rotate:-11,  width: 132, opacity: 0.48 },
    { top: '166vh', side: 'right', pos: '0px',   rotate:  4,  width: 147, opacity: 0.44 },
];

scatterData.forEach((d, i) => {
    const img = document.createElement('img');
    img.src = artImages[i % artImages.length];
    img.className = 'scattered-img';
    img.alt = '';
    img.style.top = d.top;
    img.style[d.side] = d.pos;
    img.style.transform = `rotate(${d.rotate}deg)`;
    img.style.width = d.width + 'px';
    img.style.opacity = d.opacity;
    document.body.appendChild(img);
});

// Click band name easter egg
let clickCount = 0;
document.getElementById('bandName').addEventListener('click', function () {
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

