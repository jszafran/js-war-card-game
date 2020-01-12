const cardColors = ["♠", "♥", "♦", "♣"]
const cardValues = "2345678910JQKA"

class player {
    constructor(name, cards) {
        this.name = name;
        this.cards = cards;
    }
}

class card {
    constructor(color, value, rank) {
        this.color = color;
        this.value = value;
        this.rank = rank;
    }
}


function createDeck(cardColors, cardValues) {
    const deck = []
    for (let color of cardColors) {
        for (let i = 0; i < cardValues.length; i++) {
            deck.push(new card(color, cardValues[i], i));
        }
    }
    return deck;
}

function shuffleDeck(deck) {
    const orderedDeck = deck.slice();
    const shuffledDeck = []
    while (orderedDeck.length > 0) {
        let randomIndex = Math.floor(Math.random() * orderedDeck.length);
        shuffledDeck.push(orderedDeck.splice(randomIndex, 1)[0]);
    }
    return shuffledDeck;
}

const players = [
    new player("John", []),
    new player("Kevin", [])
]
