const cardColors = ["♠", "♥", "♦", "♣"]
const cardValues = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"]

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
        this.owner = null;
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

class warGame {
    constructor(players, deck) {
        this.players = players;
        this.deck = deck;
        this.stack = []
    }

    isGameFinished() {
        const zeroCardPlayers = this.players.filter(
            x => {
                return x.cards.length === 0;
            }
        )
        if (zeroCardPlayers.length === players.length - 1) {
            return true;
        }
        return false;
    }

    dealCards() {
        while (this.deck.length !== 0) {
            for (let player of this.players) {
                player.cards.push(this.deck.pop());
            }
        }
    }

    setCardOwnership() {
        for (let player of this.players) {
            for (let card of player.cards) {
                card.owner = player.name;
            }
        }
    }

    checkStateForWar() {
        if (this.stack.length < 2) {
            return false;
        }
        const maxStackRank = this.stack.map(card => {
            return card.rank;
        }).reduce(function (a, b) {
            return Math.max(a, b);
        })
        
        if (this.getCardsFromStackByRank(maxStackRank).length > 1) {
            return true;
        }
        return false;
    }

    getPlayerByName(name) {
        const player = this.players.find(p => (p.name === name))
        return player;
    }

    getCardsFromStackByRank(rank) {
        const cards = this.stack.filter(card => (card.rank === rank)) 
        return cards;
    }

    transferCards(cards, player) {
        for (card of cards) {
            card.owner = player.name;
            player.cards.push(card);
        }
    }
}

const deck = createDeck(cardColors, cardValues);

const game = new warGame(players, deck);

console.log(game.isGameFinished());
game.dealCards();
game.setCardOwnership();

console.log(game);
console.log(game.checkStateForWar())