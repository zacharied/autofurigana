# autofurigana

Many times I have come across situations where I have the kanji of a sentence
along with the kana of the sentence, but no actual mapping between the reading
and its kanjis. Autofurigana is an algorithm that utilizes a boundary-detection
approach in order to find kana matches within a kanji-based sentence and
a kana-based sentence; after finding these matches, it becomes easy figure out
which characters are represented by the kanji.

This repository contains a JavaScript implementation of the algorithm; given
the low SLOC, it would be easy to port to another language if necessary.
I chose JavaScript because it is usually the most easily accessible language in
the environments of the problems that it solves, like Anki templates.

As far as I can tell, this algorithm is fully functional and this project can
be considered complete.

## Usage

The main `autofurigana.js` file exports the necessary functions. There is also
the `autofurigana.min.js` file, which is minified and has module system code
taken out such that it is ready to be copy-pasted and called within existing JS
code.

The function itself returns an array of kanji-kana pairs; if the currently
analyzed block of the kanji sentence has kana in it, the kana slot of the pair
is set to `null`.

The first argument to the function is the sentence containing kanji, and the
second is the same sentence with only kana. An example:

```
console.log(autofurigana(
  '走ることについて語るときに僕の語ること',
  'はしることについてかたるときにぼくのかたること'
));

> [ [ '走', 'はし' ],
>   [ 'ることについて', null ],
>   [ '語', 'かた' ],
>   [ 'るときに', null ],
>   [ '僕', 'ぼく' ],
>   [ 'の', null ],
>   [ '語', 'かた' ],
>   [ 'ること', null ] ]
```

There is also the function `autofurigana_brackets` which instead outputs in the
commonly accepted bracket-notation furigana format, in which characters placed
within square brackets are considered to be furi for the preceding characters
until the previous space. Using the previous example,

```
console.log(autofurigana_brackets(
  '走ることについて語るときに僕の語ること',
  'はしることについてかたるときにぼくのかたること'
));

> "走[はし]ることについて 語[かた]るときに 僕[ぼく]の 語[かた]ること"
```

## Testing

After ensuring that your system has NodeJS installed, simply run `make test`
and the unit tests will be run.

## Other notes

Please understand that this algorithm is designed **only** to generate furigana
given both the kanji and kana of a sentence. It has no capability to infer or
look up readings of kanji; doing so is outside the scope of this project.
