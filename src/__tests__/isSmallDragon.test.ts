import { WinningHand, Tile, Meld, HandTypeFinder } from '../index';

test('Classify a valid SmallDragon Hand', () => {
  const tile1 = new Tile({ suit: 'honor', value: 5 });
  const tile2 = new Tile({ suit: 'honor', value: 6 });
  const tile3 = new Tile({ suit: 'dot', value: 7 });
  const tile4 = new Tile({ suit: 'character', value: 4 });
  const tile5 = new Tile({ suit: 'honor', value: 7 });

  const meld1 = new Meld([tile1, tile1, tile1]);
  const meld2 = new Meld([tile2, tile2, tile2]);
  const meld3 = new Meld([tile3, tile3, tile3]);
  const meld4 = new Meld([tile4, tile4, tile4]);
  const meld5 = new Meld([tile5, tile5]);

  const winningHand = new WinningHand([meld1, meld2, meld3, meld4, meld5]);
  expect(HandTypeFinder.isSmallDragon(winningHand)).toBe(true);
});

test('Classify a Hand which is not SmallDragon (but GreatDragon)', () => {
  const tile1 = new Tile({ suit: 'honor', value: 5 });
  const tile2 = new Tile({ suit: 'honor', value: 6 });
  const tile3 = new Tile({ suit: 'honor', value: 7 });
  const tile4 = new Tile({ suit: 'character', value: 4 });
  const tile5 = new Tile({ suit: 'bamboo', value: 8 });

  const meld1 = new Meld([tile1, tile1, tile1]);
  const meld2 = new Meld([tile2, tile2, tile2]);
  const meld3 = new Meld([tile3, tile3, tile3]);
  const meld4 = new Meld([tile4, tile4, tile4]);
  const meld5 = new Meld([tile5, tile5]);

  const winningHand = new WinningHand([meld1, meld2, meld3, meld4, meld5]);
  expect(HandTypeFinder.isSmallDragon(winningHand)).toBe(false);
});
