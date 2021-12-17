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
    var result = {
        word: '',
        phonetic: '',
        phonetics: [],
        origin: '',
        meanings: [],
    };
    if (!wordInfo || !wordInfo.data || wordInfo.data.length === 0) {
        return result;
    }
    var data = wordInfo.data[0];
    result.word = data.word ? data.word : '';
    result.phonetic = (data === null || data === void 0 ? void 0 : data.word) ? data.word : '';
    result.phonetics = data.phonetics.map(function (item) {
        return { text: item.text, audio: item.audio };
    });
    result.origin = data.origin;
    result.meanings = data.meanings.map(function (item_meaning) {
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
    console.log('START asdfadsfadfasdfadsfadfasdf');
    console.log(result);
    console.log('END asdfadsfadfasdfadsfadfasdf');
    return result;
};
exports.parseWordInfo = parseWordInfo;
