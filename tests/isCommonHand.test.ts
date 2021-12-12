import isCommonHand from "../package/calculateFaan/isCommonHand";
import Mahjong from "../package/main"

test("Classify a valid CommonHand Hand", () => {
    const tile1 = new Mahjong.Tile({suit: "dot", value: 1});
    const tile2 = new Mahjong.Tile({suit: "dot", value: 2});
    const tile3 = new Mahjong.Tile({suit: "dot", value: 3});
    const tile4 = new Mahjong.Tile({suit: "dot", value: 4});
    const tile5 = new Mahjong.Tile({suit: "dot", value: 5});
    const tile6 = new Mahjong.Tile({suit: "dot", value: 6});
    

    const meld1 = new Mahjong.Meld([tile1, tile2, tile3]);
    const meld2 = new Mahjong.Meld([tile4, tile2, tile3]);
    const meld3 = new Mahjong.Meld([tile4, tile5, tile6]);
    const meld4 = new Mahjong.Meld([tile5, tile4, tile3]);
    const meld5 = new Mahjong.Meld([tile5, tile5]);

    const winningHand = new Mahjong.WinningHand([meld1, meld2, meld3, meld4, meld5]);
    expect(isCommonHand(winningHand)).toBe(true);
});

test("Classify a Hand which is not CommonHand", () => {
    const tile1 = new Mahjong.Tile({suit: "dot", value: 1});
    const tile2 = new Mahjong.Tile({suit: "dot", value: 2});
    const tile3 = new Mahjong.Tile({suit: "dot", value: 3});
    const tile4 = new Mahjong.Tile({suit: "dot", value: 4});
    const tile5 = new Mahjong.Tile({suit: "dot", value: 5});
    const tile6 = new Mahjong.Tile({suit: "dot", value: 6});
    const tile7 = new Mahjong.Tile({suit: "dot", value: 7});
    

    const meld1 = new Mahjong.Meld([tile1, tile2, tile3]);
    const meld2 = new Mahjong.Meld([tile4, tile2, tile3]);
    const meld3 = new Mahjong.Meld([tile4, tile5, tile6]);
    const meld4 = new Mahjong.Meld([tile7, tile7, tile7]);
    const meld5 = new Mahjong.Meld([tile5, tile5]);

    const winningHand = new Mahjong.WinningHand([meld1, meld2, meld3, meld4, meld5]);
    expect(isCommonHand(winningHand)).toBe(false);
});