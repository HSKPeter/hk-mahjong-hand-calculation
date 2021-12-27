import { meldFormer, Meld, Tile } from '../index';

test('Compare two melds that are formed in different ways', () => {
  const meld1 = meldFormer(['🀀', '🀀', '🀀']);

  const east = new Tile({ suit: 'honor', value: 1 });
  const meld2 = new Meld([east, east, east]);
  expect(meld1.isIdentical(meld2)).toBe(true);
});
