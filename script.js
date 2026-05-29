const imageFolder = 'images';

// 目前圖卡數量
const totalImages = 36;

// 建立圖片清單
const imageList = [];

for (let i = 1; i <= totalImages; i++) {
const num = String(i).padStart(2, '0');

// 對應 images_01.jpg 格式
imageList.push(`${imageFolder}/images_${num}.jpg`);
}

let currentCards = [];

// 洗牌
function shuffle(array) {
return [...array].sort(() => Math.random() - 0.5);
}

// 抽五張圖卡
function drawCards() {
currentCards = shuffle(imageList).slice(0, 5);
renderCards();
}

// 顯示圖卡
function renderCards() {
const wrapper = document.getElementById('cardsWrapper');

wrapper.innerHTML = '';

currentCards.forEach((imgSrc, index) => {
const block = document.createElement('div');

```
block.className = 'card-block';

block.innerHTML = `
  <div class="card" onclick="flipCard(this)">
    <div class="card-inner">

      <div class="card-front">
        點擊翻牌
      </div>

      <div class="card-back">
        <img src="${imgSrc}" alt="圖卡">
      </div>

    </div>
  </div>

  <div class="card-controls">
    <button onclick="moveLeft(${index})">← 前移</button>
    <button onclick="moveRight(${index})">後移 →</button>
  </div>
`;

wrapper.appendChild(block);
```

});
}

// 翻牌
function flipCard(cardElement) {
cardElement.classList.toggle('flipped');
}

// 左移
function moveLeft(index) {
if (index === 0) return;

[currentCards[index - 1], currentCards[index]] =
[currentCards[index], currentCards[index - 1]];

renderCards();
}

// 右移
function moveRight(index) {
if (index === currentCards.length - 1) return;

[currentCards[index + 1], currentCards[index]] =
[currentCards[index], currentCards[index + 1]];

renderCards();
}

// 顯示圖庫
function showGallery() {
document.getElementById('homePage').style.display = 'none';
document.getElementById('galleryPage').style.display = 'block';

renderGallery();
}

// 返回首頁
function backHome() {
document.getElementById('homePage').style.display = 'block';
document.getElementById('galleryPage').style.display = 'none';
}

// 渲染全部圖庫
function renderGallery() {
const gallery = document.getElementById('galleryGrid');

gallery.innerHTML = '';

imageList.forEach((imgSrc, index) => {
const item = document.createElement('div');

```
item.className = 'gallery-item';

item.innerHTML = `
  <img src="${imgSrc}" alt="圖卡">
  <p>圖卡 ${String(index + 1).padStart(2, '0')}</p>
`;

gallery.appendChild(item);
```

});
}

// 預設載入
drawCards();
