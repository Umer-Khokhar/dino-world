const cardContainer = document.getElementById('cards');
const showMoreButton = document.getElementById('show-more');
let cardsData = [];
let visibleCards = 5;
let totalCards;

async function fetchData() {
  const response = await fetch('assets/json/dino.json');
  const data = await response.json();
  cardsData = data;
  totalCards = cardsData.length;
}

async function displayCards() {
  await fetchData();
  renderCards();
  showMoreButton.addEventListener('click', loadMoreCards);
}

function renderCards() {
  cardContainer.innerHTML = ''; // Clear existing cards
  cardsData.slice(0, visibleCards).forEach(card => {
    const cardElement = createCardElement(card);
    cardContainer.appendChild(cardElement);
  });
  toggleShowMoreButton();
}

function createCardElement(card) {
  const cardElement = document.createElement('div');
  cardElement.classList.add('card');
  const truncatedDescription = card.description.length > 150 ? card.description.substring(0, 150) + "..." : card.description;

  cardElement.innerHTML = `
    <img src="${card.imageSrc}" />
    <div class="info">
      <h2>${card.name}</h2>
      <p>${truncatedDescription}</p>
    </div>
  `;
  return cardElement;
}

function loadMoreCards() {
  visibleCards += 5;
  renderCards();
}

function toggleShowMoreButton() {
  if (visibleCards >= totalCards) {
    showMoreButton.style.display = 'none'; // Hide button when all cards are shown
  } else {
    showMoreButton.style.display = 'block';
  }
}

displayCards();
