"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wordInfoSample = exports.typeDefs = void 0;
var apollo_server_1 = require("apollo-server");
exports.typeDefs = (0, apollo_server_1.gql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n\n  type Phonetics {\n    text: String\n    audio: String\n  }\n\n  type Definition {\n    definition: String\n    synonyms: [String]!\n    antonyms: [String]!\n  }\n\n  type Meaning {\n    partOfSpeech: String!\n    definitions: [Definition]!\n  }\n  type WordInfo {\n    word: String\n    origin: String\n    phonetic: String\n    phonetics: [Phonetics]!\n    meanings: [Meaning]!\n  }\n\n\n  type Query {\n    getWordInfo(): WordInfo\n  }\n"], ["\n\n  type Phonetics {\n    text: String\n    audio: String\n  }\n\n  type Definition {\n    definition: String\n    synonyms: [String]!\n    antonyms: [String]!\n  }\n\n  type Meaning {\n    partOfSpeech: String!\n    definitions: [Definition]!\n  }\n  type WordInfo {\n    word: String\n    origin: String\n    phonetic: String\n    phonetics: [Phonetics]!\n    meanings: [Meaning]!\n  }\n\n\n  type Query {\n    getWordInfo(): WordInfo\n  }\n"
    // End of Template String..
])));
// End of Template String..
exports.wordInfoSample = {
    word: 'post',
    origin: "late 16th century(as a heraldic term denoting the tail of an animal): from French, based on Latin cauda ‘tail’.Compare with cue2.queue(sense 1 of the noun) dates from the mid 19th century.",
    phonetic: 'pOst1',
    phonetics: [
        {
            text: 'kju',
            audio: '//ssl.gstatic.com/dictionary/static/sounds/20200429/queue--_gb_1.mp3',
        }
    ],
    meanings: [
        {
            partOfSpeech: 'noun',
            definitions: [
                {
                    definition: 'a line or sequence of people or vehicles awaiting their turn to be attended to or to proceed.',
                    synonyms: [
                        'line',
                        'row',
                        'column',
                        'file',
                        'chain',
                        'string',
                        'stream',
                        'procession',
                        'train',
                        'succession',
                        'progression',
                        'cavalcade',
                        'sequence',
                        'series',
                        'waiting list',
                        'reserve list',
                        'breadline',
                        'wait list',
                        'backup',
                        'waiting line',
                        'crocodile',
                        'traffic jam',
                        'jam',
                        'tailback',
                        'gridlock',
                        'traffic snarl',
                        'snarl - up'
                    ],
                    antonyms: []
                },
                {
                    definition: 'a list of data items, commands, etc., stored so as to be retrievable in a definite order, usually the order of insertion.',
                    synonyms: [],
                    antonyms: []
                },
                {
                    definition: 'a plait of hair worn at the back.',
                    synonyms: [],
                    antonyms: []
                }
            ]
        },
        {
            partOfSpeech: 'verb',
            definitions: [
                {
                    definition: 'take ones place in a queue.',
                    example: 'in the war they had queued for food',
                    synonyms: [
                        'line up',
                        'form lines',
                        'get into rows/ columns',
                        'fall in',
                        'file',
                        'walk/move in line',
                        'stand in a queue',
                        'form a queue',
                        'queue up',
                        'wait in line',
                        'form a line',
                        'form a crocodile',
                    ],
                    antonyms: []
                },
                {
                    definition: 'arrange in a queue.',
                    example: 'input or output requests to a file are queued by the operating system',
                    synonyms: [
                        'queue up',
                        'wait in line',
                        'form a line',
                        'form a crocodile',
                    ],
                    antonyms: []
                }
            ]
        }
    ]
};
var templateObject_1;
