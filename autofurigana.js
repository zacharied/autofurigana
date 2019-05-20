module.exports.autofurigana = function(kanji, reading) {
  const is_kanji = (c) => {
    return /[\u3000-\u303F\u4E00-\u9FEF]/.test(c);
  };

  // Groups kanji or kanji groups to groups of phonetics. If key is null,
  // then the "kanji" and phonetics line up.
  let pairs = []; 

  // The number of characters into the reading we have made mappings for. 
  let rp = 0;

  // The string of phonetics we are currently building to map to a kanji or
  // kanji group.
  let read_build = "";
  let kanji_build = "";

  const build_push = () => {
    pairs.push([kanji_build, read_build]);
    read_build = "";
    kanji_build = "";
  };

  // Outer loop; walks through each character in kanji sentence.
  for (let kp = 0; kp < kanji.length; kp++) {
    kanji_build += kanji[kp];

    // Check if we're on a boundary.
    if (kp + 1 == kanji.length) {
      // We are at the end.
      while (rp < reading.length) {
        read_build += reading[rp]; 
        rp++;
      }

      if (!is_kanji(kanji[kp])) read_build = null;

      build_push();

      // We are done.
      break;
    } else if (is_kanji(kanji[kp]) && !is_kanji(kanji[kp+1])) {
      // We need to "catch up" reading to kanji.
      while (kanji[kp+1] !== reading[rp] || read_build.length < kanji_build.length) {
        if (reading[rp] === undefined) {
          // We reached the end of the string without finding a match.
          return null;
        }
        read_build += reading[rp];
        rp++;
      }

      build_push();
    } else if (!is_kanji(kanji[kp]) && is_kanji(kanji[kp+1])) {
      read_build = null;
      rp += kanji_build.length;
      build_push(); 
    }
  }

  return pairs;
};

module.exports.autofurigana_brackets = function(kanji, kana) {
  let pairs = autofurigana(kanji, kana);
  let str = '';
  for (let i = 0; i < pairs.length; i++)
    if (pairs[i][1] !== null) {
      if (i != 0)
        str += ' ';
      str += pairs[i][0] + '[' + pairs[i][1] + ']';
    } else
      str += pairs[i][0];

  return str;
};
