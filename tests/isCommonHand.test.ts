import {WinningHand, Tile, Meld, HandTypeFinder} from "hk-mahjong";

test("Classify a valid CommonHand Hand", () => {
    const tile1 = new Tile({suit: "dot", value: 1});
    const tile2 = new Tile({suit: "dot", value: 2});
    const tile3 = new Tile({suit: "dot", value: 3});
    const tile4 = new Tile({suit: "dot", value: 4});
    const tile5 = new Tile({suit: "dot", value: 5});
    const tile6 = new Tile({suit: "dot", value: 6});
    

    const meld1 = new Meld([tile1, tile2, tile3]);
    const meld2 = new Meld([tile4, tile2, tile3]);
    const meld3 = new Meld([tile4, tile5, tile6]);
    const meld4 = new Meld([tile5, tile4, tile3]);
    const meld5 = new Meld([tile5, tile5]);

    const winningHand = new WinningHand([meld1, meld2, meld3, meld4, meld5]);
    expect(HandTypeFinder.isCommonHand(winningHand)).toBe(true);
});

test("Classify a Hand which is not CommonHand", () => {
    const tile1 = new Tile({suit: "dot", value: 1});
    const tile2 = new Tile({suit: "dot", value: 2});
    const tile3 = new Tile({suit: "dot", value: 3});
    const tile4 = new Tile({suit: "dot", value: 4});
    const tile5 = new Tile({suit: "dot", value: 5});
    const tile6 = new Tile({suit: "dot", value: 6});
    const tile7 = new Tile({suit: "dot", value: 7});
    

    const meld1 = new Meld([tile1, tile2, tile3]);
    const meld2 = new Meld([tile4, tile2, tile3]);
    const meld3 = new Meld([tile4, tile5, tile6]);
    const meld4 = new Meld([tile7, tile7, tile7]);
    const meld5 = new Meld([tile5, tile5]);

    const winningHand = new WinningHand([meld1, meld2, meld3, meld4, meld5]);
    expect(HandTypeFinder.isCommonHand(winningHand)).toBe(false);
});