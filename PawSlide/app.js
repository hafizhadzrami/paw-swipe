let current = 0;
let liked = [];

const images = [
  "https://cataas.com/cat/says/Hello",
  "https://cataas.com/cat/says/Meow",
  "https://cataas.com/cat/says/Wow",
  "https://cataas.com/cat/cute",
  "https://cataas.com/cat/funny",
  "https://cataas.com/cat/sleepy",
  "https://cataas.com/cat/says/Purr",
  "https://cataas.com/cat/says/Love",
  "https://cataas.com/cat/says/Hiss",
  "https://cataas.com/cat/says/Blep"
];

function showCat() {
  const container = document.getElementById('cat-container');
  container.innerHTML = '';
  if (current < images.length) {
    const img = document.createElement('img');
    img.src = images[current];
    container.appendChild(img);
  } else {
    showFlashbook();
  }
}

function swipe(direction) {
  const card = document.querySelector("#cat-container img");
  if (!card) return;

  card.classList.add('shake');

  setTimeout(() => {
    card.classList.remove('shake');

    const emotion = document.getElementById("swipe-emotion");
    emotion.textContent = direction === 'right' ? "❤️" : "❌";
    emotion.classList.add("show-emotion");

    if (direction === 'right') {
      liked.push(images[current]);
    }

    card.classList.add(direction === 'right' ? 'swipe-right' : 'swipe-left');

    setTimeout(() => {
      emotion.classList.remove("show-emotion");
      current++;
      showCat();
    }, 400);
  }, 300);
}

function showFlashbook() {
  document.getElementById('cat-container').style.display = 'none';
  document.querySelector('.buttons').style.display = 'none';
  document.getElementById('photobook').style.display = 'block';
  document.getElementById('restart-btn').style.display = 'inline-block';

  document.getElementById('like-count').textContent = liked.length;
  document.getElementById('total-count').textContent = images.length;

  if (liked.length > 0) {
    let index = 0;
    const sliderImg = document.getElementById('slider-img');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    sliderImg.src = liked[index];

    prevBtn.onclick = () => {
      index = (index - 1 + liked.length) % liked.length;
      sliderImg.src = liked[index];
    };

    nextBtn.onclick = () => {
      index = (index + 1) % liked.length;
      sliderImg.src = liked[index];
    };
  } else {
    document.getElementById('photobook').innerHTML = `<p>You didn't like any cats 😿</p>`;
  }
}

function restartApp() {
  current = 0;
  liked = [];
  document.getElementById('cat-container').style.display = 'block';
  document.getElementById('cat-container').innerHTML = '';
  document.querySelector('.buttons').style.display = 'flex';
  document.getElementById('photobook').style.display = 'none';
  document.getElementById('restart-btn').style.display = 'none';
  showCat();
}

showCat();
