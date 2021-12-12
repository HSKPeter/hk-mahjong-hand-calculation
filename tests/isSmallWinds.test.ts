import isSmallWinds from "../package/calculateFaan/isSmallWinds";
import Mahjong from "../package/main"

test("Classify a valid SmallWinds Hand", () => {
    const tile1 = new Mahjong.Tile({suit: "honor", value: 1});
    const tile2 = new Mahjong.Tile({suit: "honor", value: 2});
    const tile3 = new Mahjong.Tile({suit: "honor", value: 3});
    const tile4 = new Mahjong.Tile({suit: "dot", value: 2});
    const tile5 = new Mahjong.Tile({suit: "honor", value: 4});
    

    const meld1 = new Mahjong.Meld([tile1, tile1, tile1]);
    const meld2 = new Mahjong.Meld([tile2, tile2, tile2]);
    const meld3 = new Mahjong.Meld([tile3, tile3, tile3]);
    const meld4 = new Mahjong.Meld([tile4, tile4, tile4]);
    const meld5 = new Mahjong.Meld([tile5, tile5]);

    const winningHand = new Mahjong.WinningHand([meld1, meld2, meld3, meld4, meld5]);
    expect(isSmallWinds(winningHand)).toBe(true);
});

test("Classify a Hand which is not SmallWinds", () => {
    const tile1 = new Mahjong.Tile({suit: "honor", value: 6});
    const tile2 = new Mahjong.Tile({suit: "honor", value: 2});
    const tile3 = new Mahjong.Tile({suit: "honor", value: 3});
    const tile4 = new Mahjong.Tile({suit: "dot", value: 6});
    const tile5 = new Mahjong.Tile({suit: "honor", value: 4});
    

    const meld1 = new Mahjong.Meld([tile1, tile1, tile1]);
    const meld2 = new Mahjong.Meld([tile2, tile2, tile2]);
    const meld3 = new Mahjong.Meld([tile3, tile3, tile3]);
    const meld4 = new Mahjong.Meld([tile4, tile4, tile4]);
    const meld5 = new Mahjong.Meld([tile5, tile5]);

    const winningHand = new Mahjong.WinningHand([meld1, meld2, meld3, meld4, meld5]);
    expect(isSmallWinds(winningHand)).toBe(false);
});

test("Classify a Hand which is not SmallWinds (but GreatWinds)", () => {
    const tile1 = new Mahjong.Tile({suit: "honor", value: 1});
    const tile2 = new Mahjong.Tile({suit: "honor", value: 2});
    const tile3 = new Mahjong.Tile({suit: "honor", value: 3});
    const tile4 = new Mahjong.Tile({suit: "honor", value: 4});
    const tile5 = new Mahjong.Tile({suit: "bamboo", value: 8});
    

    const meld1 = new Mahjong.Meld([tile1, tile1, tile1]);
    const meld2 = new Mahjong.Meld([tile2, tile2, tile2]);
    const meld3 = new Mahjong.Meld([tile3, tile3, tile3]);
    const meld4 = new Mahjong.Meld([tile4, tile4, tile4]);
    const meld5 = new Mahjong.Meld([tile5, tile5]);

    const winningHand = new Mahjong.WinningHand([meld1, meld2, meld3, meld4, meld5]);
    expect(isSmallWinds(winningHand)).toBe(false);
});