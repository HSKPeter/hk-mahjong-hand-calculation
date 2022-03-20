# 🀄 hk-mahjong
[![npm version](https://img.shields.io/npm/v/hk-mahjong.svg?style=flat)](https://www.npmjs.com/package/hk-mahjong) [![GitHub license](https://img.shields.io/github/license/HSKPeter/hk-mahjong-hand-calculation?style=flat)](https://github.com/HSKPeter/hk-mahjong-hand-calculation/blob/main/LICENSE)

**hk-mahjong** is the Node.js library that implements the scoring rules of Hong Kong Mahjong.

# Example
[Hong Kong Mahjong Calculator](https://hkmahjong.net/) is built using this library.

# Installation
Installation could be done using the ```npm install``` command:

```
npm install hk-mahjong
```

# Terminology

## Tile
*Tile* has four categories:
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

const dot1 = new Tile({ suit: "dot", value: 1 });
const dot2 = new Tile("🀚");

// Printing the tile's symbol by calling the toString() method.
console.log(dot1.toString()); //🀙
```

The configurations of tiles are tabulated below.

| Tile | suit      | value |
| ---- | --------- | ----- |
| 🀀    | honor     | 1     |
| 🀁    | honor     | 2     |
| 🀂    | honor     | 3     |
| 🀃    | honor     | 4     |
| 🀄    | honor     | 5     |
| 🀅    | honor     | 6     |
| 🀆    | honor     | 7     |
| 🀙    | dot       | 1     |
| 🀚    | dot       | 2     |
| 🀛    | dot       | 3     |
| 🀜    | dot       | 4     |
| 🀝    | dot       | 5     |
| 🀞    | dot       | 6     |
| 🀟    | dot       | 7     |
| 🀠    | dot       | 8     |
| 🀡    | dot       | 9     |
| 🀐    | bamboo    | 1     |
| 🀑    | bamboo    | 2     |
| 🀒    | bamboo    | 3     |
| 🀓    | bamboo    | 4     |
| 🀔    | bamboo    | 5     |
| 🀕    | bamboo    | 6     |
| 🀖    | bamboo    | 7     |
| 🀗    | bamboo    | 8     |
| 🀘    | bamboo    | 9     |
| 🀇    | character | 1     |
| 🀈    | character | 2     |
| 🀉    | character | 3     |
| 🀊    | character | 4     |
| 🀋    | character | 5     |
| 🀌    | character | 6     |
| 🀍    | character | 7     |
| 🀎    | character | 8     |
| 🀏    | character | 9     |


## Create a Meld
A *Meld* could be created by passing in an array of *Tiles*.
``` javascript
const { Tile, Meld } = require("hk-mahjong");

const dot1 = new Tile({ suit: "dot", value: 1 })
const meld = new Meld([dot1, dot1, dot1]);

// Printing the tile's symbol of the Meld by calling the toString() method.
console.log(meld.toString()); //🀙🀙🀙
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

const tiles = [
   dot2, dot2, dot2,
   dot3, dot3, dot3,
   dot4, dot4, dot4,
   dot9, dot9 
];

const hand = new Hand({ tiles, melds: [meld] });

// Printing the tile's symbol in the Hand by calling the toString() method.
console.log(hand.toString()); //🀙🀙🀙🀚🀚🀚🀛🀛🀛🀜🀜🀜🀡🀡
```

## Explore all winning possibilities of a Hand
* The class **ExplorerOfWinningPermutations** could be used to check if a *Hand* is able to form a *Winning Hand*.  
* There are cases where a *Hand* have more than one possible permutations to form a *Winning Hand*.  As such, the class **ExplorerOfWinningPermutations**  uses the Breadth First Search algorithm to find all possible winning permutations of a *Hand*.
```  javascript
const { Tile, Meld, Hand, ExplorerOfWinningPermutations } = require("hk-mahjong");

const dot1 = new Tile('🀙');
const meld = new Meld([dot1, dot1, dot1]);

const dot2 = new Tile('🀚');
const dot3 = new Tile('🀛');
const dot4 = new Tile('🀜');
const dot9 = new Tile('🀡');

const tiles = [
   dot2, dot2, dot2,
   dot3, dot3, dot3,
   dot4, dot4, dot4, 
   dot9, dot9
];

const hand = new Hand({ tiles, melds: [meld] });
const explorer = new ExplorerOfWinningPermutations(hand);

// The method getWinningPermutations() would return an array of WinningHand.
const winningPermutations = explorer.getWinningPermutations();
```

## Create a WinningHand
A *Winning Hand* could be created directly by passing in an array consisting of 5 *Melds*.
``` javascript
const { Tile, Meld, WinningHand } = require("hk-mahjong");

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

// Printing the tile's symbol in the WinningHand by calling the toString() method.
console.log(winningHand.toString()); // 🀙🀙🀙 🀚🀚🀚 🀛🀛🀛 🀜🀜🀜 🀝🀝
```

## Calculate Faan of a WinningHand
A *Faan* value could be obtained by calling the static method of the class ***FaanCalculator***  (an optional configuration parameter could be passed in if necessary).
``` javascript
const { Tile, Meld, WinningHand, FaanCalculator } = require("hk-mahjong");

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
