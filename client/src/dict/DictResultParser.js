export const parseResult = (src) => {
    const result = {
        word: '',
        phonetic: '',
        phonetics: [],
        origin: '',
        meanings: [],
    };
    if (!src || !src.data || src.data.length === 0) {
        return result;
    }
    const data = src.data[0];
    result.word = data.word ? data.word : '';
    result.phonetic = data?.word ? data.word : '';
    result.phonetics = data.phonetics.map((item) => {
        return { text: item.text, audio: item.audio };
    });
    result.origin = data.origin;
    result.meanings = data.meanings.map((item_meaning) => {
        const pOfS = item_meaning.partOfSpeech;
        const definitions = item_meaning.definitions.map((item_def) => {
            return {
                definition: item_def.definition,
                example: item_def.example,
                synonyms: [...item_def.synonyms],
                antonyms: [...item_def.antonyms],
            };
        });
        return {
            partOfSpeech: pOfS,
            definitions,
        };
    });
    console.log('START asdfadsfadfasdfadsfadfasdf');
    console.log(result);
    console.log('END asdfadsfadfasdfadsfadfasdf');
    return result;
};
//# sourceMappingURL=DictResultParser.js.map