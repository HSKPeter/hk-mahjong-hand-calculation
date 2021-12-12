import Mahjong from "../package/main";
import Meld from "../package/meld/Meld";

test('Validate a Hand', () => {
    const tiles = [];
    tiles.push(new Mahjong.Tile({suit: "honor", value: 1}));
    tiles.push(new Mahjong.Tile({suit: "honor", value: 1}));
    tiles.push(new Mahjong.Tile({suit: "honor", value: 1}));
    tiles.push(new Mahjong.Tile({suit: "honor", value: 2}));
    tiles.push(new Mahjong.Tile({suit: "honor", value: 2}));
    tiles.push(new Mahjong.Tile({suit: "honor", value: 2}));
    tiles.push(new Mahjong.Tile({suit: "honor", value: 3}));
    tiles.push(new Mahjong.Tile({suit: "honor", value: 3}));
    tiles.push(new Mahjong.Tile({suit: "honor", value: 3}));
    tiles.push(new Mahjong.Tile({suit: "honor", value: 4}));
    tiles.push(new Mahjong.Tile({suit: "honor", value: 4}));
    tiles.push(new Mahjong.Tile({suit: "honor", value: 4}));
    tiles.push(new Mahjong.Tile({suit: "honor", value: 5}));
    tiles.push(new Mahjong.Tile({suit: "honor", value: 5}));
    const hand = new Mahjong.Hand({tiles});

    expect(hand.toString()).toBe("🀀🀀🀀🀁🀁🀁🀂🀂🀂🀃🀃🀃🀄🀄");
    expect(hand.isWinningHand()).toBe(true);
});

test('Compare two Hands', () => {
    const tiles1 = [];
    tiles1.push(new Mahjong.Tile({suit: "honor", value: 1}));
    tiles1.push(new Mahjong.Tile({suit: "honor", value: 1}));
    tiles1.push(new Mahjong.Tile({suit: "honor", value: 1}));
    tiles1.push(new Mahjong.Tile({suit: "honor", value: 2}));
    tiles1.push(new Mahjong.Tile({suit: "honor", value: 2}));
    tiles1.push(new Mahjong.Tile({suit: "honor", value: 2}));
    tiles1.push(new Mahjong.Tile({suit: "honor", value: 3}));
    tiles1.push(new Mahjong.Tile({suit: "honor", value: 3}));
    tiles1.push(new Mahjong.Tile({suit: "honor", value: 3}));
    tiles1.push(new Mahjong.Tile({suit: "honor", value: 4}));
    tiles1.push(new Mahjong.Tile({suit: "honor", value: 4}));
    tiles1.push(new Mahjong.Tile({suit: "honor", value: 4}));
    tiles1.push(new Mahjong.Tile({suit: "honor", value: 5}));
    tiles1.push(new Mahjong.Tile({suit: "honor", value: 5}));
    const hand1 = new Mahjong.Hand({tiles: tiles1});
    

    const tiles2 = [];
    tiles2.push(new Mahjong.Tile({suit: "honor", value: 1}));
    tiles2.push(new Mahjong.Tile({suit: "honor", value: 2}));
    tiles2.push(new Mahjong.Tile({suit: "honor", value: 3}));
    tiles2.push(new Mahjong.Tile({suit: "honor", value: 4}));
    tiles2.push(new Mahjong.Tile({suit: "honor", value: 1}));
    tiles2.push(new Mahjong.Tile({suit: "honor", value: 2}));
    tiles2.push(new Mahjong.Tile({suit: "honor", value: 3}));
    tiles2.push(new Mahjong.Tile({suit: "honor", value: 4}));
    tiles2.push(new Mahjong.Tile({suit: "honor", value: 1}));
    tiles2.push(new Mahjong.Tile({suit: "honor", value: 2}));
    tiles2.push(new Mahjong.Tile({suit: "honor", value: 3}));
    tiles2.push(new Mahjong.Tile({suit: "honor", value: 4}));
    tiles2.push(new Mahjong.Tile({suit: "honor", value: 5}));
    tiles2.push(new Mahjong.Tile({suit: "honor", value: 5}));
    const hand2 = new Mahjong.Hand({tiles: tiles2});

    expect(hand1.toString()).toBe("🀀🀀🀀🀁🀁🀁🀂🀂🀂🀃🀃🀃🀄🀄");
    expect(hand1.isWinningHand()).toBe(true);
    
    expect(hand2.toString()).toBe("🀀🀁🀂🀃🀀🀁🀂🀃🀀🀁🀂🀃🀄🀄");
    expect(hand1.isIdentical(hand2)).toBe(true);
    expect(hand1.isWinningHand()).toBe(true);
    expect(hand2.isWinningHand()).toBe(true);
});

test('Identify a Hand that is not a WinningHand', () => {
    const tiles = [];
    tiles.push(new Mahjong.Tile({suit: "honor", value: 1}));
    tiles.push(new Mahjong.Tile({suit: "honor", value: 1}));
    tiles.push(new Mahjong.Tile({suit: "honor", value: 1}));
    tiles.push(new Mahjong.Tile({suit: "honor", value: 2}));
    tiles.push(new Mahjong.Tile({suit: "honor", value: 2}));
    tiles.push(new Mahjong.Tile({suit: "honor", value: 2}));
    tiles.push(new Mahjong.Tile({suit: "honor", value: 3}));
    tiles.push(new Mahjong.Tile({suit: "honor", value: 3}));
    tiles.push(new Mahjong.Tile({suit: "honor", value: 3}));
    tiles.push(new Mahjong.Tile({suit: "honor", value: 4}));
    tiles.push(new Mahjong.Tile({suit: "honor", value: 4}));
    tiles.push(new Mahjong.Tile({suit: "honor", value: 6}));
    tiles.push(new Mahjong.Tile({suit: "honor", value: 5}));
    tiles.push(new Mahjong.Tile({suit: "honor", value: 5}));
    const hand = new Mahjong.Hand({tiles});

    expect(hand.toString()).toBe("🀀🀀🀀🀁🀁🀁🀂🀂🀂🀃🀃🀅🀄🀄");
    expect(hand.isWinningHand()).toBe(false);
});

test('Identify a Hand that is a WinningHand and has more than one WinningPermutations', () => {
    const tiles = [];
    tiles.push(new Mahjong.Tile({suit: "dot", value: 1}));
    tiles.push(new Mahjong.Tile({suit: "dot", value: 1}));
    tiles.push(new Mahjong.Tile({suit: "dot", value: 1}));
    tiles.push(new Mahjong.Tile({suit: "dot", value: 2}));
    tiles.push(new Mahjong.Tile({suit: "dot", value: 2}));
    tiles.push(new Mahjong.Tile({suit: "dot", value: 2}));
    tiles.push(new Mahjong.Tile({suit: "dot", value: 3}));
    tiles.push(new Mahjong.Tile({suit: "dot", value: 3}));
    tiles.push(new Mahjong.Tile({suit: "dot", value: 3}));
    tiles.push(new Mahjong.Tile({suit: "dot", value: 4}));
    tiles.push(new Mahjong.Tile({suit: "dot", value: 4}));
    tiles.push(new Mahjong.Tile({suit: "dot", value: 4}));
    tiles.push(new Mahjong.Tile({suit: "dot", value: 9}));
    tiles.push(new Mahjong.Tile({suit: "dot", value: 9}));
    const hand = new Mahjong.Hand({tiles});

    expect(hand.isWinningHand()).toBe(true);
    expect(hand.findAllWinningPermutations().length).toBeGreaterThanOrEqual(1);
});

test('Identify a Hand that is a WinningHand with a Pong meld', () => {
    const tiles = [];
    tiles.push(new Mahjong.Tile({suit: "dot", value: 1}));
    tiles.push(new Mahjong.Tile({suit: "dot", value: 1}));
    tiles.push(new Mahjong.Tile({suit: "dot", value: 1}));
    tiles.push(new Mahjong.Tile({suit: "dot", value: 1}));
    tiles.push(new Mahjong.Tile({suit: "dot", value: 2}));
    tiles.push(new Mahjong.Tile({suit: "dot", value: 2}));
    tiles.push(new Mahjong.Tile({suit: "dot", value: 2}));
    tiles.push(new Mahjong.Tile({suit: "dot", value: 2}));
    tiles.push(new Mahjong.Tile({suit: "dot", value: 3}));
    tiles.push(new Mahjong.Tile({suit: "dot", value: 3}));
    tiles.push(new Mahjong.Tile({suit: "dot", value: 3}));
    tiles.push(new Mahjong.Tile({suit: "dot", value: 4}));
    tiles.push(new Mahjong.Tile({suit: "dot", value: 4}));
    tiles.push(new Mahjong.Tile({suit: "dot", value: 4}));
    tiles.push(new Mahjong.Tile({suit: "dot", value: 9}));
    tiles.push(new Mahjong.Tile({suit: "dot", value: 9}));
    const hand = new Mahjong.Hand({tiles});

    expect(hand.isWinningHand()).toBe(true);
    expect(hand.findAllWinningPermutations().length).toBeGreaterThan(1);
});

test('Identify a Hand with melds formed', () => {
    const dot1 = new Mahjong.Tile("🀙");
    const dot2 = new Mahjong.Tile("🀚");
    const dot3 = new Mahjong.Tile("🀛");
    const dot4 = new Mahjong.Tile("🀜");
    const dot9 = new Mahjong.Tile("🀡");

    const meld = new Meld([dot1, dot1, dot1]);

    const tiles = [];
    tiles.push(dot2);
    tiles.push(dot2);
    tiles.push(dot2);
    
    tiles.push(dot3);
    tiles.push(dot3);
    tiles.push(dot3);

    tiles.push(dot4);
    tiles.push(dot4);
    tiles.push(dot4);

    tiles.push(dot9);
    tiles.push(dot9);

    const hand = new Mahjong.Hand({tiles, melds: [meld]});
    expect(hand.toString()).toBe("🀙🀙🀙🀚🀚🀚🀛🀛🀛🀜🀜🀜🀡🀡");
    expect(hand.isWinningHand()).toBe(true);
    expect(hand.findAllWinningPermutations().length).toBeGreaterThan(1);
});