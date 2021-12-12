import isAllHonors from "../package/calculateFaan/isAllHonors";
import Mahjong from "../package/main"
import WinningHand from "../package/WinningHand";

test("Classify a valid AllHonors Hand", () => {
    const east = new Mahjong.Tile("🀀");
    const south = new Mahjong.Tile("🀁");
    const west = new Mahjong.Tile("🀂");
    const greenDragon = new Mahjong.Tile("🀅");
    const redDragon = new Mahjong.Tile("🀄");

    const meld1 = new Mahjong.Meld([east, east, east]);
    const meld2 = new Mahjong.Meld([south, south, south]);
    const meld3 = new Mahjong.Meld([west, west, west]);
    const meld4 = new Mahjong.Meld([redDragon, redDragon, redDragon]);
    const meld5 = new Mahjong.Meld([greenDragon, greenDragon]);

    const winningHand = new WinningHand([meld1, meld2, meld3, meld4, meld5]);
    expect(isAllHonors(winningHand)).toBe(true);
});

test("Classify a Hand which is not AllHonors", () => {
    const east = new Mahjong.Tile("🀀");
    const south = new Mahjong.Tile("🀁");
    const bamboo3 = new Mahjong.Tile("🀒");
    const greenDragon = new Mahjong.Tile("🀅");
    const redDragon = new Mahjong.Tile("🀄");

    const meld1 = new Mahjong.Meld([east, east, east]);
    const meld2 = new Mahjong.Meld([south, south, south]);
    const meld3 = new Mahjong.Meld([bamboo3, bamboo3, bamboo3]);
    const meld4 = new Mahjong.Meld([redDragon, redDragon, redDragon]);
    const meld5 = new Mahjong.Meld([greenDragon, greenDragon]);

    const winningHand = new WinningHand([meld1, meld2, meld3, meld4, meld5]);
    expect(isAllHonors(winningHand)).toBe(false);
});

// 🀀🀁🀂🀃🀄🀄🀅🀆🀇🀏🀙🀡🀐🀘