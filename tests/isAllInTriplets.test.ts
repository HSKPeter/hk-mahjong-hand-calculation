import {WinningHand, Tile, Meld, HandTypeFinder} from "hk-mahjong";


test("Classify a valid AllInTriplets Hand", () => {
    const tile1 = new Tile({suit: "honor", value: 1});
    const tile2 = new Tile({suit: "honor", value: 2});
    const tile3 = new Tile({suit: "dot", value: 3});
    const tile4 = new Tile({suit: "character", value: 4});
    const tile5 = new Tile({suit: "bamboo", value: 1});
    

    const meld1 = new Meld([tile1, tile1, tile1]);
    const meld2 = new Meld([tile2, tile2, tile2]);
    const meld3 = new Meld([tile3, tile3, tile3]);
    const meld4 = new Meld([tile4, tile4, tile4]);
    const meld5 = new Meld([tile5, tile5]);

    const winningHand = new WinningHand([meld1, meld2, meld3, meld4, meld5]);
    expect(HandTypeFinder.isAllInTriplets(winningHand)).toBe(true);
});

test("Classify a Hand which is not AllInTriplets", () => {
    const tile1 = new Tile({suit: "honor", value: 1});
    const tile2 = new Tile({suit: "honor", value: 2});
    const tile3 = new Tile({suit: "bamboo", value: 4});
    const tile4 = new Tile({suit: "bamboo", value: 5});
    
    const chow1 = new Tile({suit: "bamboo", value: 1});
    const chow2 = new Tile({suit: "bamboo", value: 2});
    const chow3 = new Tile({suit: "bamboo", value: 3});
    

    const meld1 = new Meld([chow1, chow2, chow3]);
    const meld2 = new Meld([tile2, tile2, tile2]);
    const meld3 = new Meld([tile3, tile3, tile3]);
    const meld4 = new Meld([tile4, tile4, tile4]);
    const meld5 = new Meld([tile1, tile1]);

    const winningHand = new WinningHand([meld1, meld2, meld3, meld4, meld5]);
    expect(HandTypeFinder.isAllInTriplets(winningHand)).toBe(false);
});