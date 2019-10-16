import { APIInterface, ISynonymResult, IOptions, pushArray, SearchAPI } from "./api";


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

export interface IGoogleOptions extends IOptions {
    verb: boolean,
    noun: boolean,
    adjective: boolean
}

interface IResponse extends Array<IResult> { }

class GoogleDictionary implements APIInterface {
    private options: IGoogleOptions = { noun: true, adjective: true, verb: true };
    apiName = SearchAPI.googledictionary;
    getOptions = (): IGoogleOptions => {
        return this.options;
    }
    setOptions = (options) => {
        this.options = options;
    }

    public getSynonym = async (value: string, requestId: string): Promise<ISynonymResult> => {
        const result: ISynonymResult = { words: [value], requestId: requestId };
        const res = await fetch(`https://mydictionaryapi.appspot.com?define=${value}`);
        const response = <IResponse>await res.json();
        response.forEach(r => {
            let { meaning: { adjective = [], noun = [], verb = [] } } = r;
            if (!this.options) {
                return result;
            }
            if (this.options.noun) {
                noun.forEach(w => {
                    pushArray(result.words, w.synonyms)
                })
            }
            if (this.options.adjective) {
                adjective.forEach(w => {
                    pushArray(result.words, w.synonyms)
                })
            }
            if (this.options.verb) {
                verb.forEach(w => {
                    pushArray(result.words, w.synonyms)
                })
            }
        })
        result.words = result.words.filter(w => !w.includes(' '));
        return result;
    }
}

export default new GoogleDictionary();