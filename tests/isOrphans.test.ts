import {WinningHand, Tile, Meld, HandTypeFinder} from "hk-mahjong";

test("Classify a valid Orphans Hand", () => {
    const bamboo1 = new Tile({suit: "bamboo", value: 1});
    const bamboo9 = new Tile({suit: "bamboo", value: 9});
    const dot1 = new Tile({suit: "dot", value: 1});
    const dot9 = new Tile({suit: "dot", value: 9});
    const character1 = new Tile({suit: "character", value: 1});
    const character9 = new Tile({suit: "character", value: 9});
    

    const meldOfBamboo1 = new Meld([bamboo1, bamboo1, bamboo1]);
    const meldOfBamboo9 = new Meld([bamboo9, bamboo9, bamboo9]);
    const meldOfDot1 = new Meld([dot1, dot1, dot1]);
    const meldOfDot9 = new Meld([dot9, dot9, dot9]);
    const meldOfCharacter1 = new Meld([character1, character1, character1]);
    const meldOfCharacter9 = new Meld([character9, character9, character9]);
    const meldOfDot1AsEyes = new Meld([dot1, dot1]);
    const meldOfCharacter9AsEyes = new Meld([character9, character9]);

    const winningHand1 = new WinningHand([meldOfBamboo1, meldOfBamboo9, meldOfDot1, meldOfDot9, meldOfCharacter9AsEyes]);
    expect(HandTypeFinder.isOrphans(winningHand1)).toBe(true);

    const winningHand2 = new WinningHand([meldOfCharacter1, meldOfBamboo9, meldOfDot1AsEyes, meldOfDot9, meldOfCharacter9]);
    expect(HandTypeFinder.isOrphans(winningHand2)).toBe(true);

    const winningHand3 = new WinningHand([meldOfCharacter1, meldOfBamboo9, meldOfDot1, meldOfDot9, meldOfCharacter9AsEyes]);
    expect(HandTypeFinder.isOrphans(winningHand3)).toBe(true);
});

test("Classify a Hand which is not Orphans", () => {
    const tile1 = new Tile({suit: "dot", value: 1});
    const tile2 = new Tile({suit: "bamboo", value: 1});
    const tile3 = new Tile({suit: "bamboo", value: 2});
    const tile4 = new Tile({suit: "character", value: 9});
    const tile5 = new Tile({suit: "honor", value: 1});
    

    const meld1 = new Meld([tile1, tile1, tile1]);
    const meld2 = new Meld([tile2, tile2, tile2]);
    const meld3 = new Meld([tile3, tile3, tile3]);
    const meld4 = new Meld([tile4, tile4, tile4]);
    const meld5 = new Meld([tile5, tile5]);

    const winningHand = new WinningHand([meld1, meld2, meld3, meld4, meld5]);
    expect(HandTypeFinder.isOrphans(winningHand)).toBe(false);
});