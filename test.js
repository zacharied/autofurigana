const af = require('./autofurigana');

Array.prototype.equals = function(array) {
  if (!array)
    return false;

  if (this.length != array.length)
    return false;

  for (var i = 0; i < this.length; i++) {
    if (this[i] instanceof Array && array[i] instanceof Array) {
      if (!this[i].equals(array[i]))
        return false;       
    } else if (this[i] != array[i]) {
      return false;
    }
  }

  return true;
}

const test = (desc, kanji, kana, out) => {
  if (typeof test.ct_pass == 'undefined')
    test.ct_pass = 0;
  if (typeof test.ct_fail == 'undefined')
    test.ct_fail = 0;

  process.stdout.write("Test: " + desc + "... ");
  let res = af.autofurigana(kanji, kana);
  if (res.equals(out)) {
    process.stdout.write("PASS\n");
    test.ct_pass++;
  } else {
    process.stdout.write("FAIL\n");
    console.log(res);
    console.log(out);
    test.ct_fail++;
  }
}

test(
  'Single kanji',
  '家',
  'いえ',
  [ [ '家', 'いえ' ] ]
);

test(
  'Multiple kanji',
  '昨日',
  'きのう',
  [ [ '昨日', 'きのう' ] ]
);

test(
  'Kanji with kana',
  '走る',
  'はしる',
  [ [ '走', 'はし' ], [ 'る', null ] ]
);

test(
  'Long mixture',
  '走ることについて語るときに僕の語ること',
  'はしることについてかたるときにぼくのかたること',
  [ [ '走', 'はし' ],
    [ 'ることについて', null ],
    [ '語', 'かた' ],
    [ 'るときに', null ],
    [ '僕', 'ぼく' ],
    [ 'の', null ],
    [ '語', 'かた' ],
    [ 'ること', null ] ]
);

test(
  'String that could confuse the function',
  '息抜き',
  'いきぬき',
  [ [ '息抜', 'いきぬ' ], [ 'き', null ] ]
);

test(
  'Special characters in kanji',
  '時々',
  'ときどき',
  [ [ '時々', 'ときどき' ] ]
);

console.log(test.ct_pass + ' tests passed.');
console.log(test.ct_fail + ' tests failed.');
