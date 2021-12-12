import isNineGates from "../package/calculateFaan/isNineGates";
import Mahjong from "../package/main"

test("Classify a valid NineGates Hand", () => {
    const bamboo1 = new Mahjong.Tile({suit: "bamboo", value: 1});
    const bamboo2 = new Mahjong.Tile({suit: "bamboo", value: 2});
    const bamboo3 = new Mahjong.Tile({suit: "bamboo", value: 3});
    const bamboo4 = new Mahjong.Tile({suit: "bamboo", value: 4});
    const bamboo5 = new Mahjong.Tile({suit: "bamboo", value: 5});
    const bamboo6 = new Mahjong.Tile({suit: "bamboo", value: 6});
    const bamboo7 = new Mahjong.Tile({suit: "bamboo", value: 7});
    const bamboo8 = new Mahjong.Tile({suit: "bamboo", value: 8});
    const bamboo9 = new Mahjong.Tile({suit: "bamboo", value: 9});
    

    const meld1 = new Mahjong.Meld([bamboo1, bamboo1, bamboo1]);
    const meld2 = new Mahjong.Meld([bamboo2, bamboo3, bamboo4]);
    const meld3 = new Mahjong.Meld([bamboo5, bamboo6, bamboo7]);
    const meld4 = new Mahjong.Meld([bamboo7, bamboo8, bamboo9]);
    const meld5 = new Mahjong.Meld([bamboo9, bamboo9]);

    const winningHand = new Mahjong.WinningHand([meld1, meld2, meld3, meld4, meld5]);
    expect(isNineGates(winningHand)).toBe(true);
});

test("Classify a Hand which is not NineGates", () => {
    const bamboo1 = new Mahjong.Tile({suit: "bamboo", value: 1});
    const bamboo2 = new Mahjong.Tile({suit: "bamboo", value: 2});
    const bamboo3 = new Mahjong.Tile({suit: "bamboo", value: 3});
    const bamboo4 = new Mahjong.Tile({suit: "bamboo", value: 4});
    const bamboo5 = new Mahjong.Tile({suit: "bamboo", value: 5});
    const bamboo6 = new Mahjong.Tile({suit: "bamboo", value: 6});
    const bamboo7 = new Mahjong.Tile({suit: "bamboo", value: 7});
    const bamboo8 = new Mahjong.Tile({suit: "bamboo", value: 8});
    const bamboo9 = new Mahjong.Tile({suit: "bamboo", value: 9});
    

    const meld1 = new Mahjong.Meld([bamboo1, bamboo2, bamboo3]);
    const meld2 = new Mahjong.Meld([bamboo2, bamboo3, bamboo4]);
    const meld3 = new Mahjong.Meld([bamboo5, bamboo6, bamboo7]);
    const meld4 = new Mahjong.Meld([bamboo7, bamboo8, bamboo9]);
    const meld5 = new Mahjong.Meld([bamboo9, bamboo9]);

    const winningHand = new Mahjong.WinningHand([meld1, meld2, meld3, meld4, meld5]);
    expect(isNineGates(winningHand)).toBe(false);
});