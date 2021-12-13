# 🀄 hk-mahjong
**hk-mahjong** is the Node.js library that implements the scoring rules of Hong Kong Mahjong.

# Installation
Installation could be done using the ```npm install``` command:

```
npm install hk-mahjong
```

# Terminology

## Tile
*Tiles* could be splitted into four categories:
* dot 🀙 🀚 🀛 🀜 🀝 🀞 🀟 🀠 🀡
* bamboo 🀐 🀑 🀒 🀓 🀔 🀕 🀖 🀗 🀘
* character 🀇 🀈 🀉 🀊 🀋 🀌 🀍 🀎 🀏
* honor 🀀 🀁 🀂 🀃 🀄 🀅 🀆

## Meld
*Meld* is a group of tiles, consisting of either 
* ***Pong*** (three identical tiles e.g. 🀒🀒🀒)
* ***Kong*** (four identical tiles e.g. 🀛🀛🀛🀛)
* ***Chow*** (three suited tiles all of the same suit, in numerical sequence e.g. 🀙🀚🀛), or 
* ***Eyes*** (two identical tiles needed in a winning hand e.g. 🀑🀑)

## Hand
* *Hand* refers to the group of tiles that are in a player's hand.
* During the game, each player's *hand* should always be 13 tiles.  

## Winning Hand
* A *Winning Hand* should have 14-18 tiles that could form 5 *Melds*, including exactly 1 *Eyes*.

## Faan
* *Faan* is a value that weights the significance of a *Winning Hand*.
* The *Faan* value would be used to calculate the money (or "points") the losers have to pay the winner.

# Usage
## Create a Tile
A *Tile* could be created by either passing in
1. the tile's configuration, or
2. the unicode string of the tile's symbo
   (click [here](https://en.wikipedia.org/wiki/Mahjong_Tiles_(Unicode_block)) to learn more about unicode of mahjong tiles)
``` javascript
const { Tile } = require("hk-mahjong");

const dot1 = new Tile({ suit: "dot", value: 1 })
const dot2 = new Tile("🀚");
```

## Create a Meld
A *Meld* could be created by passing in an array of *Tiles*.
``` javascript
const { Tile, Meld } = require("hk-mahjong");

const dot1 = new Tile({ suit: "dot", value: 1 })
const meld = new Meld([dot1, dot1, dot1]);
```

## Create a Hand
A *Hand* could be created by passing in the configuration.
``` javascript
const { Tile, Meld, Hand } = require("hk-mahjong");

const dot1 = new Tile('🀙');
const meld = new Meld([dot1, dot1, dot1]);

const dot2 = new Tile('🀚');
const dot3 = new Tile('🀛');
const dot4 = new Tile('🀜');
const dot9 = new Tile('🀡');

const tiles = [];
tiles.push(dot2);
tiles.push(dot2);
tiles.push(dot2);
tiles.push(dot3);
tiles.push(dot3);
tiles.push(dot3);
tiles.push(dot4);
tiles.push(dot4);
tiles.push(dot4);
tiles.push(dot9);
tiles.push(dot9);

const hand = new Hand({ tiles, melds: [meld] });
```

## Explore all winning possibilities of a Hand
* The class **ExplorerOfWinningPermutations** could be used to check if a *Hand* is able to form a *Winning Hand*.  
* There are cases where a *Hand* have more than one possible permutations to form a *Winning Hand*.  The **ExplorerOfWinningPermutations** class adopts Depth First Search algorithm, and it is able able to find all possible winning permutations of a *Hand*.
```  javascript
const { Tile, Meld, Hand, ExplorerOfWinningPermutations } = require("hk-mahjong");

const dot1 = new Tile('🀙');
const meld = new Meld([dot1, dot1, dot1]);

const dot2 = new Tile('🀚');
const dot3 = new Tile('🀛');
const dot4 = new Tile('🀜');
const dot9 = new Tile('🀡');

const tiles = [];
tiles.push(dot2);
tiles.push(dot2);
tiles.push(dot2);
tiles.push(dot3);
tiles.push(dot3);
tiles.push(dot3);
tiles.push(dot4);
tiles.push(dot4);
tiles.push(dot4);
tiles.push(dot9);
tiles.push(dot9);

const hand = new Hand({ tiles, melds: [meld] });
const explorer = new ExplorerOfWinningPermutations(hand);
const winningPermutations = explorer.getWinningPermutations();
```

## Create a WinningHand
A *Winning Hand* could be created directly by passing in an array consisting of 5 *Melds*.
``` javascript
const { Tile, Melds, WinningHand } = require("hk-mahjong");

const tile1 = new Tile({ suit: 'dot', value: 1 });
const tile2 = new Tile({ suit: 'dot', value: 2 });
const tile3 = new Tile({ suit: 'dot', value: 3 });
const tile4 = new Tile({ suit: 'dot', value: 4 });
const tile5 = new Tile({ suit: 'dot', value: 5 });

const meld1 = new Meld([tile1, tile1, tile1]);
const meld2 = new Meld([tile2, tile2, tile2]);
const meld3 = new Meld([tile3, tile3, tile3]);
const meld4 = new Meld([tile4, tile4, tile4]);
const meld5 = new Meld([tile5, tile5]);

const winningHand = new WinningHand([meld1, meld2, meld3, meld4, meld5]);
```

## Calculate Faan of a WinningHand
A *Faan* value could be obtained by calling the static method of the class ***FaanCalculator***  (an optional configuration parameter could be passed in if necessary).
``` javascript
const { Tile, Melds, WinningHand, FaanCalculator } = require("hk-mahjong");

const tile1 = new Tile({ suit: 'dot', value: 1 });
const tile2 = new Tile({ suit: 'dot', value: 2 });
const tile3 = new Tile({ suit: 'dot', value: 3 });
const tile4 = new Tile({ suit: 'dot', value: 4 });
const tile5 = new Tile({ suit: 'dot', value: 5 });

const meld1 = new Meld([tile1, tile1, tile1]);
const meld2 = new Meld([tile2, tile2, tile2]);
const meld3 = new Meld([tile3, tile3, tile3]);
const meld4 = new Meld([tile4, tile4, tile4]);
const meld5 = new Meld([tile5, tile5]);

const winningHand = new WinningHand([meld1, meld2, meld3, meld4, meld5]);
const config = {selfPick: true};

const faanValue = FaanCalculator.calculate(winningHand, config);
```

# Contributing
* Issues and pull requests are welcome.
* The project is mostly written in TypeScript.  Google's [TypeScript style guide](https://google.github.io/styleguide/tsguide.html) could be taken as reference.

# License
Open sourced under MIT License

# Resources
* [Hong Kong Mahjong scoring rules - Wikipedia](https://en.wikipedia.org/wiki/Hong_Kong_Mahjong_scoring_rules)
* [Mahjong - Wikipedia](https://en.wikipedia.org/wiki/Mahjong)
