import isGreatDragon from "../package/calculateFaan/isGreatDragon";
import Mahjong from "../package/main"

test("Classify a valid GreatDragon Hand", () => {
    const tile1 = new Mahjong.Tile({suit: "honor", value: 5});
    const tile2 = new Mahjong.Tile({suit: "honor", value: 6});
    const tile3 = new Mahjong.Tile({suit: "honor", value: 7});
    const tile4 = new Mahjong.Tile({suit: "character", value: 4});
    const tile5 = new Mahjong.Tile({suit: "bamboo", value: 8});
    

    const meld1 = new Mahjong.Meld([tile1, tile1, tile1]);
    const meld2 = new Mahjong.Meld([tile2, tile2, tile2]);
    const meld3 = new Mahjong.Meld([tile3, tile3, tile3]);
    const meld4 = new Mahjong.Meld([tile4, tile4, tile4]);
    const meld5 = new Mahjong.Meld([tile5, tile5]);

    const winningHand = new Mahjong.WinningHand([meld1, meld2, meld3, meld4, meld5]);
    expect(isGreatDragon(winningHand)).toBe(true);
});

test("Classify a Hand which is not GreatDragon", () => {
    const tile1 = new Mahjong.Tile({suit: "honor", value: 6});
    const tile2 = new Mahjong.Tile({suit: "honor", value: 7});
    const tile3 = new Mahjong.Tile({suit: "bamboo", value: 2});
    const tile4 = new Mahjong.Tile({suit: "character", value: 4});
    const tile5 = new Mahjong.Tile({suit: "honor", value: 5});
    

    const meld1 = new Mahjong.Meld([tile1, tile1, tile1]);
    const meld2 = new Mahjong.Meld([tile2, tile2, tile2]);
    const meld3 = new Mahjong.Meld([tile3, tile3, tile3]);
    const meld4 = new Mahjong.Meld([tile4, tile4, tile4]);
    const meld5 = new Mahjong.Meld([tile5, tile5]);

    const winningHand = new Mahjong.WinningHand([meld1, meld2, meld3, meld4, meld5]);
    expect(isGreatDragon(winningHand)).toBe(false);
});