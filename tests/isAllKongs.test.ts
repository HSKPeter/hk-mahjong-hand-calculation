import isAllKongs from "../package/calculateFaan/isAllKongs";
import Mahjong from "../package/main"

test("Classify a valid AllKongs Hand", () => {
    const tile1 = new Mahjong.Tile({suit: "honor", value: 1});
    const tile2 = new Mahjong.Tile({suit: "honor", value: 2});
    const tile3 = new Mahjong.Tile({suit: "dot", value: 3});
    const tile4 = new Mahjong.Tile({suit: "character", value: 4});
    const tile5 = new Mahjong.Tile({suit: "bamboo", value: 1});
    

    const meld1 = new Mahjong.Meld([tile1, tile1, tile1, tile1]);
    const meld2 = new Mahjong.Meld([tile2, tile2, tile2, tile2]);
    const meld3 = new Mahjong.Meld([tile3, tile3, tile3, tile3]);
    const meld4 = new Mahjong.Meld([tile4, tile4, tile4, tile4]);
    const meld5 = new Mahjong.Meld([tile5, tile5]);

    const winningHand = new Mahjong.WinningHand([meld1, meld2, meld3, meld4, meld5]);
    expect(isAllKongs(winningHand)).toBe(true);
});

test("Classify a Hand which is not AllKongs", () => {
    const tile1 = new Mahjong.Tile({suit: "honor", value: 1});
    const tile2 = new Mahjong.Tile({suit: "honor", value: 2});
    const tile3 = new Mahjong.Tile({suit: "bamboo", value: 4});
    const tile4 = new Mahjong.Tile({suit: "bamboo", value: 5});
    const tile5 = new Mahjong.Tile({suit: "bamboo", value: 6});
    

    const meld1 = new Mahjong.Meld([tile1, tile1, tile1, tile1]);
    const meld2 = new Mahjong.Meld([tile2, tile2, tile2]);
    const meld3 = new Mahjong.Meld([tile3, tile3, tile3, tile3]);
    const meld4 = new Mahjong.Meld([tile4, tile4, tile4]);
    const meld5 = new Mahjong.Meld([tile5, tile5]);

    const winningHand = new Mahjong.WinningHand([meld1, meld2, meld3, meld4, meld5]);
    expect(isAllKongs(winningHand)).toBe(false);
});