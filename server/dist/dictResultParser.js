"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseWordInfo = void 0;
var parseWordInfo = function (wordInfo) {
    if (!wordInfo || !wordInfo.data || wordInfo.data.length === 0) {
        console.log('returning error from parseWordInfo: ', [wordInfo]);
        return [{
                error: 'Error: Failed to parse data returned by dictionary',
                word: '',
                phonetic: '',
                phonetics: [],
                origin: '',
                meanings: []
            }];
    }
    var wordInfoArray = wordInfo.data.map(function (oneInterpretation) {
        parse(oneInterpretation);
    });
    return wordInfoArray;
};
exports.parseWordInfo = parseWordInfo;
var parse = function (data) {
    var wordInfo = {
        error: '',
        word: '',
        phonetic: '',
        phonetics: [],
        origin: '',
        meanings: []
    };
    wordInfo.word = data.word ? data.word : '';
    wordInfo.phonetic = (data === null || data === void 0 ? void 0 : data.word) ? data.word : '';
    wordInfo.phonetics = data.phonetics.map(function (item) {
        return { text: item.text, audio: item.audio };
    });
    wordInfo.origin = data.origin;
    wordInfo.meanings = data.meanings.map(function (item_meaning) {
        var pOfS = item_meaning.partOfSpeech;
        var definitions = item_meaning.definitions.map(function (item_def) {
            return {
                definition: item_def.definition,
                example: item_def.example,
                synonyms: __spreadArray([], item_def.synonyms, true),
                antonyms: __spreadArray([], item_def.antonyms, true),
            };
        });
        return {
            partOfSpeech: pOfS,
            definitions: definitions,
        };
    });
    console.log('returning from parse: ', wordInfo);
    return wordInfo;
};
