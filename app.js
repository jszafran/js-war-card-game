const cardColors = ["♠", "♥", "♦", "♣"]
const cardValues = ["2345678910JQKA"]

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


const players = [
    new player("John", []),
    new player("Kevin", [])
]

function Card(color, ) {
    this
}

console.log(players)

players[0].cards.push(1);
players[1].cards.push(111);

console.log(players);

console.log(cardColors);

console.log(generate_deck())
