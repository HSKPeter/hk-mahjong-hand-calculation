import { WinningHand, Tile, Meld, HandTypeFinder } from '../index';

test('Classify a valid AllHonors Hand', () => {
  const east = new Tile('🀀');
  const south = new Tile('🀁');
  const west = new Tile('🀂');
  const greenDragon = new Tile('🀅');
  const redDragon = new Tile('🀄');

  const meld1 = new Meld([east, east, east]);
  const meld2 = new Meld([south, south, south]);
  const meld3 = new Meld([west, west, west]);
  const meld4 = new Meld([redDragon, redDragon, redDragon]);
  const meld5 = new Meld([greenDragon, greenDragon]);

  const winningHand = new WinningHand([meld1, meld2, meld3, meld4, meld5]);
  expect(HandTypeFinder.isAllHonors(winningHand)).toBe(true);
});

test('Classify a Hand which is not AllHonors', () => {
  const east = new Tile('🀀');
  const south = new Tile('🀁');
  const bamboo3 = new Tile('🀒');
  const greenDragon = new Tile('🀅');
  const redDragon = new Tile('🀄');

  const meld1 = new Meld([east, east, east]);
  const meld2 = new Meld([south, south, south]);
  const meld3 = new Meld([bamboo3, bamboo3, bamboo3]);
  const meld4 = new Meld([redDragon, redDragon, redDragon]);
  const meld5 = new Meld([greenDragon, greenDragon]);

  const winningHand = new WinningHand([meld1, meld2, meld3, meld4, meld5]);
  expect(HandTypeFinder.isAllHonors(winningHand)).toBe(false);
});

// 🀀🀁🀂🀃🀄🀄🀅🀆🀇🀏🀙🀡🀐🀘
