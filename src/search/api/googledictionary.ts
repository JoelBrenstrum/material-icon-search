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
interface IError {
    message: string
}

interface IResponse extends Array<IResult> { }

class GoogleDictionary implements APIInterface {
    public getSynonym = async (value: string, requestId: string, options?: IOptions): Promise<ISynonymResult> => {
        const result: ISynonymResult = { words: [value], requestId: requestId };
        const res = await fetch(`https://api.dictionaryapi.dev/api/v1/entries/en/${value}`);
        const response = <IResponse | IError>await res.json();
        if ((response as IError).message) {
            return result;
        }
        (response as IResponse).forEach(r => {
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
