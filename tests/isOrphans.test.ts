import isOrphans from "../package/calculateFaan/isOrphans";
import Mahjong from "../package/main"

test("Classify a valid Orphans Hand", () => {
    const bamboo1 = new Mahjong.Tile({suit: "bamboo", value: 1});
    const bamboo9 = new Mahjong.Tile({suit: "bamboo", value: 9});
    const dot1 = new Mahjong.Tile({suit: "dot", value: 1});
    const dot9 = new Mahjong.Tile({suit: "dot", value: 9});
    const character1 = new Mahjong.Tile({suit: "character", value: 1});
    const character9 = new Mahjong.Tile({suit: "character", value: 9});
    

    const meldOfBamboo1 = new Mahjong.Meld([bamboo1, bamboo1, bamboo1]);
    const meldOfBamboo9 = new Mahjong.Meld([bamboo9, bamboo9, bamboo9]);
    const meldOfDot1 = new Mahjong.Meld([dot1, dot1, dot1]);
    const meldOfDot9 = new Mahjong.Meld([dot9, dot9, dot9]);
    const meldOfCharacter1 = new Mahjong.Meld([character1, character1, character1]);
    const meldOfCharacter9 = new Mahjong.Meld([character9, character9, character9]);
    const meldOfDot1AsEyes = new Mahjong.Meld([dot1, dot1]);
    const meldOfCharacter9AsEyes = new Mahjong.Meld([character9, character9]);

    const winningHand1 = new Mahjong.WinningHand([meldOfBamboo1, meldOfBamboo9, meldOfDot1, meldOfDot9, meldOfCharacter9AsEyes]);
    expect(isOrphans(winningHand1)).toBe(true);

    const winningHand2 = new Mahjong.WinningHand([meldOfCharacter1, meldOfBamboo9, meldOfDot1AsEyes, meldOfDot9, meldOfCharacter9]);
    expect(isOrphans(winningHand2)).toBe(true);

    const winningHand3 = new Mahjong.WinningHand([meldOfCharacter1, meldOfBamboo9, meldOfDot1, meldOfDot9, meldOfCharacter9AsEyes]);
    expect(isOrphans(winningHand3)).toBe(true);
});

test("Classify a Hand which is not Orphans", () => {
    const tile1 = new Mahjong.Tile({suit: "dot", value: 1});
    const tile2 = new Mahjong.Tile({suit: "bamboo", value: 1});
    const tile3 = new Mahjong.Tile({suit: "bamboo", value: 2});
    const tile4 = new Mahjong.Tile({suit: "character", value: 9});
    const tile5 = new Mahjong.Tile({suit: "honor", value: 1});
    

    const meld1 = new Mahjong.Meld([tile1, tile1, tile1]);
    const meld2 = new Mahjong.Meld([tile2, tile2, tile2]);
    const meld3 = new Mahjong.Meld([tile3, tile3, tile3]);
    const meld4 = new Mahjong.Meld([tile4, tile4, tile4]);
    const meld5 = new Mahjong.Meld([tile5, tile5]);

    const winningHand = new Mahjong.WinningHand([meld1, meld2, meld3, meld4, meld5]);
    expect(isOrphans(winningHand)).toBe(false);
});