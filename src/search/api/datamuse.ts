import { APIInterface, ISynonymResult, SearchAPI, IOptions } from "./api";

function pushArray(arr, arr2) {
    arr.push.apply(arr, arr2);
}

export interface IDatamuseOptions extends IOptions {

}

interface IResult extends Array<{ word: string, score: number }> { }

class Datamuse implements APIInterface {
    apiName = SearchAPI.datamuse;
    getOptions = (): IDatamuseOptions => {
        return {}
    }
    setOptions = () => {
        //
    }
    public getSynonym = async (value: string, requestId: string): Promise<ISynonymResult> => {
        const result: ISynonymResult = { words: [value], requestId: requestId };
        const res = await fetch(`https://api.datamuse.com/words?rel_syn=${value}&max=10`);
        let body: IResult = await res.json();
        if (body.length > 0) {
            pushArray(result.words, body.map(w => w.word));
        }
        return result;
    }
}

export default new Datamuse();