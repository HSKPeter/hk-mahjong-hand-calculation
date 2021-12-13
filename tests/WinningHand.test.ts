import {WinningHand, Tile, Meld} from "hk-mahjong";;

test('Catch error of formation of WinningHand as there are tiles that have over 4 occurrences', () => {
    const tile1 = new Tile({suit: "honor", value: 1});
    const tile2 = new Tile({suit: "honor", value: 2});
    const tile3 = new Tile({suit: "honor", value: 3});
    const tile4 = new Tile({suit: "honor", value: 4});
    

    const meld1 = new Meld([tile1, tile1, tile1]);
    const meld2 = new Meld([tile2, tile2, tile2]);
    const meld3 = new Meld([tile3, tile3, tile3]);
    const meld4 = new Meld([tile4, tile4, tile4]);
    const meld5 = new Meld([tile4, tile4]);

    expect(() => {
        new WinningHand([meld1, meld2, meld3, meld4, meld5]);
    }).toThrow();
});