const cardColors = ["♠", "♥", "♦", "♣"];
const cardValues = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A"
];

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
  const deck = [];
  for (let color of cardColors) {
    for (let i = 0; i < cardValues.length; i++) {
      deck.push(new card(color, cardValues[i], i));
    }
  }
  return deck;
}

function shuffleDeck(deck) {
  const orderedDeck = deck.slice();
  const shuffledDeck = [];
  while (orderedDeck.length > 0) {
    let randomIndex = Math.floor(Math.random() * orderedDeck.length);
    shuffledDeck.push(orderedDeck.splice(randomIndex, 1)[0]);
  }
  return shuffledDeck;
}

const players = [new player("John", []), new player("Kevin", [])];

class warGame {
  constructor(players, deck) {
    this.players = players;
    this.deck = deck;
    this.stack = [];
    this.warStack = [];
  }

  isGameFinished() {
    const zeroCardPlayers = this.players.filter(x => {
      return x.cards.length === 0;
    });
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

  getMaxStackRank() {
    const maxStackRank = this.stack
      .map(card => {
        return card.rank;
      })
      .reduce(function(a, b) {
        return Math.max(a, b);
      });
    return maxStackRank;
  }

  checkStateForWar() {
    if (this.stack.length < 2) {
      return false;
    }
    const maxStackRank = this.getMaxStackRank();
    if (this.getCardsFromStackByRank(maxStackRank).length > 1) {
      return true;
    }
    return false;
  }

  getPlayerByName(name) {
    const player = this.players.find(p => p.name === name);
    return player;
  }

  getCardsFromStackByRank(rank) {
    const cards = this.stack.filter(card => card.rank === rank);
    return cards;
  }

  transferCards(cards, player) {
    for (card of cards) {
      card.owner = player.name;
      console.log(`Transfering ${card.color}${card.value} to ${player.name}`);
      player.cards.push(card);
    }
  }

  getMinWarLength() {
    const hasOneCardLeft = player => player.cards.length <= 1;
    if (this.players.some(hasOneCardLeft)) {
      return 1;
    }
    return 2;
  }

  pushCardToStack(player) {
    this.stack.push(player.cards.pop());
  }

  getGameWinner() {
    const maxStackRank = this.getMaxStackRank();
    const winningCard = this.stack.find(card => card.rank === maxStackRank);
    const winningPlayer = this.players.find(
      player => player.name == winningCard.owner
    );
    return winningPlayer;
  }

  transferCardsToWinner() {
    const winner = this.getGameWinner();
    this.transferCards(this.stack, winner);
  }
}

const deck = createDeck(cardColors, cardValues);

const game = new warGame(players, deck);

console.log(game.isGameFinished());
game.dealCards();
game.setCardOwnership();

console.log(game);
console.log(game.checkStateForWar());

console.log(game.getMinWarLength());

const [john, kevin] = players;
console.log(game.stack);

game.pushCardToStack(kevin);
game.pushCardToStack(john);

console.log(game);
console.log(game.getGameWinner());

console.log(game.transferCardsToWinner());
