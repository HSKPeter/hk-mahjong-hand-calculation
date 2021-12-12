import Mahjong from "../package/main";

test('Catch error of formation of WinningHand as there are tiles that have over 4 occurrences', () => {
    const tile1 = new Mahjong.Tile({suit: "honor", value: 1});
    const tile2 = new Mahjong.Tile({suit: "honor", value: 2});
    const tile3 = new Mahjong.Tile({suit: "honor", value: 3});
    const tile4 = new Mahjong.Tile({suit: "honor", value: 4});
    

    const meld1 = new Mahjong.Meld([tile1, tile1, tile1]);
    const meld2 = new Mahjong.Meld([tile2, tile2, tile2]);
    const meld3 = new Mahjong.Meld([tile3, tile3, tile3]);
    const meld4 = new Mahjong.Meld([tile4, tile4, tile4]);
    const meld5 = new Mahjong.Meld([tile4, tile4]);

    expect(() => {
        new Mahjong.WinningHand([meld1, meld2, meld3, meld4, meld5]);
    }).toThrow();
});