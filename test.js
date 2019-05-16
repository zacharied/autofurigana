import { autofurigana } from './autofurigana';

// Test basic, one-kanji conversion.
console.log(autofurigana('家', 'いえ'));

// Multi-kanji conversion.
console.log(autofurigana('昨日', 'きのう'));

// Kanji with trailing kana.
console.log(autofurigana('走る', 'はしる'));

// Long string with mixture of kana and kanji.
console.log(autofurigana(
  '走ることについて語るときに僕の語ること',
  'はしることについてかたるときにぼくのかたること'
));

// String that could confuse the function.
console.log(autofurigana(
  '息抜き',
  'いきぬき'
));

// Invalid input.
console.log(autofurigana(
  '一直線に',
  'いっちょくせん'
));
