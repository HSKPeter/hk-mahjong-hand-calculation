// import  from "../package/depthFirstSearch/ExplorerOfWinningPermutations";
import {Tile, Meld, Hand, ExplorerOfWinningPermutations} from "hk-mahjong";
import {MeldType} from "hk-mahjong/meld/MeldType"
// import Meld from "../package/meld/Meld";
// import { MeldType } from "../package/meld/MeldType";
// import Tile from "../package/Tile";
// HandTypeFinder.

test('Classify a Hand that is not a valid ThirteenOrphans', () => {
    const tiles = [];
    tiles.push(new Tile({suit: "honor", value: 1}));
    tiles.push(new Tile({suit: "honor", value: 2}));
    tiles.push(new Tile({suit: "honor", value: 3}));
    tiles.push(new Tile({suit: "honor", value: 4}));
    tiles.push(new Tile({suit: "honor", value: 5}));
    tiles.push(new Tile({suit: "honor", value: 6}));
    tiles.push(new Tile({suit: "honor", value: 7}));
    tiles.push(new Tile({suit: "honor", value: 7}));

    tiles.push(new Tile({suit: "character", value: 1}));
    tiles.push(new Tile({suit: "character", value: 9}));


    tiles.push(new Tile({suit: "dot", value: 9}));
    tiles.push(new Tile({suit: "dot", value: 9}));
    tiles.push(new Tile({suit: "bamboo", value: 9}));
    tiles.push(new Tile({suit: "bamboo", value: 9}));

    const hand = new Hand({tiles});

    expect(hand.isSpecialWinningHand()).toBe(false);
    // expect(hand.isWinningHand()).toBe(false);
});

test('Validate all possibilities of ThirteenOrphans', () => {
    const tiles = [];
    for (const suit in Tile.ALL_SUIT_TYPES) {
        if (suit === "honor") {
            for (let value = Tile.ALL_SUIT_TYPES["honor"]["minValue"]; value <= Tile.ALL_SUIT_TYPES["honor"]["maxValue"]; value++) {
                tiles.push(new Tile({suit, value}));
            }
        } else {
            tiles.push(new Tile({suit, value: Tile.ALL_SUIT_TYPES[suit]["minValue"]}));
            tiles.push(new Tile({suit, value: Tile.ALL_SUIT_TYPES[suit]["maxValue"]}));
        }
    }

    const numberOfTilesThatAreOrphans = tiles.length;
    for (let i = 0; i < numberOfTilesThatAreOrphans; i++) {
        if ( i > 0){
            tiles.pop();
        }

        tiles.push(tiles[i]);
        const hand = new Hand({tiles});
        expect(hand.isSpecialWinningHand()).toBe(true);
        expect(hand.isWinningHand()).toBe(true);
    }

});

test("Instantiate a Hand with the \"tiles\" parameter, and obtain the only Winning Permutation of ThirteenOrphans from the ExplorerOfWinningPermutations", () => {    
    const tiles = [];

    tiles.push(new Tile("🀙"));
    tiles.push(new Tile("🀡"));
    
    tiles.push(new Tile("🀇"));
    tiles.push(new Tile("🀏"));

    tiles.push(new Tile("🀐"));
    tiles.push(new Tile("🀘"));

    tiles.push(new Tile("🀀"));
    tiles.push(new Tile("🀁"));
    tiles.push(new Tile("🀂"));
    tiles.push(new Tile("🀃"));

    tiles.push(new Tile("🀄"));
    tiles.push(new Tile("🀅"));
    tiles.push(new Tile("🀆"));

    tiles.push(new Tile("🀄"));

    const hand = new Hand({tiles});
    const explorer = new ExplorerOfWinningPermutations(hand);
    
    const winningPermutations = explorer.getWinningPermutations();
    expect(winningPermutations.length).toBe(1);
    expect(winningPermutations[0].toString()).toBe("🀀🀁🀂🀃🀄🀄🀅🀆🀇🀏🀙🀡🀐🀘");
    expect(winningPermutations[0].getMelds().length).toBe(1);
    expect(winningPermutations[0].getMelds()[0].getMeldType()).toBe(MeldType.THIRTEEN_ORPHANS);
});

test("Instantiate a Hand with the \"meld\" parameter, and obtain the only Winning Permutation of ThirteenOrphans from the ExplorerOfWinningPermutations", () => {    
    const tiles = [];

    tiles.push(new Tile("🀙"));
    tiles.push(new Tile("🀡"));
    
    tiles.push(new Tile("🀇"));
    tiles.push(new Tile("🀏"));

    tiles.push(new Tile("🀐"));
    tiles.push(new Tile("🀘"));

    tiles.push(new Tile("🀀"));
    tiles.push(new Tile("🀁"));
    tiles.push(new Tile("🀂"));
    tiles.push(new Tile("🀃"));

    tiles.push(new Tile("🀄"));
    tiles.push(new Tile("🀅"));
    tiles.push(new Tile("🀆"));

    tiles.push(new Tile("🀄"));

    const hand = new Hand({melds: [new Meld(tiles)]});
    const explorer = new ExplorerOfWinningPermutations(hand);
    
    const winningPermutations = explorer.getWinningPermutations();
    expect(winningPermutations.length).toBe(1);
    expect(winningPermutations[0].toString()).toBe("🀀🀁🀂🀃🀄🀄🀅🀆🀇🀏🀙🀡🀐🀘");
    expect(winningPermutations[0].getMelds().length).toBe(1);
    expect(winningPermutations[0].getMelds()[0].getMeldType()).toBe(MeldType.THIRTEEN_ORPHANS);
});

