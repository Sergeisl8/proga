function hexToRGBA(hex, alpha) {
    let c;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
        c = hex.substring(1).split('');
        if (c.length === 3) {
            c = [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c = parseInt('0x' + c.join(''), 16); // более эффективный парсинг
        return `rgba(${ (c >> 16) & 255 },${ (c >> 8) & 255 },${ c & 255 },${ alpha })`; // template literal
    }
    return 'rgba(0,0,0,1)';
}

function getRGBAValues(rgbaString) {
  const [, r, g, b, a] = rgbaString.match(/rgba\((\d+),(\d+),(\d+),(\d*\.?\d*)\)/);
  return [parseInt(r), parseInt(g), parseInt(b), parseFloat(a)];
}


function randomColor() {
    const hexChars = '0123456789abcdef';
    let hexCode = '#';
    for (let i = 0; i < 6; i++) {
        hexCode += hexChars[Math.floor(Math.random() * hexChars.length)];
    }
    return hexCode;
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function checkWin() {
    let paletteSortChildrens = document.querySelector('.palette_sort').children;
    let winCombination = [];

    for  (let i = 0; i < paletteSortChildrens.length; i++) {
        winCombination.push(paletteSortChildrens[i].dataset.id);
    }
    return  winCombination .toString() == ['6','5','4','3','2','1','0'].toString();
}

function saveProgress() {
    let score = Number(localStorage.getItem('progres')) ?? 0;
}

function createParticle(rgba) {
    const item = document.createElement('div');
    item.className = 'palette_particle';
    item.style.background = rgba;

    item.addEventListener('click', function(e) {
        if (e.target.dataset.pos == 'out') {
        document.querySelector('.palette_sort').appendChild(e.target);
        e.target.dataset.pos = 'in';
    } else {
        document.querySelector('.palette_unsort').appendChild(e.target);
        e.target.dataset.pos = 'out';
    }

    if (checkWin()) {
        saveProgress();
        document.querySelector('.score').textContent = 'очки: ' + score;
        setTimeout(() => {
            alert('Молодец давай ещё')
            window.location.reload;
        })
    }
    });
    return item;
}

// Создаем контейнер для частиц
const paletteUnsort = document.createElement('div');
paletteUnsort.className = 'palette_unsort';
document.body.appendChild(paletteUnsort); // Добавляем в body,  можно изменить


const numParticles = 5;
const paletteParticles = [];
let baseRGBA = getRGBAValues(hexToRGBA(randomColor(),1)); //получаем базовый цвет

for (let i = 0; i < numParticles; i++) {
    const alpha = 1.0 - i * (1.0 / numParticles); // плавный градиент альфы
    const rgba = `rgba(${baseRGBA[0]}, ${baseRGBA[1]}, ${baseRGBA[2]}, ${alpha})`;
    const particle = createParticle(rgba);
    paletteParticles.push(particle);
}

shuffle(paletteParticles); // Перемешиваем частицы

paletteParticles.forEach(particle => {
    paletteUnsort.appendChild(particle);
});


https://cdn-icons-png.flaticon.com/256/1326/1326001.png
















// shuffleArray(paletteParticles); // Перемешиваем частицы
//     document.querySelector('.score').textContent = 'Очки:'
//     document.querySelector('')
// paletteParticles.forEach(particle => {
//     paletteUnsort.appendChild(particle);
// });