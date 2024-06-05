document.addEventListener('DOMContentLoaded', () => {
    const cardImages = [
        'Goku_gremista.jpg', 'Abner.jpg', 'Henrique.png', 'Richarlison.jpg',
        'Satoru_White.jpg', 'Setembro.jpg', 'Shasnigger.jpg', 'sunshine.jpeg',
        'Thomás.jpg', 'Max.jpeg'
    ];


    const audioTriggerImage1 = 'Max.jpeg';
    const audio1 = new Audio('MaxAudio.mp3');

    const audioTriggerImage2 = 'sunshine.jpeg';
    const audio2 = new Audio('sunshineAudio.mp3');

    let gameBoard = document.getElementById('game-board');
    let restartBtn = document.getElementById('restart-btn');
    let congratsMessage = document.getElementById('congrats-message');

    let cards = [];
    let flippedCards = [];
    let matchedPairs = 0;

    function initGame() {
        cards = [];
        flippedCards = [];
        matchedPairs = 0;
        congratsMessage.style.display = 'none';
        gameBoard.innerHTML = '';
        cardImages.forEach(image => {
            cards.push(createCard(image));
            cards.push(createCard(image));
        });
        shuffle(cards);
        cards.forEach(card => gameBoard.appendChild(card));
    }

    function createCard(image) {
        let card = document.createElement('div');
        card.classList.add('card');
        card.dataset.image = image;
        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front"></div>
                <div class="card-back"><img src="${image}" alt="Card Image"></div>
            </div>
        `;
        card.addEventListener('click', () => {
            if (flippedCards.length < 2 && !card.classList.contains('flipped')) {
                flipCard(card)
                if (image === audioTriggerImage1) {
                    audio1.play()
                }
                if (image === audioTriggerImage2) {
                    audio2.play()
                    // Pausar o áudio após 7s
                    setTimeout(() => {
                        audio2.pause()
                    }, 7000)
                }
            }
        })
        return card;
    }

    function flipCard(card) {
        card.classList.add('flipped');
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            if (flippedCards[0].dataset.image === flippedCards[1].dataset.image) {
                matchedPairs++;
                flippedCards = [];
                if (matchedPairs === cardImages.length) {
                    congratsMessage.style.display = 'block';
                }
            } else {
                setTimeout(() => {
                    flippedCards.forEach(card => card.classList.remove('flipped'));
                    flippedCards = [];
                }, 1000);
            }
        }
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    restartBtn.addEventListener('click', initGame);

    initGame();
});
