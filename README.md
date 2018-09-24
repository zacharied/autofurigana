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
