const messages = [
    "Hello Shradhu, click here to start the story...",
    "You make my heart skip a beat.",
    "Every moment with you is a treasure.",
    "I love you more than words can say.",
    "Will you be my forever?"
];

const imageCards = ["imageCard1", "imageCard2", "imageCard3", "imageCard4", "imageCard5"];

let currentMessage = 0;
let currentImage = 0;

const occupiedPositions = [];

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.heart-card').classList.add('show');
});

function nextMessage() {
    const currentCard = document.querySelector('.card.show');
    if (currentCard) {
        currentCard.classList.add('shrink');
        setTimeout(() => {
            moveToRandomPosition(currentCard);
            currentCard.classList.remove('show');
            currentCard.classList.add('moved');
        }, 500); // Delay to allow shrinking effect
    }

    if (currentMessage < messages.length) {
        const nextMessageCard = document.getElementById(`messageCard${currentMessage + 1}`);
        nextMessageCard.style.display = 'block';
        setTimeout(() => nextMessageCard.classList.add('show'), 10); // Small delay to trigger CSS transition
        currentMessage++;
    } else if (currentImage < imageCards.length) {
        const nextImageCard = document.getElementById(imageCards[currentImage]);
        nextImageCard.style.display = 'block';
        setTimeout(() => nextImageCard.classList.add('show'), 10); // Small delay to trigger CSS transition
        moveToCenter(nextImageCard); // Move clicked image to center
        currentImage++;
    }
}

function moveToRandomPosition(element) {
    const container = document.querySelector('.container');
    const containerRect = container.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();
    const maxTop = containerRect.height - elementRect.height;
    const maxLeft = containerRect.width - elementRect.width;
    const padding = 20; // Minimum padding between cards

    let randomTop, randomLeft, isOverlapping;

    do {
        isOverlapping = false;
        randomTop = Math.floor(Math.random() * (maxTop - padding));
        randomLeft = Math.floor(Math.random() * (maxLeft - padding));

        for (let pos of occupiedPositions) {
            if (Math.abs(randomTop - pos.top) < elementRect.height + padding &&
                Math.abs(randomLeft - pos.left) < elementRect.width + padding) {
                isOverlapping = true;
                break;
            }
        }
    } while (isOverlapping);

    occupiedPositions.push({ top: randomTop, left: randomLeft });

    element.style.top = `${randomTop}px`;
    element.style.left = `${randomLeft}px`;
    element.style.zIndex = currentMessage + currentImage + 1; // Ensure the moved card stays on top
    element.style.opacity = 1; // Ensure the card remains visible
    element.style.transform = `translate(0, 0) scale(1)`;
}

function moveToCenter(element) {
    const container = document.querySelector('.container');
    const containerRect = container.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();

    const centerX = containerRect.width / 2 - elementRect.width / 2;
    const centerY = containerRect.height / 2 - elementRect.height / 2;

    element.style.top = `${centerY}px`;
    element.style.left = `${centerX}px`;
    element.style.zIndex = currentMessage + currentImage + 1; // Ensure the moved card stays on top
    element.style.opacity = 1; // Ensure the card remains visible
    element.style.transform = `translate(0, 0) scale(1)`;
}
