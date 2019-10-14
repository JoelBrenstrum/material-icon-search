import { APIInterface, ISynonymResult, IOptions, pushArray } from "./api";


interface ISubResult {
    definition: string,
    example: string,
    synonyms: Array<string>
}

interface IResult {
    meaning: {
        adjective: Array<ISubResult>
        verb: Array<ISubResult>
        noun: Array<ISubResult>
    }
}

interface IResponse extends Array<IResult> { }

class GoogleDictionary implements APIInterface {
    public getSynonym = async (value: string, requestId: string, options?: IOptions): Promise<ISynonymResult> => {
        const result: ISynonymResult = { words: [value], requestId: requestId };
        const res = await fetch(`https://mydictionaryapi.appspot.com?define=${value}`);
        const response = <IResponse>await res.json();
        response.forEach(r => {
            let { meaning: { adjective = [], noun = [], verb = [] } } = r;
            if (!options) {
                return result;
            }
            if (options.noun) {
                noun.forEach(w => {
                    pushArray(result.words, w.synonyms)
                })
            }
            if (options.adjective) {
                adjective.forEach(w => {
                    pushArray(result.words, w.synonyms)
                })
            }
            if (options.verb) {
                verb.forEach(w => {
                    pushArray(result.words, w.synonyms)
                })
            }
        })

        return result;
    }
}

export default new GoogleDictionary();